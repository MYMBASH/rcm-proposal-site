import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const all = new URL(req.url).searchParams.get('all') === '1';
  const where = all ? {} : { active: true };
  return NextResponse.json(await prisma.socialLink.findMany({ where, orderBy: { order: 'asc' } }));
}

export async function POST(req: NextRequest) {
  const err = await requireAdmin(req); if (err) return err;
  const data = await req.json();
  return NextResponse.json(await prisma.socialLink.create({ data }), { status: 201 });
}
