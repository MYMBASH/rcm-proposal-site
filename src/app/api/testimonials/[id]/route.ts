import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

function sanitize(raw: Record<string, unknown>) {
  const { id, createdAt, updatedAt, ...data } = raw as any;
  if (data.order !== undefined) data.order = parseInt(String(data.order)) || 0;
  return data;
}

async function guard() { const s = await getSession(); return s.isAdmin; }

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await guard())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const data = sanitize(await req.json());
    return NextResponse.json(await prisma.testimonial.update({ where: { id: params.id }, data }));
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  if (!(await guard())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await prisma.testimonial.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
