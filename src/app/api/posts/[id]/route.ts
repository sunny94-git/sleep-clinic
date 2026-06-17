import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { compare } from 'bcryptjs';
import { sanitizeText } from '@/lib/sanitize';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  const isAdmin = (session as any)?.user?.role === 'admin';

  // Try to increment view count only if it's already published
  let post = await prisma.post.update({
    where: { id, isPublished: true },
    data: { viewCount: { increment: 1 } },
  }).catch(() => null);

  // Fallback for admins who can see unpublished posts
  if (!post) {
    post = await prisma.post.findUnique({ where: { id } });
  }

  if (!post || (!post.isPublished && !isAdmin)) {
    return NextResponse.json({ error: '게시글을 찾을 수 없습니다.' }, { status: 404 });
  }

  const { passwordHash, ...rest } = post;
  return NextResponse.json(rest);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();
    const isAdmin = (session as any)?.user?.role === 'admin';

    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: '게시글을 찾을 수 없습니다.' }, { status: 404 });

    if (!isAdmin) {
      return NextResponse.json({ error: '게시글은 관리자만 삭제 가능합니다.' }, { status: 403 });
    }

    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ error: '삭제 요청 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { isPublished, title, content, category, password } = body;
    
    const session = await auth();
    const isAdmin = (session as any)?.user?.role === 'admin';

    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: '게시글을 찾을 수 없습니다.' }, { status: 404 });

    // Authorization checks
    if (!isAdmin) {
      return NextResponse.json({ error: '권한이 없습니다 (관리자 전용).' }, { status: 403 });
    }

    const post = await prisma.post.update({
      where: { id },
      data: {
        isPublished: typeof isPublished === 'boolean' ? isPublished : undefined,
        title: title ? sanitizeText(title) : undefined,
        content: content ? sanitizeText(content) : undefined,
        category: category || undefined,
      },
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error('PATCH error:', error);
    return NextResponse.json({ error: '게시글 수정 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
