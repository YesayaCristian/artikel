const BASE = import.meta.env.VITE_API_BASE_URL as string;

export type Professor = {
  id: number;
  nama_dosen: string;
  nidn: string;
  fakultas: string;
  program_studi: string;
  penelitian: boolean;
  foto_dosen: string | null;
  created_at?: string | null;
};

export async function listPublishedProfessors(): Promise<Professor[]> {
  const res = await fetch(`${BASE}/api/dosen/list/`, {
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`Gagal fetch dosen (${res.status}) ${t}`);
  }

  const json = await res.json().catch(() => ({}));
  return json?.dosens ?? [];
}

export async function getPublishedProfessorById(id: number): Promise<Professor> {
  const res = await fetch(`${BASE}/api/dosen/${id}/`, {
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`Gagal fetch detail dosen (${res.status}) ${t}`);
  }

  const json = await res.json().catch(() => ({}));
  if (!json?.dosen) throw new Error("Dosen tidak ditemukan");
  return json.dosen as Professor;
}
