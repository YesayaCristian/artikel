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
  return http<ApiFaculty>(`/api/fakultas/${id}/`);
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
  return http<any>(`/api/fakultas/update/${id}/`, {
    method: "PUT",
    body: JSON.stringify(data),

  });
}

export async function deleteAdminFaculty(id: number) {
  return http(`/api/fakultas/delete/${id}/`, { method: "DELETE" });
}