import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { compare } from 'bcryptjs';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: '이메일과 비밀번호를 모두 입력해주세요.' }, { status: 400 });
    }

    const item = await prisma.qAItem.findUnique({
      where: { id },
    });

    if (!item) {
      return NextResponse.json({ error: '질문을 찾을 수 없습니다.' }, { status: 404 });
    }

    if (!item.isPrivate) {
      return NextResponse.json({ error: '비공개 질문이 아닙니다.' }, { status: 400 });
    }

    // 1. Check Email Match
    if (item.authorEmail !== email) {
      return NextResponse.json({ error: '작성자 이메일이 일치하지 않습니다.' }, { status: 401 });
    }

    // 2. Check Password Match
    if (!item.passwordHash) {
      return NextResponse.json({ error: '비밀번호가 설정되지 않은 이전 질문입니다. 관리자에게 문의하세요.' }, { status: 403 });
    }

    const isValid = await compare(password, item.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: '비밀번호가 일치하지 않습니다.' }, { status: 401 });
    }

    // Verification Success! Return the full item content without the passwordHash
    const { passwordHash, ...safeItem } = item;
    
    return NextResponse.json(safeItem, { status: 200 });
  } catch (error) {
    console.error('QA verify error:', error);
    return NextResponse.json({ error: '인증 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
