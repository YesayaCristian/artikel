import { useNavigate } from "react-router-dom";
import ProfessorForm, { type ProfessorFormValues } from "../../../components/professors/ProfessorForm";
import { useToast } from "../../../components/ui/toast/ToastProvider";
import { createAdminProfessor } from "../../../services/adminProfessor";

export default function CreateProfessorPage() {
  const nav = useNavigate();
  const { toast } = useToast();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Create Professor</h1>
        <p className="text-sm text-slate-500">Tambah data dosen baru.</p>
      </div>

      <ProfessorForm
        onCancel={() => nav("/admin/professors")}
        onSubmit={async (values: ProfessorFormValues) => {
          try {
            await createAdminProfessor(values);

            toast({
              type: "success",
              title: "Created",
              message: "Data dosen berhasil ditambahkan.",
            });
            nav("/admin/professors");
          } catch (e: any) {
            toast({
              type: "error",
              title: "Failed",
              message: e?.message ?? "Gagal menambahkan dosen.",
            });
          }
        }}
      />
    </div>
  );
}