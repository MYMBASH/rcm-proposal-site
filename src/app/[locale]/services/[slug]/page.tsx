import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { hasPostgresDatabaseUrl, prisma } from '@/lib/prisma';
import { ArrowLeft, ArrowRight, CheckCircle2, Phone, Download } from 'lucide-react';
import ServiceIllustration from '@/components/shared/ServiceIllustration';
import SocialShare from '@/components/shared/SocialShare';

export async function generateStaticParams() {
  if (!hasPostgresDatabaseUrl()) return [];

  try {
    const services = await prisma.service.findMany({ select: { slug: true } });
    const locales = ['ar', 'en'];
    return locales.flatMap((locale) => services.map((s) => ({ locale, slug: s.slug })));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params: { locale, slug } }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const service = await prisma.service.findUnique({ where: { slug } });
  if (!service) return {};
  return { title: locale === 'ar' ? service.titleAr : service.titleEn };
}

export default async function ServiceDetailPage({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  const service = await prisma.service.findUnique({ where: { slug } });
  if (!service) notFound();
  const isAr = locale === 'ar';
  const title = isAr ? service.titleAr : service.titleEn;
  const desc = isAr ? service.descriptionAr : service.descriptionEn;

  const features = isAr
    ? ['دقة عالية في الترميز تصل إلى 98%', 'امتثال كامل للمعايير الدولية ICD-10', 'تقارير تفصيلية ولحظية', 'فريق متخصص ومعتمد دولياً', 'دعم فني مستمر 24/7', 'تسليم سريع وفق الجدول الزمني']
    : ['High coding accuracy up to 98%', 'Full compliance with ICD-10 international standards', 'Detailed and real-time reports', 'Specialized and internationally certified team', 'Continuous 24/7 technical support', 'Fast delivery according to schedule'];

  return (
    <MainLayout>
      {/* Hero */}
      <section className="relative bg-[#050d1a] py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#050d1a] via-[#0a1628] to-[#0d1f3c]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0EA5E9]/50 to-transparent" />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#1B3FAB]/15 rounded-full blur-[100px] -translate-y-1/2" />
        <div className="relative z-10 container-custom">
          <Link href={`/${locale}/services`}
            className="inline-flex items-center gap-2 text-[#0EA5E9] hover:text-white mb-8 text-sm transition-colors group">
            {isAr ? <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> : <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
            {isAr ? 'العودة إلى الخدمات' : 'Back to Services'}
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#34D399]/40 bg-[#34D399]/10 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
            <span className="text-[#34D399] text-xs font-medium">{isAr ? 'خدمة معتمدة' : 'Certified Service'}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight max-w-2xl">{title}</h1>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 bg-[#060d1b]">
        <div className="container-custom">
          <div className={`grid lg:grid-cols-2 gap-12 items-start`}>
            <div className={`${isAr ? 'lg:order-2' : 'lg:order-1'}`}>
              {service.videoUrl ? (
                <div className="rounded-2xl overflow-hidden aspect-video shadow-2xl shadow-black/50">
                  <video src={service.videoUrl} controls className="w-full h-full object-cover" />
                </div>
              ) : service.imageUrl ? (
                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
                  <img src={service.imageUrl} alt={title} className="w-full object-cover rounded-2xl" />
                </div>
              ) : (
                <ServiceIllustration slug={slug} title={title} />
              )}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { val: '98%', label: isAr ? 'دقة' : 'Accuracy' },
                  { val: '10+', label: isAr ? 'سنوات' : 'Years' },
                  { val: '24/7', label: isAr ? 'دعم' : 'Support' },
                ].map(s => (
                  <div key={s.label} className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                    <div className="text-xl font-black bg-gradient-to-r from-[#0EA5E9] to-[#34D399] bg-clip-text text-transparent">{s.val}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${isAr ? 'lg:order-1 text-right' : 'lg:order-2 text-left'} space-y-8`}>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">{isAr ? 'نظرة عامة' : 'Overview'}</h2>
                <p className="text-slate-400 leading-relaxed text-lg">{desc}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                <h3 className="text-lg font-bold text-white mb-5">{isAr ? 'المميزات الرئيسية' : 'Key Features'}</h3>
                <div className="space-y-3">
                  {features.map((f) => (
                    <div key={f} className={`flex items-start gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                      <CheckCircle2 size={18} className="text-[#34D399] shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-sm">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-[#1B3FAB]/40 bg-[#1B3FAB]/10 p-6 space-y-4">
                <h3 className="text-lg font-bold text-white">{isAr ? 'هل أنت مهتم بهذه الخدمة؟' : 'Interested in this service?'}</h3>
                <p className="text-slate-400 text-sm">{isAr ? 'تواصل معنا الآن للحصول على استشارة مجانية.' : 'Contact us now for a free consultation and custom quote.'}</p>
                <div className={`flex flex-wrap gap-3 ${isAr ? 'justify-end' : 'justify-start'}`}>
                  <Link href={`/${locale}/contact`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#1B3FAB] to-[#0EA5E9] hover:from-[#2563EB] hover:to-[#38bdf8] shadow-lg shadow-[#1B3FAB]/30 transition-all duration-300 hover:-translate-y-0.5">
                    {isAr ? 'احجز استشارة مجانية' : 'Book Free Consultation'}
                  </Link>
                  <a href="tel:+966" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white border border-white/20 hover:border-[#0EA5E9]/50 hover:bg-white/5 transition-all duration-300">
                    <Phone size={16} />
                    {isAr ? 'اتصل بنا' : 'Call Us'}
                  </a>
                </div>
                {service.pdfUrl && (
                  <a href={service.pdfUrl} download target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#34D399]/40 bg-[#34D399]/10 text-[#34D399] hover:bg-[#34D399]/20 transition-all text-sm font-medium">
                    <Download size={15} />
                    {isAr ? 'تحميل نظرة عامة PDF' : 'Download PDF Overview'}
                  </a>
                )}
                <SocialShare title={title} locale={locale} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#050d1a] border-t border-white/5">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold text-white mb-8">{isAr ? 'استكشف خدماتنا الأخرى' : 'Explore Our Other Services'}</h2>
          <Link href={`/${locale}/services`}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-white/20 text-white hover:border-[#0EA5E9]/50 hover:bg-white/5 transition-all">
            {isAr ? '← جميع الخدمات' : 'All Services →'}
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}
