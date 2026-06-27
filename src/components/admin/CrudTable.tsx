'use client';
import { useState } from 'react';
import { Plus, Pencil, Trash2, Loader2, X, Save } from 'lucide-react';
import FileUpload from './FileUpload';

export interface Field {
  key: string;
  label: string;
  type?: 'text' | 'textarea' | 'number' | 'select' | 'upload-image' | 'upload-video' | 'upload-pdf';
  options?: { value: string; label: string }[];
  required?: boolean;
  span?: 'full';
}

interface Props<T extends Record<string, unknown>> {
  title: string;
  items: T[];
  fields: Field[];
  onAdd: (data: Partial<T>) => Promise<void>;
  onEdit: (id: string, data: Partial<T>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  columns: { key: keyof T; label: string }[];
}

export default function CrudTable<T extends Record<string, unknown>>({
  title, items, fields, onAdd, onEdit, onDelete, columns,
}: Props<T>) {
  const [modal, setModal] = useState<'add' | 'edit' | null>(null);
  const [editing, setEditing] = useState<T | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  function openAdd() { setForm({}); setEditing(null); setModal('add'); }
  function openEdit(item: T) {
    setEditing(item);
    const f: Record<string, string> = {};
    fields.forEach(({ key }) => { f[key] = String(item[key] ?? ''); });
    setForm(f);
    setModal('edit');
  }

  async function handleSave() {
    setLoading(true);
    setSaveError(null);
    try {
      if (modal === 'add') await onAdd(form as Partial<T>);
      else if (modal === 'edit' && editing) await onEdit(String(editing['id']), form as Partial<T>);
      setModal(null);
    } catch (e: any) {
      setSaveError(e.message || 'Save failed');
    } finally { setLoading(false); }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete?')) return;
    setDeleting(id);
    await onDelete(id);
    setDeleting(null);
  }

  const inputClass = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10';

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        <button onClick={openAdd} className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm px-4 py-2 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-600 transition-all">
          <Plus size={16} /> Add New
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-slate-50">
              {columns.map(({ label }) => (
                <th key={label} className="text-start px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</th>
              ))}
              <th className="text-start px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.length === 0 ? (
              <tr><td colSpan={columns.length + 1} className="text-center py-12 text-gray-400">No data yet</td></tr>
            ) : items.map((item) => (
              <tr key={String(item['id'])} className="hover:bg-slate-50/50">
                {columns.map(({ key }) => {
                  const val = String(item[key] ?? '-');
                  const isImg = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(val);
                  return (
                    <td key={String(key)} className="px-4 py-3 text-gray-800 max-w-xs truncate">
                      {isImg ? <img src={val} alt="" className="h-8 w-auto rounded object-cover" /> : val}
                    </td>
                  );
                })}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"><Pencil size={15} /></button>
                    <button onClick={() => handleDelete(String(item['id']))} disabled={deleting === String(item['id'])} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors">
                      {deleting === String(item['id']) ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">{modal === 'add' ? 'Add New' : 'Edit'}</h2>
              <button onClick={() => setModal(null)} className="p-2 rounded-lg hover:bg-gray-100"><X size={18} /></button>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              {fields.map(({ key, label, type = 'text', options, required, span }) => {
                const isUpload = type.startsWith('upload-');
                const uploadAccept = type === 'upload-image' ? 'image' : type === 'upload-video' ? 'video' : type === 'upload-pdf' ? 'pdf' : 'any';
                return (
                  <div key={key} className={span === 'full' || isUpload ? 'col-span-2' : ''}>
                    {isUpload ? (
                      <FileUpload
                        label={`${label}${required ? ' *' : ''}`}
                        accept={uploadAccept as any}
                        value={form[key] ?? ''}
                        onChange={url => setForm(f => ({ ...f, [key]: url }))}
                      />
                    ) : (
                      <>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                          {label} {required && <span className="text-red-500">*</span>}
                        </label>
                        {type === 'textarea' ? (
                          <textarea rows={3} className={inputClass} value={form[key] ?? ''} onChange={e => setForm({ ...form, [key]: e.target.value })} />
                        ) : type === 'select' ? (
                          <select className={inputClass} value={form[key] ?? ''} onChange={e => setForm({ ...form, [key]: e.target.value })}>
                            {options?.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                          </select>
                        ) : (
                          <input type={type} className={inputClass} value={form[key] ?? ''} onChange={e => setForm({ ...form, [key]: e.target.value })} />
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
            {saveError && (
              <div className="mx-6 mt-4 px-4 py-2.5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
                {saveError}
              </div>
            )}
            <div className="flex gap-3 p-6 border-t border-gray-100">
              <button onClick={handleSave} disabled={loading} className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2.5 text-sm rounded-xl font-semibold hover:from-blue-700 hover:to-blue-600 transition-all">
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button onClick={() => setModal(null)} className="flex-1 py-2.5 text-sm border border-gray-200 rounded-xl hover:bg-gray-50">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
