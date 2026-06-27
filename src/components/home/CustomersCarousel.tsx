'use client';

import { useEffect, useRef } from 'react';

interface Customer { id: string; name: string; logo: string; websiteUrl: string; }

export default function CustomersCarousel({ customers, locale }: { customers: Customer[]; locale: string }) {
  const isAr = locale === 'ar';
  const trackRef = useRef<HTMLDivElement>(null);
  // Duplicate for infinite loop
  const items = [...customers, ...customers, ...customers];

  return (
    <section className="py-20 bg-[#060d1b] overflow-hidden">
      <div className="container-custom mb-10 text-center">
        <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-4 py-2 text-sm text-slate-400 mb-3">
          {isAr ? 'عملاؤنا' : 'Our Clients'}
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-white">
          {isAr ? 'موثوق به من قِبل' : 'Trusted by'}{' '}
          <span className="bg-gradient-to-r from-[#0EA5E9] to-[#34D399] bg-clip-text text-transparent">
            {isAr ? 'كبرى المنشآت الصحية' : 'Leading Healthcare Facilities'}
          </span>
        </h2>
      </div>

      {/* Infinite scroll carousel */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#060d1b] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#060d1b] to-transparent z-10 pointer-events-none" />

        <div
          ref={trackRef}
          className="flex gap-6 animate-marquee"
          style={{ width: 'max-content' }}
        >
          {items.map((c, i) => (
            <a
              key={`${c.id}-${i}`}
              href={c.websiteUrl || '#'}
              target={c.websiteUrl ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="flex items-center justify-center w-48 h-24 rounded-2xl border border-white/10 bg-white/5 hover:border-[#0EA5E9]/40 hover:bg-white/10 transition-all duration-300 shrink-0 group"
            >
              {c.logo ? (
                <img src={c.logo} alt={c.name} className="max-h-12 max-w-[140px] object-contain filter brightness-75 group-hover:brightness-100 transition-all" />
              ) : (
                <span className="text-slate-400 text-sm font-medium group-hover:text-white transition-colors text-center px-3">{c.name}</span>
              )}
            </a>
          ))}
        </div>
      </div>

      {/* Second row - reverse */}
      <div className="relative mt-4">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#060d1b] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#060d1b] to-transparent z-10 pointer-events-none" />
        <div className="flex gap-6 animate-marquee-reverse" style={{ width: 'max-content' }}>
          {[...items].reverse().map((c, i) => (
            <div key={`rev-${c.id}-${i}`} className="flex items-center justify-center w-48 h-24 rounded-2xl border border-white/10 bg-white/5 shrink-0">
              {c.logo ? (
                <img src={c.logo} alt={c.name} className="max-h-12 max-w-[140px] object-contain filter brightness-50" />
              ) : (
                <span className="text-slate-600 text-xs font-medium text-center px-3">{c.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }
        @keyframes marquee-reverse { 0% { transform: translateX(-33.33%); } 100% { transform: translateX(0); } }
        .animate-marquee { animation: marquee 30s linear infinite; }
        .animate-marquee-reverse { animation: marquee-reverse 35s linear infinite; }
        .animate-marquee:hover, .animate-marquee-reverse:hover { animation-play-state: paused; }
      `}</style>
    </section>
  );
}
