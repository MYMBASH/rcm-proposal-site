import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { hasPostgresDatabaseUrl, prisma } from '@/lib/prisma';
import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import ServicesSection from '@/components/home/ServicesSection';
import SolutionsSection from '@/components/home/SolutionsSection';
import WhyUsSection from '@/components/home/WhyUsSection';
import CustomersCarousel from '@/components/home/CustomersCarousel';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import NewsSection from '@/components/home/NewsSection';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: 'DigiMind - Medical Coding & Healthcare Solutions',
    description: locale === 'ar'
      ? 'ديجيمايند - حلول الترميز الطبي وإدارة المعلومات الصحية'
      : 'DigiMind - Medical Coding & Healthcare Information Management Solutions',
    alternates: { canonical: `/${locale}` },
    openGraph: {
      title: 'DigiMind - Medical Coding & Healthcare Solutions',
      type: 'website',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
    },
  };
}

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const hasDb = hasPostgresDatabaseUrl();

  // Fetch base data (always available)
  const customers = hasDb
    ? await prisma.customer.findMany({ orderBy: { order: 'asc' } }).catch(() => [])
    : [];

  // Fetch new-model data safely — these require prisma migrate to be run
  const db = hasDb ? prisma as any : null;
  const testimonials = db
    ? await (db.testimonial?.findMany({
        where: { status: 'published' },
        orderBy: { order: 'asc' },
      }) ?? Promise.resolve([])).catch(() => [])
    : [];

  const newsPosts = db
    ? await (db.newsPost?.findMany({
        where: { status: 'published' },
        orderBy: { publishedAt: 'desc' },
        take: 4,
      }) ?? Promise.resolve([])).catch(() => [])
    : [];

  return (
    <MainLayout>
      <HeroSection />
      <StatsSection />
      <ServicesSection locale={locale} />
      <SolutionsSection locale={locale} />
      <WhyUsSection locale={locale} />
      <CustomersCarousel customers={customers} locale={locale} />
      {testimonials.length > 0 && <TestimonialsSection testimonials={testimonials} locale={locale} />}
      {newsPosts.length > 0 && <NewsSection posts={newsPosts} locale={locale} />}
    </MainLayout>
  );
}
