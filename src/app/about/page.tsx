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
  { step: '01', title: '내원/상담', desc: '아래와 같은 불편이 있다면 편하게 말씀해 주세요.', points: ['잠들기 어렵다 / 자주 깬다 / 너무 일찍 깬다', '푹 잔 것 같지 않다', '낮에 피곤하다, 졸리다, 집중이 안 된다', '코골이, 숨이 멈추는 느낌', '다리가 불편해서 잠들기 어렵다'] },
  { step: '02', title: '1차 스크리닝', desc: '필요 시 아래 가능성을 함께 확인합니다.', points: ['불면, 수면무호흡, 하지불안/주기성 하지운동, 렘수면행동장애/몽유병 등', '통증, 스트레스/기분 문제, 복용 중인 약, 카페인/알코올, 생활 패턴'] },
  { step: '03', title: '정밀 평가', desc: '증상에 따라 필요한 것만 선택해서 진행합니다.', points: ['설문/수면일지: 수면의 질과 패턴 확인', '수면 추적(워치/기기 등): 총수면시간, 수면 효율, 중간각성 등', '자율신경(HRV): 긴장/회복 균형 확인', '체성분(InBody): 부종/체액 균형, 회복 상태 참고', '필요 시 뇌파 기반 평가 등'] },
  { step: '04', title: '내 몸의 ‘주요 문제’ 분류', desc: '검사와 상담 결과를 바탕으로, 현재 수면 문제의 중심이 어디에 가까운지 정리합니다.', points: ['A. 긴장/과각성형: 예민함, 걱정이 많아 잠이 잘 안 오거나 자주 깨는 유형', 'B. 회복/깊은잠 부족형: 푹 잔 느낌이 없고 피로가 오래 가는 유형'] },
  { step: '05', title: '맞춤 치료', desc: '상담 결과에 따라 아래를 개인에게 맞게 조합합니다.', points: ['침/약침 등 한방치료', '수면 위생(잠 습관) + 생활 리듬 교정', '자율신경 안정화', '호흡/이완 루틴, 목·림프 순환 관리', '한약/한방 수면 처방'] },
  { step: '06', title: '4–6주 후 재평가 & 조정', desc: '보통 4–6주 뒤, 변화 정도를 확인하고 치료를 조정합니다.', points: ['잠드는 시간, 중간 각성, 피로/불안, 수면 효율 등'] },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{
        padding: '80px 24px 60px',
        textAlign: 'center',
        background: 'var(--color-surface)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(44, 95, 124, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="section-container" style={{ position: 'relative' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, marginBottom: 16 }}>
            <span style={{ color: 'var(--color-primary)' }}>클리닉 소개</span>
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
            <p style={{ 
              color: 'var(--color-text-secondary)', 
              fontSize: '1.05rem', 
              lineHeight: 2, 
              maxWidth: 850, 
              margin: '0 auto',
              wordBreak: 'keep-all' // Ensures natural breaks between words
            }}>
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
            <span style={{ color: 'var(--color-primary)' }}>치료 방법</span>
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
                  background: 'rgba(44, 95, 124, 0.08)',
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
        background: 'linear-gradient(135deg, rgba(44, 95, 124, 0.04), rgba(58, 124, 165, 0.04))',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <div className="section-container">
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, textAlign: 'center', marginBottom: 16 }}>
            <span style={{ color: 'var(--color-primary)' }}>진료 과정</span>
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginBottom: 48, fontSize: '1.05rem', wordBreak: 'keep-all' }}>
            수면 문제의 원인을 찾기 위해 필요한 검사를 진행하여 결과에 따라 개인에게 맞는 치료를 진행합니다.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
          }}>
            {PROCESS.map((p, i) => (
              <div key={i} className="glass-card" style={{ padding: '32px 24px', textAlign: 'center' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--color-accent), var(--color-primary-light))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.1rem', fontWeight: 800, color: 'white',
                  margin: '0 auto 20px',
                  boxShadow: '0 4px 12px rgba(212, 134, 78, 0.3)'
                }}>
                  {p.step}
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 12, color: 'var(--color-primary-dark)' }}>{p.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-primary)', lineHeight: 1.6, marginBottom: 16, fontWeight: 600, wordBreak: 'keep-all' }}>
                  {p.desc}
                </p>
                <ul style={{ 
                  listStyleType: 'disc', 
                  paddingLeft: 20, 
                  textAlign: 'left', 
                  fontSize: '0.9rem', 
                  color: 'var(--color-text-secondary)', 
                  lineHeight: 1.6 
                }}>
                  {p.points.map((point, idx) => (
                    <li key={idx} style={{ marginBottom: 6 }}>
                      {point.includes(':') ? (
                        <>
                          <strong style={{ color: 'var(--color-primary)' }}>{point.split(':')[0]}:</strong>{point.substring(point.indexOf(':') + 1)}
                        </>
                      ) : (
                        point
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
