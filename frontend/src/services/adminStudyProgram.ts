import { http } from "../lib/http";


export type ApiStudyProgram = {
  id: number;
  kode_prodi: string;
  nama_prodi: string;
  jenjang: "D3" | "D4" | "S1";
  akreditasi: "A" | "B" | "C" | "Unggul";
  kaprodi: string;
  fakultas: {
    id: number;
    kode_fakultas: string;
    nama_fakultas: string;
  };
};



export async function fetchStudyPrograms(): Promise<{ program_studi: ApiStudyProgram[] }> {
  return http<{ program_studi: ApiStudyProgram[] }>("/api/program_study/");
}



export async function getAdminStudyProgram(id: number): Promise<ApiStudyProgram> {
  return http<ApiStudyProgram>(`/api/program_study/${id}/`);
}


export async function createAdminStudyProgram(data: {
  kode_prodi: string;
  nama_prodi: string;
  jenjang: "D3" | "D4" | "S1";
  akreditasi: "A" | "B" | "C" | "Unggul";
  id_fakultas: number;
  kaprodi: string;
}): Promise<any> {
  return http<any>("/api/program_study/create/", {
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
  return http<any>(`/api/program_study/update/${id}/`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteAdminStudyProgram(id: number) {
  return http(`/api/program_study/delete/${id}/`, {
    method: "DELETE",
  });
}
