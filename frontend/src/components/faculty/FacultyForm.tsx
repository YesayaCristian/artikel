import { useState } from "react";

export type FacultyFormValues = {
  kode_fakultas: string;
  nama_fakultas: string;
  nama_dekan: string;
  gedung: string;
  website: string;
};

export type FacultyFormInitial = {
  id?: number;
  kode_fakultas: string;
  nama_fakultas: string;
  nama_dekan: string;
  gedung: string;
  website: string;
};

type Props = {
  initial?: FacultyFormInitial | null;
  onCancel: () => void;
  onSubmit: (values: FacultyFormValues) => void;
};

export default function FacultyForm({ initial, onCancel, onSubmit }: Props) {
  const [kode_fakultas, setKodeFakultas] = useState(initial?.kode_fakultas ?? "");
  const [nama_fakultas, setNamaFakultas] = useState(initial?.nama_fakultas ?? "");
  const [nama_dekan, setNamaDekan] = useState(initial?.nama_dekan ?? "");
  const [gedung, setGedung] = useState(initial?.gedung ?? "");
  const [website, setWebsite] = useState(initial?.website ?? "");

  const field =
    "w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary-300 focus:ring-4 focus:ring-primary-100";
  const label = "block text-sm font-semibold text-slate-700 mb-1";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      kode_fakultas,
      nama_fakultas,
      nama_dekan,
      gedung,
      website,
    });
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-xs text-slate-500">Form</div>
          <h2 className="text-lg font-semibold text-slate-900">
            {initial ? "Edit Faculty" : "Create Faculty"}
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
        <div className="sm:col-span-1">
          <label className={label}>Kode Fakultas</label>
          <input
            className={field}
            value={kode_fakultas}
            onChange={(e) => setKodeFakultas(e.target.value)}
            placeholder="Kode Fakultas..."
            required
          />
        </div>

        <div className="sm:col-span-1">
          <label className={label}>Nama Fakultas</label>
          <input
            className={field}
            value={nama_fakultas}
            onChange={(e) => setNamaFakultas(e.target.value)}
            placeholder="Nama Fakultas..."
            required
          />
        </div>

        <div className="sm:col-span-2">
          <label className={label}>Nama Dekan</label>
          <input
            className={field}
            value={nama_dekan}
            onChange={(e) => setNamaDekan(e.target.value)}
            placeholder="Nama Dekan..."
            required
          />
        </div>

        <div className="sm:col-span-1">
          <label className={label}>Gedung</label>
          <input
            className={field}
            value={gedung}
            onChange={(e) => setGedung(e.target.value)}
            placeholder="Gedung..."
            required
          />
        </div>

        <div className="sm:col-span-1">
          <label className={label}>Website</label>
          <input
            className={field}
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="Website fakultas..."
          />
        </div>
      </div>
    </form>
  );
}