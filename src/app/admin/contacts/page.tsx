'use client';
import { useEffect, useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import { Mail, Phone, Building2, MessageSquare, Trash2, Check, Loader2 } from 'lucide-react';

interface Contact { id: string; name: string; email: string; phone: string; company: string; message: string; status: string; createdAt: string; }

export default function AdminContactsPage() {
  const [items, setItems] = useState<Contact[]>([]);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function load() { setItems(await (await fetch('/api/contacts')).json()); }
  useEffect(() => { load(); }, []);

  async function markRead(id: string) {
    await fetch(`/api/contacts/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'read' }) });
    load();
  }

  async function deleteItem(id: string) {
    if (!confirm('حذف الرسالة؟')) return;
    setDeleting(id);
    await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
    setDeleting(null);
    load();
  }

  const statusColors: Record<string, string> = {
    new: 'bg-red-100 text-red-700',
    read: 'bg-gray-100 text-gray-600',
    replied: 'bg-green-100 text-green-700',
  };
  const statusLabels: Record<string, string> = { new: 'جديد', read: 'مقروء', replied: 'تم الرد' };

  return (
    <AdminShell>
      <div>
        <h1 className="text-xl font-bold text-brand-dark mb-6">رسائل التواصل</h1>
        <div className="space-y-4">
          {items.length === 0 && <div className="bg-white rounded-2xl p-12 text-center text-brand-gray shadow-card">لا توجد رسائل</div>}
          {items.map(c => (
            <div key={c.id} className="bg-white rounded-2xl shadow-card p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-brand-dark">{c.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[c.status] ?? 'bg-gray-100'}`}>
                      {statusLabels[c.status] ?? c.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-brand-gray">
                    <span className="flex items-center gap-1"><Mail size={13} />{c.email}</span>
                    {c.phone && <span className="flex items-center gap-1"><Phone size={13} />{c.phone}</span>}
                    {c.company && <span className="flex items-center gap-1"><Building2 size={13} />{c.company}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {c.status === 'new' && (
                    <button onClick={() => markRead(c.id)} className="p-2 rounded-lg hover:bg-green-50 text-green-600 transition-colors" title="تحديد كمقروء">
                      <Check size={16} />
                    </button>
                  )}
                  <button onClick={() => deleteItem(c.id)} disabled={deleting === c.id} className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors">
                    {deleting === c.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                  </button>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 text-sm text-brand-dark flex gap-3">
                <MessageSquare size={15} className="text-brand-gray shrink-0 mt-0.5" />
                <p className="leading-relaxed">{c.message}</p>
              </div>
              <div className="text-xs text-brand-gray mt-3 text-end">
                {new Date(c.createdAt).toLocaleString('ar-SA')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
