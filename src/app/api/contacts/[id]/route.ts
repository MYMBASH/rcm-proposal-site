import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const s = await getSession();
  if (!s.isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(await prisma.contactSubmission.update({ where: { id: params.id }, data: await req.json() }));
}
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const s = await getSession();
  if (!s.isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await prisma.contactSubmission.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
