'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Menu, X } from 'lucide-react';
import SearchBar from '@/components/shared/SearchBar';

const NAV_KEYS = ['home','about','services','solutions','customers','partners','contact','careers','news'] as const;
const NAV_HREFS: Record<string, string> = {
  home:'/', about:'/about', services:'/services', solutions:'/solutions',
  customers:'/customers', partners:'/partners', contact:'/contact', careers:'/careers', news:'/news',
};
const NAV_AR: Record<string, string> = {
  home:'الرئيسية', about:'عن الشركة', services:'خدماتنا', solutions:'حلولنا',
  customers:'عملاؤنا', partners:'شركاؤنا', contact:'تواصل معنا', careers:'وظائف', news:'الأخبار',
};
const NAV_EN: Record<string, string> = {
  home:'Home', about:'About', services:'Services', solutions:'Solutions',
  customers:'Customers', partners:'Partners', contact:'Contact', careers:'Careers', news:'News',
};

export default function Header() {
  const locale = useLocale();
  const isAr = locale === 'ar';
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const otherLocale = isAr ? 'en' : 'ar';

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler);
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#050d1a] shadow-lg shadow-black/30' : 'bg-[#050d1a]/95 backdrop-blur-md'
    }`}>
      {/* Top gradient accent */}
      <div className="h-0.5 bg-gradient-to-r from-[#1B3FAB] via-[#0EA5E9] to-[#34D399]" />

      <div className="container-custom">
        {/*
          dir="rtl" cascades from .site-root → flex-row in RTL flows right-to-left automatically:
          AR: [Logo(right)] [Nav items right→left] [Actions(left)]
          EN: [Logo(left)]  [Nav items left→right] [Actions(right)]
          No manual flex-row-reverse needed — RTL CSS handles it.
        */}
        <div className="flex items-center h-16 md:h-20 gap-4">

          {/* Logo — dir="ltr" prevents SVG mirroring, position set by parent RTL flex */}
          <Link href={`/${locale}`} className="shrink-0" dir="ltr">
            <div className="w-40 h-10 relative" dir="ltr">
              <svg viewBox="0 0 420 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <defs>
                  <linearGradient id="hGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#2563EB"/>
                    <stop offset="50%" stopColor="#0EA5E9"/>
                    <stop offset="100%" stopColor="#34D399"/>
                  </linearGradient>
                </defs>
                <rect x="10" y="15" width="14" height="70" rx="7" fill="#1B3FAB"/>
                <path d="M24 20 Q90 20 90 50 Q90 80 24 80" stroke="url(#hGrad)" strokeWidth="14" fill="none" strokeLinecap="round"/>
                <text x="108" y="63" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="38" fill="white">DigiMind</text>
              </svg>
            </div>
          </Link>

          {/*
            Nav: flex-1 fills middle space.
            In RTL (Arabic): items flow right→left: الرئيسية | عن الشركة | خدماتنا ...
            In LTR (English): items flow left→right: Home | About | Services ...
            justify-start = inline-start, which is RIGHT in RTL and LEFT in LTR.
          */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-start">
            {NAV_KEYS.map((key) => (
              <Link key={key} href={`/${locale}${NAV_HREFS[key]}`}
                className="px-3 py-2 text-sm font-medium text-slate-300 rounded-lg hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap">
                {isAr ? NAV_AR[key] : NAV_EN[key]}
              </Link>
            ))}
          </nav>

          {/*
            Actions: ms-auto = margin-inline-start: auto
            In LTR → pushes div to the RIGHT end ✓
            In RTL → pushes div to the LEFT end ✓
            dir="ltr" keeps internal content (EN/AR switcher, buttons) LTR-ordered.
          */}
          <div className="flex items-center gap-2 shrink-0 ms-auto" dir="ltr">
            <SearchBar locale={locale} />
            <Link href={`/${otherLocale}`}
              className="hidden md:flex items-center text-sm font-medium text-slate-300 hover:text-white transition-colors border border-white/20 rounded-lg px-3 py-1.5 hover:border-white/40">
              {otherLocale === 'ar' ? 'عربي' : 'EN'}
            </Link>
            <Link href={`/${locale}/contact`}
              className="hidden md:inline-flex items-center px-4 py-2 rounded-xl font-bold text-white text-xs bg-gradient-to-r from-[#1B3FAB] to-[#0EA5E9] hover:from-[#2563EB] hover:to-[#38bdf8] shadow-lg shadow-[#1B3FAB]/30 transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap">
              {isAr ? 'تواصل معنا' : 'Contact Us'}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 text-white" aria-label="Toggle menu">
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#050d1a] border-t border-white/10">
          <div className="container-custom py-4 flex flex-col gap-1">
            {NAV_KEYS.map((key) => (
              <Link key={key} href={`/${locale}${NAV_HREFS[key]}`} onClick={() => setIsOpen(false)}
                className="w-full px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors">
                {isAr ? NAV_AR[key] : NAV_EN[key]}
              </Link>
            ))}
            <div className="border-t border-white/10 mt-2 pt-2 w-full flex gap-2" dir="ltr">
              <Link href={`/${otherLocale}`} className="border border-white/20 text-white text-xs py-2 px-4 rounded-xl flex-1 text-center hover:bg-white/10 transition-colors">
                {otherLocale === 'ar' ? 'عربي' : 'English'}
              </Link>
              <Link href={`/${locale}/contact`} onClick={() => setIsOpen(false)}
                className="bg-gradient-to-r from-[#1B3FAB] to-[#0EA5E9] text-white text-xs py-2 px-4 rounded-xl flex-1 text-center font-bold">
                {isAr ? 'تواصل' : 'Contact'}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
