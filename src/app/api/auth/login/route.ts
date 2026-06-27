import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const schema = z.object({ email: z.string().email(), password: z.string().min(6) });

export async function POST(req: NextRequest) {
  try {
    const { email, password } = schema.parse(await req.json());
    const user = await prisma.adminUser.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    const session = await getSession();
    session.userId = user.id;
    session.email = user.email;
    session.isAdmin = true;
    await session.save();
    return NextResponse.json({ ok: true, name: user.name });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
