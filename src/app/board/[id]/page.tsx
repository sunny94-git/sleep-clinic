'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { POST_CATEGORY_LABELS } from '@/types';

interface Post {
  id: string;
  category: string;
  title: string;
  content: string;
  authorName: string;
  viewCount: number;
  createdAt: string;
  tweetId?: string;
}

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/posts/${params.id}`)
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setPost)
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div style={{ padding: '120px 24px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
        로딩중...
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ padding: '120px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: 16 }}>게시글을 찾을 수 없습니다</h2>
        <Link href="/board" className="btn-secondary">목록으로</Link>
      </div>
    );
  }

  const badgeClass = post.category === 'notice' ? 'badge badge-notice' :
    post.category === 'free' ? 'badge badge-free' : 'badge badge-sleep-info';

  return (
    <div>
      <section style={{ padding: '80px 24px 40px' }}>
        <div className="section-container" style={{ maxWidth: 800 }}>
          {/* Back */}
          <button
            onClick={() => router.back()}
            style={{
              background: 'none', border: 'none', color: 'var(--color-text-muted)',
              cursor: 'pointer', fontSize: '0.9rem', marginBottom: 24, padding: 0,
            }}
          >
            ← 목록으로
          </button>

          {/* Header */}
          <div className="glass-card" style={{ padding: '40px 36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span className={badgeClass}>
                {POST_CATEGORY_LABELS[post.category as keyof typeof POST_CATEGORY_LABELS]}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                {new Date(post.createdAt).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>

            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 16, lineHeight: 1.4 }}>
              {post.title}
            </h1>

            <div style={{
              display: 'flex', gap: 16, fontSize: '0.85rem', color: 'var(--color-text-muted)',
              paddingBottom: 24, borderBottom: '1px solid var(--color-border)',
              marginBottom: 32,
            }}>
              <span>✍️ {post.authorName}</span>
              <span>👁 {post.viewCount}</span>
            </div>

            {/* Content */}
            <div style={{
              fontSize: '1rem',
              lineHeight: 1.9,
              color: 'var(--color-text-secondary)',
              whiteSpace: 'pre-wrap',
            }}>
              {post.content}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
