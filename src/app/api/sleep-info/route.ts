import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
  const sleepInfos = await prisma.sleepInfo.findMany({
    orderBy: { order: 'asc' },
  });
  return NextResponse.json({ sleepInfos });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!(session as any)?.user?.role || (session as any)?.user?.role !== 'admin') {
    return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 });
  }

  try {
    const { slug, type, title, desc, icon, content, order } = await request.json();
    
    if (!slug || !title || !content) {
      return NextResponse.json({ error: '슬러그, 제목, 내용을 모두 입력해주세요.' }, { status: 400 });
    }

    const sleepInfo = await prisma.sleepInfo.create({
      data: { 
        slug, 
        type: type || 'ARTICLE',
        title, 
        desc: desc || '',
        icon: icon || '📄',
        content, 
        order: order ?? 0 
      },
    });

    return NextResponse.json(sleepInfo, { status: 201 });
  } catch (error) {
    console.error('SleepInfo creation error:', error);
    return NextResponse.json({ error: '수면 정보 등록에 실패했습니다. (슬러그 중복 등)' }, { status: 500 });
  }
}
