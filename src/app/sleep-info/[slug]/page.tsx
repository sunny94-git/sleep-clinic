import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Carousel from '@/components/ui/Carousel';
import prisma from '@/lib/prisma';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.sleepInfo.findUnique({ where: { slug } });
  if (!article) return { title: '수면정보' };
  return { title: article.title, description: article.desc || article.content.slice(0, 160) };
}

function renderContent(raw: string): string {
  return raw
    .replace(/^### (.+)$/gm, '<h4 style="font-size:1.05rem;font-weight:700;margin:24px 0 10px;color:var(--color-text-primary)">$1</h4>')
    .replace(/^## (.+)$/gm, '<h3 style="font-size:1.25rem;font-weight:700;margin:36px 0 14px;color:var(--color-accent-light)">$1</h3>')
    .replace(/^• (.+)$/gm, '<div style="display:flex;gap:8px;margin:6px 0 6px 8px;line-height:1.7"><span style="color:var(--color-accent-light)">•</span><span>$1</span></div>')
    .replace(/^!\[(.*?)\]\((.*?)\)$/gm, '<div style="text-align:center; margin: 32px 0;"><img src="$2" alt="$1" style="max-width:100%; height:auto; border-radius:16px; box-shadow:0 10px 30px rgba(0,0,0,0.08);" /></div>')
    .replace(/\n\n/g, '<div style="height:12px"></div>');
}

export default async function SleepInfoDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await prisma.sleepInfo.findUnique({ where: { slug } });
  if (!article) notFound();

  const imageRegex = /!\[.*?\]\((.*?)\)/g;
  const images: string[] = [];
  let match;
  while ((match = imageRegex.exec(article.content)) !== null) {
    images.push(match[1]);
  }

  const textContent = article.content.replace(imageRegex, '').trim();

  return (
    <div>
      <section style={{ padding: '80px 24px 0', background: 'var(--color-surface)' }}>
        <div className="section-container" style={{ maxWidth: 800 }}>
          <Link href="/sleep-info" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 24 }}>
            ← 수면정보 목록
          </Link>
        </div>
      </section>

      <section style={{ padding: '0 24px 80px' }}>
        <div className="section-container" style={{ maxWidth: 800 }}>
          <div className="glass-card" style={{ padding: 'clamp(28px, 5vw, 48px) clamp(24px, 4vw, 44px)' }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, background: 'rgba(44, 95, 124, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: 24 }}>
              {article.icon}
            </div>
            <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.4 }}>
              {article.title}
            </h1>
            
            {images.length > 0 && <Carousel images={images} />}
            {textContent && <div style={{ fontSize: '0.95rem', lineHeight: 1.9, color: 'var(--color-text-secondary)' }} dangerouslySetInnerHTML={{ __html: renderContent(textContent) }} />}

            <div style={{ marginTop: 48, padding: '28px 24px', borderRadius: 14, background: 'rgba(44, 95, 124, 0.05)', border: '1px solid rgba(44, 95, 124, 0.1)', textAlign: 'center' }}>
              <p style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 8 }}>수면 문제로 고민이신가요?</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: 20 }}>전문의에게 직접 상담 받아보세요</p>
              <Link href="/qa/ask" className="btn-primary" style={{ fontSize: '0.9rem', padding: '12px 28px' }}>무료 상담하기</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
