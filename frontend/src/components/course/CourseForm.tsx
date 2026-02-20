import { useState,type FormEvent } from "react"
import WordEditor from "../../components/WordEditor"

export default function CourseForm({onCancel,onSubmit}:{onCancel:()=>void;onSubmit:(data:any)=>void}) {
  const [program,setProgram]=useState("")
  const [opsiKeilmuan,setOpsiKeilmuan]=useState("")
  const [spesialisasi,setSpesialisasi]=useState("")
  const [kodeMK,setKodeMK]=useState("")
  const [namaMK,setNamaMK]=useState("")
  const [sks,setSks]=useState(3)
  const [deskripsi,setDeskripsi]=useState("")
  const [cpps,setCpps]=useState("")
  const [cpmk,setCpmk]=useState("")
  const [rps,setRps]=useState("")
  const [etika,setEtika]=useState("")
  const [methods,setMethods]=useState([{metode:"",implementasi:"",cpmk:"",cpl:""}])
  const [assessments,setAssessments]=useState([{komponen:"",rubrik:"",bobot:0,cpl:""}])

  const field="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
  const label="block text-sm font-semibold text-slate-700 mb-1"

  function addMethod(){setMethods([...methods,{metode:"",implementasi:"",cpmk:"",cpl:""}])}
  function removeMethod(i:number){setMethods(methods.filter((_,idx)=>idx!==i))}
  function addAssessment(){
    if(assessments.length >= 10) return
    setAssessments([...assessments,{komponen:"",rubrik:"",bobot:0,cpl:""}])
  }
  function removeAssessment(i:number){setAssessments(assessments.filter((_,idx)=>idx!==i))}

  function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault()
    const totalBobot=assessments.reduce((sum,a)=>sum+Number(a.bobot),0)
    if(totalBobot>100){alert("Total bobot asesmen tidak boleh melebihi 100%");return}
    onSubmit({informasi_dasar:{program,opsiKeilmuan,spesialisasi,kodeMK,namaMK,sks},deskripsi,capaian_pembelajaran:{cpps,cpmk,rps,etika},learning_methods:methods,assessments})
  }

  return(
    <div className="space-y-10 bg-transparent shadow-none rounded-none">
      <h2 className="text-xl font-bold">Create Mata Kuliah</h2>
      <form onSubmit={submit} className="space-y-10">
        <section className="bg-white rounded-xl shadow-xl p-6 space-y-4">
          <h3 className="text-md font-semibold border-b pb-2">Informasi Dasar Mata Kuliah</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className={label}>Program</label><select className={field} value={program} onChange={e=>setProgram(e.target.value)}><option value="">— Pilih Program —</option><option value="S2">S2 Magister</option><option value="S3">S3 Doktoral</option></select></div>
            {program==="S2"&&<div><label className={label}>Opsi Keilmuan</label><select className={field} value={opsiKeilmuan} onChange={e=>setOpsiKeilmuan(e.target.value)}><option value="">— Pilih Opsi —</option><option value="sains_atmosfer">Sains Atmosfer</option><option value="oseanografi">Oseanografi</option><option value="bencana">Interaksi Sistem Bumi</option></select></div>}
            {program==="S3"&&<div><label className={label}>Opsi Keilmuan</label><select className={field} value={opsiKeilmuan} onChange={e=>setOpsiKeilmuan(e.target.value)}><option value="sains_kebumian">Sains Kebumian</option></select></div>}
            {program==="S2"&&<div><label className={label}>Spesialisasi</label><select className={field} value={spesialisasi} onChange={e=>setSpesialisasi(e.target.value)}><option value="">— Pilih Spesialisasi —</option><option value="iklim">Perubahan Iklim & Transisi Energi</option><option value="bencana">Mitigasi Bencana Kebumian</option></select></div>}
            <div><label className={label}>Kode MK</label><input className={field} value={kodeMK} maxLength={20} onChange={e=>setKodeMK(e.target.value)}/><p className="text-xs text-gray-400 text-right">Maksimal 20 karakter</p></div>
            <div><label className={label}>Nama MK</label><input className={field} value={namaMK} maxLength={100} onChange={e=>setNamaMK(e.target.value)}/><p className="text-xs text-gray-400 text-right">Maksimal 100 karakter</p></div>
            <div><label className={label}>SKS</label><input type="number" className={field} value={sks} onChange={e=>setSks(Number(e.target.value))}/></div>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-xl p-6 space-y-4">
          <h3 className="text-md font-semibold border-b pb-2">Deskripsi Singkat</h3>
          <WordEditor label="Deskripsi" value={deskripsi} onChange={setDeskripsi}/>
          <p className="text-xs text-gray-400 text-right">Maksimal 200 karakter</p>
        </section>
        <section className="bg-white rounded-xl shadow-xl p-6 space-y-4">
          <h3 className="text-md font-semibold border-b pb-2">Capaian Pembelajaran</h3>
          <WordEditor label="CPPS" value={cpps} onChange={setCpps}/><p className="text-xs text-gray-400 text-right">Maksimal 500 karakter</p>
          <WordEditor label="CPMK" value={cpmk} onChange={setCpmk}/><p className="text-xs text-gray-400 text-right">Maksimal 500 karakter</p>
          <WordEditor label="Rencana Pembelajaran Mingguan" value={rps} onChange={setRps}/><p className="text-xs text-gray-400 text-right">Maksimal 500 karakter</p>
          <WordEditor label="Etika Akademik" value={etika} onChange={setEtika}/><p className="text-xs text-gray-400 text-right">Maksimal 200 karakter</p>
        </section>

        <section className="bg-white rounded-xl shadow p-6 space-y-4">
          <h3 className="text-md font-semibold border-b pb-2">Pemetaan Metode Pembelajaran</h3>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100 text-left">
                <th className="p-2">Metode</th>
                <th className="p-2">Implementasi</th>
                <th className="p-2">CPMK</th>
                <th className="p-2">CPL</th>
                <th className="p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {methods.map((m,i)=>(
                <tr key={i} className="border-t">
                  <td className="p-2"><input className={field} value={m.metode} onChange={e=>{const arr=[...methods];arr[i].metode=e.target.value;setMethods(arr)}}/></td>
                  <td className="p-2"><input className={field} value={m.implementasi} maxLength={200} onChange={e=>{const arr=[...methods];arr[i].implementasi=e.target.value;setMethods(arr)}}/></td>
                  <td className="p-2"><input className={field} value={m.cpmk} onChange={e=>{const arr=[...methods];arr[i].cpmk=e.target.value;setMethods(arr)}}/></td>
                  <td className="p-2"><input className={field} value={m.cpl} onChange={e=>{const arr=[...methods];arr[i].cpl=e.target.value;setMethods(arr)}}/></td>
                  <td className="p-2"><button type="button" onClick={()=>removeMethod(i)} className="text-red-600">Hapus</button></td>
                </tr>
              ))}
              
            </tbody>
              <p className="text-xs text-gray-400">Implementasi maksimal 200 karakter</p>
          </table>
          <button type="button" onClick={addMethod} disabled={methods.length >= 10} className={`px-3 py-1 rounded ${methods.length >= 10 ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}>+ Tambah Metode</button>
          {methods.length >= 10 && (
            <span className="text-sm text-red-600">
              Maksimal 10 metode sudah tercapai
            </span>
          )}
        </section>

       <section className="bg-white rounded-xl shadow p-6 space-y-4">
          <h3 className="text-md font-semibold border-b pb-2">Strategi & Instrumen Asesmen</h3>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100 text-left">
                <th className="p-2">Komponen</th>
                <th className="p-2">Rubrik</th>
                <th className="p-2">Bobot %</th>
                <th className="p-2">CPL</th>
                <th className="p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {assessments.map((a,i)=>(
                <tr key={i} className="border-t">
                  <td className="p-2"><input className={field} value={a.komponen} onChange={e=>{const arr=[...assessments];arr[i].komponen=e.target.value;setAssessments(arr)}}/></td>
                  <td className="p-2"><input className={field} value={a.rubrik} onChange={e=>{const arr=[...assessments];arr[i].rubrik=e.target.value;setAssessments(arr)}}/></td>
                  <td className="p-2"><input type="number" className={field} value={a.bobot} onChange={e=>{const arr=[...assessments];arr[i].bobot=Number(e.target.value);setAssessments(arr)}}/></td>
                  <td className="p-2"><input className={field} value={a.cpl} onChange={e=>{const arr=[...assessments];arr[i].cpl=e.target.value;setAssessments(arr)}}/></td>
                  <td className="p-2"><button type="button" onClick={()=>removeAssessment(i)} className="text-red-600">Hapus</button></td>
                </tr>
              ))}
            </tbody>
            <p className="text-xs text-gray-400">Total Bobot ≤ 100%</p>
          </table>
          <button type="button" onClick={addAssessment} disabled={assessments.length >= 100} className={`px-3 py-1 rounded ${assessments.length >= 10 ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}>+ Tambah Asesmen</button>
            {assessments.length >= 10 && (
              <span className="text-sm text-red-600">
                Maksimal 10 asesmen sudah tercapai
              </span>
            )}
        </section>

        <div className="flex gap-2">
          <button type="button" onClick={onCancel} className="border px-4 py-2 rounded-xl">Cancel</button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-xl">Save</button>
        </div>
      </form>
    </div>
  )
}