'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
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
  isPublished: boolean;
}

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const isAdmin = (session as any)?.user?.role === 'admin';

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Deletion state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDelete = async () => {
    if (!isAdmin && !deletePassword) {
      alert('비밀번호를 입력해주세요.');
      return;
    }
    
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/posts/${params.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: deletePassword }),
      });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || '삭제에 실패했습니다.');
      }
      
      alert('삭제되었습니다.');
      router.push('/board');
    } catch (err) {
      alert(err instanceof Error ? err.message : '오류가 발생했습니다.');
    } finally {
      setIsDeleting(false);
    }
  };

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

  const canManage = isAdmin || post.category === 'free';

  return (
    <div>
      <section style={{ padding: '80px 24px 40px' }}>
        <div className="section-container" style={{ maxWidth: 800 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <button
              onClick={() => router.back()}
              style={{
                background: 'none', border: 'none', color: 'var(--color-text-muted)',
                cursor: 'pointer', fontSize: '0.9rem', padding: 0,
              }}
            >
              ← 목록으로
            </button>

            {canManage && (
              <div style={{ display: 'flex', gap: 8 }}>
                <Link href={`/board/edit/${post.id}`} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                  ✎ 수정
                </Link>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.8rem', color: '#fca5a5' }}
                >
                  🗑 삭제
                </button>
              </div>
            )}
          </div>

          <div className="glass-card" style={{ padding: '40px 36px', marginBottom: 32 }}>
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

            <div style={{
              fontSize: '1rem',
              lineHeight: 1.9,
              color: 'var(--color-text-secondary)',
              whiteSpace: 'pre-wrap',
            }}>
              {post.content}
            </div>
          </div>

          {/* Delete Modal */}
          {showDeleteModal && (
            <div style={{
              position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
              background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
              padding: 24
            }}>
              <div className="glass-card" style={{ maxWidth: 400, width: '100%', padding: 32 }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 16 }}>글 삭제 확인</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: 24 }}>
                  정말로 이 글을 삭제하시겠습니까? {isAdmin ? '관리자 권한으로 삭제합니다.' : '작성 시 입력한 비밀번호를 입력해주세요.'}
                </p>
                
                {!isAdmin && (
                  <input
                    type="password"
                    className="input-field"
                    placeholder="비밀번호"
                    value={deletePassword}
                    onChange={e => setDeletePassword(e.target.value)}
                    style={{ marginBottom: 24 }}
                  />
                )}
                
                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="btn-primary"
                    style={{ background: '#ef4444', flex: 1 }}
                  >
                    {isDeleting ? '삭제 중...' : '삭제'}
                  </button>
                  <button
                    onClick={() => { setShowDeleteModal(false); setDeletePassword(''); }}
                    className="btn-secondary"
                    style={{ flex: 1 }}
                  >
                    취소
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
