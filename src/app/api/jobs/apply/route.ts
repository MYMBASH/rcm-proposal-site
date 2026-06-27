import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const jobId = formData.get('jobId') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = (formData.get('phone') as string) || '';
    const coverLetter = (formData.get('coverLetter') as string) || '';
    const cvFile = formData.get('cv') as File | null;

    if (!jobId || !name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let cvUrl = '';
    if (cvFile && cvFile.size > 0) {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'cv');
      await mkdir(uploadDir, { recursive: true });
      const filename = `cv-${Date.now()}-${cvFile.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
      const buffer = Buffer.from(await cvFile.arrayBuffer());
      await writeFile(path.join(uploadDir, filename), buffer);
      cvUrl = `/uploads/cv/${filename}`;
    }

    const application = await prisma.jobApplication.create({
      data: { jobId, name, email, phone, coverLetter, cvUrl },
      include: { job: { select: { titleAr: true, titleEn: true } } },
    });

    // Send email notification (log for now - add nodemailer for production)
    console.log(`📧 New job application: ${name} (${email}) for job ${application.job.titleEn}`);

    return NextResponse.json({ ok: true, id: application.id }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
