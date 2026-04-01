import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sanitizeText } from '@/lib/sanitize';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const status = searchParams.get('status');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};
  if (category && category !== 'all') where.category = category;
  if (status && status !== 'all') where.status = status;

  const [items, total] = await Promise.all([
    prisma.qAItem.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.qAItem.count({ where }),
  ]);

  return NextResponse.json({
    items,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { category, title, content, authorEmail, isPrivate } = body;

    if (!category || !title || !content || !authorEmail) {
      return NextResponse.json({ error: '필수 항목을 모두 입력해주세요.' }, { status: 400 });
    }

    const item = await prisma.qAItem.create({
      data: {
        category,
        title: sanitizeText(title),
        content: sanitizeText(content),
        authorEmail: sanitizeText(authorEmail),
        isPrivate: Boolean(isPrivate),
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error('QA creation error:', error);
    return NextResponse.json({ error: '질문 등록에 실패했습니다.' }, { status: 500 });
  }
}
