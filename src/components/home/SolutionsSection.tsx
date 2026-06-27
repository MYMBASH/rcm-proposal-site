import Link from 'next/link';
import { hasPostgresDatabaseUrl, prisma } from '@/lib/prisma';
import { type LucideIcon, Search, Target, ShieldCheck, PieChart, ArrowLeft, ArrowRight } from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  Search, Target, ShieldCheck, PieChart,
};

export default async function SolutionsSection({ locale }: { locale: string }) {
  const solutions = hasPostgresDatabaseUrl()
    ? await prisma.solution.findMany({
        where: { status: 'published' },
        orderBy: { order: 'asc' },
        take: 4,
      })
    : [];
  const isAr = locale === 'ar';

  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className={`mb-16 ${isAr ? 'text-right' : 'text-left'}`}>
          <div className="inline-flex items-center gap-2 bg-brand-emerald/10 text-brand-emerald rounded-full px-4 py-2 text-sm font-semibold mb-4">
            {isAr ? 'حلولنا' : 'Our Solutions'}
          </div>
          <h2 className="section-title">
            {isAr ? 'حلولنا المبتكرة' : 'Our Innovative Solutions'}
          </h2>
          <p className="section-subtitle">
            {isAr
              ? 'حلول رقمية متكاملة مصممة خصيصاً لاحتياجات المنشآت الصحية السعودية'
              : 'Integrated digital solutions designed for Saudi healthcare facility needs'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {solutions.map((sol, idx) => {
            const Icon = ICONS[sol.icon] || Search;
            const title = isAr ? sol.titleAr : sol.titleEn;
            const desc = isAr ? sol.descriptionAr : sol.descriptionEn;
            const gradients = [
              'from-brand-blue to-brand-teal',
              'from-brand-teal to-brand-mint',
              'from-brand-emerald to-brand-teal',
              'from-brand-blue-mid to-brand-blue',
            ];
            return (
              <Link
                key={sol.id}
                href={`/${locale}/solutions/${sol.slug}`}
                className="group relative bg-white border border-gray-100 rounded-2xl p-8 shadow-card hover:shadow-brand hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${gradients[idx % 4]} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                <div className="relative z-10 flex gap-6 items-start">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradients[idx % 4]} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-dark mb-2">{title}</h3>
                    <p className="text-brand-gray text-sm leading-relaxed">{desc}</p>
                    <div className="flex items-center gap-1 mt-4 text-brand-blue text-sm font-semibold group-hover:gap-2 transition-all">
                      {isAr ? 'تعرف أكثر' : 'Learn More'}
                      {isAr ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href={`/${locale}/solutions`} className="btn-primary">
            {isAr ? 'عرض جميع الحلول' : 'View All Solutions'}
          </Link>
        </div>
      </div>
    </section>
  );
}
