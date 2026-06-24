import React from 'react';

export default function DoctorsPage() {
  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '60px 24px' }}>
      <div style={{ marginBottom: 60, textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: 16 }}>
          의료진 소개
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem' }}>
          수면장애클리닉의 전문 의료진을 소개합니다.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 60 }}>
        {/* 한방 6내과 */}
        <section style={{
          background: 'var(--color-surface)',
          borderRadius: 24,
          border: '1px solid var(--color-border)',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
        }}>
          <div style={{ padding: '32px 40px', borderBottom: '1px solid var(--color-border)', background: 'rgba(44, 95, 124, 0.03)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>
              한방6내과<span style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginLeft: 8 }}>(순환·내분비내과)</span>
            </h2>
            <div style={{ marginTop: 24, fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
              한방6내과는 예방·치료·재활을 아우르는 통합진료를 지향합니다.<br/>
              · 환자의 현재 증상 완화 뿐만 아니라, 재발 방지와 삶의 질 향상에 초점을 맞춥니다.<br/>
              · 한방 치료와 현대 의학적 재활프로그램을 융합하여, 보다 과학적이고 체계적인 관리 체계를 구축합니다.<br/>
              · 검사를 통해 환자의 신체 상태에 대한 정확한 분석을 시행하고, 맞춤형 프로그램을 제공합니다.<br/>
              <br/>
              감사합니다.
            </div>
          </div>

          <div style={{ padding: '40px', display: 'flex', flexWrap: 'wrap', gap: 40 }}>
            {/* 프로필 이미지 & 기본 정보 */}
            <div style={{ flex: '1 1 300px' }}>
              <div style={{ 
                width: '100%', 
                aspectRatio: '4/3', 
                backgroundColor: 'rgba(44, 95, 124, 0.1)', 
                borderRadius: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary)',
                fontSize: '0.9rem',
                marginBottom: 24,
                overflow: 'hidden'
              }}>
                <img src="/images/kang.png" alt="강선이 과장" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 16, color: 'var(--color-text-primary)' }}>강선이 과장</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.8 }}>
                <li>원광대학교 한의과대학 졸업</li>
                <li>원광대학교 한의학 박사</li>
                <li>한방내과 전문의</li>
              </ul>
            </div>

            {/* 진료 분야 및 시간표 */}
            <div style={{ flex: '2 1 400px', display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 16, paddingBottom: 8, borderBottom: '2px solid var(--color-primary)', display: 'inline-block' }}>진료 및 연구분야</h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                    협심증, 부정맥, 심장질환, 흉통, 두근거림, 호흡곤란, 고혈압, 고지혈증, 당뇨병, 동맥경화증, 비만, 불면, 자율신경계질환, 두통, 어지러움, 피로, 뇌졸중, 뇌신경질환
                  </p>
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 16, paddingBottom: 8, borderBottom: '2px solid var(--color-primary)', display: 'inline-block' }}>진료 클리닉</h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                    심장재활 클리닉, 뇌졸중예방클리닉, 고혈압·당뇨·고지혈증 내분비클리닉, 유전체검사클리닉
                  </p>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#d32f2f', textAlign: 'center', marginBottom: 16 }}>진료시간표</h4>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'center' }}>
                    <thead>
                      <tr style={{ background: '#f8f9fa', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd' }}>
                        <th style={{ padding: '12px 8px', borderRight: '1px solid #ddd', borderLeft: '1px solid #ddd', fontWeight: 600 }}>구분</th>
                        <th style={{ padding: '12px 8px', borderRight: '1px solid #ddd', fontWeight: 600 }}>월</th>
                        <th style={{ padding: '12px 8px', borderRight: '1px solid #ddd', fontWeight: 600 }}>화</th>
                        <th style={{ padding: '12px 8px', borderRight: '1px solid #ddd', fontWeight: 600 }}>수</th>
                        <th style={{ padding: '12px 8px', borderRight: '1px solid #ddd', fontWeight: 600 }}>목</th>
                        <th style={{ padding: '12px 8px', borderRight: '1px solid #ddd', fontWeight: 600 }}>금</th>
                        <th style={{ padding: '12px 8px', borderRight: '1px solid #ddd', fontWeight: 600 }}>토</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '12px 8px', borderRight: '1px solid #ddd', borderLeft: '1px solid #ddd' }}>오전</td>
                        <td style={{ padding: '12px 8px', borderRight: '1px solid #ddd', color: 'var(--color-primary)' }}>진료</td>
                        <td style={{ padding: '12px 8px', borderRight: '1px solid #ddd', fontWeight: 600 }}>전공의</td>
                        <td style={{ padding: '12px 8px', borderRight: '1px solid #ddd', color: 'var(--color-primary)' }}>진료</td>
                        <td style={{ padding: '12px 8px', borderRight: '1px solid #ddd', color: 'var(--color-primary)' }}>진료</td>
                        <td style={{ padding: '12px 8px', borderRight: '1px solid #ddd', color: 'var(--color-primary)' }}>진료</td>
                        <td style={{ padding: '12px 8px', borderRight: '1px solid #ddd' }}></td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #ddd' }}>
                        <td style={{ padding: '12px 8px', borderRight: '1px solid #ddd', borderLeft: '1px solid #ddd' }}>오후</td>
                        <td style={{ padding: '12px 8px', borderRight: '1px solid #ddd', color: 'var(--color-primary)' }}>진료</td>
                        <td style={{ padding: '12px 8px', borderRight: '1px solid #ddd', color: 'var(--color-primary)' }}>진료</td>
                        <td style={{ padding: '12px 8px', borderRight: '1px solid #ddd', color: 'var(--color-primary)' }}>진료</td>
                        <td style={{ padding: '12px 8px', borderRight: '1px solid #ddd', color: 'var(--color-primary)' }}>진료</td>
                        <td style={{ padding: '12px 8px', borderRight: '1px solid #ddd', color: 'var(--color-primary)' }}>진료</td>
                        <td style={{ padding: '12px 8px', borderRight: '1px solid #ddd' }}></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 한방 1내과 */}
        <section style={{
          background: 'var(--color-surface)',
          borderRadius: 24,
          border: '1px solid var(--color-border)',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
        }}>
          <div style={{ padding: '32px 40px', borderBottom: '1px solid var(--color-border)', background: 'rgba(44, 95, 124, 0.03)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>
              한방1내과<span style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginLeft: 8 }}>(신경내과)</span>
            </h2>
            <div style={{ marginTop: 24, fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
              <strong style={{ color: 'var(--color-text-primary)' }}>한방1내과(신경내과) 소개</strong><br/><br/>
              - 한방 1내과(한방중풍순환신경내과)는 중추신경계와 뇌신경계에서 발생하는 다양한 기능장애를 진단하고 치료하는 한방전문진료과로서 '뇌졸중한의 중점연구센터', '시냅스재활센터', '두통클리닉', '어지럼증 클리닉', '동작보행분석센터', '혈액순환장애클리닉' 등을 운영하고 있습니다.<br/><br/>
              - 해당 주요질환과 증상으로는 뇌졸중(뇌경색 뇌출혈), 두통, 떨림증상(손떨림, 머리떨림), 이상운동질환(파킨슨병 파킨슨증후군), 어지럼증, 말초신경병(손발 저림, 수족냉증), 혈액순환장애 등이 있습니다.
            </div>
          </div>

          <div style={{ padding: '40px', display: 'flex', flexWrap: 'wrap', gap: 40 }}>
            {/* 프로필 이미지 & 기본 정보 */}
            <div style={{ flex: '1 1 300px' }}>
              <div style={{ 
                width: '100%', 
                aspectRatio: '16/9', 
                backgroundColor: 'rgba(44, 95, 124, 0.1)', 
                borderRadius: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary)',
                fontSize: '0.9rem',
                marginBottom: 24,
                overflow: 'hidden'
              }}>
                <img src="/images/lee.png" alt="이상관 교수" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 16, color: 'var(--color-text-primary)' }}>이상관 교수</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                <li>(현) 원광대학교 광주한방병원 병원장</li>
                <li>(현) 원광대학교 한의과대학 교수</li>
                <li>(현) 보건복지부 지원 '뇌졸중 한의중점연구센터' 센터장</li>
                <li>(현) 원광대학교 광주한방병원 '동작분석센터' 센터장</li>
                <li>(현) 대한중풍순환신경학회 부회장</li>
                <li>(구) 원광대학교 광주한방병원 임상시험센터 센터장</li>
                <li>(구) 원광대학교 광주한방병원 임상한의학연구소 소장</li>
              </ul>
            </div>

            {/* 진료 분야 및 시간표 */}
            <div style={{ flex: '2 1 400px', display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 16, paddingBottom: 8, borderBottom: '2px solid var(--color-primary)', display: 'inline-block' }}>진료 및 연구분야</h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                    뇌혈관질환, 뇌신경질환, 이상운동질환, 자율신경계질환, 심장 관질환
                  </p>
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 16, paddingBottom: 8, borderBottom: '2px solid var(--color-primary)', display: 'inline-block' }}>진료 클리닉</h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                    중풍클리닉, 뇌신경 클리닉, 이상운동 클리닉, 두통 클리닉, 어지럼증 클리닉
                  </p>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#d32f2f', textAlign: 'center', marginBottom: 16 }}>진료시간표</h4>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'center' }}>
                    <thead>
                      <tr style={{ background: '#f8f9fa', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd' }}>
                        <th style={{ padding: '12px 8px', borderRight: '1px solid #ddd', borderLeft: '1px solid #ddd', fontWeight: 600 }}>구분</th>
                        <th style={{ padding: '12px 8px', borderRight: '1px solid #ddd', fontWeight: 600 }}>월</th>
                        <th style={{ padding: '12px 8px', borderRight: '1px solid #ddd', fontWeight: 600 }}>화</th>
                        <th style={{ padding: '12px 8px', borderRight: '1px solid #ddd', fontWeight: 600 }}>수</th>
                        <th style={{ padding: '12px 8px', borderRight: '1px solid #ddd', fontWeight: 600 }}>목</th>
                        <th style={{ padding: '12px 8px', borderRight: '1px solid #ddd', fontWeight: 600 }}>금</th>
                        <th style={{ padding: '12px 8px', borderRight: '1px solid #ddd', fontWeight: 600 }}>토</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '12px 8px', borderRight: '1px solid #ddd', borderLeft: '1px solid #ddd' }}>오전</td>
                        <td style={{ padding: '12px 8px', borderRight: '1px solid #ddd', color: 'var(--color-primary)' }}>진료</td>
                        <td style={{ padding: '12px 8px', borderRight: '1px solid #ddd' }}></td>
                        <td style={{ padding: '12px 8px', borderRight: '1px solid #ddd', color: 'var(--color-primary)' }}>진료</td>
                        <td style={{ padding: '12px 8px', borderRight: '1px solid #ddd' }}></td>
                        <td style={{ padding: '12px 8px', borderRight: '1px solid #ddd', color: 'var(--color-primary)' }}>진료</td>
                        <td style={{ padding: '12px 8px', borderRight: '1px solid #ddd', color: 'var(--color-primary)' }}>진료(검사)</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #ddd' }}>
                        <td style={{ padding: '12px 8px', borderRight: '1px solid #ddd', borderLeft: '1px solid #ddd' }}>오후</td>
                        <td style={{ padding: '12px 8px', borderRight: '1px solid #ddd', color: 'var(--color-primary)' }}>진료</td>
                        <td style={{ padding: '12px 8px', borderRight: '1px solid #ddd' }}></td>
                        <td style={{ padding: '12px 8px', borderRight: '1px solid #ddd', color: 'var(--color-primary)' }}>진료(동작분석)</td>
                        <td style={{ padding: '12px 8px', borderRight: '1px solid #ddd' }}></td>
                        <td style={{ padding: '12px 8px', borderRight: '1px solid #ddd', color: 'var(--color-primary)' }}>진료</td>
                        <td style={{ padding: '12px 8px', borderRight: '1px solid #ddd' }}></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
