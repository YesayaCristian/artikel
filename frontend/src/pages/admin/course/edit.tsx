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
    ( async () => {
      const c = await getAdminCourse(id!);
      setInitial({
        id_mk : c.id,
        kode_mk: c.kode_mk,
        nama_mk: c.nama_mk,
        sks: c.sks,
        semester: c.semester,
        jenis_mk: c.jenis_mk,
        id_prodi: c.id_prodi,
        deskripsi: c.deskripsi,
        bahan_kajian: c.bahan_kajian,
        cpps: c.cpps,
        cpm: c.cpm,
        daftar_rujukan: c.daftar_rujukan,
        instrumen_penilaian: c.instrumen_penilaian,
      });
    })();
  }, [id]);

  if (!initial) return <div>Loading...</div>;

  return (
    <CourseForm
      initial={initial}
      onCancel={() => nav("/admin/course")}
      onSubmit={async (v: CourseFormValues) => {
        await updateAdminCourse(id!, v); // paksa jadi string
        nav("/admin/course");
      }}
    />
  );
}
