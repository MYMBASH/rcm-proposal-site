'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const locale = useLocale();
  const isAr = locale === 'ar';
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    let animId: number;
    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas!.width;
        if (p.x > canvas!.width) p.x = 0;
        if (p.y < 0) p.y = canvas!.height;
        if (p.y > canvas!.height) p.y = 0;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(14, 165, 233, ${p.alpha})`;
        ctx!.fill();
      });
      animId = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  const stats = [
    { value: '98%', labelAr: 'دقة الترميز', labelEn: 'Coding Accuracy' },
    { value: '500+', labelAr: 'عميل راضٍ', labelEn: 'Happy Clients' },
    { value: '10+', labelAr: 'سنوات خبرة', labelEn: 'Years Experience' },
    { value: '24/7', labelAr: 'دعم مستمر', labelEn: 'Ongoing Support' },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#050d1a]">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050d1a] via-[#0a1628] to-[#0d1f3c]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1B3FAB]/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0EA5E9]/10 rounded-full blur-[120px]" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40" />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(#0EA5E9 1px, transparent 1px), linear-gradient(90deg, #0EA5E9 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="relative z-10 container-custom pt-24 pb-16">
        <div className={`grid lg:grid-cols-2 gap-16 items-center`}>
          {/* Left: Content */}
          <div className={isAr ? 'text-right order-1' : 'text-left order-1'}>
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 border border-[#0EA5E9]/30 bg-[#0EA5E9]/10 rounded-full px-4 py-2 text-sm text-[#0EA5E9] mb-8`}>
              <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
              {isAr ? 'الشريك الموثوق في الرعاية الصحية الرقمية' : 'Your Trusted Digital Healthcare Partner'}
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] text-white mb-6">
              {isAr ? (
                <>
                  <span className="block">حلول الترميز</span>
                  <span className="block bg-gradient-to-r from-[#0EA5E9] via-[#38bdf8] to-[#34D399] bg-clip-text text-transparent">
                    الطبي الذكي
                  </span>
                </>
              ) : (
                <>
                  <span className="block">Smart Medical</span>
                  <span className="block bg-gradient-to-r from-[#0EA5E9] via-[#38bdf8] to-[#34D399] bg-clip-text text-transparent">
                    Coding Solutions
                  </span>
                </>
              )}
            </h1>

            <p className="text-xl text-slate-400 leading-relaxed mb-10 max-w-xl">
              {isAr
                ? 'ديجيمايند — شريكك الاستراتيجي في تحويل بيانات الرعاية الصحية إلى قيمة حقيقية. ترميز طبي دقيق، حلول RCM متكاملة، وخبرة معتمدة دولياً.'
                : 'DigiMind — your strategic partner in transforming healthcare data into real value. Accurate medical coding, integrated RCM solutions, and internationally certified expertise.'}
            </p>

            <div className={`flex flex-wrap gap-4 ${isAr ? 'justify-end' : 'justify-start'}`}>
              <Link href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-[#1B3FAB] to-[#0EA5E9] hover:from-[#2563EB] hover:to-[#38bdf8] shadow-xl shadow-[#1B3FAB]/30 transition-all duration-300 hover:-translate-y-1">
                {isAr ? 'احجز استشارة مجانية' : 'Book Free Consultation'}
                {isAr ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
              </Link>
              <Link href={`/${locale}/services`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white border border-white/20 hover:border-[#0EA5E9]/50 hover:bg-white/5 transition-all duration-300">
                {isAr ? 'استكشف خدماتنا' : 'Our Services'}
              </Link>
            </div>
          </div>

          {/* Right: Dashboard mockup */}
          <div className="order-2 hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-lg">
              {/* Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#1B3FAB]/20 to-[#0EA5E9]/20 rounded-3xl blur-2xl" />
              <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-2xl">
                {/* Window bar */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-400/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
                  <div className="w-3 h-3 rounded-full bg-green-400/70" />
                  <span className="ml-auto text-xs text-slate-500 font-mono">DigiMind Dashboard</span>
                </div>

                {/* KPI cards */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { label: isAr ? 'دقة الترميز' : 'Coding Accuracy', value: '98%', color: '#34D399' },
                    { label: isAr ? 'معدل القبول' : 'Acceptance Rate', value: '96.2%', color: '#0EA5E9' },
                    { label: isAr ? 'المطالبات' : 'Claims', value: '1,284', color: '#818cf8' },
                  ].map(kpi => (
                    <div key={kpi.label} className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                      <div className="text-lg font-black mb-1" style={{ color: kpi.color }}>{kpi.value}</div>
                      <div className="text-slate-500 text-xs">{kpi.label}</div>
                    </div>
                  ))}
                </div>

                {/* Chart bars */}
                <div className="rounded-xl bg-white/5 border border-white/10 p-4 mb-4">
                  <div className="text-xs text-slate-500 mb-3">{isAr ? 'أداء الترميز الشهري' : 'Monthly Coding Performance'}</div>
                  <div className="flex items-end gap-1.5 h-20">
                    {[65, 80, 72, 90, 85, 95, 88, 98, 92, 97, 95, 98].map((h, i) => (
                      <div key={i} className="flex-1 rounded-sm transition-all"
                        style={{ height: `${h}%`, background: `linear-gradient(to top, #1B3FAB, #0EA5E9)`, opacity: i === 11 ? 1 : 0.5 + i * 0.04 }} />
                    ))}
                  </div>
                </div>

                {/* Status row */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[#34D399]">
                    <div className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
                    {isAr ? 'النظام يعمل' : 'System Active'}
                  </div>
                  <div className="text-slate-500">{isAr ? 'آخر تحديث: الآن' : 'Last update: Now'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/10 pt-10">
          {stats.map(s => (
            <div key={s.value} className="text-center">
              <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-[#0EA5E9] to-[#34D399] bg-clip-text text-transparent mb-1">
                {s.value}
              </div>
              <div className="text-slate-400 text-sm">{isAr ? s.labelAr : s.labelEn}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
