import { http } from "../lib/http";

export type ApiFaculty = {
  id: number;
  kode_fakultas: string;
  nama_fakultas: string;
  nama_dekan: string;
  gedung: string;
  website: string;
};

export async function fetchFaculties(): Promise<{ fakultas: ApiFaculty[] }> {
  return http<{ fakultas: ApiFaculty[] }>("/api/fakultas/");
}

export async function getAdminFaculty(id: number): Promise<ApiFaculty> {
  const res = await http<{ faculty: ApiFaculty }>(`/api/fakultas/${id}/`);
  return res.faculty;
}

export async function createAdminFaculty(data: {
  kode_fakultas: string;
  nama_fakultas: string;
  nama_dekan: string;
  gedung: string;
  website: string;
}): Promise<any> {
  return http<any>("/api/fakultas/create/", {
    method: "POST",
    body: JSON.stringify(data),

  });
}

export async function updateAdminFaculty(
  id: number,
  data: {
    kode_fakultas: string;
    nama_fakultas: string;
    nama_dekan: string;
    gedung: string;
    website: string;
  }
): Promise<any> {
  return http<any>(`/api/fakultas/${id}/update/`, {
    method: "POST",
    body: JSON.stringify(data),

  });
}

export async function deleteAdminFaculty(id: number) {
  return http(`/api/fakultas/${id}/delete/`, { method: "DELETE" });
}