import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { sanitizeText } from '@/lib/sanitize';
import { sendAnswerNotification } from '@/lib/mailer';
import { compare } from 'bcryptjs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const item = await prisma.qAItem.findUnique({ where: { id } });

  if (!item) {
    return NextResponse.json({ error: '질문을 찾을 수 없습니다.' }, { status: 404 });
  }

  const session = await auth();
  const isAdmin = (session as any)?.user?.role === 'admin';

  // Privacy check for simple GET (masking)
  if (item.isPrivate && !isAdmin) {
    // If it's a direct GET request, we might want to mask it or return 403 if not owner
    // For now, let's just return minimal info if private and not admin.
    // In actual app, the owner would see it via the verify route which sets _verified.
    return NextResponse.json({ 
      ...item, 
      content: '비공개 질문입니다.',
      authorEmail: '***@***.***',
      passwordHash: null,
      answer: item.status === 'answered' ? '비공개 답변입니다.' : null
    });
  }

  const { passwordHash, ...rest } = item;
  return NextResponse.json(rest);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const session = await auth();
    const isAdmin = (session as any)?.user?.role === 'admin';

    const existing = await prisma.qAItem.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: '질문을 찾을 수 없습니다.' }, { status: 404 });

    // 1. Admin Answer Path
    if (isAdmin && 'answer' in body) {
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
    }

    // 2. User Edit Path (or Admin generic update)
    const { password, title, content, category, isPrivate } = body;
    
    // Authorization check for user edit
    if (!isAdmin) {
      if (!password || !existing.passwordHash) {
        return NextResponse.json({ error: '권한이 없습니다 (비밀번호 누락).' }, { status: 401 });
      }
      const isMatch = await compare(password, existing.passwordHash);
      if (!isMatch) {
         return NextResponse.json({ error: '비밀번호가 일치하지 않습니다.' }, { status: 401 });
      }
      if (existing.status === 'answered') {
        return NextResponse.json({ error: '답변이 달린 질문은 수정할 수 없습니다.' }, { status: 403 });
      }
    }

    // Perform Update
    const updated = await prisma.qAItem.update({
      where: { id },
      data: {
        title: title ? sanitizeText(title) : undefined,
        content: content ? sanitizeText(content) : undefined,
        category: category || undefined,
        isPrivate: typeof isPrivate === 'boolean' ? isPrivate : undefined,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('QA PATCH error:', error);
    return NextResponse.json({ error: '처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();
    const isAdmin = (session as any)?.user?.role === 'admin';

    const existing = await prisma.qAItem.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: '질문을 찾을 수 없습니다.' }, { status: 404 });

    if (!isAdmin) {
      // User must provide password in body for DELETE
      // Note: standard DELETE doesn't always have body, but Next.js supports it
      let body;
      try { body = await request.json(); } catch(e) { body = {}; }
      
      const { password } = body;
      if (!password || !existing.passwordHash) {
        return NextResponse.json({ error: '비밀번호가 필요합니다.' }, { status: 401 });
      }
      const isMatch = await compare(password, existing.passwordHash);
      if (!isMatch) {
        return NextResponse.json({ error: '비밀번호가 일치하지 않습니다.' }, { status: 401 });
      }
    }

    await prisma.qAItem.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('QA DELETE error:', error);
    return NextResponse.json({ error: '삭제 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
