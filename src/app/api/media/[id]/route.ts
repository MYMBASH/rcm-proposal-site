import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { unlink } from 'fs/promises';
import path from 'path';

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const s = await getSession();
  if (!s.isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const asset = await prisma.mediaAsset.findUnique({ where: { id: params.id } });
  if (asset) {
    try { await unlink(path.join(process.cwd(), 'public', asset.url)); } catch {}
    await prisma.mediaAsset.delete({ where: { id: params.id } });
  }
  return NextResponse.json({ ok: true });
}
