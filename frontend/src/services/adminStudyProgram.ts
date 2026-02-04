import { http } from "../lib/http";


export type ApiStudyProgram = {
  id: number;
  kode_prodi: string;
  nama_prodi: string;
  jenjang: "D3" | "D4" | "S1";
  akreditasi: "A" | "B" | "C" | "Unggul";
  id_fakultas: number;
  nama_fakultas?: string;
  kaprodi: string;
  created_at: string;
};


export async function fetchStudyPrograms(): Promise<{ study_programs: ApiStudyProgram[] }> {
  return http<{ study_programs: ApiStudyProgram[] }>("/api/study-program/list/");
}


export async function getAdminStudyProgram(id: number): Promise<ApiStudyProgram> {
  return http<ApiStudyProgram>(`/api/study-program/${id}/`);
}


export async function createAdminStudyProgram(data: {
  kode_prodi: string;
  nama_prodi: string;
  jenjang: "D3" | "D4" | "S1";
  akreditasi: "A" | "B" | "C" | "Unggul";
  id_fakultas: number;
  kaprodi: string;
}): Promise<any> {
  return http<any>("/api/study-program/create/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateAdminStudyProgram(
  id: number,
  data: {
    kode_prodi: string;
    nama_prodi: string;
    jenjang: "D3" | "D4" | "S1";
    akreditasi: "A" | "B" | "C" | "Unggul";
    id_fakultas: number;
    kaprodi: string;
  }
): Promise<any> {
  return http<any>(`/api/study-program/${id}/update/`, {
    method: "POST", // ✅ konsisten dengan backend
    body: JSON.stringify(data),
  });
}

export async function deleteAdminStudyProgram(id: number) {
  return http(`/api/study-program/${id}/delete/`, {
    method: "DELETE",
  });
}
