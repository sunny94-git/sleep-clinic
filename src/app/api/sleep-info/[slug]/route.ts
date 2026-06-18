import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const session = await auth();
  if (!(session as any)?.user?.role || (session as any)?.user?.role !== 'admin') {
    return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 });
  }

  try {
    const { slug } = await params;
    const { type, title, desc, icon, content, order, newSlug } = await request.json();

    const sleepInfo = await prisma.sleepInfo.update({
      where: { slug },
      data: {
        ...(newSlug && { slug: newSlug }),
        ...(type && { type }),
        ...(title !== undefined && { title }),
        ...(desc !== undefined && { desc }),
        ...(icon !== undefined && { icon }),
        ...(content !== undefined && { content }),
        ...(order !== undefined && { order }),
      },
    });

    return NextResponse.json(sleepInfo);
  } catch (error) {
    console.error('SleepInfo update error:', error);
    return NextResponse.json({ error: '수면 정보 수정에 실패했습니다.' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const session = await auth();
  if (!(session as any)?.user?.role || (session as any)?.user?.role !== 'admin') {
    return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 });
  }

  try {
    const { slug } = await params;
    await prisma.sleepInfo.delete({ where: { slug } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('SleepInfo delete error:', error);
    return NextResponse.json({ error: '수면 정보 삭제에 실패했습니다.' }, { status: 500 });
  }
}
