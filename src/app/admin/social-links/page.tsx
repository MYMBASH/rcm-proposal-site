'use client';
import { useState, useEffect } from 'react';
import AdminShell from '@/components/admin/AdminShell';

interface SocialLink { id:string;platform:string;url:string;order:number;active:boolean; }
const PLATFORMS = ['facebook','instagram','twitter','linkedin','youtube','tiktok','snapchat','whatsapp','telegram'];
const EMPTY = {platform:'facebook',url:'',order:0,active:true};

export default function SocialLinksAdmin() {
  const [items,setItems]=useState<SocialLink[]>([]);
  const [form,setForm]=useState<any>(EMPTY);
  const [editId,setEditId]=useState<string|null>(null);
  const [show,setShow]=useState(false);
  const [loading,setLoading]=useState(false);
  const load=()=>fetch('/api/social-links?all=1').then(r=>r.json()).then(setItems);
  useEffect(()=>{load();},[]);
  const save=async()=>{setLoading(true);const url=editId?`/api/social-links/${editId}`:'/api/social-links';const method=editId?'PUT':'POST';await fetch(url,{method,headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});setForm(EMPTY);setEditId(null);setShow(false);await load();setLoading(false);};
  const del=async(id:string)=>{if(!confirm('حذف؟'))return;await fetch(`/api/social-links/${id}`,{method:'DELETE'});await load();};
  const edit=(s:SocialLink)=>{const{id,...rest}=s;setForm(rest);setEditId(id);setShow(true);};

  const ICONS: Record<string,string> = {facebook:'🔵',instagram:'📸',twitter:'🐦',linkedin:'💼',youtube:'▶️',tiktok:'🎵',snapchat:'👻',whatsapp:'💬',telegram:'✈️'};

  return(<AdminShell><div className="space-y-6">
    <div className="flex items-center justify-between"><h1 className="text-2xl font-bold">روابط التواصل الاجتماعي</h1><button onClick={()=>{setForm(EMPTY);setEditId(null);setShow(true);}} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">+ إضافة رابط</button></div>
    {show&&<div className="bg-white rounded-2xl border p-6 shadow-sm"><h2 className="font-bold mb-4">{editId?'تعديل رابط':'رابط جديد'}</h2>
    <div className="grid grid-cols-3 gap-4">
      <div><label className="block text-xs text-gray-500 mb-1">المنصة</label>
      <select value={form.platform} onChange={e=>setForm({...form,platform:e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
        {PLATFORMS.map(p=><option key={p} value={p}>{ICONS[p]} {p}</option>)}</select></div>
      <div><label className="block text-xs text-gray-500 mb-1">الرابط</label><input value={form.url} onChange={e=>setForm({...form,url:e.target.value})} placeholder="https://" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
      <div><label className="block text-xs text-gray-500 mb-1">الترتيب</label><input type="number" value={form.order} onChange={e=>setForm({...form,order:Number(e.target.value)})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
    </div>
    <div className="mt-3 flex items-center gap-2"><input type="checkbox" id="active" checked={form.active} onChange={e=>setForm({...form,active:e.target.checked})} className="rounded" /><label htmlFor="active" className="text-sm text-gray-600">مفعّل</label></div>
    <div className="flex gap-3 mt-4"><button onClick={save} disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm disabled:opacity-50">{loading?'جاري...':'حفظ'}</button><button onClick={()=>setShow(false)} className="px-6 py-2 border rounded-lg text-sm">إلغاء</button></div></div>}
    <div className="bg-white rounded-2xl border overflow-hidden"><table className="w-full text-sm"><thead className="bg-gray-50 border-b"><tr><th className="px-4 py-3 text-right">المنصة</th><th className="px-4 py-3 text-right">الرابط</th><th className="px-4 py-3 text-right">الترتيب</th><th className="px-4 py-3 text-right">الحالة</th><th className="px-4 py-3 text-right">إجراء</th></tr></thead>
    <tbody className="divide-y">{items.map(s=><tr key={s.id} className="hover:bg-gray-50">
      <td className="px-4 py-3 font-medium">{ICONS[s.platform]} {s.platform}</td>
      <td className="px-4 py-3 text-gray-500 text-xs max-w-xs truncate"><a href={s.url} target="_blank" className="hover:text-blue-600">{s.url}</a></td>
      <td className="px-4 py-3 text-gray-500">{s.order}</td>
      <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs ${s.active?'bg-green-100 text-green-700':'bg-gray-100 text-gray-500'}`}>{s.active?'مفعّل':'معطّل'}</span></td>
      <td className="px-4 py-3"><div className="flex gap-2"><button onClick={()=>edit(s)} className="text-blue-600 text-xs hover:underline">تعديل</button><button onClick={()=>del(s.id)} className="text-red-500 text-xs hover:underline">حذف</button></div></td>
    </tr>)}</tbody></table></div>
  </div></AdminShell>);
}
