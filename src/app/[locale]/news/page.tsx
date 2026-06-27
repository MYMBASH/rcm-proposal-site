import { Metadata } from 'next';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { prisma } from '@/lib/prisma';
import { Calendar, Tag, ArrowLeft, ArrowRight } from 'lucide-react';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return { title: locale === 'ar' ? 'الأخبار والفعاليات | DigiMind' : 'News & Events | DigiMind' };
}

const CATEGORY_LABELS: Record<string, { ar: string; en: string; color: string }> = {
  news:         { ar: 'أخبار',    en: 'News',         color: 'bg-blue-100 text-blue-700' },
  events:       { ar: 'فعاليات', en: 'Events',       color: 'bg-purple-100 text-purple-700' },
  announcement: { ar: 'إعلانات', en: 'Announcement', color: 'bg-emerald-100 text-emerald-700' },
};

export default async function NewsPage({ params: { locale } }: { params: { locale: string } }) {
  const isAr = locale === 'ar';
  const posts = await prisma.newsPost.findMany({
    where: { status: 'published' },
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <MainLayout>
      {/* Hero */}
      <section className="relative bg-[#050d1a] py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#050d1a] via-[#0a1628] to-[#0d1f3c]" />
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#0EA5E9]/10 rounded-full blur-[120px]" />
        <div className="relative z-10 container-custom text-center">
          <div className="inline-flex items-center gap-2 border border-[#0EA5E9]/40 bg-[#0EA5E9]/10 rounded-full px-4 py-2 text-sm text-[#0EA5E9] mb-6">
            {isAr ? 'آخر المستجدات' : 'Latest Updates'}
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            {isAr ? 'الأخبار' : 'News'}{' '}
            <span className="bg-gradient-to-r from-[#0EA5E9] to-[#34D399] bg-clip-text text-transparent">
              {isAr ? 'والفعاليات' : '& Events'}
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            {isAr
              ? 'تابع آخر أخبار ديجيمايند وفعالياتها ومستجداتها في مجال الرعاية الصحية الرقمية'
              : 'Stay up to date with DigiMind latest news, events, and digital healthcare developments'}
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-20 bg-[#060d1b] min-h-[60vh]">
        <div className="container-custom">
          {posts.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <div className="text-5xl mb-4">📰</div>
              <p>{isAr ? 'لا توجد أخبار حالياً.' : 'No news available yet.'}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(post => {
                const title   = isAr ? post.titleAr   : post.titleEn;
                const summary = isAr ? post.summaryAr : post.summaryEn;
                const cat     = CATEGORY_LABELS[post.category] ?? CATEGORY_LABELS.news;
                const date    = new Date(post.publishedAt).toLocaleDateString(isAr ? 'ar-SA' : 'en-US', { year:'numeric', month:'long', day:'numeric' });
                const Arrow   = isAr ? ArrowLeft : ArrowRight;

                return (
                  <article key={post.id} className="group rounded-2xl border border-white/10 bg-white/5 hover:border-[#0EA5E9]/30 overflow-hidden transition-all hover:-translate-y-1 duration-300">
                    {post.imageUrl ? (
                      <div className="h-48 overflow-hidden">
                        <img src={post.imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-[#1B3FAB]/30 to-[#0EA5E9]/20 flex items-center justify-center text-5xl">
                        {post.category === 'events' ? '🎪' : post.category === 'announcement' ? '📢' : '📰'}
                      </div>
                    )}
                    <div className="p-6">
                      <div className={`flex items-center gap-3 mb-3 ${isAr ? 'flex-row-reverse justify-end' : ''}`}>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cat.color}`}>
                          <Tag size={10} className="inline mr-1" />{isAr ? cat.ar : cat.en}
                        </span>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Calendar size={11} />{date}
                        </span>
                      </div>
                      <h2 className={`text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-[#0EA5E9] transition-colors ${isAr ? 'text-right' : 'text-left'}`}>
                        {title}
                      </h2>
                      {summary && (
                        <p className={`text-slate-400 text-sm leading-relaxed line-clamp-3 mb-4 ${isAr ? 'text-right' : 'text-left'}`}>
                          {summary}
                        </p>
                      )}
                      <Link
                        href={`/${locale}/news/${post.slug}`}
                        className={`inline-flex items-center gap-1.5 text-[#0EA5E9] text-sm font-semibold hover:gap-3 transition-all ${isAr ? 'flex-row-reverse' : ''}`}
                      >
                        {isAr ? 'اقرأ المزيد' : 'Read More'}
                        <Arrow size={15} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
