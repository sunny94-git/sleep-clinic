'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

interface Stats {
  totalPosts: number;
  totalQA: number;
  pendingQA: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ totalPosts: 0, totalQA: 0, pendingQA: 0 });

  useEffect(() => {
    Promise.all([
      fetch('/api/posts?limit=1').then(r => r.json()),
      fetch('/api/qa?limit=1').then(r => r.json()),
      fetch('/api/qa?status=pending&limit=1').then(r => r.json()),
    ]).then(([posts, qa, pendingQa]) => {
      setStats({
        totalPosts: posts.total || 0,
        totalQA: qa.total || 0,
        pendingQA: pendingQa.total || 0,
      });
    }).catch(console.error);
  }, []);

  const cards = [
    { label: '전체 게시글', value: stats.totalPosts, icon: '📝', color: '#6c5ce7', href: '/admin/posts' },
    { label: '전체 Q&A', value: stats.totalQA, icon: '❓', color: '#2d5a8e', href: '/admin/qa' },
    { label: '답변 대기', value: stats.pendingQA, icon: '⏳', color: '#f59e0b', href: '/admin/qa' },
  ];

  return (
    <div style={{ padding: '40px 24px 80px' }}>
      <div className="section-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: 4 }}>
              <span className="gradient-text">관리자 대시보드</span>
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>수면장애클리닉 CMS</p>
          </div>
          <button onClick={() => signOut({ callbackUrl: '/' })} className="btn-secondary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
            로그아웃
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 20,
          marginBottom: 48,
        }}>
          {cards.map((card, i) => (
            <Link key={i} href={card.href} style={{ textDecoration: 'none' }}>
              <div className="glass-card" style={{ padding: 28, textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: 8 }}>{card.icon}</div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: card.color, marginBottom: 4 }}>
                  {card.value}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{card.label}</div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          <Link href="/admin/posts" style={{ textDecoration: 'none' }}>
            <div className="glass-card" style={{ padding: 28 }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 8 }}>📝 게시글 관리</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                게시글 확인, 삭제, 공개/비공개 관리
              </p>
            </div>
          </Link>
          <Link href="/admin/qa" style={{ textDecoration: 'none' }}>
            <div className="glass-card" style={{ padding: 28 }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 8 }}>❓ Q&A 관리</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                대기중인 질문에 답변하기
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
