'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';
import CrudTable, { type Field } from '@/components/admin/CrudTable';

const FIELDS: Field[] = [
  { key: 'slug', label: 'Slug', required: true },
  { key: 'icon', label: 'Icon' },
  { key: 'order', label: 'Order', type: 'number' },
  { key: 'status', label: 'Status', type: 'select', options: [{ value: 'published', label: 'Published' }, { value: 'draft', label: 'Draft' }] },
  { key: 'titleAr', label: 'Title (AR)', required: true },
  { key: 'titleEn', label: 'Title (EN)', required: true },
  { key: 'imageUrl', label: 'Solution Image', type: 'upload-image', span: 'full' },
  { key: 'videoUrl', label: 'Solution Video', type: 'upload-video', span: 'full' },
  { key: 'pdfUrl', label: 'PDF Overview', type: 'upload-pdf', span: 'full' },
  { key: 'descriptionAr', label: 'Description (AR)', type: 'textarea', span: 'full' },
  { key: 'descriptionEn', label: 'Description (EN)', type: 'textarea', span: 'full' },
];

const COLUMNS = [
  { key: 'titleAr' as const, label: 'Title' },
  { key: 'slug' as const, label: 'Slug' },
  { key: 'status' as const, label: 'Status' },
];

export default function AdminSolutionsPage() {
  const [items, setItems] = useState([]);
  const router = useRouter();
  async function load() {
    const r = await fetch('/api/solutions');
    if (r.status === 401) { router.push('/admin/login'); return; }
    setItems(await r.json());
  }
  useEffect(() => { load(); }, []);
  return (
    <AdminShell>
      <CrudTable title="Solutions" items={items} fields={FIELDS} columns={COLUMNS}
        onAdd={async d => { const r = await fetch('/api/solutions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) }); if (!r.ok) { const e = await r.json(); throw new Error(e.error || 'Failed to save'); } load(); }}
        onEdit={async (id, d) => { await fetch(`/api/solutions/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) }); load(); }}
        onDelete={async id => { await fetch(`/api/solutions/${id}`, { method: 'DELETE' }); load(); }} />
    </AdminShell>
  );
}
