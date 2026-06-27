'use client';
import { useState, useEffect } from 'react';
import AdminShell from '@/components/admin/AdminShell';

interface NewsPost { id:string;titleAr:string;titleEn:string;summaryAr:string;summaryEn:string;imageUrl:string;videoUrl:string;category:string;status:string;publishedAt:string; }
const EMPTY = {titleAr:'',titleEn:'',summaryAr:'',summaryEn:'',contentAr:'',contentEn:'',imageUrl:'',videoUrl:'',category:'news',status:'published',publishedAt:new Date().toISOString().split('T')[0]};

export default function NewsAdmin() {
  const [items,setItems]=useState<NewsPost[]>([]);
  const [form,setForm]=useState<any>(EMPTY);
  const [editId,setEditId]=useState<string|null>(null);
  const [show,setShow]=useState(false);
  const [loading,setLoading]=useState(false);
  const load=()=>fetch('/api/news?all=1').then(r=>r.json()).then(setItems);
  useEffect(()=>{load();},[]);
  const save=async()=>{setLoading(true);const url=editId?`/api/news/${editId}`:'/api/news';const method=editId?'PUT':'POST';await fetch(url,{method,headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});setForm(EMPTY);setEditId(null);setShow(false);await load();setLoading(false);};
  const del=async(id:string)=>{if(!confirm('حذف؟'))return;await fetch(`/api/news/${id}`,{method:'DELETE'});await load();};
  const edit=(n:NewsPost)=>{setForm({...n,publishedAt:new Date(n.publishedAt).toISOString().split('T')[0]});setEditId(n.id);setShow(true);};
  const F=(key:string,label:string,rows=0)=>(<div><label className="block text-xs text-gray-500 mb-1">{label}</label>{rows>0?<textarea value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} rows={rows} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none" />:<input value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />}</div>);
  return(<AdminShell><div className="space-y-6"><div className="flex items-center justify-between"><h1 className="text-2xl font-bold">إدارة الأخبار</h1><button onClick={()=>{setForm(EMPTY);setEditId(null);setShow(true);}} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">+ إضافة خبر</button></div>
  {show&&<div className="bg-white rounded-2xl border p-6 shadow-sm"><h2 className="font-bold mb-4">{editId?'تعديل خبر':'خبر جديد'}</h2>
  <div className="grid grid-cols-2 gap-4">{F('titleAr','العنوان (عربي)')}{F('titleEn','Title (English)')}{F('imageUrl','رابط الصورة')}{F('videoUrl','رابط الفيديو (اختياري)')}
  <div><label className="block text-xs text-gray-500 mb-1">التصنيف</label><select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"><option value="news">أخبار</option><option value="events">فعاليات</option><option value="announcement">إعلانات</option></select></div>
  <div><label className="block text-xs text-gray-500 mb-1">الحالة</label><select value={form.status} onChange={e=>setForm({...form,status:e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"><option value="published">منشور</option><option value="draft">مسودة</option></select></div>
  {F('publishedAt','تاريخ النشر')}</div>
  <div className="grid grid-cols-1 gap-4 mt-4">{F('summaryAr','ملخص (عربي)',2)}{F('summaryEn','Summary (EN)',2)}{F('contentAr','المحتوى الكامل (عربي)',5)}{F('contentEn','Full Content (EN)',5)}</div>
  <div className="flex gap-3 mt-4"><button onClick={save} disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm disabled:opacity-50">{loading?'جاري...':'حفظ'}</button><button onClick={()=>setShow(false)} className="px-6 py-2 border rounded-lg text-sm">إلغاء</button></div></div>}
  <div className="bg-white rounded-2xl border overflow-hidden"><table className="w-full text-sm"><thead className="bg-gray-50 border-b"><tr><th className="px-4 py-3 text-right">العنوان</th><th className="px-4 py-3 text-right">التصنيف</th><th className="px-4 py-3 text-right">التاريخ</th><th className="px-4 py-3 text-right">الحالة</th><th className="px-4 py-3 text-right">إجراء</th></tr></thead><tbody className="divide-y">{items.map(n=><tr key={n.id} className="hover:bg-gray-50"><td className="px-4 py-3 font-medium max-w-xs truncate">{n.titleAr}</td><td className="px-4 py-3 text-gray-500">{n.category}</td><td className="px-4 py-3 text-gray-500 text-xs">{new Date(n.publishedAt).toLocaleDateString('ar-SA')}</td><td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs ${n.status==='published'?'bg-green-100 text-green-700':'bg-gray-100 text-gray-500'}`}>{n.status}</span></td><td className="px-4 py-3"><div className="flex gap-2"><button onClick={()=>edit(n)} className="text-blue-600 text-xs hover:underline">تعديل</button><button onClick={()=>del(n.id)} className="text-red-500 text-xs hover:underline">حذف</button></div></td></tr>)}</tbody></table></div></div></AdminShell>);
}
