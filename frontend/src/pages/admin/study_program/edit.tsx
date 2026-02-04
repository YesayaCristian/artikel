import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StudyProgramForm, {
  type StudyProgramFormValues,
  type StudyProgramFormInitial,
} from "../../../components/study_program/StudyProgramForm";
import { useToast } from "../../../components/ui/toast/ToastProvider";
import { getAdminStudyProgram, updateAdminStudyProgram } from "../../../services/adminStudyProgram";

export default function EditStudyProgramPage() {
  const nav = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  const studyProgramId = Number(id);
  const validId = useMemo(() => Number.isFinite(studyProgramId), [studyProgramId]);

  const [loading, setLoading] = useState(true);
  const [initial, setInitial] = useState<StudyProgramFormInitial | null>(null);

  useEffect(() => {
    if (!validId) return;

    (async () => {
      try {
        const p = await getAdminStudyProgram(studyProgramId);
        setInitial({
          id: p.id,
          kode_prodi: p.kode_prodi,
          nama_prodi: p.nama_prodi,
          jenjang: p.jenjang,
          akreditasi: p.akreditasi,
          id_fakultas: p.id_fakultas,
          kaprodi: p.kaprodi,
        });
      } catch {
        setInitial(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [studyProgramId, validId]);

  if (!validId) {
    return (
      <div className="bg-white border rounded-xl p-6">
        <h1 className="text-xl font-semibold mb-2">Invalid ID</h1>
        <button
          className="px-4 py-2 rounded-lg border"
          onClick={() => nav("/admin/study-programs")}
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
        <h1 className="text-xl font-semibold mb-2">Program studi tidak ditemukan</h1>
        <p className="text-gray-600 mb-4">Mungkin sudah dihapus atau ID salah.</p>
        <button
          className="px-4 py-2 rounded-lg border"
          onClick={() => nav("/admin/study-programs")}
        >
          Back to Program Studi
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Edit Program Studi</h1>
        <p className="text-gray-600 text-sm">Update program studi #{initial.id}</p>
      </div>

      <StudyProgramForm
        initial={initial}
        onCancel={() => nav("/admin/study-programs")}
        onSubmit={async (values: StudyProgramFormValues) => {
          try {
            await updateAdminStudyProgram(studyProgramId, {
              kode_prodi: values.kode_prodi,
              nama_prodi: values.nama_prodi,
              jenjang: values.jenjang,
              akreditasi: values.akreditasi,
              id_fakultas: values.id_fakultas,
              kaprodi: values.kaprodi,
            });

            toast({
              type: "success",
              title: "Updated",
              message: "Data program studi berhasil diupdate.",
            });

            nav("/admin/study-programs");
          } catch (e: any) {
            toast({
              type: "error",
              title: "Failed",
              message: e?.message ?? "Gagal update.",
            });
          }
        }}
      />
    </div>
  );
}
