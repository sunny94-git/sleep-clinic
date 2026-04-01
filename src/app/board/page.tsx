'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { POST_CATEGORY_LABELS } from '@/types';

interface Post {
  id: string;
  category: string;
  title: string;
  authorName: string;
  viewCount: number;
  createdAt: string;
}

const TABS = [
  { value: 'all', label: '전체' },
  { value: 'notice', label: '공지사항' },
  { value: 'free', label: '자유게시판' },
  { value: 'sleep_info', label: '수면정보' },
];

export default function BoardPage() {
  const { data: session, status } = useSession();
  const isAdmin = status === 'authenticated' && (session as any)?.user?.role === 'admin';
  const [posts, setPosts] = useState<Post[]>([]);
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/posts?category=${category}&page=${page}&limit=10`)
      .then(res => res.json())
      .then(data => {
        setPosts(data.posts || []);
        setTotalPages(data.totalPages || 1);
      })
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, [category, page]);

  const badgeClass = (cat: string) => {
    if (cat === 'notice') return 'badge badge-notice';
    if (cat === 'free') return 'badge badge-free';
    return 'badge badge-sleep-info';
  };

  return (
    <div>
      <section style={{
        padding: '80px 24px 40px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, var(--color-surface) 0%, var(--color-primary-dark) 100%)',
      }}>
        <div className="section-container">
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, marginBottom: 12 }}>
            <span className="gradient-text">게시판</span>
          </h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>공지사항, 자유게시판, 수면정보를 확인하세요</p>
        </div>
      </section>

      <section style={{ padding: '40px 24px 80px' }}>
        <div className="section-container">
          {/* Category Tabs */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
            <div className="category-tabs">
              {TABS.map(tab => (
                <button
                  key={tab.value}
                  className={`category-tab ${category === tab.value ? 'active' : ''}`}
                  onClick={() => { setCategory(tab.value); setPage(1); }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {(isAdmin || (category !== 'notice' && category !== 'sleep_info')) && (
              <Link href="/board/write" className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.875rem' }}>
                ✏️ 글쓰기
              </Link>
            )}
          </div>

          {/* Posts List */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: 60, color: 'var(--color-text-muted)' }}>로딩중...</div>
          ) : posts.length === 0 ? (
            <div className="glass-card" style={{ textAlign: 'center', padding: 60 }}>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>게시글이 없습니다.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {posts.map(post => (
                <Link key={post.id} href={`/board/${post.id}`} style={{ textDecoration: 'none' }}>
                  <div className="glass-card" style={{
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    cursor: 'pointer',
                  }}>
                    <span className={badgeClass(post.category)}>
                      {POST_CATEGORY_LABELS[post.category as keyof typeof POST_CATEGORY_LABELS] || post.category}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                        {post.title}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 20, fontSize: '0.8rem', color: 'var(--color-text-muted)', flexShrink: 0 }}>
                      <span>{post.authorName}</span>
                      <span>👁 {post.viewCount}</span>
                      <span>{new Date(post.createdAt).toLocaleDateString('ko-KR')}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32 }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  style={{
                    width: 40, height: 40, borderRadius: 10,
                    border: p === page ? 'none' : '1px solid var(--color-border)',
                    background: p === page ? 'var(--color-accent)' : 'transparent',
                    color: p === page ? 'white' : 'var(--color-text-secondary)',
                    cursor: 'pointer',
                    fontWeight: 600, fontSize: '0.875rem',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
