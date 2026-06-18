import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
  const faqs = await prisma.fAQ.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  });
  return NextResponse.json({ faqs });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!(session as any)?.user?.role || (session as any)?.user?.role !== 'admin') {
    return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 });
  }

  try {
    const { question, answer, order } = await request.json();
    if (!question || !answer) {
      return NextResponse.json({ error: '질문과 답변을 모두 입력해주세요.' }, { status: 400 });
    }

    const faq = await prisma.fAQ.create({
      data: { question, answer, order: order ?? 0 },
    });

    return NextResponse.json(faq, { status: 201 });
  } catch (error) {
    console.error('FAQ creation error:', error);
    return NextResponse.json({ error: 'FAQ 등록에 실패했습니다.' }, { status: 500 });
  }
}
