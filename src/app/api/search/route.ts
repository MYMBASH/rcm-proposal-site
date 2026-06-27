import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const q = new URL(req.url).searchParams.get('q')?.trim() || '';
  if (q.length < 2) return NextResponse.json({ results: [] });

  const [services, solutions, news] = await Promise.all([
    prisma.service.findMany({
      where: { status: 'published', OR: [{ titleAr: { contains: q } }, { titleEn: { contains: q } }, { descriptionAr: { contains: q } }, { descriptionEn: { contains: q } }] },
      select: { slug: true, titleAr: true, titleEn: true, descriptionAr: true, descriptionEn: true },
    }),
    prisma.solution.findMany({
      where: { status: 'published', OR: [{ titleAr: { contains: q } }, { titleEn: { contains: q } }, { descriptionAr: { contains: q } }, { descriptionEn: { contains: q } }] },
      select: { slug: true, titleAr: true, titleEn: true, descriptionAr: true, descriptionEn: true },
    }),
    prisma.newsPost.findMany({
      where: { status: 'published', OR: [{ titleAr: { contains: q } }, { titleEn: { contains: q } }, { summaryAr: { contains: q } }, { summaryEn: { contains: q } }] },
      select: { id: true, slug: true, titleAr: true, titleEn: true, summaryAr: true, summaryEn: true },
      take: 5,
    }),
  ]);

  const results = [
    ...services.map(s => ({ type: 'service', slug: s.slug, titleAr: s.titleAr, titleEn: s.titleEn, descAr: s.descriptionAr.slice(0, 100), descEn: s.descriptionEn.slice(0, 100) })),
    ...solutions.map(s => ({ type: 'solution', slug: s.slug, titleAr: s.titleAr, titleEn: s.titleEn, descAr: s.descriptionAr.slice(0, 100), descEn: s.descriptionEn.slice(0, 100) })),
    ...news.map(n => ({ type: 'news', slug: n.slug, titleAr: n.titleAr, titleEn: n.titleEn, descAr: n.summaryAr.slice(0, 100), descEn: n.summaryEn.slice(0, 100) })),
  ];

  return NextResponse.json({ results });
}
