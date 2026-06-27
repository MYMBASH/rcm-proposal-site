'use client';
import { useEffect, useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import CrudTable, { type Field } from '@/components/admin/CrudTable';

const FIELDS: Field[] = [
  { key: 'name', label: 'اسم الشريك', required: true },
  { key: 'logo', label: 'شعار الشريك', type: 'upload-image' as const, span: 'full' as const },
  { key: 'descriptionAr', label: 'الوصف (عربي)', type: 'textarea' },
  { key: 'descriptionEn', label: 'Description (English)', type: 'textarea' },
  { key: 'order', label: 'الترتيب', type: 'number' },
];
const COLUMNS = [{ key: 'name' as const, label: 'الاسم' }, { key: 'descriptionAr' as const, label: 'الوصف' }, { key: 'order' as const, label: 'الترتيب' }];

export default function AdminPartnersPage() {
  const [items, setItems] = useState([]);
  async function load() { setItems(await (await fetch('/api/partners')).json()); }
  useEffect(() => { load(); }, []);
  return (
    <AdminShell>
      <CrudTable title="إدارة الشركاء" items={items} fields={FIELDS} columns={COLUMNS}
        onAdd={async d => { const r = await fetch('/api/partners', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) }); if (!r.ok) { const e = await r.json(); throw new Error(e.error || 'Failed to save'); } load(); }}
        onEdit={async (id, d) => { await fetch(`/api/partners/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) }); load(); }}
        onDelete={async id => { await fetch(`/api/partners/${id}`, { method: 'DELETE' }); load(); }} />
    </AdminShell>
  );
}
