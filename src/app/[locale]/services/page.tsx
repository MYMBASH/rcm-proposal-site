import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { hasPostgresDatabaseUrl, prisma } from '@/lib/prisma';
import { type LucideIcon, FileText, TrendingUp, BarChart3, Database, Zap, GraduationCap, ArrowLeft, ArrowRight } from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  FileText, TrendingUp, BarChart3, Database, Zap, GraduationCap,
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'services' });
  return { title: t('title') };
}

export default async function ServicesPage({ params: { locale } }: { params: { locale: string } }) {
  const services = hasPostgresDatabaseUrl()
    ? await prisma.service.findMany({ where: { status: 'published' }, orderBy: { order: 'asc' } }).catch(() => [])
    : [];
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <MainLayout>
      <section className="bg-gradient-to-br from-brand-blue to-brand-teal py-24 text-white">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{isAr ? 'خدماتنا المتخصصة' : 'Our Specialized Services'}</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            {isAr ? 'طيف شامل من خدمات الترميز الطبي وإدارة المعلومات الصحية' : 'A comprehensive range of medical coding and health information management services'}
          </p>
        </div>
      </section>

      <section className="py-20 bg-brand-light">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = ICONS[service.icon] || FileText;
              const title = isAr ? service.titleAr : service.titleEn;
              const desc = isAr ? service.descriptionAr : service.descriptionEn;
              return (
                <Link key={service.id} href={`/${locale}/services/${service.slug}`} className="card group cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-brand-gradient flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-3">{title}</h3>
                  <p className="text-brand-gray text-sm leading-relaxed">{desc}</p>
                  <div className="flex items-center gap-1 mt-5 text-brand-blue text-sm font-semibold group-hover:gap-2 transition-all">
                    {isAr ? 'اقرأ المزيد' : 'Learn More'} <Arrow size={15} />
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
