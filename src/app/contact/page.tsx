import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '오시는 길',
  description: '원광대학교 광주한방병원 수면장애클리닉 오시는 길, 진료시간, 연락처 안내',
};

const INFO_ITEMS = [
  { icon: '📍', label: '주소', value: '광주광역시 남구 회재로 1140-23\n원광대학교 광주한방병원' },
  { icon: '📞', label: '대표전화', value: '062-670-6700' },
  { icon: '📠', label: '팩스', value: '062-670-6499' },
];

const HOURS = [
  { day: '평일 (월~금)', time: '09:00 - 17:30' },
  { day: '토요일', time: '09:00 - 12:30' },
  { day: '일요일·공휴일', time: '휴진' },
  { day: '점심시간', time: '12:30 - 13:30' },
];

const DIRECTIONS = [
  { icon: '🚌', method: '버스', desc: '순환 01, 지원 45, 송암 47, 금남 59, 대촌 71, 진월 75, 진월 78\n(병원 앞까지 운행 병원 앞에서 내리시면 됩니다)\n\n순환 01, 풍암 06, 수완 12, 지원 25, 송암 31, 지원 45, 문흥 48, 운림 50, 송암 73, 대촌 71, 진월 77' },
  { icon: '🚇', method: '지하철', desc: '쌍촌역 하차 후 대중교통 이용' },
  { icon: '🚗', method: '자가용', desc: '병원 내 주차장 이용 가능 (외래 환자 무료)' },
];

export default function ContactPage() {
  return (
    <div>
      <section style={{
        padding: '80px 24px 60px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, var(--color-surface) 0%, var(--color-primary-dark) 100%)',
      }}>
        <div className="section-container">
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, marginBottom: 16 }}>
            <span className="gradient-text">오시는 길</span>
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>
            원광대학교 광주한방병원 수면장애클리닉
          </p>
        </div>
      </section>

      <section style={{ padding: '60px 24px' }}>
        <div className="section-container">
          {/* Map */}
          <div className="glass-card" style={{
            overflow: 'hidden',
            marginBottom: 32,
            height: 400,
            position: 'relative',
          }}>
            <iframe
              src="https://map.kakao.com/?urlX=495428&urlY=232750&itemId=8007015&q=%EC%9B%90%EA%B4%91%EB%8C%80%ED%95%99%EA%B5%90%EA%B4%91%EC%A3%BC%ED%95%9C%EB%B0%A9%EB%B3%91%EC%9B%90&srcid=8007015&map_type=TYPE_MAP"
              width="100%"
              height="100%"
              style={{ border: 'none' }}
              title="원광대학교 광주한방병원 위치"
              loading="lazy"
            />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
          }}>
            {/* Contact Info */}
            <div className="glass-card" style={{ padding: 32 }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 24 }}>연락처</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {INFO_ITEMS.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10,
                      background: 'rgba(108,92,231,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 4 }}>{item.label}</div>
                      <div style={{ fontSize: '0.95rem', whiteSpace: 'pre-line', lineHeight: 1.6 }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hours */}
            <div className="glass-card" style={{ padding: 32 }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 24 }}>진료시간</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {HOURS.map((h, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '12px 16px', borderRadius: 10,
                    background: h.time === '휴진' ? 'rgba(239,68,68,0.05)' : 'rgba(108,92,231,0.05)',
                  }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{h.day}</span>
                    <span style={{
                      fontSize: '0.9rem', fontWeight: 600,
                      color: h.time === '휴진' ? 'var(--color-danger)' : 'var(--color-accent-light)',
                    }}>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Directions */}
            <div className="glass-card" style={{ padding: 32 }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 24 }}>교통편</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {DIRECTIONS.map((d, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10,
                      background: 'rgba(108,92,231,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {d.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 4 }}>{d.method}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{d.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
