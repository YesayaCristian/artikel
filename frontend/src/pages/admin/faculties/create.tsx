import { useNavigate } from "react-router-dom";
import FacultyForm, { type FacultyFormValues } from "../../../components/faculty/FacultyForm";
import { useToast } from "../../../components/ui/toast/ToastProvider";
import { createAdminFaculty } from "../../../services/adminFaculty";

export default function CreateFacultyPage() {
  const nav = useNavigate();
  const { toast } = useToast();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Create Faculty</h1>
        <p className="text-sm text-slate-500">Buat fakultas baru.</p>
      </div>

      <FacultyForm
        onCancel={() => nav("/admin/faculties")}
        onSubmit={async (values: FacultyFormValues) => {
          try {
            await createAdminFaculty({
              kode_fakultas: values.kode_fakultas,
              nama_fakultas: values.nama_fakultas,
              nama_dekan: values.nama_dekan,
              gedung: values.gedung,
              website: values.website,
            });

            toast({ type: "success", title: "Created", message: "Fakultas berhasil dibuat." });
            nav("/admin/faculties");
          } catch (e: any) {
            toast({ type: "error", title: "Failed", message: e?.message ?? "Gagal membuat fakultas." });
          }
        }}
      />
    </div>
  );
}