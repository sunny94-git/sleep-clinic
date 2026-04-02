'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export default function AdminFloatingButton() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const isAdmin = status === 'authenticated' && (session as any)?.user?.role === 'admin';
  const isAdminPath = pathname.startsWith('/admin');

  // Only show if user is admin AND NOT currently on an admin page
  if (!isAdmin || isAdminPath) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '40px',
      right: '40px',
      zIndex: 9999,
      animation: 'slideUp 0.5s ease-out forwards',
    }}>
      <Link href="/admin" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '14px 24px',
        background: 'linear-gradient(135deg, var(--color-accent), var(--color-primary-light))',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '30px',
        fontWeight: 700,
        fontSize: '0.95rem',
        boxShadow: '0 10px 25px rgba(108, 92, 231, 0.4)',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
      className="admin-fab"
      >
        <span style={{ fontSize: '1.2rem' }}>⚙️</span>
        <span>관리자 홈으로 가기</span>
      </Link>

      <style jsx>{`
        .admin-fab:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 15px 35px rgba(108, 92, 231, 0.5);
          filter: brightness(1.1);
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .admin-fab {
            bottom: 24px;
            right: 24px;
            padding: 12px 20px;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
}
