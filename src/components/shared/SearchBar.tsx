'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, FileText, Lightbulb, Briefcase } from 'lucide-react';

interface Result {
  type: 'service' | 'solution' | 'news';
  slug: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
}

const TYPE_LABELS: Record<string, { ar: string; en: string; icon: React.FC<any> }> = {
  service: { ar: 'خدمة', en: 'Service', icon: Briefcase },
  solution: { ar: 'حل', en: 'Solution', icon: Lightbulb },
  news: { ar: 'خبر', en: 'News', icon: FileText },
};

export default function SearchBar({ locale }: { locale: string }) {
  const isAr = locale === 'ar';
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const search = useCallback(async (q: string) => {
    if (q.length < 2) { setResults([]); return; }
    setLoading(true);
    try {
      const r = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await r.json();
      setResults(data.results || []);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => search(query), 300);
    return () => clearTimeout(t);
  }, [query, search]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setOpen(true); }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const navigate = (r: Result) => {
    const path = r.type === 'news' ? `/${locale}/news/${r.slug}` : `/${locale}/${r.type}s/${r.slug}`;
    router.push(path);
    setOpen(false);
    setQuery('');
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/20 bg-white/5 hover:border-[#0EA5E9]/50 hover:bg-white/10 text-slate-400 hover:text-white transition-all text-sm"
      >
        <Search size={15} />
        <span className="hidden md:block">{isAr ? 'بحث...' : 'Search...'}</span>
        <kbd className="hidden md:block text-xs bg-white/10 px-1.5 py-0.5 rounded">⌘K</kbd>
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-20 px-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-xl bg-[#0d1f3c] border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
            {/* Input */}
            <div className="flex items-center gap-3 p-4 border-b border-white/10">
              <Search size={18} className="text-slate-400 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={isAr ? 'ابحث في الموقع...' : 'Search the website...'}
                className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none text-base"
                dir={isAr ? 'rtl' : 'ltr'}
              />
              {query && <button onClick={() => setQuery('')}><X size={16} className="text-slate-400 hover:text-white" /></button>}
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-white text-xs border border-white/20 rounded px-2 py-1">ESC</button>
            </div>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto p-2">
              {loading && (
                <div className="flex justify-center py-8">
                  <div className="w-6 h-6 border-2 border-[#0EA5E9] border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              {!loading && query.length >= 2 && results.length === 0 && (
                <div className="text-center py-8 text-slate-500">{isAr ? 'لا توجد نتائج' : 'No results found'}</div>
              )}
              {!loading && results.map((r, i) => {
                const meta = TYPE_LABELS[r.type];
                const Icon = meta.icon;
                return (
                  <button key={i} onClick={() => navigate(r)}
                    className={`w-full flex items-start gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors ${isAr ? 'text-right flex-row-reverse' : 'text-left'}`}>
                    <div className="w-9 h-9 rounded-lg bg-[#1B3FAB]/30 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-[#0EA5E9]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-white text-sm font-medium truncate">{isAr ? r.titleAr : r.titleEn}</span>
                        <span className="text-xs px-1.5 py-0.5 rounded-full bg-[#0EA5E9]/20 text-[#0EA5E9] shrink-0">{isAr ? meta.ar : meta.en}</span>
                      </div>
                      <p className="text-slate-400 text-xs line-clamp-1">{isAr ? r.descAr : r.descEn}</p>
                    </div>
                  </button>
                );
              })}
              {!query && (
                <div className="text-center py-6 text-slate-500 text-sm">
                  {isAr ? 'اكتب للبحث في الخدمات والحلول والأخبار' : 'Type to search services, solutions & news'}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
