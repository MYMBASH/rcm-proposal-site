import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

function sanitize(raw: Record<string, unknown>) {
  const { id, createdAt, updatedAt, ...data } = raw as any;
  if (data.order !== undefined) data.order = parseInt(String(data.order)) || 0;
  return data;
}

export async function GET() {
  return NextResponse.json(await prisma.banner.findMany({ orderBy: { order: 'asc' } }));
}

export async function POST(req: NextRequest) {
  const err = await requireAdmin(req);
  if (err) return err;
  try {
    const data = sanitize(await req.json());
    return NextResponse.json(await prisma.banner.create({ data }), { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
