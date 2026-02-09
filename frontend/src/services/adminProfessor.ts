import { http } from "../lib/http";

export type ApiProfessor = {
  id: number;
  nama_dosen: string;
  nidn: string;
  email?: string;

  fakultas: string;
  program_studi: string;
  penelitian: string;

  foto_url?: string;
  foto_dosen?: string;

  // ID akademik
  sinta_id?: string;
  researcher_id?: string;
  scopus_author_id?: string;
  orchid_id?: string;
  webpage?: string;

  // pendidikan
  pendidikan_s1?: string;
  pendidikan_s2?: string;
  pendidikan_s3?: string;

  // akademik
  pekerjaan?: string;

  // text area
  research_interest?: string;
  mata_kuliah_diampu?: string;
  publikasi?: string;
  project?: string;
  pengabdian_masyarakat?: string;
  award?: string;

  created_at: string;
};

export async function fetchProfessors(): Promise<{ dosens: ApiProfessor[] }> {
  return http<{ dosens: ApiProfessor[] }>("/api/dosen/list/");
}

export async function getAdminProfessor(id: number): Promise<ApiProfessor> {
  return http<ApiProfessor>(`/api/dosen/${id}/`);
}


export async function createAdminProfessor(data: {
  nama_dosen: string;
  nidn: string;
  email?: string;
  fakultas: string;
  program_studi: string;
  penelitian: string;

  sinta_id?: string;
  researcher_id?: string;
  scopus_author_id?: string;
  orchid_id?: string;
  webpage?: string;

  pendidikan_s1?: string;
  pendidikan_s2?: string;
  pendidikan_s3?: string;

  pekerjaan?: string;

  research_interest?: string;
  mata_kuliah_diampu?: string;
  publikasi?: string;
  project?: string;
  pengabdian_masyarakat?: string;
  award?: string;

  foto?: File[];
}): Promise<any> {
  const formData = new FormData();
  formData.append("nama_dosen", data.nama_dosen);
  formData.append("nidn", data.nidn);
  if (data.email) formData.append("email", data.email);
  formData.append("fakultas", data.fakultas);
  formData.append("program_studi", data.program_studi);
  formData.append("penelitian", data.penelitian);

  if (data.sinta_id) formData.append("sinta_id", data.sinta_id);
  if (data.researcher_id) formData.append("researcher_id", data.researcher_id);
  if (data.scopus_author_id) formData.append("scopus_author_id", data.scopus_author_id);
  if (data.orchid_id) formData.append("orchid_id", data.orchid_id);
  if (data.webpage) formData.append("webpage", data.webpage);

  if (data.pendidikan_s1) formData.append("pendidikan_s1", data.pendidikan_s1);
  if (data.pendidikan_s2) formData.append("pendidikan_s2", data.pendidikan_s2);
  if (data.pendidikan_s3) formData.append("pendidikan_s3", data.pendidikan_s3);

  if (data.pekerjaan) formData.append("pekerjaan", data.pekerjaan);

  if (data.research_interest) formData.append("research_interest", data.research_interest);
  if (data.mata_kuliah_diampu) formData.append("mata_kuliah_diampu", data.mata_kuliah_diampu);
  if (data.publikasi) formData.append("publikasi", data.publikasi);
  if (data.project) formData.append("project", data.project);
  if (data.pengabdian_masyarakat) formData.append("pengabdian_masyarakat", data.pengabdian_masyarakat);
  if (data.award) formData.append("award", data.award);

  if (data.foto) {
    data.foto.forEach((f) => formData.append("foto_dosen", f));
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
  email?: string;
  fakultas: string;
  program_studi: string;
  penelitian: string;

  sinta_id?: string;
  researcher_id?: string;
  scopus_author_id?: string;
  orchid_id?: string;
  webpage?: string;

  pendidikan_s1?: string;
  pendidikan_s2?: string;
  pendidikan_s3?: string;

  pekerjaan?: string;

  research_interest?: string;
  mata_kuliah_diampu?: string;
  publikasi?: string;
  project?: string;
  pengabdian_masyarakat?: string;
  award?: string;

  foto?: File[];
}): Promise<any> {
  const formData = new FormData();
  formData.append("nama_dosen", data.nama_dosen);
  formData.append("nidn", data.nidn);
  if (data.email) formData.append("email", data.email);
  formData.append("fakultas", data.fakultas);
  formData.append("program_studi", data.program_studi);
  formData.append("penelitian", data.penelitian);

  if (data.sinta_id) formData.append("sinta_id", data.sinta_id);
  if (data.researcher_id) formData.append("researcher_id", data.researcher_id);
  if (data.scopus_author_id) formData.append("scopus_author_id", data.scopus_author_id);
  if (data.orchid_id) formData.append("orchid_id", data.orchid_id);
  if (data.webpage) formData.append("webpage", data.webpage);

  if (data.pendidikan_s1) formData.append("pendidikan_s1", data.pendidikan_s1);
  if (data.pendidikan_s2) formData.append("pendidikan_s2", data.pendidikan_s2);
  if (data.pendidikan_s3) formData.append("pendidikan_s3", data.pendidikan_s3);

  if (data.pekerjaan) formData.append("pekerjaan", data.pekerjaan);

  if (data.research_interest) formData.append("research_interest", data.research_interest);
  if (data.mata_kuliah_diampu) formData.append("mata_kuliah_diampu", data.mata_kuliah_diampu);
  if (data.publikasi) formData.append("publikasi", data.publikasi);
  if (data.project) formData.append("project", data.project);
  if (data.pengabdian_masyarakat) formData.append("pengabdian_masyarakat", data.pengabdian_masyarakat);
  if (data.award) formData.append("award", data.award);

  if (data.foto) {
    data.foto.forEach((f) => formData.append("foto_dosen", f));
  }

  return http<any>(`/api/dosen/update/${id}/`, {
    method: "POST", // ✅ backend pakai POST
    body: formData,
  });
}

export async function deleteAdminProfessor(id: number) {
  return http(`/api/dosen/delete/${id}/`, { method: "DELETE" });
}
