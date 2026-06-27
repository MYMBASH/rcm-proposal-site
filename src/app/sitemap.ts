import { MetadataRoute } from 'next';
import { hasPostgresDatabaseUrl, prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://digimind.sa';
const locales = ['ar', 'en'];
const staticRoutes = ['', '/about', '/services', '/solutions', '/customers', '/partners', '/contact'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, solutions] = hasPostgresDatabaseUrl()
    ? await Promise.all([
        prisma.service.findMany({ where: { status: 'published' }, select: { slug: true, updatedAt: true } }).catch(() => []),
        prisma.solution.findMany({ where: { status: 'published' }, select: { slug: true, updatedAt: true } }).catch(() => []),
      ])
    : [[], []];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({ url: `${BASE_URL}/${locale}${route}`, lastModified: new Date(), alternates: { languages: { ar: `${BASE_URL}/ar${route}`, en: `${BASE_URL}/en${route}` } } });
    }
    for (const s of services) {
      entries.push({ url: `${BASE_URL}/${locale}/services/${s.slug}`, lastModified: s.updatedAt });
    }
    for (const s of solutions) {
      entries.push({ url: `${BASE_URL}/${locale}/solutions/${s.slug}`, lastModified: s.updatedAt });
    }
  }

  return entries;
}
