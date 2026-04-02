'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

function AdminStatus() {
  const { data: session, status } = useSession();
  const isAdmin = status === 'authenticated' && (session as any)?.user?.role === 'admin';

  if (status === 'loading') return <div style={{ width: 40 }} />;

  if (isAdmin) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ 
          fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: 4,
          background: 'rgba(108, 92, 231, 0.2)', color: 'var(--color-accent-light)',
          border: '1px solid rgba(108, 92, 231, 0.3)'
        }}>관리자</span>
        <button 
          onClick={() => signOut({ callbackUrl: '/' })}
          style={{
            background: 'none', border: 'none', color: 'var(--color-text-muted)',
            fontSize: '0.75rem', cursor: 'pointer', padding: '4px 0',
            textDecoration: 'underline'
          }}
        >로그아웃</button>
      </div>
    );
  }

  return (
    <Link href="/admin/login" style={{
      fontSize: '0.75rem', color: 'var(--color-text-muted)', textDecoration: 'none',
    }}>관리자 로그인</Link>
  );
}

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--color-border)',
      background: 'var(--color-surface)',
      padding: '48px 0 32px',
      marginTop: 80,
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 24px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 40,
          marginBottom: 40,
        }}>
          {/* Clinic Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #6c5ce7, #2d5a8e)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
              }}>
                🌙
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>수면장애클리닉</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>원광대학교 광주한방병원</div>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
              불면증, 수면무호흡, 하지불안증후군 등<br />
              수면장애 전문 한방 치료
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 16, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              바로가기
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { href: '/about', label: '클리닉 소개' },
                { href: '/isi', label: '자가진단' },
                { href: '/sleep-info', label: '수면정보' },
                { href: '/board', label: '게시판' },
                { href: '/qa', label: 'Q&A' },
                { href: '/contact', label: '오시는 길' },
              ].map(link => (
                <Link key={link.href} href={link.href} style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-text-secondary)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 16, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              연락처
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
              <span>📍 광주광역시 남구 회재로 1140-23</span>
              <span>📞 062-670-6700</span>
              <span>🕐 평일 09:00 - 17:30</span>
              <span>🕐 토요일 09:00 - 12:30</span>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid var(--color-border)',
          paddingTop: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
          fontSize: '0.8rem',
          color: 'var(--color-text-muted)',
        }}>
          <span>© {new Date().getFullYear()} 원광대학교 광주한방병원 수면장애클리닉. All rights reserved.</span>
          <AdminStatus />
        </div>
      </div>
    </footer>
  );
}
