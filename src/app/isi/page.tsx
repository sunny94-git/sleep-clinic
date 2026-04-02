'use client';

import { useState } from 'react';
import Link from 'next/link';

const QUESTIONS = [
  {
    id: 1,
    title: '잠들기 어렵다.',
    desc: '지난 2주 동안 귀하의 불면증 수준을 체크해주세요.',
    options: ['전혀 없다', '약간', '중간 정도', '심하다', '매우 심하다']
  },
  {
    id: 2,
    title: '잠을 유지하기 어렵다(자주 깸).',
    desc: '지난 2주 동안 귀하의 불면증 수준을 체크해주세요.',
    options: ['전혀 없다', '약간', '중간 정도', '심하다', '매우 심하다']
  },
  {
    id: 3,
    title: '쉽게 깬다.',
    desc: '지난 2주 동안 귀하의 불면증 수준을 체크해주세요.',
    options: ['전혀 없다', '약간', '중간 정도', '심하다', '매우 심하다']
  },
  {
    id: 4,
    title: '현재 수면패턴에 대해 얼마나 만족하고 계십니까?',
    desc: '전반적인 만족도를 알려주세요.',
    options: ['매우 만족', '만족', '중간', '불만족', '매우 불만족']
  },
  {
    id: 5,
    title: '경험하는 수면장애가 일상기능을 어느 정도로 방해한다고 생각하십니까?',
    desc: '(예: 낮 시간의 피로도, 집중력, 기억력, 기분 등)',
    options: ['전혀 방해되지 않음', '조금 방해됨', '다소 방해됨', '많이 방해됨', '매우 많이 방해됨']
  },
  {
    id: 6,
    title: '타인이 보기에 귀하의 수면 장애가 삶의 질을 얼마나 저하시킨다고 생각하십니까?',
    desc: '(다른 사람이 얼마나 쉽게 알아차릴 수 있는지를 기준으로 평가해주세요.)',
    options: ['전혀 현저하지 않음', '조금 현저함', '다소 현저함', '많이 현저함', '매우 많이 현저함']
  },
  {
    id: 7,
    title: '현재 수면장애에 관하여 얼마나 걱정하고 계십니까?',
    desc: '불면증 문제로 인한 심리적 고통의 정도를 알려주세요.',
    options: ['전혀', '조금', '다소', '많이', '매우 많이']
  }
];

export default function ISIPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(QUESTIONS.length).fill(-1));
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (score: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentStep] = score;
    setAnswers(updatedAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    } else {
      setTimeout(() => setShowResult(true), 300);
    }
  };

  const totalScore = answers.reduce((acc, curr) => acc + (curr === -1 ? 0 : curr), 0);

  const getResult = (score: number) => {
    if (score <= 7) return { 
      title: '정상', 
      desc: '임상적으로 유의미한 불면증이 없는 상태입니다.',
      color: 'var(--color-success)',
      advice: '현재의 건강한 수면 습관을 잘 유지하시기 바랍니다. 규칙적인 운동과 규칙적인 기상 시간을 유지하는 것이 도움이 됩니다.'
    };
    if (score <= 14) return { 
      title: '가벼운 불면증', 
      desc: '역치 이하 수준의 가벼운 불면증 상태입니다.',
      color: 'var(--color-warning)',
      advice: '스트레스나 생활 환경의 변화로 일시적인 불면을 겪으실 수 있습니다. 수면 위생 가이드를 참고하여 수면 환경을 개선해 보시기 바랍니다.'
    };
    if (score <= 21) return { 
      title: '중등도 불면증', 
      desc: '임상적인 수준의 중등도 불면증 상태입니다.',
      color: '#f6ad55', // Orange
      advice: '전문의와의 상담이 필요한 수준입니다. 장기적인 불면증은 심신 건강에 영향을 미칠 수 있으므로 전문가의 도움을 받는 것을 권장합니다.'
    };
    return { 
      title: '심한 불면증', 
      desc: '임상적으로 심각한 수준의 불면증 상태입니다.',
      color: 'var(--color-danger)',
      advice: '지체하지 마시고 아래 문의하기 버튼을 통해 상담을 받아보시기 바랍니다. 한의학적인 접근으로 근본적인 수면 회복을 도와드릴 수 있습니다.'
    };
  };

  const result = getResult(totalScore);
  const progress = ((currentStep + (showResult ? 1 : 0)) / QUESTIONS.length) * 100;

  if (showResult) {
    return (
      <div className="section-container" style={{ padding: '80px 24px' }}>
        <div className="glass-card animate-fade-in" style={{ padding: '60px 40px', maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', marginBottom: 12 }}>검사 결과</h2>
          <div style={{ fontSize: '3.5rem', fontWeight: 800, color: result.color, marginBottom: 8 }}>
            {totalScore} <span style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)' }}>/ 28점</span>
          </div>
          <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 24 }}>{result.title}</h3>
          
          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 32, marginBottom: 40, textAlign: 'left' }}>
            <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white', marginBottom: 16 }}>{result.desc}</p>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>{result.advice}</p>
          </div>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <Link href="/qa" className="btn-primary" style={{ padding: '16px 40px', fontSize: '1.05rem', background: result.color }}>
              Q&A에 문의하기
            </Link>
          </div>
          
          <button 
            onClick={() => { setShowResult(false); setCurrentStep(0); setAnswers(new Array(QUESTIONS.length).fill(-1)); }}
            style={{ display: 'block', margin: '32px auto 0', background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', textDecoration: 'underline' }}
          >
            테스트 다시하기
          </button>
        </div>
      </div>
    );
  }

  const currentQ = QUESTIONS[currentStep];

  return (
    <div className="section-container" style={{ padding: '80px 24px' }}>
      <div className="page-header">
        <h1 className="gradient-text">불면증 자가진단 (ISI)</h1>
        <p>간단한 자가진단을 통해 수면 건강 상태를 확인해보세요.</p>
      </div>

      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        {/* Progress */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: 8 }}>
            <span>문항 {currentStep + 1} / {QUESTIONS.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div style={{ height: 6, background: 'var(--color-surface-light)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: 'var(--color-accent)', transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }} />
          </div>
        </div>

        {/* Question Card */}
        <div className="glass-card animate-slide-up" key={currentStep} style={{ padding: '48px 40px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 12, lineHeight: 1.4 }}>
            {currentQ.title}
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 40 }}>
            {currentQ.desc}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                style={{
                  padding: '20px 24px',
                  textAlign: 'left',
                  background: answers[currentStep] === index ? 'rgba(108, 92, 231, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${answers[currentStep] === index ? 'var(--color-accent)' : 'var(--color-border)'}`,
                  borderRadius: 14,
                  color: answers[currentStep] === index ? 'white' : 'var(--color-text-secondary)',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: answers[currentStep] === index ? 600 : 400,
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>{option}</span>
                <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{index}점</span>
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40 }}>
            <button
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              style={{
                background: 'none', border: 'none', color: 'var(--color-text-muted)',
                cursor: currentStep === 0 ? 'default' : 'pointer',
                opacity: currentStep === 0 ? 0 : 1,
                fontSize: '0.9rem'
              }}
            >
              ← 이전 문항
            </button>
            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>질문을 선택하면 다음 단계로 넘어갑니다.</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        button:hover {
          background: rgba(108, 92, 231, 0.08) !important;
          border-color: var(--color-accent-light) !important;
          color: white !important;
          transform: translateX(4px);
        }
      `}</style>
    </div>
  );
}
