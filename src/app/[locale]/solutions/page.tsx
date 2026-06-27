import { Metadata } from 'next';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { prisma } from '@/lib/prisma';
import { type LucideIcon, Search, Target, ShieldCheck, PieChart, ArrowLeft, ArrowRight } from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  Search, Target, ShieldCheck, PieChart,
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return { title: locale === 'ar' ? 'الحلول' : 'Solutions' };
}

export default async function SolutionsPage({ params: { locale } }: { params: { locale: string } }) {
  const solutions = await prisma.solution.findMany({ where: { status: 'published' }, orderBy: { order: 'asc' } });
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <MainLayout>
      <section className="bg-gradient-to-br from-brand-emerald to-brand-teal py-24 text-white">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{isAr ? 'حلولنا المبتكرة' : 'Our Innovative Solutions'}</h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            {isAr ? 'حلول رقمية متكاملة مصممة لاحتياجات المنشآت الصحية السعودية' : 'Integrated digital solutions designed for Saudi healthcare facility needs'}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-6">
            {solutions.map((sol, idx) => {
              const Icon = ICONS[sol.icon] || Search;
              const title = isAr ? sol.titleAr : sol.titleEn;
              const desc = isAr ? sol.descriptionAr : sol.descriptionEn;
              return (
                <Link key={sol.id} href={`/${locale}/solutions/${sol.slug}`}
                  className="group bg-white border border-gray-100 rounded-2xl p-8 shadow-card hover:shadow-brand hover:-translate-y-1 transition-all duration-300">
                  <div className="flex gap-5 items-start">
                    <div className="w-14 h-14 rounded-2xl bg-brand-gradient flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-brand-dark mb-2">{title}</h3>
                      <p className="text-brand-gray text-sm leading-relaxed">{desc}</p>
                      <div className="flex items-center gap-1 mt-4 text-brand-blue text-sm font-semibold group-hover:gap-2 transition-all">
                        {isAr ? 'تعرف أكثر' : 'Learn More'} <Arrow size={15} />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
