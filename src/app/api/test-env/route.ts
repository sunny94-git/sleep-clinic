import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    email: process.env.ADMIN_EMAIL,
    hash: process.env.ADMIN_PASSWORD_HASH,
    hashLength: process.env.ADMIN_PASSWORD_HASH?.length
  });
}
