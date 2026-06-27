'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';

interface Application { id:string; name:string; email:string; phone:string; cvUrl:string; status:string; createdAt:string; }
interface Job { id:string; titleAr:string; titleEn:string; locationAr:string; locationEn:string; type:string; descriptionAr:string; descriptionEn:string; status:string; _count:{applications:number}; }

const EMPTY = { titleAr:'', titleEn:'', locationAr:'الرياض', locationEn:'Riyadh', type:'full-time', descriptionAr:'', descriptionEn:'', status:'open' };

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [form, setForm] = useState<typeof EMPTY & { id?:string }>(EMPTY);
  const [open, setOpen] = useState(false);
  const [apps, setApps] = useState<{ jobId:string; list:Application[] } | null>(null);
  const router = useRouter();

  async function load() {
    const r = await fetch('/api/jobs?all=1');
    if (r.status === 401) { router.push('/admin/login'); return; }
    setJobs(await r.json());
  }
  useEffect(() => { load(); }, []);

  function openNew() { setForm(EMPTY); setOpen(true); }
  function openEdit(j:Job) { setForm({ id:j.id, titleAr:j.titleAr, titleEn:j.titleEn, locationAr:j.locationAr, locationEn:j.locationEn, type:j.type, descriptionAr:j.descriptionAr, descriptionEn:j.descriptionEn, status:j.status }); setOpen(true); }

  async function save() {
    const method = form.id ? 'PUT' : 'POST';
    const url = form.id ? `/api/jobs/${form.id}` : '/api/jobs';
    await fetch(url, { method, headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) });
    setOpen(false); load();
  }

  async function del(id:string) {
    if (!confirm('Delete this job?')) return;
    await fetch(`/api/jobs/${id}`, { method:'DELETE' });
    load();
  }

  async function viewApps(jobId:string) {
    const r = await fetch(`/api/jobs/${jobId}/applications`);
    setApps({ jobId, list: await r.json() });
  }

  const F = (key:keyof typeof EMPTY, label:string, rows=1) => (
    <div key={key}>
      <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
      {rows > 1
        ? <textarea rows={rows} value={(form as any)[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
        : <input value={(form as any)[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
      }
    </div>
  );

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Jobs</h1>
        <button onClick={openNew} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">+ New Job</button>
      </div>

      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              {['Title','Location','Type','Status','Applications','Actions'].map(h=>(
                <th key={h} className="px-4 py-3 text-left font-semibold text-gray-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {jobs.map(j=>(
              <tr key={j.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{j.titleAr}</td>
                <td className="px-4 py-3 text-gray-500">{j.locationAr}</td>
                <td className="px-4 py-3 text-gray-500">{j.type}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${j.status==='open'?'bg-green-100 text-green-700':'bg-gray-100 text-gray-600'}`}>{j.status}</span>
                </td>
                <td className="px-4 py-3">
                  <button onClick={()=>viewApps(j.id)} className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 text-sm font-medium">
                    <span className="bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 text-xs font-bold">{j._count?.applications ?? 0}</span>
                    View
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={()=>openEdit(j)} className="text-xs text-blue-600 hover:underline">Edit</button>
                    <button onClick={()=>del(j.id)} className="text-xs text-red-500 hover:underline">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-xl font-bold mb-4">{form.id ? 'Edit Job' : 'New Job'}</h2>
            <div className="grid grid-cols-2 gap-4">
              {F('titleAr','Title (Arabic)')}
              {F('titleEn','Title (English)')}
              {F('locationAr','Location (Arabic)')}
              {F('locationEn','Location (English)')}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Type</label>
                <select value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm">
                  <option value="full-time">Full-Time</option>
                  <option value="part-time">Part-Time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Status</label>
                <select value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))} className="w-full border rounded-lg px-3 py-2 text-sm">
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
            <div className="mt-4 space-y-4">
              {F('descriptionAr','Description (Arabic)', 4)}
              {F('descriptionEn','Description (English)', 4)}
            </div>
            <div className="flex gap-3 mt-6 justify-end">
              <button onClick={()=>setOpen(false)} className="px-4 py-2 border rounded-lg text-sm">Cancel</button>
              <button onClick={save} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Applications modal */}
      {apps && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Applications ({apps.list.length})</h2>
              <button onClick={()=>setApps(null)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
            </div>
            {apps.list.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No applications yet.</p>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>{['Name','Email','Phone','CV','Status','Date'].map(h=><th key={h} className="px-3 py-2 text-left text-xs font-semibold text-gray-600">{h}</th>)}</tr>
                </thead>
                <tbody className="divide-y">
                  {apps.list.map(a=>(
                    <tr key={a.id} className="hover:bg-gray-50">
                      <td className="px-3 py-2 font-medium">{a.name}</td>
                      <td className="px-3 py-2 text-gray-500">{a.email}</td>
                      <td className="px-3 py-2 text-gray-500">{a.phone}</td>
                      <td className="px-3 py-2">{a.cvUrl ? <a href={a.cvUrl} target="_blank" className="text-blue-600 hover:underline text-xs">Download</a> : '-'}</td>
                      <td className="px-3 py-2"><span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">{a.status}</span></td>
                      <td className="px-3 py-2 text-gray-400 text-xs">{new Date(a.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </AdminShell>
  );
}
