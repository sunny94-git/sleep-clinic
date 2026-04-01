import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

const ARTICLES: Record<string, { title: string; content: string; icon: string }> = {
  insomnia: {
    title: '불면증의 원인과 한방치료',
    icon: '😴',
    content: `불면증은 잠들기 어렵거나, 자주 깨거나, 너무 일찍 깨어나 다시 잠들지 못하는 수면장애입니다.

## 불면증의 원인

불면증은 다양한 원인에 의해 발생할 수 있습니다:

• 스트레스와 불안: 업무, 학업, 대인관계 등에서 오는 심리적 부담
• 불규칙한 생활 습관: 불규칙한 수면 시간, 과도한 카페인 섭취
• 환경적 요인: 소음, 조명, 온도 등 수면 환경 문제
• 신체적 질환: 통증, 호흡기 질환, 위장 질환 등
• 정신건강 문제: 우울증, 불안장애 등

## 한의학적 접근

한의학에서는 불면증을 심(心)과 신(腎)의 불균형으로 봅니다.

• 심신불교(心腎不交): 심장의 화(火)와 신장의 수(水)가 조화를 이루지 못하는 상태
• 심비양허(心脾兩虛): 과도한 사고와 걱정으로 심장과 비장이 허해진 상태
• 간울화화(肝鬱化火): 스트레스가 간에 울체되어 화(火)로 변한 상태

## 치료 방법

• 한약치료: 체질과 증상에 맞는 맞춤 처방 (귀비탕, 천왕보심단, 산조인탕 등)
• 침구치료: 신문(神門), 안면(安眠), 백회(百會) 등 수면 관련 경혈 자극
• 이완치료: 복식호흡, 점진적 근이완법 안내
• 수면 위생 교육: 건강한 수면 습관 형성 지도`,
  },
  'sleep-apnea': {
    title: '수면무호흡증 알아보기',
    icon: '😮‍💨',
    content: `수면무호흡증은 수면 중 반복적으로 호흡이 멈추는 질환으로, 심각한 건강 문제를 유발할 수 있습니다.

## 주요 증상

• 심한 코골이
• 수면 중 호흡 정지 (보호자가 목격)
• 주간 과다 졸음
• 아침 두통
• 집중력 저하
• 야간 빈뇨

## 합병증

치료하지 않으면 고혈압, 심장질환, 뇌졸중, 당뇨병 등의 위험이 증가합니다.

## 한의학적 치료

• 한약치료: 기도 주변 조직의 탄력 회복, 비만 관리
• 침구치료: 인후부 근육 강화, 비강 통기 개선
• 체중 관리: 한방 비만 치료와 병행
• 생활습관 개선: 수면 자세 교정, 음주 제한`,
  },
  'sleep-hygiene': {
    title: '올바른 수면 위생 가이드',
    icon: '🛏️',
    content: `수면 위생이란 좋은 수면을 위한 생활 습관과 환경을 의미합니다.

## 수면 위생 10가지 원칙

• 규칙적인 수면-기상 시간을 유지하세요
• 침실은 수면과 부부관계만을 위해 사용하세요
• 잠이 오지 않으면 침대에서 나오세요 (20분 규칙)
• 낮잠은 30분 이내로 제한하세요
• 취침 4-6시간 전부터 카페인을 피하세요
• 취침 전 알코올 섭취를 삼가세요
• 규칙적인 운동을 하되, 취침 3시간 전에 마무리하세요
• 취침 전 강한 빛(스마트폰, TV)을 피하세요
• 침실 환경을 어둡고, 조용하고, 시원하게 유지하세요
• 취침 전 이완 활동(독서, 명상, 따뜻한 목욕)을 하세요

## 한방에서의 수면 위생

• 족욕: 취침 전 따뜻한 물에 발을 담가 혈액순환 촉진
• 이침(耳鍼): 귀의 신문혈에 소형 자석을 부착하여 지속적 자극
• 약베개: 석창포, 국화 등을 넣은 베개로 안정감 제공
• 한방차: 대추차, 용안육차 등으로 심신 안정`,
  },
  'restless-leg': {
    title: '하지불안증후군 이해하기',
    icon: '🦵',
    content: `하지불안증후군은 다리에 불쾌한 감각과 함께 다리를 움직이고 싶은 강한 충동을 느끼는 신경계 질환입니다.

## 증상 특징

• 다리의 불쾌감 (저리거나, 기어가는 느낌, 당기는 느낌)
• 가만히 있을 때 악화
• 움직이면 일시적으로 완화
• 저녁이나 밤에 증상 악화
• 수면 방해로 인한 만성 불면

## 한의학적 치료

한의학에서는 하지불안증후군을 혈허(血虛), 기혈순환 장애로 봅니다.

• 한약치료: 보혈 안신 처방 (사물탕 가감, 작약감초탕 등)
• 침구치료: 하지 경혈 자극으로 기혈 순환 개선
• 뜸치료: 족삼리, 삼음교 등에 온열 자극
• 부항치료: 하지 근육 이완 및 혈행 개선`,
  },
  'herbal-medicine': {
    title: '수면장애 한약 치료',
    icon: '🌿',
    content: `수면장애 치료에 사용되는 대표적인 한약 처방을 소개합니다.

## 대표 처방

### 귀비탕(歸脾湯)
• 적응증: 과도한 사고, 걱정으로 인한 불면
• 효과: 심장과 비장을 보하여 안신(安神) 효과

### 천왕보심단(天王補心丹)
• 적응증: 가슴 두근거림, 입마름을 동반한 불면
• 효과: 심음(心陰)을 보충하여 수면 안정

### 산조인탕(酸棗仁湯)
• 적응증: 피로하지만 잠이 오지 않는 허번불면
• 효과: 간혈(肝血)을 보하고 정신을 안정

### 온담탕(溫膽湯)
• 적응증: 소화불량, 답답함을 동반한 불면
• 효과: 담(痰)을 제거하고 위장 기능 개선

## 주의사항

• 한약은 반드시 한의사의 진찰 후 체질에 맞게 처방받아야 합니다
• 양약과 병용 시 한의사에게 반드시 알려주세요
• 처방전 없이 임의로 한약을 복용하지 마세요`,
  },
  'acupuncture-sleep': {
    title: '수면을 위한 침구치료',
    icon: '📍',
    content: `침구치료는 수면장애에 효과적인 비약물적 치료법입니다.

## 수면 관련 주요 경혈

### 신문(神門) - HT7
• 위치: 손목 안쪽 주름의 척측
• 효과: 심장을 안정시키고 정신을 편안하게 함

### 안면(安眠)
• 위치: 귀 뒤쪽 유양돌기 아래
• 효과: 수면 유도에 특효

### 백회(百會) - GV20
• 위치: 정수리 중앙
• 효과: 정신을 맑게 하고 안정시킴

### 사신총(四神聰)
• 위치: 백회 주변 4개 혈
• 효과: 불면, 건망, 두통 개선

## 치료 과정

• 초진 시 체질과 증상 파악
• 개인별 맞춤 경혈 선정
• 주 2-3회 시술 (1회 약 20-30분)
• 보통 4-8주 치료 과정
• 증상에 따라 한약 병행

## 치료 효과

• 수면 잠복기 단축 (잠드는 시간 줄어듦)
• 수면 효율 증가
• 야간 각성 횟수 감소
• 주간 졸음 및 피로 개선
• 부작용이 적은 안전한 치료`,
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) return { title: '수면정보' };
  return { title: article.title, description: article.content.slice(0, 160) };
}

