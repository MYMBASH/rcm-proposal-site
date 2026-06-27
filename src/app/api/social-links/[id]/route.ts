import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const err = await requireAdmin(req); if (err) return err;
  return NextResponse.json(await prisma.socialLink.update({ where: { id: params.id }, data: await req.json() }));
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const err = await requireAdmin(req); if (err) return err;
  await prisma.socialLink.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
