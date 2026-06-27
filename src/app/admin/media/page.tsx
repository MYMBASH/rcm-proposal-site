'use client';
import { useEffect, useState, useCallback } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import { useDropzone } from 'react-dropzone';
import { Upload, Trash2, Loader2, Image as ImageIcon, Copy, Check } from 'lucide-react';

interface Asset { id: string; url: string; type: string; filename: string; size: number; createdAt: string; }

export default function AdminMediaPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  async function load() { setAssets(await (await fetch('/api/media')).json()); }
  useEffect(() => { load(); }, []);

  const onDrop = useCallback(async (files: File[]) => {
    setUploading(true);
    for (const file of files) {
      const fd = new FormData();
      fd.append('file', file);
      await fetch('/api/media', { method: 'POST', body: fd });
    }
    await load();
    setUploading(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { 'image/*': [], 'video/*': [] }, maxSize: 10 * 1024 * 1024,
  });

  async function deleteAsset(id: string) {
    if (!confirm('حذف الملف؟')) return;
    setDeleting(id);
    await fetch(`/api/media/${id}`, { method: 'DELETE' });
    setDeleting(null);
    load();
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(window.location.origin + url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  }

  function fmtSize(bytes: number) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  return (
    <AdminShell>
      <div>
        <h1 className="text-xl font-bold text-brand-dark mb-6">مكتبة الوسائط</h1>

        {/* Upload zone */}
        <div {...getRootProps()} className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors mb-6 ${isDragActive ? 'border-brand-blue bg-brand-blue/5' : 'border-gray-300 hover:border-brand-blue hover:bg-brand-blue/3'}`}>
          <input {...getInputProps()} />
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 size={32} className="animate-spin text-brand-blue" />
              <p className="text-brand-gray">جارٍ الرفع...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <Upload size={32} className="text-brand-gray" />
              <p className="text-brand-dark font-semibold">{isDragActive ? 'اسحب الملفات هنا' : 'اسحب الملفات أو انقر للرفع'}</p>
              <p className="text-brand-gray text-sm">الصور تحوّل تلقائياً إلى WebP • الحد الأقصى 10MB</p>
            </div>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {assets.map(asset => (
            <div key={asset.id} className="bg-white rounded-xl shadow-card overflow-hidden group">
              <div className="aspect-square bg-slate-100 flex items-center justify-center relative overflow-hidden">
                {asset.type === 'image' ? (
                  <img src={asset.url} alt={asset.filename} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon size={32} className="text-brand-gray" />
                )}
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={() => copyUrl(asset.url)} className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white">
                    {copied === asset.url ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                  <button onClick={() => deleteAsset(asset.id)} disabled={deleting === asset.id} className="p-2 rounded-lg bg-red-500/80 hover:bg-red-500 text-white">
                    {deleting === asset.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                  </button>
                </div>
              </div>
              <div className="p-2">
                <p className="text-xs text-brand-dark font-medium truncate">{asset.filename}</p>
                <p className="text-xs text-brand-gray">{fmtSize(asset.size)}</p>
              </div>
            </div>
          ))}
        </div>

        {assets.length === 0 && !uploading && (
          <div className="text-center py-16 text-brand-gray">
            <ImageIcon size={48} className="mx-auto mb-3 opacity-30" />
            <p>لا توجد وسائط. ارفع ملفات للبدء.</p>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
