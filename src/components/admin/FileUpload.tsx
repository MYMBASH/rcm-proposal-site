'use client';
import { useRef, useState } from 'react';
import { Upload, X, Image, Film, FileText, Loader2, Check } from 'lucide-react';

interface Props {
  value: string;
  onChange: (url: string) => void;
  accept?: 'image' | 'video' | 'pdf' | 'any';
  label?: string;
}

const ACCEPT_MAP = {
  image: '.jpg,.jpeg,.png,.gif,.webp,.svg',
  video: '.mp4,.mov,.webm',
  pdf:   '.pdf',
  any:   '.jpg,.jpeg,.png,.gif,.webp,.svg,.mp4,.mov,.webm,.pdf',
};

const TYPE_ICONS = { image: Image, video: Film, pdf: FileText, any: Upload };

export default function FileUpload({ value, onChange, accept = 'any', label = 'Upload File' }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleFile(file: File) {
    setUploading(true);
    setError('');
    setSuccess(false);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Upload failed');
      onChange(data.url);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setUploading(false);
    }
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  const Icon = TYPE_ICONS[accept];
  const isImage = value && /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(value);
  const isVideo = value && /\.(mp4|mov|webm)$/i.test(value);
  const isPdf   = value && /\.pdf$/i.test(value);

  return (
    <div className="space-y-2">
      {label && <label className="block text-xs font-semibold text-gray-600">{label}</label>}

      {/* Drop zone */}
      <div
        onDrop={onDrop}
        onDragOver={e => e.preventDefault()}
        className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-blue-400 transition-colors cursor-pointer"
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT_MAP[accept]}
          className="hidden"
          onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
        />

        {uploading ? (
          <div className="flex flex-col items-center gap-2 py-2">
            <Loader2 size={28} className="text-blue-500 animate-spin" />
            <span className="text-sm text-gray-500">Uploading...</span>
          </div>
        ) : success ? (
          <div className="flex flex-col items-center gap-2 py-2">
            <Check size={28} className="text-green-500" />
            <span className="text-sm text-green-600">Uploaded!</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-2">
            <Icon size={28} className="text-gray-400" />
            <span className="text-sm text-gray-500">
              Drag & drop or <span className="text-blue-600 font-medium">browse</span>
            </span>
            <span className="text-xs text-gray-400">{ACCEPT_MAP[accept].toUpperCase()}, max 50MB</span>
          </div>
        )}
      </div>

      {/* URL fallback input */}
      <div className="flex gap-2 items-center">
        <span className="text-xs text-gray-400 shrink-0">Or URL:</span>
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="https://..."
          className="flex-1 border rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
        {value && (
          <button onClick={() => onChange('')} className="text-gray-400 hover:text-red-500">
            <X size={16} />
          </button>
        )}
      </div>

      {/* Preview */}
      {value && (
        <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
          {isImage && <img src={value} alt="preview" className="w-full h-40 object-contain p-2" />}
          {isVideo && <video src={value} controls className="w-full h-40" />}
          {isPdf && (
            <a href={value} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 text-blue-600 hover:underline text-sm">
              <FileText size={18} /> View PDF
            </a>
          )}
        </div>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
