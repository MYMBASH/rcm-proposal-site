import { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import { prisma } from '@/lib/prisma';
import JobApplicationForm from '@/components/shared/JobApplicationForm';
import { MapPin, Clock, Briefcase } from 'lucide-react';

export const metadata: Metadata = { title: 'الوظائف | DigiMind' };

const TYPE_LABELS: Record<string, { ar: string; en: string }> = {
  'full-time':  { ar: 'دوام كامل',  en: 'Full-Time' },
  'part-time':  { ar: 'دوام جزئي',  en: 'Part-Time' },
  'contract':   { ar: 'عقد مؤقت',   en: 'Contract'  },
  'internship': { ar: 'تدريب',       en: 'Internship'},
};

export default async function CareersPage({ params: { locale } }: { params: { locale: string } }) {
  const isAr = locale === 'ar';
  const jobs = await prisma.jobPosting.findMany({
    where: { status: 'open' },
    orderBy: { createdAt: 'asc' },
  });

  return (
    <MainLayout>
      {/* Hero */}
      <section className="relative bg-[#050d1a] py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#050d1a] via-[#0a1628] to-[#0d1f3c]" />
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#7c3aed]/10 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="relative z-10 container-custom text-center">
          <div className="inline-flex items-center gap-2 border border-[#a855f7]/40 bg-[#a855f7]/10 rounded-full px-4 py-2 text-sm text-[#a855f7] mb-6">
            {isAr ? 'انضم إلى فريقنا' : 'Join Our Team'}
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            {isAr ? 'وظائف ' : 'Career '}
            <span className="bg-gradient-to-r from-[#a855f7] to-[#0EA5E9] bg-clip-text text-transparent">
              {isAr ? 'ديجيمايند' : 'Opportunities'}
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            {isAr
              ? 'كن جزءاً من الفريق الرائد في حلول الرعاية الصحية الرقمية بالمملكة العربية السعودية'
              : 'Be part of the leading team in digital healthcare solutions in Saudi Arabia'}
          </p>
        </div>
      </section>

      {/* Jobs list */}
      <section className="py-20 bg-[#060d1b]">
        <div className="container-custom">
          {jobs.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <div className="text-5xl mb-4">📋</div>
              <p>{isAr ? 'لا توجد وظائف متاحة حالياً، تابعونا للمزيد.' : 'No open positions at the moment. Stay tuned!'}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map(job => {
                const title = isAr ? job.titleAr : job.titleEn;
                const desc  = isAr ? job.descriptionAr : job.descriptionEn;
                const loc   = isAr ? job.locationAr : job.locationEn;
                const typeLabel = TYPE_LABELS[job.type] ?? { ar: job.type, en: job.type };

                return (
                  <details key={job.id} className="group rounded-2xl border border-white/10 bg-white/5 hover:border-[#a855f7]/30 transition-all overflow-hidden">
                    <summary className="flex items-start justify-between gap-4 p-6 cursor-pointer list-none">
                      <div className={`${isAr ? 'text-right' : 'text-left'} flex-1`}>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#a855f7] transition-colors">
                          {title}
                        </h3>
                        <div className="flex flex-wrap gap-3 text-sm text-slate-400">
                          {loc && (
                            <span className="flex items-center gap-1">
                              <MapPin size={14} className="text-[#0EA5E9]" />
                              {loc}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock size={14} className="text-[#34D399]" />
                            {isAr ? typeLabel.ar : typeLabel.en}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase size={14} className="text-[#a855f7]" />
                            {isAr ? 'متاحة' : 'Open'}
                          </span>
                        </div>
                      </div>
                      <div className="shrink-0 px-4 py-2 rounded-xl bg-[#a855f7]/20 border border-[#a855f7]/30 text-[#a855f7] text-sm font-bold group-open:hidden">
                        {isAr ? 'تقدم الآن' : 'Apply Now'}
                      </div>
                      <div className="shrink-0 px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-slate-400 text-sm hidden group-open:block">
                        {isAr ? 'إغلاق' : 'Close'}
                      </div>
                    </summary>

                    <div className="px-6 pb-6 border-t border-white/5 pt-4 space-y-6">
                      {desc && (
                        <div className={isAr ? 'text-right' : 'text-left'}>
                          <h4 className="text-white font-bold mb-2">{isAr ? 'وصف الوظيفة' : 'Job Description'}</h4>
                          <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">{desc}</p>
                        </div>
                      )}
                      <JobApplicationForm jobId={job.id} jobTitle={title} locale={locale} />
                    </div>
                  </details>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
