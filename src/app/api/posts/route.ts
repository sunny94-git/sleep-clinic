import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sanitizeText } from '@/lib/sanitize';
import { postTweet } from '@/lib/twitter';
import { auth } from '@/lib/auth';

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
    const { category, title, content, authorName } = body;

    if (!category || !title || !content || !authorName) {
      return NextResponse.json({ error: '필수 항목을 모두 입력해주세요.' }, { status: 400 });
    }

    const post = await prisma.post.create({
      data: {
        category,
        title: sanitizeText(title),
        content: sanitizeText(content),
        authorName: sanitizeText(authorName),
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
