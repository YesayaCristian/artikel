import React, { useState } from "react";
export type ProfessorFormValues = {
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
  fotoUrl?: string;
  fotoFile?: File | null;
};

export type ProfessorFormInitial = ProfessorFormValues & {
  id?: number;
  updatedAt?: string;
};

type Props = {
  initial?: ProfessorFormInitial | null;
  onCancel: () => void;
  onSubmit: (values: ProfessorFormValues) => void;
};

export default function ProfessorForm({ initial, onCancel, onSubmit }: Props) {
  const [form, setForm] = useState<ProfessorFormValues>({
    nama_dosen: initial?.nama_dosen ?? "",
    nidn: initial?.nidn ?? "",
    email: initial?.email ?? "",
    fakultas: initial?.fakultas ?? "",
    program_studi: initial?.program_studi ?? "",
    penelitian: initial?.penelitian ?? "",
    sinta_id: initial?.sinta_id ?? "",
    researcher_id: initial?.researcher_id ?? "",
    scopus_author_id: initial?.scopus_author_id ?? "",
    orchid_id: initial?.orchid_id ?? "",
    webpage: initial?.webpage ?? "",
    pendidikan_s1: initial?.pendidikan_s1 ?? "",
    pendidikan_s2: initial?.pendidikan_s2 ?? "",
    pendidikan_s3: initial?.pendidikan_s3 ?? "",
    pekerjaan: initial?.pekerjaan ?? "",
    research_interest: initial?.research_interest ?? "",
    mata_kuliah_diampu: initial?.mata_kuliah_diampu ?? "",
    publikasi: initial?.publikasi ?? "",
    project: initial?.project ?? "",
    pengabdian_masyarakat: initial?.pengabdian_masyarakat ?? "",
    award: initial?.award ?? "",
    fotoUrl: initial?.fotoUrl ?? "",
    fotoFile: null,
  });

  const field =
    "w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary-300 focus:ring-4 focus:ring-primary-100";
  const label = "block text-sm font-semibold text-slate-700 mb-1";

  function handleChange(key: keyof ProfessorFormValues, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleFile(file?: File | null) {
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    setForm((prev) => ({ ...prev, fotoFile: file }));

    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({ ...prev, fotoUrl: String(reader.result || "") }));
    };
    reader.readAsDataURL(file);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      {/* Header */}
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

      {/* Fields */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Identitas */}
        <div>
          <label className={label}>Nama Dosen</label>
          <input className={field} value={form.nama_dosen} onChange={(e) => handleChange("nama_dosen", e.target.value)} required />
        </div>
        <div>
          <label className={label}>NIDN</label>
          <input className={field} value={form.nidn} onChange={(e) => handleChange("nidn", e.target.value)} required />
        </div>
        <div className="sm:col-span-2">
          <label className={label}>Email</label>
          <input className={field} value={form.email} onChange={(e) => handleChange("email", e.target.value)} />
        </div>

        {/* Fakultas & Prodi */}
        <div>
          <label className={label}>Fakultas</label>
          <input className={field} value={form.fakultas} onChange={(e) => handleChange("fakultas", e.target.value)} />
        </div>
        <div>
          <label className={label}>Program Studi</label>
          <input className={field} value={form.program_studi} onChange={(e) => handleChange("program_studi", e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className={label}>Penelitian</label>
          <input className={field} value={form.penelitian} onChange={(e) => handleChange("penelitian", e.target.value)} />
        </div>

        {/* Akademik ID */}
        <div><label className={label}>Sinta ID</label><input className={field} value={form.sinta_id} onChange={(e) => handleChange("sinta_id", e.target.value)} /></div>
        <div><label className={label}>Researcher ID</label><input className={field} value={form.researcher_id} onChange={(e) => handleChange("researcher_id", e.target.value)} /></div>
        <div><label className={label}>Scopus Author ID</label><input className={field} value={form.scopus_author_id} onChange={(e) => handleChange("scopus_author_id", e.target.value)} /></div>
        <div><label className={label}>Orchid ID</label><input className={field} value={form.orchid_id} onChange={(e) => handleChange("orchid_id", e.target.value)} /></div>
        <div className="sm:col-span-2"><label className={label}>Webpage</label><input className={field} value={form.webpage} onChange={(e) => handleChange("webpage", e.target.value)} /></div>

        {/* Pendidikan */}
        <div><label className={label}>Pendidikan S1</label><input className={field} value={form.pendidikan_s1} onChange={(e) => handleChange("pendidikan_s1", e.target.value)} /></div>
        <div><label className={label}>Pendidikan S2</label><input className={field} value={form.pendidikan_s2} onChange={(e) => handleChange("pendidikan_s2", e.target.value)} /></div>
        <div><label className={label}>Pendidikan S3</label><input className={field} value={form.pendidikan_s3} onChange={(e) => handleChange("pendidikan_s3", e.target.value)} /></div>

        {/* Akademik */}
        <div className="sm:col-span-2"><label className={label}>Pekerjaan</label><input className={field} value={form.pekerjaan} onChange={(e) => handleChange("pekerjaan", e.target.value)} /></div>

        {/* Text area */}
        <div className="sm:col-span-2">
          <label className={label}>Research Interest</label>
          <textarea
            className={field + " h-24"}
            value={form.research_interest}
            onChange={(e) => handleChange("research_interest", e.target.value)}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={label}>Mata Kuliah Diampu</label>
          <textarea
            className={field + " h-24"}
            value={form.mata_kuliah_diampu}
            onChange={(e) => handleChange("mata_kuliah_diampu", e.target.value)}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={label}>Publikasi</label>
          <textarea
            className={field + " h-24"}
            value={form.publikasi}
            onChange={(e) => handleChange("publikasi", e.target.value)}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={label}>Project</label>
          <textarea
            className={field + " h-24"}
            value={form.project}
            onChange={(e) => handleChange("project", e.target.value)}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={label}>Pengabdian Masyarakat</label>
          <textarea
            className={field + " h-24"}
            value={form.pengabdian_masyarakat}
            onChange={(e) => handleChange("pengabdian_masyarakat", e.target.value)}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={label}>Award</label>
          <textarea
            className={field + " h-24"}
            value={form.award}
            onChange={(e) => handleChange("award", e.target.value)}
          />
        </div>

        {/* Foto */}
        <div className="sm:col-span-2">
          <label className={label}>Foto Dosen</label>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
            {form.fotoUrl ? (
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, fotoUrl: "", fotoFile: null }))}
                className="rounded-2xl border bg-white px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                Remove
              </button>
            ) : null}
          </div>

          {form.fotoUrl ? (
            <div className="mt-3 overflow-hidden rounded-3xl border bg-slate-50">
              <div className="aspect-[16/9] w-full">
                <img src={form.fotoUrl} alt="Preview" className="h-full w-full object-cover" />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </form>
  );
}