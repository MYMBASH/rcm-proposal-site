'use client';

import { useState } from 'react';
import { Share2, Check } from 'lucide-react';

interface Props { title: string; locale: string; }

const PLATFORMS = [
  { id: 'whatsapp', label: 'واتساب/WhatsApp', icon: '💬', color: '#25D366', getUrl: (u: string, t: string) => `https://wa.me/?text=${encodeURIComponent(t + ' ' + u)}` },
  { id: 'facebook', label: 'Facebook', icon: '📘', color: '#1877F2', getUrl: (u: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}` },
  { id: 'twitter', label: 'X (Twitter)', icon: '🐦', color: '#1DA1F2', getUrl: (u: string, t: string) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(t)}&url=${encodeURIComponent(u)}` },
  { id: 'linkedin', label: 'LinkedIn', icon: '💼', color: '#0A66C2', getUrl: (u: string, t: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(u)}&title=${encodeURIComponent(t)}` },
  { id: 'telegram', label: 'Telegram', icon: '✈️', color: '#2AABEE', getUrl: (u: string, t: string) => `https://t.me/share/url?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}` },
];

export default function SocialShare({ title, locale }: Props) {
  const isAr = locale === 'ar';
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const url = typeof window !== 'undefined' ? window.location.href : '';

  const copy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 bg-white/5 hover:border-[#0EA5E9]/50 hover:bg-white/10 text-slate-300 hover:text-white transition-all text-sm font-medium"
      >
        <Share2 size={16} />
        {isAr ? 'مشاركة' : 'Share'}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className={`absolute z-50 bottom-full mb-2 ${isAr ? 'left-0' : 'right-0'} w-52 rounded-2xl border border-white/20 bg-[#0d1f3c] shadow-2xl p-2 space-y-1`}>
            {PLATFORMS.map(p => (
              <a
                key={p.id}
                href={p.getUrl(url, title)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 transition-colors text-slate-300 hover:text-white text-sm"
              >
                <span className="text-lg">{p.icon}</span>
                <span>{p.label}</span>
              </a>
            ))}
            <button
              onClick={copy}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 transition-colors text-slate-300 hover:text-white text-sm"
            >
              {copied ? <Check size={18} className="text-[#34D399]" /> : <span className="text-lg">🔗</span>}
              <span>{copied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ الرابط' : 'Copy Link')}</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
