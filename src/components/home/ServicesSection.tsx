import Link from 'next/link';
import { hasPostgresDatabaseUrl, prisma } from '@/lib/prisma';
import { type LucideIcon, FileText, TrendingUp, BarChart3, Database, Zap, GraduationCap, ArrowLeft, ArrowRight } from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  FileText, TrendingUp, BarChart3, Database, Zap, GraduationCap,
};

async function getServices(locale: string) {
  if (!hasPostgresDatabaseUrl()) return [];

  const services = await prisma.service.findMany({
    where: { status: 'published' },
    orderBy: { order: 'asc' },
    take: 6,
  });
  return services;
}

export default async function ServicesSection({ locale }: { locale: string }) {
  const services = await getServices(locale);
  const isAr = locale === 'ar';

  return (
    <section className="py-24 bg-brand-light">
      <div className="container-custom">
        <div className={`mb-16 ${isAr ? 'text-right' : 'text-left'}`}>
          <div className="inline-flex items-center gap-2 bg-brand-blue/10 text-brand-blue rounded-full px-4 py-2 text-sm font-semibold mb-4">
            {isAr ? 'ما نقدمه' : 'What We Offer'}
          </div>
          <h2 className="section-title">
            {isAr ? 'خدماتنا المتخصصة' : 'Our Specialized Services'}
          </h2>
          <p className="section-subtitle mt-3">
            {isAr
              ? 'نقدم طيفاً شاملاً من الخدمات في مجال الترميز الطبي وإدارة المعلومات الصحية'
              : 'A comprehensive range of medical coding and health information management services'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const Icon = ICONS[service.icon] || FileText;
            const title = isAr ? service.titleAr : service.titleEn;
            const desc = isAr ? service.descriptionAr : service.descriptionEn;
            return (
              <Link
                key={service.id}
                href={`/${locale}/services/${service.slug}`}
                className="card group cursor-pointer"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-brand-gradient flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">{title}</h3>
                <p className="text-brand-gray text-sm leading-relaxed line-clamp-3">{desc}</p>
                <div className="flex items-center gap-1 mt-5 text-brand-blue text-sm font-semibold group-hover:gap-2 transition-all">
                  {isAr ? 'اقرأ المزيد' : 'Learn More'}
                  {isAr ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href={`/${locale}/services`} className="btn-secondary">
            {isAr ? 'عرض جميع الخدمات' : 'View All Services'}
          </Link>
        </div>
      </div>
    </section>
  );
}
