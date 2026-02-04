import { useEffect, useMemo, useState } from "react";
import { fetchStudyPrograms } from "../../services/adminStudyProgram";

export type Prodi = {
  id: number;
  nama_prodi: string;
};

export type CourseFormValues = {
  kode_mk: string;
  nama_mk: string;
  sks: number;
  semester: number;
  jenis_mk: "wajib" | "pilihan" | "praktikum";
  id_prodi: number;
  deskripsi: string;
};

export type CourseFormInitial = {
  id?: number;
  kode_mk: string;
  nama_mk: string;
  sks: number;
  semester: number;
  jenis_mk: "wajib" | "pilihan" | "praktikum";
  id_prodi: number;
  deskripsi: string;
  updatedAt?: string;
};

type Props = {
  initial?: CourseFormInitial | null;
  onCancel: () => void;
  onSubmit: (values: CourseFormValues) => void;
};

export default function CourseForm({ initial, onCancel, onSubmit }: Props) {
  const [kode_mk, setKodeMk] = useState(initial?.kode_mk ?? "");
  const [nama_mk, setNamaMk] = useState(initial?.nama_mk ?? "");
  const [sks, setSks] = useState<number>(initial?.sks ?? 3);
  const [semester, setSemester] = useState<number>(initial?.semester ?? 1);
  const [jenis_mk, setJenisMk] =
    useState<"wajib" | "pilihan" | "praktikum">(initial?.jenis_mk ?? "wajib");
  const [id_prodi, setIdProdi] = useState<number>(initial?.id_prodi ?? 0);
  const [deskripsi, setDeskripsi] = useState(initial?.deskripsi ?? "");

  const [prodi, setProdi] = useState<Prodi[]>([]);

  const field =
    "w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm focus:ring-4 focus:ring-primary-100";
  const label = "block text-sm font-semibold text-slate-700 mb-1";

  useEffect(() => {
    (async () => {
      const res = await fetchStudyPrograms();
      setProdi(res.study_programs ?? []);
    })();
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      kode_mk,
      nama_mk,
      sks,
      semester,
      jenis_mk,
      id_prodi,
      deskripsi,
    });
  }

  const updatedText = useMemo(() => {
    if (!initial?.updatedAt) return "—";
    return new Date(initial.updatedAt).toLocaleString();
  }, [initial?.updatedAt]);

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold">
          {initial ? "Edit Mata Kuliah" : "Create Mata Kuliah"}
        </h2>
        <div className="flex gap-2">
          <button type="button" onClick={onCancel} className="border px-4 py-2 rounded-xl">
            Cancel
          </button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-xl">
            Save
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label}>Kode MK</label>
          <input className={field} value={kode_mk} onChange={(e) => setKodeMk(e.target.value)} />
        </div>

        <div>
          <label className={label}>Nama MK</label>
          <input className={field} value={nama_mk} onChange={(e) => setNamaMk(e.target.value)} />
        </div>

        <div>
          <label className={label}>SKS</label>
          <input
            type="number"
            min={1}
            max={6}
            className={field}
            value={sks}
            onChange={(e) => setSks(Number(e.target.value))}
          />
        </div>

        <div>
          <label className={label}>Semester</label>
          <input
            type="number"
            className={field}
            value={semester}
            onChange={(e) => setSemester(Number(e.target.value))}
          />
        </div>

        <div>
          <label className={label}>Jenis MK</label>
          <select className={field} value={jenis_mk} onChange={(e) => setJenisMk(e.target.value as any)}>
            <option value="wajib">Wajib</option>
            <option value="pilihan">Pilihan</option>
            <option value="praktikum">Praktikum</option>
          </select>
        </div>

        <div>
          <label className={label}>Program Studi</label>
          <select className={field} value={id_prodi} onChange={(e) => setIdProdi(Number(e.target.value))}>
            <option value={0}>— Pilih Prodi —</option>
            {prodi.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nama_prodi}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className={label}>Deskripsi</label>
          <textarea className={field + " h-32"} value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} />
        </div>

        <div>
          <label className={label}>Updated</label>
          <div className="bg-slate-50 border rounded-xl px-3 py-2 text-sm">
            {initial ? updatedText : "—"}
          </div>
        </div>
      </div>
    </form>
  );
}
