'use client';
import { useState, useEffect } from 'react';
import AdminShell from '@/components/admin/AdminShell';

interface T { id: string; nameAr: string; nameEn: string; roleAr: string; roleEn: string; companyAr: string; companyEn: string; contentAr: string; contentEn: string; avatarUrl: string; rating: number; order: number; status: string; }
const EMPTY = { nameAr:'', nameEn:'', roleAr:'', roleEn:'', companyAr:'', companyEn:'', contentAr:'', contentEn:'', avatarUrl:'', rating:5, order:0, status:'published' };

export default function TestimonialsAdmin() {
  const [items, setItems] = useState<T[]>([]);
  const [form, setForm] = useState<any>(EMPTY);
  const [editId, setEditId] = useState<string|null>(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const load = () => fetch('/api/testimonials').then(r=>r.json()).then(setItems);
  useEffect(()=>{load();},[]);
  const save = async()=>{ setLoading(true); const url=editId?`/api/testimonials/${editId}`:'/api/testimonials'; const method=editId?'PUT':'POST'; await fetch(url,{method,headers:{'Content-Type':'application/json'},body:JSON.stringify(form)}); setForm(EMPTY);setEditId(null);setShow(false);await load();setLoading(false);};
  const del = async(id:string)=>{ if(!confirm('حذف؟'))return; await fetch(`/api/testimonials/${id}`,{method:'DELETE'}); await load();};
  const edit=(t:T)=>{const{id,...rest}=t;setForm(rest);setEditId(id);setShow(true);};
  const F=(key:string,label:string,type='text',rows=0)=>(<div><label className="block text-xs text-gray-500 mb-1">{label}</label>{rows>0?<textarea value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} rows={rows} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />:<input type={type} value={form[key]} onChange={e=>setForm({...form,[key]:type==='number'?Number(e.target.value):e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />}</div>);
  return(<AdminShell><div className="space-y-6"><div className="flex items-center justify-between"><h1 className="text-2xl font-bold">آراء العملاء</h1><button onClick={()=>{setForm(EMPTY);setEditId(null);setShow(true);}} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">+ إضافة</button></div>
  {show&&<div className="bg-white rounded-2xl border p-6 shadow-sm"><h2 className="font-bold mb-4">{editId?'تعديل':'إضافة'} رأي</h2><div className="grid grid-cols-2 gap-4">{F('nameAr','الاسم (ع)')}{F('nameEn','Name (EN)')}{F('roleAr','المنصب (ع)')}{F('roleEn','Role (EN)')}{F('companyAr','الشركة (ع)')}{F('companyEn','Company (EN)')}{F('avatarUrl','رابط الصورة')}{F('rating','التقييم','number')}{F('order','الترتيب','number')}</div><div className="grid grid-cols-1 gap-4 mt-4">{F('contentAr','الرأي (عربي)','text',3)}{F('contentEn','Content (EN)','text',3)}</div><div className="flex gap-3 mt-4"><button onClick={save} disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">{loading?'جاري...':'حفظ'}</button><button onClick={()=>setShow(false)} className="px-6 py-2 border rounded-lg text-sm">إلغاء</button></div></div>}
  <div className="bg-white rounded-2xl border overflow-hidden"><table className="w-full text-sm"><thead className="bg-gray-50 border-b"><tr><th className="px-4 py-3 text-right">الاسم</th><th className="px-4 py-3 text-right">الشركة</th><th className="px-4 py-3 text-right">التقييم</th><th className="px-4 py-3 text-right">الحالة</th><th className="px-4 py-3 text-right">إجراء</th></tr></thead><tbody className="divide-y">{items.map(t=><tr key={t.id} className="hover:bg-gray-50"><td className="px-4 py-3 font-medium">{t.nameAr}</td><td className="px-4 py-3 text-gray-500">{t.companyAr}</td><td className="px-4 py-3">{'★'.repeat(t.rating)}</td><td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs ${t.status==='published'?'bg-green-100 text-green-700':'bg-gray-100 text-gray-500'}`}>{t.status}</span></td><td className="px-4 py-3"><div className="flex gap-2"><button onClick={()=>edit(t)} className="text-blue-600 text-xs hover:underline">تعديل</button><button onClick={()=>del(t.id)} className="text-red-500 text-xs hover:underline">حذف</button></div></td></tr>)}</tbody></table></div></div></AdminShell>);
}
