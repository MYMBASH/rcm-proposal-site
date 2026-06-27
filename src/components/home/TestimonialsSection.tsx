'use client';

import { useState, useEffect, useRef } from 'react';

interface Testimonial {
  id: string; nameAr: string; nameEn: string; roleAr: string; roleEn: string;
  companyAr: string; companyEn: string; contentAr: string; contentEn: string;
  avatarUrl: string; rating: number;
}

export default function TestimonialsSection({ testimonials, locale }: { testimonials: Testimonial[]; locale: string }) {
  const isAr = locale === 'ar';
  const [active, setActive] = useState(0);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (testimonials.length < 2) return;
    timerRef.current = setInterval(() => setActive(a => (a + 1) % testimonials.length), 5000);
    return () => clearInterval(timerRef.current);
  }, [testimonials.length]);

  if (!testimonials.length) return null;

  const t = testimonials[active];

  return (
    <section className="py-24 relative bg-[#050d1a] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#060d1b] to-[#050d1a]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#1B3FAB]/8 rounded-full blur-[120px]" />

      <div className="relative z-10 container-custom">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 border border-[#0EA5E9]/30 bg-[#0EA5E9]/10 rounded-full px-4 py-2 text-sm text-[#0EA5E9] mb-4">
            {isAr ? 'آراء عملائنا' : 'Client Testimonials'}
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white">
            {isAr ? 'ماذا يقول' : 'What Our'}{' '}
            <span className="bg-gradient-to-r from-[#0EA5E9] to-[#34D399] bg-clip-text text-transparent">
              {isAr ? 'عملاؤنا' : 'Clients Say'}
            </span>
          </h2>
        </div>

        {/* Main testimonial card */}
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-10 relative">
            {/* Quote mark */}
            <div className={`absolute top-8 ${isAr ? 'right-10' : 'left-10'} text-[80px] leading-none text-[#0EA5E9]/20 font-serif select-none`}>&quot;</div>

            {/* Stars */}
            <div className={`flex gap-1 mb-6 ${isAr ? 'justify-end' : 'justify-start'}`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={`text-xl ${i < t.rating ? 'text-yellow-400' : 'text-white/20'}`}>★</span>
              ))}
            </div>

            {/* Content */}
            <p className={`text-xl text-slate-300 leading-relaxed mb-8 ${isAr ? 'text-right' : 'text-left'}`}>
              &quot;{isAr ? t.contentAr : t.contentEn}&quot;
            </p>

            {/* Author */}
            <div className={`flex items-center gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
              {t.avatarUrl ? (
                <img src={t.avatarUrl} alt={isAr ? t.nameAr : t.nameEn} className="w-14 h-14 rounded-full object-cover border-2 border-[#0EA5E9]/40" />
              ) : (
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1B3FAB] to-[#0EA5E9] flex items-center justify-center text-white text-xl font-bold">
                  {(isAr ? t.nameAr : t.nameEn).charAt(0)}
                </div>
              )}
              <div className={isAr ? 'text-right' : 'text-left'}>
                <div className="text-white font-bold text-lg">{isAr ? t.nameAr : t.nameEn}</div>
                <div className="text-slate-400 text-sm">{isAr ? t.roleAr : t.roleEn} {(isAr ? t.companyAr : t.companyEn) ? `· ${isAr ? t.companyAr : t.companyEn}` : ''}</div>
              </div>
            </div>
          </div>

          {/* Dots */}
          {testimonials.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setActive(i); clearInterval(timerRef.current); }}
                  className={`rounded-full transition-all duration-300 ${i === active ? 'w-8 h-3 bg-[#0EA5E9]' : 'w-3 h-3 bg-white/20 hover:bg-white/40'}`}
                />
              ))}
            </div>
          )}

          {/* Thumbnail row */}
          {testimonials.length > 1 && (
            <div className="flex justify-center gap-4 mt-6">
              {testimonials.map((item, i) => (
                <button key={item.id} onClick={() => { setActive(i); clearInterval(timerRef.current); }}
                  className={`transition-all duration-300 ${i === active ? 'opacity-100 scale-110' : 'opacity-40 hover:opacity-70'}`}>
                  {item.avatarUrl ? (
                    <img src={item.avatarUrl} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-[#0EA5E9]/40" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white text-sm font-bold">
                      {(locale === 'ar' ? item.nameAr : item.nameEn).charAt(0)}
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
