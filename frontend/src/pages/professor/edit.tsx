import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProfessorForm, { type ProfessorFormValues, type ProfessorFormInitial } from "../../components/professors/ProfessorForm";
import { useToast } from "../../components/ui/toast/ToastProvider";
import { getAdminProfessor, updateAdminProfessor } from "../../services/adminProfessor";

export default function EditProfessorPage() {
  const nav = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  const professorId = Number(id);
  const validId = useMemo(() => Number.isFinite(professorId), [professorId]);

  const [loading, setLoading] = useState(true);
  const [initial, setInitial] = useState<ProfessorFormInitial | null>(null);

  useEffect(() => {
    if (!validId) return;

    (async () => {
      try {
        const p = await getAdminProfessor(professorId);
        setInitial({
          id: p.id,
          nama_dosen: p.nama_dosen,
          nidn: p.nidn,
          fakultas: p.fakultas,
          program_studi: p.program_studi,
          penelitian: p.penelitian,
          fotoUrl: p.foto_url ?? "",
        });
      } catch {
        setInitial(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [professorId, validId]);

  if (!validId) {
    return (
      <div className="bg-white border rounded-xl p-6">
        <h1 className="text-xl font-semibold mb-2">Invalid ID</h1>
        <button className="px-4 py-2 rounded-lg border" onClick={() => nav("/admin/professors")}>
          Back
        </button>
      </div>
    );
  }

  if (loading) return <div className="bg-white border rounded-xl p-6">Loading...</div>;

  if (!initial) {
    return (
      <div className="bg-white border rounded-xl p-6">
        <h1 className="text-xl font-semibold mb-2">Dosen tidak ditemukan</h1>
        <p className="text-gray-600 mb-4">Mungkin sudah dihapus atau ID salah.</p>
        <button className="px-4 py-2 rounded-lg border" onClick={() => nav("/admin/professors")}>
          Back to Professors
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Edit Professor</h1>
        <p className="text-gray-600 text-sm">Update dosen #{initial.id}</p>
      </div>

      <ProfessorForm
        initial={initial}
        onCancel={() => nav("/admin/professors")}
        onSubmit={async (values: ProfessorFormValues) => {
          try {
            await updateAdminProfessor(professorId, {
              nama_dosen: values.nama_dosen,
              nidn: values.nidn,
              fakultas: values.fakultas,
              program_studi: values.program_studi,
              penelitian: values.penelitian,
              foto: values.fotoFile ? [values.fotoFile] : undefined,
            });

            toast({ type: "success", title: "Updated", message: "Data dosen berhasil diupdate." });
            nav("/admin/professors");
          } catch (e: any) {
            toast({ type: "error", title: "Failed", message: e?.message ?? "Gagal update." });
          }
        }}
      />
    </div>
  );
}