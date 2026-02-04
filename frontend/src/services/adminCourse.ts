import { http } from "../lib/http";

export type ApiCourse = {
  id: number;
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
  return http<{ mata_kuliah: ApiCourse[] }>("/api/mata_kuliah/list/");
}

export async function getAdminCourse(id: number): Promise<ApiCourse> {
  return http<ApiCourse>(`/api/mata_kuliah/${id}/`);
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
  return http("/api/mata_kuliah/create/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateAdminCourse(
  id: number,
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
  return http(`/api/mata_kuliah/${id}/update/`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deleteAdminCourse(id: number) {
  return http(`/api/mata_kuliah/${id}/delete/`, { method: "DELETE" });
}
