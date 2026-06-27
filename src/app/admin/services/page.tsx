'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';
import CrudTable, { type Field } from '@/components/admin/CrudTable';

const FIELDS: Field[] = [
  { key: 'slug', label: 'Slug', required: true },
  { key: 'icon', label: 'Icon (Lucide name)' },
  { key: 'order', label: 'Order', type: 'number' },
  { key: 'status', label: 'Status', type: 'select', options: [{ value: 'published', label: 'Published' }, { value: 'draft', label: 'Draft' }] },
  { key: 'titleAr', label: 'Title (AR)', required: true },
  { key: 'titleEn', label: 'Title (EN)', required: true },
  { key: 'imageUrl', label: 'Service Image', type: 'upload-image', span: 'full' },
  { key: 'videoUrl', label: 'Service Video', type: 'upload-video', span: 'full' },
  { key: 'pdfUrl', label: 'PDF Overview', type: 'upload-pdf', span: 'full' },
  { key: 'descriptionAr', label: 'Description (AR)', type: 'textarea', required: true, span: 'full' },
  { key: 'descriptionEn', label: 'Description (EN)', type: 'textarea', required: true, span: 'full' },
];

const COLUMNS = [
  { key: 'titleAr' as const, label: 'Title' },
  { key: 'slug' as const, label: 'Slug' },
  { key: 'order' as const, label: 'Order' },
  { key: 'status' as const, label: 'Status' },
];

export default function AdminServicesPage() {
  const [items, setItems] = useState([]);
  const router = useRouter();

  async function load() {
    const res = await fetch('/api/services');
    if (res.status === 401) { router.push('/admin/login'); return; }
    setItems(await res.json());
  }

  useEffect(() => { load(); }, []);

  return (
    <AdminShell>
      <CrudTable
        title="Services"
        items={items}
        fields={FIELDS}
        columns={COLUMNS}
        onAdd={async (data) => { await fetch('/api/services', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); await load(); }}
        onEdit={async (id, data) => { await fetch(`/api/services/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); await load(); }}
        onDelete={async (id) => { await fetch(`/api/services/${id}`, { method: 'DELETE' }); await load(); }}
      />
    </AdminShell>
  );
}
