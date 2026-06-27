import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export interface SessionData {
  userId?: string;
  email?: string;
  isAdmin?: boolean;
  isLoggedIn?: boolean;
}

const sessionOptions = {
  password: process.env.SESSION_SECRET ?? 'replace-with-long-random-string-min-32-chars-here',
  cookieName: 'digimind_admin_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 8,
  },
};

export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  return session;
}

export async function requireAdmin(_req?: unknown): Promise<NextResponse | null> {
  const session = await getSession();
  if (!session.isAdmin && !session.isLoggedIn) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}
