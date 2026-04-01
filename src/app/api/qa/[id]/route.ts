import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { sanitizeText } from '@/lib/sanitize';
import { sendAnswerNotification } from '@/lib/mailer';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const item = await prisma.qAItem.findUnique({ where: { id } });
  if (!item) {
    return NextResponse.json({ error: '질문을 찾을 수 없습니다.' }, { status: 404 });
  }

  return NextResponse.json(item);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: '권한이 없습니다.' }, { status: 401 });

  try {
    const { id } = await params;
    const body = await request.json();

    if ('isPrivate' in body && Object.keys(body).length === 1) {
      const item = await prisma.qAItem.update({
        where: { id },
        data: { isPrivate: Boolean(body.isPrivate) },
      });
      return NextResponse.json(item);
    }

    const { answer } = body;
    if (!answer) return NextResponse.json({ error: '답변을 입력해주세요.' }, { status: 400 });

    const item = await prisma.qAItem.update({
      where: { id },
      data: {
        answer: sanitizeText(answer),
        status: 'answered',
        answeredAt: new Date(),
      },
    });

    await sendAnswerNotification(item.authorEmail, item.title);
    return NextResponse.json(item);
  } catch (error) {
    console.error('QA PATCH error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: '권한이 없습니다.' }, { status: 401 });

  try {
    const { id } = await params;
    await prisma.qAItem.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('QA DELETE error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
