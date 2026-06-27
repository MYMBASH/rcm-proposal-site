import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const err = await requireAdmin(req as any);
  if (err) return err;
  const applications = await prisma.jobApplication.findMany({
    where: { jobId: params.id },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(applications);
}
