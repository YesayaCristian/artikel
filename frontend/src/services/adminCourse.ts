import { http } from "../lib/http";

export type ApiCourse = {
  id_mk: string;   // UUID string dari backend
  kode_mk: string;
  nama_mk: string;
  sks: number;
  semester: number;
  jenis_mk: "wajib" | "pilihan" | "praktikum";
  id_prodi: number;
  nama_prodi?: string;
  deskripsi: string;
  created_at: string;
};

export async function fetchCourses(): Promise<{ mata_kuliah: ApiCourse[] }> {
  return http<{ mata_kuliah: ApiCourse[] }>("/api/mk/");
}

export async function getAdminCourse(id: string): Promise<ApiCourse> {
  return http<ApiCourse>(`/api/mk/${id}/`);
}

export async function createAdminCourse(data: {
  kode_mk: string;
  nama_mk: string;
  sks: number;
  semester: number;
  jenis_mk: "wajib" | "pilihan" | "praktikum";
  id_prodi: number;
  deskripsi: string;
}) {
  return http("/api/mk/create/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateAdminCourse(
  id: string,
  data: {
    kode_mk: string;
    nama_mk: string;
    sks: number;
    semester: number;
    jenis_mk: "wajib" | "pilihan" | "praktikum";
    id_prodi: number;
    deskripsi: string;
  }
) {
  return http(`/api/mk/${id}/update/`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteAdminCourse(id: string) {
  return http(`/api/mk/${id}/delete/`, { method: "DELETE" });
}