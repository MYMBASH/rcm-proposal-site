'use client';

import { useState, useEffect } from 'react';
import AdminShell from '@/components/admin/AdminShell';

interface Banner {
  id: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  imageUrl: string;
  linkUrl: string;
  linkLabelAr: string;
  linkLabelEn: string;
  order: number;
  status: string;
}

const EMPTY: Omit<Banner, 'id'> = {
  titleAr: '', titleEn: '', subtitleAr: '', subtitleEn: '',
  imageUrl: '', linkUrl: '', linkLabelAr: '', linkLabelEn: '',
  order: 0, status: 'published',
};

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [form, setForm] = useState<Omit<Banner, 'id'>>(EMPTY);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const load = () => fetch('/api/banners').then(r => r.json()).then(setBanners);
  useEffect(() => { load(); }, []);

  const save = async () => {
    setLoading(true);
    const url = editId ? `/api/banners/${editId}` : '/api/banners';
    const method = editId ? 'PUT' : 'POST';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setForm(EMPTY); setEditId(null); setShowForm(false);
    await load();
    setLoading(false);
  };

  const del = async (id: string) => {
    if (!confirm('حذف هذا البانر؟')) return;
    await fetch(`/api/banners/${id}`, { method: 'DELETE' });
    await load();
  };

  const edit = (b: Banner) => {
    const { id, ...rest } = b;
    setForm(rest); setEditId(id); setShowForm(true);
  };

  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">إدارة البانرات</h1>
          <button onClick={() => { setForm(EMPTY); setEditId(null); setShowForm(true); }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
            + إضافة بانر
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="font-bold text-lg mb-4">{editId ? 'تعديل بانر' : 'بانر جديد'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: 'titleAr', label: 'العنوان (عربي)' },
                { key: 'titleEn', label: 'العنوان (إنجليزي)' },
                { key: 'subtitleAr', label: 'الوصف (عربي)' },
                { key: 'subtitleEn', label: 'الوصف (إنجليزي)' },
                { key: 'imageUrl', label: 'رابط الصورة' },
                { key: 'linkUrl', label: 'رابط الزر' },
                { key: 'linkLabelAr', label: 'نص الزر (عربي)' },
                { key: 'linkLabelEn', label: 'نص الزر (إنجليزي)' },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input
                    value={(form as any)[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الترتيب</label>
                <input type="number" value={form.order}
                  onChange={e => setForm({ ...form, order: Number(e.target.value) })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="published">منشور</option>
                  <option value="draft">مسودة</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={save} disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50">
                {loading ? 'جاري الحفظ...' : 'حفظ'}
              </button>
              <button onClick={() => { setShowForm(false); setEditId(null); }}
                className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700">
                إلغاء
              </button>
            </div>
          </div>
        )}

        {/* List */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-right font-semibold text-gray-700">العنوان (AR)</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-700">العنوان (EN)</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-700">الترتيب</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-700">الحالة</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-700">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {banners.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">لا توجد بانرات بعد</td></tr>
              )}
              {banners.map(b => (
                <tr key={b.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{b.titleAr}</td>
                  <td className="px-4 py-3">{b.titleEn}</td>
                  <td className="px-4 py-3">{b.order}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${b.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {b.status === 'published' ? 'منشور' : 'مسودة'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => edit(b)} className="text-blue-600 hover:underline text-xs">تعديل</button>
                      <button onClick={() => del(b.id)} className="text-red-500 hover:underline text-xs">حذف</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
