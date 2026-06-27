import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get('limit') || 100);
  const all = searchParams.get('all') === '1';
  const where = all ? {} : { status: 'published' };
  const items = await prisma.newsPost.findMany({ where, orderBy: { publishedAt: 'desc' }, take: limit });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const err = await requireAdmin(req); if (err) return err;
  const raw = await req.json();
  const { id: _id, createdAt: _c, updatedAt: _u, ...data } = raw;
  if (!data.slug) data.slug = (data.titleEn || '').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') + '-' + Date.now();
  if (data.publishedAt && typeof data.publishedAt === 'string') data.publishedAt = new Date(data.publishedAt);
  const item = await prisma.newsPost.create({ data });
  return NextResponse.json(item, { status: 201 });
}
