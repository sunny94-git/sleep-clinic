import Link from 'next/link';

const FEATURES = [
  { icon: '😴', title: '불면증', desc: '잠들기 어렵거나 자주 깨는 증상에 대한 맞춤 한방치료' },
  { icon: '😮‍💨', title: '수면무호흡', desc: '코골이와 수면 중 호흡 정지에 대한 체계적 진단과 치료' },
  { icon: '🦵', title: '하지불안증후군', desc: '다리의 불편감으로 수면이 어려운 증상 치료' },
  { icon: '🧠', title: '기면증', desc: '과도한 주간 졸음과 갑작스러운 수면 발작 치료' },
  { icon: '🌿', title: '한방 약물치료', desc: '체질에 맞는 한약 처방으로 근본적인 수면 개선' },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '100px 24px 80px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, var(--color-surface) 0%, var(--color-primary-dark) 100%)',
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          top: '10%', right: '10%',
          width: 300, height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(108,92,231,0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20%', left: '5%',
          width: 250, height: 250,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(45,90,142,0.2) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }} />

        <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 20px',
            borderRadius: 20,
            background: 'rgba(108, 92, 231, 0.1)',
            border: '1px solid rgba(108, 92, 231, 0.2)',
            marginBottom: 24,
            fontSize: '0.875rem',
            color: 'var(--color-accent-light)',
          }}>
            🌙 원광대학교 광주한방병원
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: 20,
          }}>
            <span className="gradient-text">편안한 잠</span>이<br />
            건강한 삶의 시작입니다
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'var(--color-text-secondary)',
            maxWidth: 600,
            margin: '0 auto 40px',
            lineHeight: 1.8,
          }}>
            수면장애클리닉에서 체계적인 진단과<br />
            맞춤 한방치료로 숙면을 되찾으세요.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/qa/ask" className="btn-primary" style={{ fontSize: '1rem', padding: '14px 36px' }}>
              상담 예약하기
            </Link>
            <Link href="/sleep-info" className="btn-secondary" style={{ fontSize: '1rem', padding: '14px 36px' }}>
              수면정보 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '80px 24px' }}>
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: 12 }}>
              전문 <span className="gradient-text">진료 분야</span>
            </h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              다양한 수면장애에 대한 체계적인 한방치료를 제공합니다
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 20,
          }}>
            {FEATURES.map((f, i) => (
              <div key={i} className="glass-card" style={{
                padding: 28,
                animationDelay: `${i * 0.1}s`,
              }}>
                <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: 'rgba(108, 92, 231, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  marginBottom: 16,
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '60px 24px',
        background: 'linear-gradient(135deg, rgba(108,92,231,0.1), rgba(45,90,142,0.1))',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <div className="section-container" style={{
          textAlign: 'center',
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 12 }}>
            수면에 대한 고민이 있으신가요?
          </h2>
          <p style={{
            color: 'var(--color-text-secondary)',
            marginBottom: 28,
            fontSize: '1rem',
          }}>
            전문의에게 직접 상담 받아보세요. 비공개 질문도 가능합니다.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/qa/ask" className="btn-primary">무료 상담하기</Link>
            <Link href="/board" className="btn-secondary">게시판 둘러보기</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
