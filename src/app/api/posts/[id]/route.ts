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

  const post = await prisma.post.update({
    where: { id, isPublished: true },
    data: { viewCount: { increment: 1 } },
  }).catch(() => null);

  if (!post) {
    // If update failed (maybe viewCount not needed or post not found), try direct find
    const found = await prisma.post.findUnique({ where: { id } });
    if (!found) return NextResponse.json({ error: '게시글을 찾을 수 없습니다.' }, { status: 404 });
    const { passwordHash, ...rest } = found;
    return NextResponse.json(rest);
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
      if (existing.category !== 'free') return NextResponse.json({ error: '공지사항이나 수면정보는 관리자만 삭제 가능합니다.' }, { status: 403 });
      
      let body;
      try { body = await request.json(); } catch(e) { body = {}; }
      
      const { password } = body;
      if (!password || !existing.passwordHash) {
        return NextResponse.json({ error: '삭제 권한이 없습니다 (비밀번호 필요).' }, { status: 401 });
      }
      
      const isMatch = await compare(password, existing.passwordHash);
      if (!isMatch) return NextResponse.json({ error: '비밀번호가 일치하지 않습니다.' }, { status: 401 });
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
      if (existing.category !== 'free') return NextResponse.json({ error: '권한이 없습니다 (관리자 전용).' }, { status: 403 });
      
      if (!password || !existing.passwordHash) {
        return NextResponse.json({ error: '수정 권한이 없습니다 (비밀번호 필요).' }, { status: 401 });
      }
      
      const isMatch = await compare(password, existing.passwordHash);
      if (!isMatch) return NextResponse.json({ error: '비밀번호가 일치하지 않습니다.' }, { status: 401 });
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
