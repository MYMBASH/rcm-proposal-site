import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

function sanitize(raw: Record<string, unknown>) {
  const { id, createdAt, updatedAt, ...data } = raw as any;
  if (data.order !== undefined) data.order = parseInt(String(data.order)) || 0;
  return data;
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const err = await requireAdmin(req);
  if (err) return err;
  try {
    const data = sanitize(await req.json());
    return NextResponse.json(await prisma.banner.update({ where: { id: params.id }, data }));
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const err = await requireAdmin(req);
  if (err) return err;
  await prisma.banner.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
