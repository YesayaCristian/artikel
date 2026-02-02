const BASE = import.meta.env.VITE_API_BASE_URL as string;

export type Dosen = {
  id: number;
  nama_dosen: string;
  nidn: string;
  fakultas: string;
  program_studi: string;
  penelitian: boolean;
  foto_dosen: string | null;
  created_at?: string | null;
};

export async function fetchPublicDosens(): Promise<Dosen[]> {
  const res = await fetch(`${BASE}/api/dosen/list/`, {
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Gagal load dosen (${res.status}) ${text}`);
  }

  const data = await res.json();
  return data?.dosens ?? [];
}

export async function fetchPublicDosenDetail(id: number): Promise<Dosen> {
  const res = await fetch(`${BASE}/api/dosen/${id}/`, {
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Gagal load detail dosen (${res.status}) ${text}`);
  }

  const data = await res.json();
  return data?.dosen;
}
