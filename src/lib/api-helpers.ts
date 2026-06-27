import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './auth';

export async function withAdmin(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    const session = await getSession();
    if (!session.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return handler(req);
  };
}

export function ok(data: unknown) {
  return NextResponse.json(data);
}

export function err(msg: string, status = 400) {
  return NextResponse.json({ error: msg }, { status });
}
