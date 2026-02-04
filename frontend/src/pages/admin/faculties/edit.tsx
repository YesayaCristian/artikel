import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FacultyForm, { type FacultyFormValues, type FacultyFormInitial } from "../../../components/faculty/FacultyForm";
import { useToast } from "../../../components/ui/toast/ToastProvider";
import { getAdminFaculty, updateAdminFaculty } from "../../../services/adminFaculty";

export default function EditFacultyPage() {
  const nav = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  const facultyId = Number(id);
  const validId = useMemo(() => Number.isFinite(facultyId), [facultyId]);

  const [loading, setLoading] = useState(true);
  const [initial, setInitial] = useState<FacultyFormInitial | null>(null);

  useEffect(() => {
    if (!validId) return;

    (async () => {
      try {
        const f = await getAdminFaculty(facultyId);
        setInitial({
          id: f.id,
          kode_fakultas: f.kode_fakultas,
          nama_fakultas: f.nama_fakultas,
          nama_dekan: f.nama_dekan,
          gedung: f.gedung,
          website: f.website,
        });
      } catch {
        setInitial(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [facultyId, validId]);

  if (!validId) {
    return (
      <div className="bg-white border rounded-xl p-6">
        <h1 className="text-xl font-semibold mb-2">Invalid ID</h1>
        <button
          className="px-4 py-2 rounded-lg border"
          onClick={() => nav("/admin/faculties")}
        >
          Back
        </button>
      </div>
    );
  }

  if (loading) return <div className="bg-white border rounded-xl p-6">Loading...</div>;

  if (!initial) {
    return (
      <div className="bg-white border rounded-xl p-6">
        <h1 className="text-xl font-semibold mb-2">Fakultas tidak ditemukan</h1>
        <p className="text-gray-600 mb-4">Mungkin sudah dihapus atau ID salah.</p>
        <button
          className="px-4 py-2 rounded-lg border"
          onClick={() => nav("/admin/faculties")}
        >
          Back to Faculties
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Edit Faculty</h1>
        <p className="text-gray-600 text-sm">Update fakultas #{initial.id}</p>
      </div>

      <FacultyForm
        initial={initial}
        onCancel={() => nav("/admin/faculties")}
        onSubmit={async (values: FacultyFormValues) => {
          try {
            await updateAdminFaculty(facultyId, {
              kode_fakultas: values.kode_fakultas,
              nama_fakultas: values.nama_fakultas,
              nama_dekan: values.nama_dekan,
              gedung: values.gedung,
              website: values.website,
            });

            toast({ type: "success", title: "Updated", message: "Data fakultas berhasil diupdate." });
            nav("/admin/faculties");
          } catch (e: any) {
            toast({ type: "error", title: "Failed", message: e?.message ?? "Gagal update." });
          }
        }}
      />
    </div>
  );
}