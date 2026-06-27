'use client';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const startTime = Date.now();
        const tick = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * end));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return { count, ref };
}

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center p-6">
      <div className="text-4xl md:text-5xl font-bold gradient-text">
        {count}{suffix}
      </div>
      <div className="text-brand-gray mt-2 text-sm font-medium">{label}</div>
    </div>
  );
}

export default function StatsSection() {
  const locale = useLocale();
  const t = useTranslations('stats');

  const stats = [
    { value: 50, suffix: '+', label: t('clients') },
    { value: 98, suffix: '%', label: t('accuracy') },
    { value: 10, suffix: '+', label: t('experience') },
    { value: 200, suffix: 'M+', label: t('revenue') },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100 border border-gray-100 rounded-3xl overflow-hidden shadow-card">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
