import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

export async function GET() {
  const s = await getSession();
  if (!s.isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(await prisma.mediaAsset.findMany({ orderBy: { createdAt: 'desc' } }));
}

export async function POST(req: NextRequest) {
  const s = await getSession();
  if (!s.isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get('file') as File;
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  await mkdir(uploadDir, { recursive: true });

  const ext = file.type.includes('image') ? 'webp' : path.extname(file.name);
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const filepath = path.join(uploadDir, filename);

  if (file.type.includes('image')) {
    await sharp(buffer).webp({ quality: 85 }).toFile(filepath);
  } else {
    await writeFile(filepath, buffer);
  }

  const url = `/uploads/${filename}`;
  const asset = await prisma.mediaAsset.create({
    data: {
      url,
      type: file.type.includes('image') ? 'image' : 'video',
      filename: file.name,
      size: file.size,
    },
  });

  return NextResponse.json(asset);
}
