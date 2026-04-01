'use client';

import { useState, useEffect } from 'react';
import { POST_CATEGORY_LABELS } from '@/types';

interface Post {
  id: string; category: string; title: string; authorName: string;
  viewCount: number; isPublished: boolean; createdAt: string;
}

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = () => {
    setLoading(true);
    fetch('/api/posts?limit=50&allStatus=true')
      .then(r => r.json())
      .then(data => setPosts(data.posts || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadPosts(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('이 게시글을 완전히 삭제하시겠습니까?\n삭제 후에는 복구할 수 없습니다.')) return;
    try {
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      if (!res.ok) alert('삭제 실패: ' + res.status);
    } catch (e) {
      alert('오류 발생: ' + e);
    }
    loadPosts();
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    if (!confirm(`이 게시글을 ${currentStatus ? '비공개' : '공개'} 상태로 변경하시겠습니까?`)) return;
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !currentStatus }),
      });
      if (!res.ok) alert('상태 변경 실패: ' + res.status);
    } catch (e) {
      alert('오류 발생: ' + e);
    }
    loadPosts();
  };

  return (
    <div style={{ padding: '40px 24px 80px' }}>
      <div className="section-container">
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 32 }}>
          <span className="gradient-text">게시글 관리</span>
        </h1>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: 'var(--color-text-muted)' }}>로딩중...</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {posts.map(post => (
              <div key={post.id} className="glass-card" style={{
                padding: '16px 24px',
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <span className={`badge badge-${post.category === 'notice' ? 'notice' : post.category === 'free' ? 'free' : 'sleep-info'}`} style={{ fontSize: '0.7rem' }}>
                  {POST_CATEGORY_LABELS[post.category as keyof typeof POST_CATEGORY_LABELS]}
                </span>
                <span style={{ flex: 1, fontSize: '0.9rem', fontWeight: 500 }}>{post.title}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{post.authorName}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>👁 {post.viewCount}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  {new Date(post.createdAt).toLocaleDateString('ko-KR')}
                </span>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    onClick={() => handleTogglePublish(post.id, post.isPublished)}
                    style={{
                      background: post.isPublished ? 'rgba(108,92,231,0.1)' : 'rgba(156,163,175,0.1)',
                      border: `1px solid ${post.isPublished ? 'rgba(108,92,231,0.2)' : 'rgba(156,163,175,0.2)'}`,
                      color: post.isPublished ? 'var(--color-accent-light)' : '#9ca3af',
                      padding: '6px 14px', borderRadius: 8,
                      cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
                      minWidth: 70,
                    }}
                  >
                    {post.isPublished ? '공개 중' : '비공개'}
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    style={{
                      background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                      color: '#fca5a5', padding: '6px 14px', borderRadius: 8,
                      cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
                    }}
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
