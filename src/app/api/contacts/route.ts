import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
export async function GET() {
  const s = await getSession();
  if (!s.isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(await prisma.contactSubmission.findMany({ orderBy: { createdAt: 'desc' } }));
}
