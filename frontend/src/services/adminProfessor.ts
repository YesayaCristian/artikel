import { http } from "../lib/http";

export type ApiProfessor = {
  foto_url: string;
  id: number;
  nama_dosen: string;
  nidn: string;
  fakultas: string;
  program_studi: string;
  penelitian: string;
  foto_dosen?: string;  
  created_at: string;
};

export async function fetchProfessors(): Promise<{ dosens: ApiProfessor[] }> {
  return http<{ dosens: ApiProfessor[] }>("/api/dosen/list/");
}

// ✅ Ambil detail dosen by ID
export async function getAdminProfessor(id: number): Promise<ApiProfessor> {
  const res = await http<{ dosen: ApiProfessor }>(`/api/dosen/${id}/`);
  return res.dosen;
}


// ✅ Create dosen baru
export async function createAdminProfessor(data: {
  nama_dosen: string;
  nidn: string;
  fakultas: string;
  program_studi: string;
  penelitian: string;
  foto?: File[];
}): Promise<any> {
  const formData = new FormData();
  formData.append("nama_dosen", data.nama_dosen);
  formData.append("nidn", data.nidn);
  formData.append("fakultas", data.fakultas);
  formData.append("program_studi", data.program_studi);
  formData.append("penelitian", data.penelitian);

  if (data.foto) {
    data.foto.forEach((f) => formData.append("foto_dosen", f)); // ✅ konsisten dengan backend
  }

  return http<any>("/api/dosen/create/", {
    method: "POST",
    body: formData,
  });
}

// ✅ Update dosen
export async function updateAdminProfessor(
  id: number,
  data: {
    nama_dosen: string;
    nidn: string;
    fakultas: string;
    program_studi: string;
    penelitian: string;
    foto?: File[];
  }
): Promise<any> {
  const formData = new FormData();
  formData.append("nama_dosen", data.nama_dosen);
  formData.append("nidn", data.nidn);
  formData.append("fakultas", data.fakultas);
  formData.append("program_studi", data.program_studi);
  formData.append("penelitian", data.penelitian);

  if (data.foto) {
    data.foto.forEach((f) => formData.append("foto_dosen", f)); // ✅ konsisten dengan backend
  }

  return http<any>(`/api/dosen/${id}/update/`, {
    method: "POST", // ✅ backend pakai POST
    body: formData,
  });
}

export async function deleteAdminProfessor(id: number) {
  return http(`/api/dosen/${id}/delete/`, { method: "DELETE" });
}
