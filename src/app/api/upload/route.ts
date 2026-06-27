import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { put } from '@vercel/blob';
import { extname } from 'path';
import { randomUUID } from 'crypto';

export async function POST(req: NextRequest) {
  const err = await requireAdmin(req);
  if (err) return err;

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

    const ext = extname(file.name).toLowerCase();
    const allowed = ['.jpg','.jpeg','.png','.gif','.webp','.svg','.mp4','.mov','.webm','.pdf'];
    if (!allowed.includes(ext)) {
      return NextResponse.json({ error: 'File type not allowed' }, { status: 400 });
    }

    const MAX = 50 * 1024 * 1024; // 50 MB
    if (file.size > MAX) {
      return NextResponse.json({ error: 'File too large (max 50MB)' }, { status: 400 });
    }

    const subfolder = ['.mp4','.mov','.webm'].includes(ext) ? 'videos'
                    : ext === '.pdf' ? 'pdfs'
                    : 'images';

    const filename = `${subfolder}/${randomUUID()}${ext}`;
    const blob = await put(filename, file, { access: 'public' });

    return NextResponse.json({
      url: blob.url,
      name: file.name,
      size: file.size,
      type: subfolder,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
