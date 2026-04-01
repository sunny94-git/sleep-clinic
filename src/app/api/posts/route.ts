import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sanitizeText } from '@/lib/sanitize';
import { postTweet } from '@/lib/twitter';
import { auth } from '@/lib/auth';
import { hash } from 'bcryptjs';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};
  
  if (searchParams.get('allStatus') === 'true') {
    const session = await auth();
    if (!session) {
      where.isPublished = true;
    }
  } else {
    where.isPublished = true;
  }

  if (category && category !== 'all') {
    where.category = category;
  }

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      select: {
        id: true,
        category: true,
        title: true,
        authorName: true,
        viewCount: true,
        isPublished: true,
        createdAt: true,
        updatedAt: true,
        // passwordHash is omitted by default
      }
    }),
    prisma.post.count({ where }),
  ]);

  return NextResponse.json({
    posts,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { category, title, content, authorName, password } = body;
    const session = await auth();
    const isAdmin = (session as any)?.user?.role === 'admin';

    if (!category || !title || !content || !authorName) {
      return NextResponse.json({ error: '필수 항목을 모두 입력해주세요.' }, { status: 400 });
    }

    // Permission check
    if (!isAdmin) {
      if (category !== 'free') {
        return NextResponse.json({ error: '공지사항이나 수면정보는 관리자만 작성 가능합니다.' }, { status: 403 });
      }
      if (!password || password.length < 4) {
        return NextResponse.json({ error: '게시글 수정을 위해 비밀번호 4자리 이상이 필요합니다.' }, { status: 400 });
      }
    }

    const passwordHash = password ? await hash(password, 10) : null;

    const post = await prisma.post.create({
      data: {
        category,
        title: sanitizeText(title),
        content: sanitizeText(content),
        authorName: sanitizeText(authorName),
        passwordHash,
      },
    });

    // Auto-tweet (async, non-blocking)
    postTweet(post.title).then(tweetId => {
      if (tweetId) {
        prisma.post.update({
          where: { id: post.id },
          data: { tweetId },
        }).catch(console.error);
      }
    }).catch(console.error);

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Post creation error:', error);
    return NextResponse.json({ error: '게시글 작성에 실패했습니다.' }, { status: 500 });
  }
}
