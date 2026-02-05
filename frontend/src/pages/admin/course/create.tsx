import { useNavigate } from "react-router-dom";
import CourseForm, { type CourseFormValues } from "../../../components/course/CourseForm";
import { createAdminCourse } from "../../../services/adminCourse";
import { useToast } from "../../../components/ui/toast/ToastProvider";

export default function CreateCoursePage() {
  const nav = useNavigate();
  const { toast } = useToast();

  return (
    <CourseForm
      onCancel={() => nav("/admin/course")}
      onSubmit={async (v: CourseFormValues) => {
        try {
          await createAdminCourse(v);
          toast({ type: "success", title: "Created", message: "Mata kuliah berhasil ditambahkan" });
          nav("/admin/course");
        } catch (e: any) {
          toast({ type: "error", title: "Failed", message: e?.message ?? "Gagal menambahkan mata kuliah" });
        }
      }}
    />
  );
}
