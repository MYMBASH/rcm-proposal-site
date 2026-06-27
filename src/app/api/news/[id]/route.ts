import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

function sanitize(raw: Record<string, unknown>) {
  const { id, createdAt, updatedAt, ...data } = raw as any;
  // Convert publishedAt string to Date if needed
  if (data.publishedAt && typeof data.publishedAt === 'string') {
    data.publishedAt = new Date(data.publishedAt);
  }
  return data;
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const err = await requireAdmin(req);
  if (err) return err;
  try {
    const data = sanitize(await req.json());
    return NextResponse.json(await prisma.newsPost.update({ where: { id: params.id }, data }));
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const err = await requireAdmin(req);
  if (err) return err;
  await prisma.newsPost.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
