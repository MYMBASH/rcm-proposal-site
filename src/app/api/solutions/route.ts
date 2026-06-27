import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

function sanitize(raw: Record<string, unknown>) {
  const { id, createdAt, updatedAt, ...data } = raw as any;
  if (data.order !== undefined) data.order = parseInt(String(data.order)) || 0;
  return data;
}

export async function GET() {
  return NextResponse.json(await prisma.solution.findMany({ orderBy: { order: 'asc' } }));
}

export async function POST(req: NextRequest) {
  const s = await getSession();
  if (!s.isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const data = sanitize(await req.json());
    return NextResponse.json(await prisma.solution.create({ data }));
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
