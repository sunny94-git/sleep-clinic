import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '클리닉 소개',
  description: '원광대학교 광주한방병원 수면장애클리닉 소개 — 전문 분야, 치료 과정을 안내합니다.',
};

const TREATMENTS = [
  { icon: '🌿', name: '한약치료', desc: '체질과 증상에 맞는 맞춤 한약 처방으로 근본적인 수면 기능을 회복합니다.' },
  { icon: '📍', name: '침구치료', desc: '경혈 자극을 통해 자율신경계를 안정시키고 수면의 질을 개선합니다.' },
  { icon: '🔥', name: '뜸치료', desc: '온열 자극으로 기혈 순환을 촉진하여 심신을 안정시킵니다.' },
  { icon: '💆', name: '추나치료', desc: '근골격계 이완을 통해 신체 긴장을 해소하고 편안한 수면을 유도합니다.' },
  { icon: '🧘', name: '이완훈련', desc: '호흡법, 명상 등 비약물적 방법으로 수면 위생을 개선합니다.' },
];

const PROCESS = [
  { step: '01', title: '초진 상담', desc: '수면 습관, 병력 등 종합적인 상담을 진행합니다.' },
  { step: '02', title: '검사 및 진단', desc: '필요시 다양한 객관적 검사 및 설문을 시행합니다.' },
  { step: '03', title: '맞춤 치료', desc: '체질과 증상에 따른 개인 맞춤 치료 계획을 수립합니다.' },
  { step: '04', title: '경과 관리', desc: '정기적인 추적 관찰과 치료 조정을 진행합니다.' },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{
        padding: '80px 24px 60px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, var(--color-surface) 0%, var(--color-primary-dark) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(108,92,231,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="section-container" style={{ position: 'relative' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, marginBottom: 16 }}>
            <span className="gradient-text">클리닉 소개</span>
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto', lineHeight: 1.8 }}>
            원광대학교 광주한방병원 수면장애클리닉은<br />
            한의학적 접근으로 수면 문제를 해결합니다.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section style={{ padding: '80px 24px' }}>
        <div className="section-container">
          <div className="glass-card" style={{ padding: '48px 40px', textAlign: 'center' }}>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', lineHeight: 2, maxWidth: 700, margin: '0 auto' }}>
              수면장애는 단순한 불편이 아닌, 삶의 질을 좌우하는 중요한 건강 문제입니다.<br />
              수면장애 클리닉은 한의학의 전인적 관점에서 환자 개개인의 체질과 생활 패턴을 고려한 맞춤 치료를 제공합니다.<br />
              증상 완화를 넘어 근본 원인을 해결하여 지속 가능한 건강한 수면을 되찾을 수 있도록 돕겠습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Treatment Methods */}
      <section style={{ padding: '0 24px 80px' }}>
        <div className="section-container">
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, textAlign: 'center', marginBottom: 40 }}>
            <span className="gradient-text">치료 방법</span>
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
          }}>
            {TREATMENTS.map((t, i) => (
              <div key={i} className="glass-card" style={{ padding: 24 }}>
                <div style={{
                  fontSize: '2rem', marginBottom: 12,
                  width: 56, height: 56, borderRadius: 14,
                  background: 'rgba(108,92,231,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {t.icon}
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 8 }}>{t.name}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{
        padding: '80px 24px',
        background: 'linear-gradient(135deg, rgba(108,92,231,0.05), rgba(45,90,142,0.05))',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <div className="section-container">
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, textAlign: 'center', marginBottom: 48 }}>
            <span className="gradient-text">진료 과정</span>
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 24,
          }}>
            {PROCESS.map((p, i) => (
              <div key={i} style={{ textAlign: 'center', padding: 16 }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--color-accent), var(--color-primary-light))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.1rem', fontWeight: 800, color: 'white',
                  margin: '0 auto 16px',
                }}>
                  {p.step}
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 8 }}>{p.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
