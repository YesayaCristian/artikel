import { useMemo, useState } from "react";

export type ProfessorFormValues = {
  nama_dosen: string;
  nidn: string;
  fakultas: string;
  program_studi: string;
  penelitian: string;
  fotoUrl?: string;       // preview (DataURL atau base URL)
  fotoFile?: File | null; // file baru upload ke API
};

export type ProfessorFormInitial = {
  id?: number;
  nama_dosen: string;
  nidn: string;
  fakultas: string;
  program_studi: string;
  penelitian: string;
  fotoUrl?: string;       // URL lama
  updatedAt?: string;
};

type Props = {
  initial?: ProfessorFormInitial | null;
  onCancel: () => void;
  onSubmit: (values: ProfessorFormValues) => void;
};

export default function ProfessorForm({ initial, onCancel, onSubmit }: Props) {
  const [nama_dosen, setNamaDosen] = useState(initial?.nama_dosen ?? "");
  const [nidn, setNidn] = useState(initial?.nidn ?? "");
  const [fakultas, setFakultas] = useState(initial?.fakultas ?? "");
  const [program_studi, setProgramStudi] = useState(initial?.program_studi ?? "");
  const [penelitian, setPenelitian] = useState(initial?.penelitian ?? "");

  const [fotoUrl, setFotoUrl] = useState(initial?.fotoUrl ?? "");
  const [fotoFile, setFotoFile] = useState<File | null>(null);

  const field =
    "w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary-300 focus:ring-4 focus:ring-primary-100";
  const label = "block text-sm font-semibold text-slate-700 mb-1";

  // handle pilih file baru
  function handleFile(file?: File | null) {
    if (!file) return;
    if (!file.type.startsWith("image/")) return;

    setFotoFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setFotoUrl(String(reader.result || ""));
    };
    reader.readAsDataURL(file);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      nama_dosen,
      nidn,
      fakultas,
      program_studi,
      penelitian,
      fotoUrl: fotoUrl || undefined,
      fotoFile,
    });
  }

  const updatedText = useMemo(() => {
    if (!initial?.updatedAt) return "—";
    return new Date(initial.updatedAt).toLocaleString();
  }, [initial?.updatedAt]);

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-xs text-slate-500">Form</div>
          <h2 className="text-lg font-semibold text-slate-900">
            {initial ? "Edit Professor" : "Create Professor"}
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

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Nama, NIDN, Fakultas, Program Studi */}
        <div className="sm:col-span-2">
          <label className={label}>Nama Dosen</label>
          <input className={field} value={nama_dosen} onChange={(e) => setNamaDosen(e.target.value)} placeholder="Nama lengkap dosen..." required />
        </div>
        <div className="sm:col-span-2">
          <label className={label}>NIDN</label>
          <input className={field} value={nidn} onChange={(e) => setNidn(e.target.value)} placeholder="Nomor Induk Dosen Nasional..." required />
        </div>
        <div className="sm:col-span-1">
          <label className={label}>Fakultas</label>
          <input className={field} value={fakultas} onChange={(e) => setFakultas(e.target.value)} placeholder="Fakultas..." required />
        </div>
        <div className="sm:col-span-1">
          <label className={label}>Program Studi</label>
          <input className={field} value={program_studi} onChange={(e) => setProgramStudi(e.target.value)} placeholder="Program Studi..." required />
        </div>

        {/* Penelitian */}
        <div className="sm:col-span-2">
          <label className={label}>Penelitian</label>
          <textarea className={field + " h-40"} value={penelitian} onChange={(e) => setPenelitian(e.target.value)} placeholder="Judul atau deskripsi penelitian..." />
        </div>

        {/* Foto */}
        <div className="sm:col-span-2">
          <label className={label}>Foto Dosen</label>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <input type="file" accept="image/*" className="block w-full text-sm" onChange={(e) => handleFile(e.target.files?.[0])} />
            {fotoUrl ? (
              <button
                type="button"
                onClick={() => {
                  setFotoUrl("");
                  setFotoFile(null);
                }}
                className="rounded-2xl border bg-white px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                Remove
              </button>
            ) : null}
          </div>

          {fotoUrl ? (
            <div className="mt-3 overflow-hidden rounded-3xl border bg-slate-50">
              <div className="aspect-[16/9] w-full">
                <img src={fotoUrl} alt="Preview" className="h-full w-full object-cover" />
              </div>
            </div>
          ) : null}
        </div>

        {/* Updated */}
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