function renderContent(raw: string): string {
  return raw
    .replace(/^### (.+)$/gm, '<h4 style="font-size:1.05rem;font-weight:700;margin:24px 0 10px;color:var(--color-text-primary)">$1</h4>')
    .replace(/^## (.+)$/gm, '<h3 style="font-size:1.25rem;font-weight:700;margin:36px 0 14px;color:var(--color-accent-light)">$1</h3>')
    .replace(/^• (.+)$/gm, '<div style="display:flex;gap:8px;margin:6px 0 6px 8px;line-height:1.7"><span style="color:var(--color-accent-light)">•</span><span>$1</span></div>')
    .replace(/\n\n/g, '<div style="height:12px"></div>');
}

export default async function SleepInfoDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) notFound();

  return (
    <div>
      <section style={{ padding: '80px 24px 0', background: 'linear-gradient(180deg, var(--color-surface) 0%, var(--color-primary-dark) 100%)' }}>
        <div className="section-container" style={{ maxWidth: 800 }}>
          <Link href="/sleep-info" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 24 }}>
            ← 수면정보 목록
          </Link>
        </div>
      </section>

      <section style={{ padding: '0 24px 80px' }}>
        <div className="section-container" style={{ maxWidth: 800 }}>
          <div className="glass-card" style={{ padding: 'clamp(28px, 5vw, 48px) clamp(24px, 4vw, 44px)' }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, background: 'rgba(108,92,231,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: 24 }}>
              {article.icon}
            </div>
            <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.4 }}>
              {article.title}
            </h1>
            <div style={{ fontSize: '0.95rem', lineHeight: 1.9, color: 'var(--color-text-secondary)' }} dangerouslySetInnerHTML={{ __html: renderContent(article.content) }} />

            <div style={{ marginTop: 48, padding: '28px 24px', borderRadius: 14, background: 'rgba(108,92,231,0.06)', border: '1px solid rgba(108,92,231,0.15)', textAlign: 'center' }}>
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
