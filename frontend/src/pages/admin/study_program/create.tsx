import { useNavigate } from "react-router-dom";
import StudyProgramForm, {
  type StudyProgramFormValues,
} from "../../../components/study_program/StudyProgramForm";
import { useToast } from "../../../components/ui/toast/ToastProvider";
import { createAdminStudyProgram } from "../../../services/adminStudyProgram";

export default function CreateStudyProgramPage() {
  const nav = useNavigate();
  const { toast } = useToast();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Create Program Studi</h1>
        <p className="text-sm text-slate-500">Tambah data program studi baru.</p>
      </div>

      <StudyProgramForm
        onCancel={() => nav("/admin/study_program")}
        onSubmit={async (values: StudyProgramFormValues) => {
          try {
            await createAdminStudyProgram(values);

            toast({
              type: "success",
              title: "Created",
              message: "Data program studi berhasil ditambahkan.",
            });

            nav("/admin/study_program");
          } catch (e: any) {
            toast({
              type: "error",
              title: "Failed",
              message: e?.message ?? "Gagal menambahkan program studi.",
            });
          }
        }}
      />
    </div>
  );
}
