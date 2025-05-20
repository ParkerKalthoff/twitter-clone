// app/api/userCount/route.ts
import { NextResponse } from 'next/server';
import { userCount } from '@/app/lib/db/user_queries';

// test function

export async function GET() {
  try {
    const rows = await userCount();
    return NextResponse.json(rows[0]);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
