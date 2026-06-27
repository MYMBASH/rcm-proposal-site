import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const all = new URL(req.url).searchParams.get('all') === '1';
  const where = all ? {} : { status: 'open' };
  return NextResponse.json(await prisma.jobPosting.findMany({ where, orderBy: { createdAt: 'desc' }, include: { _count: { select: { applications: true } } } }));
}

export async function POST(req: NextRequest) {
  const err = await requireAdmin(req); if (err) return err;
  return NextResponse.json(await prisma.jobPosting.create({ data: await req.json() }), { status: 201 });
}
