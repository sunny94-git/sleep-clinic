import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '클리닉 소개',
  description: '원광대학교 광주한방병원 수면장애클리닉 소개 — 전문 분야, 치료 과정을 안내합니다.',
};

const TREATMENTS = [
  { icon: '📍', name: '한방 치료 (침/약침 등)', points: ['몸의 긴장을 풀고, 편안하게 잠들 수 있도록 돕습니다.', '목·어깨·턱 주변 긴장, 두통/어지럼, 몸살 같은 피로감이 동반될 때도 함께 관리합니다.'] },
  { icon: '🌿', name: '한약/한방 수면 처방', points: ['체질과 증상에 맞춘 처방으로 잠드는 힘과 회복력을 함께 돕습니다.', '필요 시 복용 중인 수면제 감량 과정에서도 안정적으로 도움을 줄 수 있도록 계획합니다.'] },
  { icon: '📅', name: '수면 습관 교정 (수면 위생)', points: ['‘잠이 잘 오게 만드는 환경과 루틴’을 함께 점검합니다.', '취침/기상 시간, 낮잠, 카페인/알코올, 스마트폰 사용, 운동·식사 시간 등을 현실적으로 조정합니다.'] },
  { icon: '🧘', name: '긴장 완화 & 자율신경 안정', points: ['예민함, 불안, 머리가 맑지 않음, 자주 깨는 수면 등 긴장(과각성)이 중심일 때 도움이 됩니다.', '호흡, 이완 훈련, 생활 리듬 조정, 필요 시 기기/자극 치료 등을 함께 적용할 수 있습니다.'] },
  { icon: '🔋', name: '깊은 잠·회복력 보강', points: ['‘푹 잔 느낌이 없다’, 아침이 개운하지 않다, 피로가 오래 간다 같은 회복(깊은잠) 문제가 중심일 때 도움이 됩니다.', '호흡/루틴 최적화, 목·림프 순환 관리, 체액 균형 관리 등을 상태에 맞게 진행합니다.'] },
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
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, textAlign: 'center', marginBottom: 16 }}>
            <span style={{ color: 'var(--color-primary)' }}>치료 방법</span>
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginBottom: 40, fontSize: '1.05rem', wordBreak: 'keep-all' }}>
            수면 문제는 한 가지 방법으로만 해결되지 않는 경우가 많습니다.<br/>
            현재 상태에 맞춰 필요한 치료를 진행합니다.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 24,
          }}>
            {TREATMENTS.map((t, i) => (
              <div key={i} className="glass-card" style={{ padding: '32px 24px' }}>
                <div style={{
                  fontSize: '2.2rem', marginBottom: 16,
                  width: 64, height: 64, borderRadius: 16,
                  background: 'rgba(44, 95, 124, 0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {t.icon}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 16, color: 'var(--color-primary-dark)' }}>{t.name}</h3>
                <ul style={{ 
                  listStyleType: 'disc', 
                  paddingLeft: 20, 
                  fontSize: '0.9rem', 
                  color: 'var(--color-text-secondary)', 
                  lineHeight: 1.7 
                }}>
                  {t.points.map((point, idx) => (
                    <li key={idx} style={{ marginBottom: 8, wordBreak: 'keep-all' }}>
                      {point}
                    </li>
                  ))}
                </ul>
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
