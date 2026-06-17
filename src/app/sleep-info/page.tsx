import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '수면정보',
  description: '불면증, 수면무호흡, 수면위생 등 수면장애에 대한 전문 정보를 제공합니다.',
};

const ARTICLES = [
  {
    slug: 'cardnews-1',
    title: '수면장애 클리닉 1편',
    desc: '잠 못 드는 것도 치료가 필요한 증상일까요? 카드뉴스로 알아봅니다.',
    icon: '📱',
  },
  {
    slug: 'cardnews-2',
    title: '수면장애 클리닉 2편',
    desc: '수면장애에 대한 오해와 진실, 수면 클리닉의 새로운 접근법을 카드뉴스로 알아봅니다.',
    icon: '📱',
  },
  { slug: 'cardnews-3', title: '수면장애 클리닉 3편', desc: '수면 클리닉에 대한 유용한 정보를 카드뉴스로 알아봅니다.', icon: '📱' },
  { slug: 'cardnews-4', title: '수면장애 클리닉 4편', desc: '수면 클리닉에 대한 유용한 정보를 카드뉴스로 알아봅니다.', icon: '📱' },
  { slug: 'cardnews-5', title: '수면장애 클리닉 5편', desc: '수면 클리닉에 대한 유용한 정보를 카드뉴스로 알아봅니다.', icon: '📱' },
  { slug: 'cardnews-6', title: '수면장애 클리닉 6편', desc: '수면 클리닉에 대한 유용한 정보를 카드뉴스로 알아봅니다.', icon: '📱' },
  { slug: 'cardnews-7', title: '수면장애 클리닉 7편', desc: '수면 클리닉에 대한 유용한 정보를 카드뉴스로 알아봅니다.', icon: '📱' },
  { slug: 'cardnews-8', title: '수면장애 클리닉 8편', desc: '수면 클리닉에 대한 유용한 정보를 카드뉴스로 알아봅니다.', icon: '📱' },
  { slug: 'cardnews-9', title: '수면장애 클리닉 9편', desc: '수면 클리닉에 대한 유용한 정보를 카드뉴스로 알아봅니다.', icon: '📱' },
  { slug: 'cardnews-10', title: '수면장애 클리닉 10편', desc: '수면 클리닉에 대한 유용한 정보를 카드뉴스로 알아봅니다.', icon: '📱' },
  {
    slug: 'insomnia',
    title: '불면증의 원인과 한방치료',
    desc: '불면증의 다양한 원인과 한의학적 치료 접근법에 대해 알아봅니다.',
    icon: '😴',
  },
  {
    slug: 'sleep-apnea',
    title: '수면무호흡증 알아보기',
    desc: '코골이와 수면무호흡의 위험성, 진단 방법, 치료법을 소개합니다.',
    icon: '😮‍💨',
  },
  {
    slug: 'sleep-hygiene',
    title: '올바른 수면 위생 가이드',
    desc: '건강한 수면 습관을 만들기 위한 실천 방법을 안내합니다.',
    icon: '🛏️',
  },
  {
    slug: 'restless-leg',
    title: '하지불안증후군 이해하기',
    desc: '다리 불편감으로 잠을 이루지 못하는 하지불안증후군에 대해 설명합니다.',
    icon: '🦵',
  },
  {
    slug: 'herbal-medicine',
    title: '수면장애 한약 치료',
    desc: '수면장애 치료에 사용되는 대표적인 한약 처방을 소개합니다.',
    icon: '🌿',
  },
  {
    slug: 'acupuncture-sleep',
    title: '수면을 위한 침구치료',
    desc: '침구 치료가 수면의 질을 어떻게 개선하는지 알아봅니다.',
    icon: '📍',
  },
];

export default function SleepInfoPage() {
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
            {ARTICLES.map((article) => (
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
