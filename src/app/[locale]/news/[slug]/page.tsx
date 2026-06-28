import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { hasPostgresDatabaseUrl, prisma } from '@/lib/prisma';
import { Calendar, Tag, ArrowLeft, ArrowRight, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

type Props = { params: { locale: string; slug: string } };

const CATEGORY_LABELS: Record<string, { ar: string; en: string; color: string }> = {
  news:         { ar: 'أخبار',    en: 'News',         color: 'bg-blue-100 text-blue-700' },
  events:       { ar: 'فعاليات', en: 'Events',       color: 'bg-purple-100 text-purple-700' },
  announcement: { ar: 'إعلانات', en: 'Announcement', color: 'bg-emerald-100 text-emerald-700' },
};

export async function generateStaticParams() {
  if (!hasPostgresDatabaseUrl()) return [];

  try {
    const posts = await prisma.newsPost.findMany({ select: { slug: true } });
    return posts.flatMap(p => [{ locale: 'ar', slug: p.slug }, { locale: 'en', slug: p.slug }]);
  } catch {
    return [];
  }
}

export async function generateMetadata({ params: { locale, slug } }: Props): Promise<Metadata> {
  const post = hasPostgresDatabaseUrl()
    ? await prisma.newsPost.findUnique({ where: { slug } }).catch(() => null)
    : null;
  if (!post) return { title: 'Not Found' };
  const isAr = locale === 'ar';
  const title   = isAr ? post.titleAr   : post.titleEn;
  const desc    = isAr ? post.summaryAr : post.summaryEn;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://digimind.sa';
  const url     = `${siteUrl}/${locale}/news/${slug}`;
  const image   = post.imageUrl || `${siteUrl}/og-default.png`;

  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      url,
      type: 'article',
      locale: isAr ? 'ar_SA' : 'en_US',
      siteName: 'DigiMind',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      publishedTime: post.publishedAt.toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
      images: [image],
      site: '@digimind_sa',
    },
    alternates: { canonical: url },
  };
}

export default async function NewsArticlePage({ params: { locale, slug } }: Props) {
  const post = hasPostgresDatabaseUrl()
    ? await prisma.newsPost.findUnique({ where: { slug } }).catch(() => null)
    : null;
  if (!post || post.status !== 'published') notFound();

  const isAr    = locale === 'ar';
  const title   = isAr ? post.titleAr   : post.titleEn;
  const summary = isAr ? post.summaryAr : post.summaryEn;
  const content = isAr ? post.contentAr : post.contentEn;
  const cat     = CATEGORY_LABELS[post.category] ?? CATEGORY_LABELS.news;
  const date    = new Date(post.publishedAt).toLocaleDateString(isAr ? 'ar-SA' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const Arrow   = isAr ? ArrowRight : ArrowLeft;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://digimind.sa';
  const pageUrl = encodeURIComponent(`${siteUrl}/${locale}/news/${slug}`);
  const pageTitle = encodeURIComponent(title);

  return (
    <MainLayout>
      {/* Hero */}
      <section className="relative bg-[#050d1a] pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#050d1a] via-[#0a1628] to-[#0d1f3c]" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#0EA5E9]/10 rounded-full blur-[120px]" />
        <div className="relative z-10 container-custom max-w-4xl">
          <Link href={`/${locale}/news`} className={`inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors ${isAr ? 'flex-row-reverse' : ''}`}>
            <Arrow size={16} />
            {isAr ? 'العودة إلى الأخبار' : 'Back to News'}
          </Link>
          <div className={`flex items-center gap-3 mb-6 ${isAr ? 'flex-row-reverse' : ''}`}>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${cat.color}`}>
              <Tag size={10} className="inline mr-1" />{isAr ? cat.ar : cat.en}
            </span>
            <span className="text-slate-400 text-sm flex items-center gap-1">
              <Calendar size={13} />{date}
            </span>
          </div>
          <h1 className={`text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-6 ${isAr ? 'text-right' : 'text-left'}`}>
            {title}
          </h1>
          {summary && (
            <p className={`text-xl text-slate-300 leading-relaxed ${isAr ? 'text-right' : 'text-left'}`}>
              {summary}
            </p>
          )}
        </div>
      </section>

      {/* Featured image */}
      {post.imageUrl && (
        <div className="bg-[#060d1b]">
          <div className="container-custom max-w-4xl py-8">
            <img src={post.imageUrl} alt={title} className="w-full rounded-2xl shadow-2xl max-h-[480px] object-cover" />
          </div>
        </div>
      )}

      {/* Content */}
      <section className="py-16 bg-[#060d1b]">
        <div className="container-custom max-w-4xl">
          <div className="grid lg:grid-cols-[1fr_280px] gap-12">
            {/* Main content */}
            <article className={`prose prose-invert prose-lg max-w-none ${isAr ? 'text-right' : 'text-left'}`}
              style={{ direction: isAr ? 'rtl' : 'ltr' }}>
              {content ? (
                <div className="text-slate-300 leading-relaxed whitespace-pre-line text-base">
                  {content}
                </div>
              ) : (
                <p className="text-slate-400">{summary}</p>
              )}

              {post.videoUrl && (
                <div className="mt-8 rounded-2xl overflow-hidden border border-white/10">
                  <video src={post.videoUrl} controls className="w-full" />
                </div>
              )}
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Share */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className={`text-white font-bold mb-4 flex items-center gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <Share2 size={16} className="text-[#0EA5E9]" />
                  {isAr ? 'شارك المقال' : 'Share Article'}
                </h3>
                <div className="space-y-3">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl bg-[#1877F2]/20 hover:bg-[#1877F2]/30 text-[#1877F2] text-sm font-semibold transition-colors"
                  >
                    <Facebook size={16} /> Facebook
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl bg-[#1DA1F2]/20 hover:bg-[#1DA1F2]/30 text-[#1DA1F2] text-sm font-semibold transition-colors"
                  >
                    <Twitter size={16} /> Twitter / X
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl bg-[#0A66C2]/20 hover:bg-[#0A66C2]/30 text-[#0A66C2] text-sm font-semibold transition-colors"
                  >
                    <Linkedin size={16} /> LinkedIn
                  </a>
                  <a
                    href={`https://wa.me/?text=${pageTitle}%20${pageUrl}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] text-sm font-semibold transition-colors"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* Back */}
              <Link href={`/${locale}/news`}
                className={`flex items-center gap-2 w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-sm font-medium transition-colors ${isAr ? 'flex-row-reverse' : ''}`}>
                <Arrow size={15} />
                {isAr ? 'جميع الأخبار' : 'All News'}
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
