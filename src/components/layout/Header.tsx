'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/', label: '홈' },
  { href: '/about', label: '소개' },
  { href: '/sleep-info', label: '수면정보' },
  { href: '/board', label: '게시판' },
  { href: '/qa', label: 'Q&A' },
  { href: '/contact', label: '오시는 길' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--color-border)',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 72,
      }}>
        {/* Logo */}
        <Link href="/" style={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #6c5ce7, #2d5a8e)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
          }}>
            🌙
          </div>
          <div>
            <div style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              lineHeight: 1.2,
            }}>
              수면장애클리닉
            </div>
            <div style={{
              fontSize: '0.65rem',
              color: 'var(--color-text-muted)',
              letterSpacing: '0.05em',
            }}>
              원광대 광주한방병원
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', gap: 4 }} className="desktop-nav">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                fontSize: '0.9rem',
                fontWeight: pathname === item.href ? 600 : 400,
                color: pathname === item.href ? 'var(--color-accent-light)' : 'var(--color-text-secondary)',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                background: pathname === item.href ? 'rgba(108, 92, 231, 0.1)' : 'transparent',
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="메뉴 열기"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'var(--color-text-primary)',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: 8,
          }}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="mobile-nav" style={{
          padding: '16px 24px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          borderTop: '1px solid var(--color-border)',
        }}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              style={{
                padding: '12px 16px',
                borderRadius: 10,
                fontSize: '0.95rem',
                fontWeight: pathname === item.href ? 600 : 400,
                color: pathname === item.href ? 'var(--color-accent-light)' : 'var(--color-text-secondary)',
                textDecoration: 'none',
                background: pathname === item.href ? 'rgba(108, 92, 231, 0.1)' : 'transparent',
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}

      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-nav { display: none !important; }
        }
      `}</style>
    </header>
  );
}
