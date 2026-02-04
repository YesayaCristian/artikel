import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { CourseFormInitial, CourseFormValues } from "../../../components/course/CourseForm";
import CourseForm  from "../../../components/course/CourseForm";
import { getAdminCourse, updateAdminCourse } from "../../../services/adminCourse";

export default function EditCoursePage() {
  const { id } = useParams();
  const nav = useNavigate();
  const [initial, setInitial] = useState<CourseFormInitial | null>(null);

  useEffect(() => {
    (async () => {
      const c = await getAdminCourse(Number(id));
      setInitial({
        id: c.id,
        kode_mk: c.kode_mk,
        nama_mk: c.nama_mk,
        sks: c.sks,
        semester: c.semester,
        jenis_mk: c.jenis_mk,
        id_prodi: c.id_prodi,
        deskripsi: c.deskripsi,
      });
    })();
  }, [id]);

  if (!initial) return <div>Loading...</div>;

  return (
    <CourseForm
      initial={initial}
      onCancel={() => nav("/admin/mata-kuliah")}
      onSubmit={async (v: CourseFormValues) => {
        await updateAdminCourse(Number(id), v);
        nav("/admin/mata-kuliah");
      }}
    />
  );
}
