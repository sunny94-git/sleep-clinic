import type { Metadata } from 'next';
import Link from 'next/link';
import prisma from '@/lib/prisma';

export const metadata: Metadata = {
  title: '수면정보',
  description: '불면증, 수면무호흡, 수면위생 등 수면장애에 대한 전문 정보를 제공합니다.',
};

export const dynamic = 'force-dynamic';

export default async function SleepInfoPage() {
  const sleepInfos = await prisma.sleepInfo.findMany({
    orderBy: { order: 'asc' },
  });

  return (
    <div>
      <section style={{
        padding: '80px 24px 40px',
        textAlign: 'center',
        background: 'var(--color-surface)',
      }}>
        <div className="section-container">
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, marginBottom: 12 }}>
            <span style={{ color: 'var(--color-primary)' }}>수면정보</span>
          </h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            수면장애에 대한 전문 정보와 한방치료법을 알아보세요
          </p>
        </div>
      </section>

      <section style={{ padding: '40px 24px 80px' }}>
        <div className="section-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 16,
          }}>
            {sleepInfos.map((article) => (
              <Link key={article.slug} href={`/sleep-info/${article.slug}`} style={{ textDecoration: 'none' }}>
                <div className="glass-card" style={{ padding: '20px 24px', height: '100%', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                    background: 'rgba(44, 95, 124, 0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.4rem'
                  }}>
                    {article.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h2 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 4, color: 'var(--color-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {article.title}
                    </h2>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {article.desc}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
