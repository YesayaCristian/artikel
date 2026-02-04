import { useNavigate } from "react-router-dom";
import CourseForm from "../../../components/course/CourseForm";
import type { CourseFormValues } from "../../../components/course/CourseForm";
import { createAdminCourse } from "../../../services/adminCourse";
import { useToast } from "../../../components/ui/toast/ToastProvider";

export default function CreateCoursePage() {
  const nav = useNavigate();
  const { toast } = useToast();

  return (
    <CourseForm
      onCancel={() => nav("/admin/mata-kuliah")}
      onSubmit={async (v: CourseFormValues) => {
        await createAdminCourse(v);
        toast({ type: "success", title: "Created", message: "Mata kuliah berhasil ditambahkan" });
        nav("/admin/mata-kuliah");
      }}
    />
  );
}
