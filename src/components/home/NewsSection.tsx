import Link from 'next/link';

interface NewsPost {
  id: string; slug: string; titleAr: string; titleEn: string;
  summaryAr: string; summaryEn: string; imageUrl: string;
  category: string; publishedAt: string | Date;
}

export default function NewsSection({ posts, locale }: { posts: NewsPost[]; locale: string }) {
  const isAr = locale === 'ar';
  if (!posts.length) return null;

  const [featured, ...rest] = posts;

  const formatDate = (d: string | Date) =>
    new Date(d).toLocaleDateString(isAr ? 'ar-SA' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <section className="py-24 bg-[#060d1b]">
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0EA5E9]/20 to-transparent" />
      <div className="container-custom">
        {/* Header */}
        <div className={`flex items-end justify-between mb-12 ${isAr ? 'flex-row-reverse' : ''}`}>
          <div className={isAr ? 'text-right' : 'text-left'}>
            <div className="inline-flex items-center gap-2 border border-[#34D399]/30 bg-[#34D399]/10 rounded-full px-4 py-2 text-sm text-[#34D399] mb-4">
              {isAr ? 'آخر الأخبار' : 'Latest News'}
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white">
              {isAr ? 'أحدث' : 'Our Latest'}{' '}
              <span className="bg-gradient-to-r from-[#34D399] to-[#0EA5E9] bg-clip-text text-transparent">
                {isAr ? 'الأخبار والمستجدات' : 'News & Updates'}
              </span>
            </h2>
          </div>
          <Link href={`/${locale}/news`}
            className="text-sm text-[#0EA5E9] hover:text-white border border-[#0EA5E9]/30 rounded-lg px-4 py-2 transition-colors shrink-0">
            {isAr ? 'جميع الأخبار ←' : '→ All News'}
          </Link>
        </div>

        {/* Grid layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Featured large card */}
          <div className="lg:col-span-2 group relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 hover:border-[#0EA5E9]/30 transition-all duration-300">
            <div className="aspect-[16/9] relative overflow-hidden">
              {featured.imageUrl ? (
                <img src={featured.imageUrl} alt={isAr ? featured.titleAr : featured.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#1B3FAB]/40 to-[#0EA5E9]/20 flex items-center justify-center">
                  <span className="text-6xl opacity-30">📰</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050d1a] via-transparent to-transparent" />
              <div className={`absolute top-4 ${isAr ? 'right-4' : 'left-4'}`}>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0EA5E9] text-white">
                  {featured.category}
                </span>
              </div>
            </div>
            <div className={`p-6 ${isAr ? 'text-right' : 'text-left'}`}>
              <p className="text-slate-500 text-xs mb-2">{formatDate(featured.publishedAt)}</p>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#0EA5E9] transition-colors leading-snug">
                {isAr ? featured.titleAr : featured.titleEn}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                {isAr ? featured.summaryAr : featured.summaryEn}
              </p>
              <div className={`mt-4 flex ${isAr ? 'justify-end' : 'justify-start'}`}>
                <Link href={`/${locale}/news/${featured.slug}`}
                  className="inline-flex items-center gap-2 text-[#0EA5E9] text-sm font-medium hover:gap-3 transition-all">
                  {isAr ? 'اقرأ المزيد ←' : '→ Read More'}
                </Link>
              </div>
            </div>
          </div>

          {/* Side small cards */}
          <div className="flex flex-col gap-4">
            {rest.slice(0, 3).map(post => (
              <Link key={post.id} href={`/${locale}/news/${post.slug}`}
                className="group flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 hover:border-[#0EA5E9]/30 hover:bg-white/8 transition-all duration-300">
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                  {post.imageUrl ? (
                    <img src={post.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#1B3FAB]/40 to-[#0EA5E9]/20 flex items-center justify-center text-2xl">📰</div>
                  )}
                </div>
                <div className={`flex-1 ${isAr ? 'text-right' : 'text-left'}`}>
                  <p className="text-slate-500 text-xs mb-1">{formatDate(post.publishedAt)}</p>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#0EA5E9] transition-colors leading-snug line-clamp-2">
                    {isAr ? post.titleAr : post.titleEn}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
