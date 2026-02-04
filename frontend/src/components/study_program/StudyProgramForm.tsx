import { useEffect, useMemo, useState } from "react";
import { fetchFaculties } from "../../services/adminFaculty";

export type Fakultas = {
  id: number;
  nama_fakultas: string;
};

export type StudyProgramFormValues = {
  kode_prodi: string;
  nama_prodi: string;
  jenjang: "D3" | "D4" | "S1";
  akreditasi: "A" | "B" | "C" | "Unggul";
  id_fakultas: number;
  kaprodi: string;
};

export type StudyProgramFormInitial = {
  id?: number;
  kode_prodi: string;
  nama_prodi: string;
  jenjang: "D3" | "D4" | "S1";
  akreditasi: "A" | "B" | "C" | "Unggul";
  id_fakultas: number;
  kaprodi: string;
  updatedAt?: string;
};

type Props = {
  initial?: StudyProgramFormInitial | null;
  onCancel: () => void;
  onSubmit: (values: StudyProgramFormValues) => void;
};

export default function StudyProgramForm({
  initial,
  onCancel,
  onSubmit,
}: Props) {
  const [kode_prodi, setKodeProdi] = useState(initial?.kode_prodi ?? "");
  const [nama_prodi, setNamaProdi] = useState(initial?.nama_prodi ?? "");
  const [jenjang, setJenjang] = useState<"D3" | "D4" | "S1">(
    initial?.jenjang ?? "S1"
  );
  const [akreditasi, setAkreditasi] =
    useState<"A" | "B" | "C" | "Unggul">(initial?.akreditasi ?? "B");
  const [id_fakultas, setIdFakultas] = useState<number>(
    initial?.id_fakultas ?? 0
  );
  const [kaprodi, setKaprodi] = useState(initial?.kaprodi ?? "");

  const [fakultas, setFakultas] = useState<Fakultas[]>([]);
  const [loadingFakultas, setLoadingFakultas] = useState(true);

  const field =
    "w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary-300 focus:ring-4 focus:ring-primary-100";
  const label = "block text-sm font-semibold text-slate-700 mb-1";

  // ✅ FETCH FAKULTAS (FIX)
  useEffect(() => {
    (async () => {
      try {
        const res = await fetchFaculties();
        setFakultas(res.fakultas ?? []);
      } catch (e) {
        console.error("Gagal load fakultas", e);
        setFakultas([]);
      } finally {
        setLoadingFakultas(false);
      }
    })();
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      kode_prodi,
      nama_prodi,
      jenjang,
      akreditasi,
      id_fakultas,
      kaprodi,
    });
  }

  const updatedText = useMemo(() => {
    if (!initial?.updatedAt) return "—";
    return new Date(initial.updatedAt).toLocaleString();
  }, [initial?.updatedAt]);

  return (
    <form onSubmit={submit} className="space-y-5">
      {/* HEADER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-xs text-slate-500">Form</div>
          <h2 className="text-lg font-semibold text-slate-900">
            {initial ? "Edit Program Studi" : "Create Program Studi"}
          </h2>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-2xl border bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-2xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-primary-700"
          >
            Save
          </button>
        </div>
      </div>

      {/* FORM */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label}>Kode Prodi</label>
          <input
            className={field}
            value={kode_prodi}
            onChange={(e) => setKodeProdi(e.target.value)}
            required
          />
        </div>

        <div>
          <label className={label}>Nama Prodi</label>
          <input
            className={field}
            value={nama_prodi}
            onChange={(e) => setNamaProdi(e.target.value)}
            required
          />
        </div>

        <div>
          <label className={label}>Jenjang</label>
          <select
            className={field}
            value={jenjang}
            onChange={(e) => setJenjang(e.target.value as any)}
          >
            <option value="D3">D3</option>
            <option value="D4">D4</option>
            <option value="S1">S1</option>
          </select>
        </div>

        <div>
          <label className={label}>Akreditasi</label>
          <select
            className={field}
            value={akreditasi}
            onChange={(e) => setAkreditasi(e.target.value as any)}
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="Unggul">Unggul</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className={label}>Fakultas</label>
          <select
            className={field}
            value={id_fakultas}
            onChange={(e) => setIdFakultas(Number(e.target.value))}
            required
          >
            <option value={0} disabled>
              {loadingFakultas ? "Loading fakultas..." : "— Pilih Fakultas —"}
            </option>
            {fakultas.map((f) => (
              <option key={f.id} value={f.id}>
                {f.nama_fakultas}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className={label}>Kaprodi</label>
          <input
            className={field}
            value={kaprodi}
            onChange={(e) => setKaprodi(e.target.value)}
          />
        </div>

        <div className="sm:col-span-1">
          <label className={label}>Updated</label>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700">
            {initial ? updatedText : "—"}
          </div>
        </div>
      </div>
    </form>
  );
}
