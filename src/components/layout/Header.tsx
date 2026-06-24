'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/', label: '홈' },
  { 
    label: '소개',
    subItems: [
      { href: '/about', label: '클리닉 소개' },
      { href: '/doctors', label: '의료진 소개' },
    ]
  },
  { href: '/isi', label: '자가진단' },
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
      background: 'rgba(255, 255, 255, 0.92)', 
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
            background: 'linear-gradient(135deg, #2C5F7C, #3A7CA5)',
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
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="desktop-nav">
          {NAV_ITEMS.map((item, idx) => (
            <div key={idx} className="nav-item-group" style={{ position: 'relative' }}>
              {item.href ? (
                <Link
                  href={item.href}
                  style={{
                    display: 'block',
                    padding: '8px 16px',
                    borderRadius: 8,
                    fontSize: '0.9rem',
                    fontWeight: pathname === item.href ? 600 : 400,
                    color: pathname === item.href ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    background: pathname === item.href ? 'rgba(44, 95, 124, 0.08)' : 'transparent',
                  }}
                >
                  {item.label}
                </Link>
              ) : (
                <div
                  style={{
                    padding: '8px 16px',
                    borderRadius: 8,
                    fontSize: '0.9rem',
                    fontWeight: item.subItems?.some(s => pathname === s.href) ? 600 : 400,
                    color: item.subItems?.some(s => pathname === s.href) ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    background: item.subItems?.some(s => pathname === s.href) ? 'rgba(44, 95, 124, 0.08)' : 'transparent',
                  }}
                >
                  {item.label}
                </div>
              )}
              {item.subItems && (
                <div className="nav-dropdown" style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 12,
                  padding: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  minWidth: 140,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  zIndex: 200,
                  marginTop: 8,
                  opacity: 0,
                  visibility: 'hidden',
                  transition: 'all 0.2s ease',
                }}>
                  {item.subItems.map(sub => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      style={{
                        padding: '10px 16px',
                        borderRadius: 8,
                        fontSize: '0.9rem',
                        fontWeight: pathname === sub.href ? 600 : 400,
                        color: pathname === sub.href ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        background: pathname === sub.href ? 'rgba(44, 95, 124, 0.08)' : 'transparent',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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
          {NAV_ITEMS.map((item, idx) => (
            <div key={idx}>
              {item.href ? (
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'block',
                    padding: '12px 16px',
                    borderRadius: 10,
                    fontSize: '0.95rem',
                    fontWeight: pathname === item.href ? 600 : 400,
                    color: pathname === item.href ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                    textDecoration: 'none',
                    background: pathname === item.href ? 'rgba(44, 95, 124, 0.08)' : 'transparent',
                  }}
                >
                  {item.label}
                </Link>
              ) : (
                <div style={{ marginBottom: 4 }}>
                  <div style={{
                    padding: '12px 16px',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                  }}>
                    {item.label}
                  </div>
                  <div style={{ paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {item.subItems?.map(sub => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setMobileOpen(false)}
                        style={{
                          display: 'block',
                          padding: '10px 16px',
                          borderRadius: 10,
                          fontSize: '0.9rem',
                          fontWeight: pathname === sub.href ? 600 : 400,
                          color: pathname === sub.href ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                          textDecoration: 'none',
                          background: pathname === sub.href ? 'rgba(44, 95, 124, 0.08)' : 'transparent',
                        }}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
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
          .nav-item-group:hover .nav-dropdown {
            opacity: 1 !important;
            visibility: visible !important;
            transform: translateX(-50%) translateY(0) !important;
          }
          .nav-dropdown {
            transform: translateX(-50%) translateY(10px) !important;
          }
          .nav-dropdown a:hover {
            background: rgba(44, 95, 124, 0.04) !important;
          }
        }
      `}</style>
    </header>
  );
}

