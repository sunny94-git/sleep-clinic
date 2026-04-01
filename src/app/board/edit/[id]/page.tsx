'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const ALL_CATEGORIES = [
  { value: 'notice', label: '공지사항' },
  { value: 'free', label: '자유게시판' },
  { value: 'sleep_info', label: '수면정보' },
];

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const { data: session } = useSession();
  const isAdmin = (session as any)?.user?.role === 'admin';

  const [form, setForm] = useState({ 
    category: 'free', 
    title: '', 
    content: '', 
    authorName: '',
    password: '' 
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const availableCategories = isAdmin 
    ? ALL_CATEGORIES 
    : ALL_CATEGORIES.filter(c => c.value === 'free');

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.error);
        setForm(f => ({
          ...f,
          category: data.category,
          title: data.title,
          content: data.content,
          authorName: data.authorName,
        }));
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isAdmin && (!form.password || form.password.length < 4)) {
      setError('본인 확인을 위해 비밀번호를 입력해주세요.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || '수정에 실패했습니다.');
      }

      alert('수정되었습니다.');
      router.push(`/board/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div style={{ padding: 100, textAlign: 'center' }}>로딩중...</div>;

  return (
    <div>
      <section style={{ padding: '80px 24px 40px' }}>
        <div className="section-container" style={{ maxWidth: 700 }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: 8 }}>
            <span className="gradient-text">게시글 수정</span>
          </h1>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: 32, fontSize: '0.9rem' }}>
            기존에 작성한 글을 수정합니다.
          </p>

          {error && (
            <div style={{
              padding: '14px 20px', borderRadius: 10, marginBottom: 24,
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
              color: '#fca5a5', fontSize: '0.9rem',
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="glass-card" style={{ padding: 32 }}>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-secondary)' }}>
                카테고리
              </label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {availableCategories.map(cat => (
                  <button
                    key={cat.value}
                    type="button"
                    className={`category-tab ${form.category === cat.value ? 'active' : ''}`}
                    onClick={() => setForm(f => ({ ...f, category: cat.value }))}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-secondary)' }}>
                작성자
              </label>
              <input
                className="input-field"
                placeholder="이름"
                value={form.authorName}
                onChange={e => setForm(f => ({ ...f, authorName: e.target.value }))}
                required
                disabled={!isAdmin}
              />
            </div>

            {!isAdmin && (
              <div style={{ marginBottom: 24, padding: 16, background: 'rgba(0,0,0,0.1)', borderRadius: 8 }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-accent-light)' }}>
                  비밀번호 인증
                </label>
                <input
                  type="password"
                  className="input-field"
                  placeholder="작성 시 입력한 비밀번호"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  required
                />
              </div>
            )}

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-secondary)' }}>
                제목
              </label>
              <input
                className="input-field"
                placeholder="제목"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                required
              />
            </div>

            <div style={{ marginBottom: 32 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-secondary)' }}>
                내용
              </label>
              <textarea
                className="textarea-field"
                placeholder="내용"
                rows={10}
                value={form.content}
                onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button type="submit" className="btn-primary" disabled={submitting}>
                {submitting ? '수정 중...' : '수정 완료'}
              </button>
              <button type="button" className="btn-secondary" onClick={() => router.back()}>
                취소
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
