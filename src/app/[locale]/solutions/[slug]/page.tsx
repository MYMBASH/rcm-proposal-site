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
    const solutions = await prisma.solution.findMany({ select: { slug: true } });
    const locales = ['ar', 'en'];
    return locales.flatMap((locale) => solutions.map((s) => ({ locale, slug: s.slug })));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params: { locale, slug } }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const solution = await prisma.solution.findUnique({ where: { slug } });
  if (!solution) return {};
  return { title: locale === 'ar' ? solution.titleAr : solution.titleEn };
}

export default async function SolutionDetailPage({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  const solution = await prisma.solution.findUnique({ where: { slug } });
  if (!solution) notFound();
  const isAr = locale === 'ar';
  const title = isAr ? solution.titleAr : solution.titleEn;
  const desc = isAr ? solution.descriptionAr : solution.descriptionEn;

  const features = isAr
    ? ['واجهة سهلة الاستخدام باللغة العربية', 'تكامل مع أنظمة المستشفيات الحالية', 'تقارير وتحليلات متقدمة', 'أمان وحماية البيانات بمعايير دولية', 'تحديثات مستمرة تلقائية', 'تدريب وتأهيل كامل للفريق']
    : ['User-friendly Arabic interface', 'Integration with existing hospital systems', 'Advanced reports and analytics', 'Data security with international standards', 'Continuous automatic updates', 'Full team training and qualification'];

  return (
    <MainLayout>
      <section className="relative bg-[#050d1a] py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#050d1a] via-[#0a1628] to-[#071a2e]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#34D399]/50 to-transparent" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-[#059669]/10 rounded-full blur-[100px] -translate-y-1/2" />
        <div className="relative z-10 container-custom">
          <Link href={`/${locale}/solutions`}
            className="inline-flex items-center gap-2 text-[#34D399] hover:text-white mb-8 text-sm transition-colors group">
            {isAr ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
            {isAr ? 'العودة إلى الحلول' : 'Back to Solutions'}
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#0EA5E9]/40 bg-[#0EA5E9]/10 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#0EA5E9] animate-pulse" />
            <span className="text-[#0EA5E9] text-xs font-medium">{isAr ? 'حل متكامل' : 'Integrated Solution'}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight max-w-2xl">{title}</h1>
        </div>
      </section>

      <section className="py-20 bg-[#060d1b]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className={`${isAr ? 'lg:order-2' : 'lg:order-1'}`}>
              {solution.videoUrl ? (
                <div className="rounded-2xl overflow-hidden aspect-video shadow-2xl shadow-black/50">
                  <video src={solution.videoUrl} controls className="w-full h-full object-cover" />
                </div>
              ) : solution.imageUrl ? (
                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
                  <img src={solution.imageUrl} alt={title} className="w-full object-cover rounded-2xl" />
                </div>
              ) : (
                <ServiceIllustration slug={slug} title={title} />
              )}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { val: '500+', label: isAr ? 'عميل' : 'Clients' },
                  { val: '99.9%', label: isAr ? 'تشغيل' : 'Uptime' },
                  { val: '< 2s', label: isAr ? 'استجابة' : 'Response' },
                ].map(s => (
                  <div key={s.label} className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                    <div className="text-xl font-black bg-gradient-to-r from-[#34D399] to-[#0EA5E9] bg-clip-text text-transparent">{s.val}</div>
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
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-bold text-white mb-5">{isAr ? 'مميزات الحل' : 'Solution Features'}</h3>
                <div className="space-y-3">
                  {features.map((f) => (
                    <div key={f} className={`flex items-start gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                      <CheckCircle2 size={18} className="text-[#34D399] shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-sm">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-[#059669]/40 bg-[#059669]/10 p-6 space-y-4">
                <h3 className="text-lg font-bold text-white">{isAr ? 'ابدأ مع هذا الحل اليوم' : 'Start with this solution today'}</h3>
                <p className="text-slate-400 text-sm">{isAr ? 'تواصل مع فريقنا للحصول على عرض توضيحي مجاني.' : 'Contact our team for a free demo.'}</p>
                <div className={`flex flex-wrap gap-3 ${isAr ? 'justify-end' : 'justify-start'}`}>
                  <Link href={`/${locale}/contact`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#059669] to-[#0EA5E9] hover:from-[#10b981] hover:to-[#38bdf8] shadow-lg shadow-[#059669]/30 transition-all duration-300 hover:-translate-y-0.5">
                    {isAr ? 'طلب عرض توضيحي' : 'Request Demo'}
                  </Link>
                  <a href="tel:+966" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white border border-white/20 hover:border-[#34D399]/50 hover:bg-white/5 transition-all duration-300">
                    <Phone size={16} />
                    {isAr ? 'اتصل بنا' : 'Call Us'}
                  </a>
                </div>
                {solution.pdfUrl && (
                  <a href={solution.pdfUrl} download target="_blank" rel="noopener noreferrer"
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
          <h2 className="text-2xl font-bold text-white mb-8">{isAr ? 'استكشف حلولنا الأخرى' : 'Explore Our Other Solutions'}</h2>
          <Link href={`/${locale}/solutions`}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-white/20 text-white hover:border-[#34D399]/50 hover:bg-white/5 transition-all">
            {isAr ? 'جميع الحلول' : 'All Solutions'}
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}
