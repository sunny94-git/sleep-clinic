'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CATEGORIES = [
  { value: 'free', label: '자유게시판' },
  { value: 'sleep_info', label: '수면정보' },
];

export default function WritePostPage() {
  const router = useRouter();
  const [form, setForm] = useState({ category: 'free', title: '', content: '', authorName: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || '작성에 실패했습니다.');
      }

      const post = await res.json();
      router.push(`/board/${post.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <section style={{ padding: '80px 24px 40px' }}>
        <div className="section-container" style={{ maxWidth: 700 }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: 8 }}>
            <span className="gradient-text">글쓰기</span>
          </h1>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: 32, fontSize: '0.9rem' }}>
            게시판에 새 글을 작성합니다.
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
              <div style={{ display: 'flex', gap: 8 }}>
                {CATEGORIES.map(cat => (
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
                placeholder="이름을 입력하세요"
                value={form.authorName}
                onChange={e => setForm(f => ({ ...f, authorName: e.target.value }))}
                required
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-secondary)' }}>
                제목
              </label>
              <input
                className="input-field"
                placeholder="제목을 입력하세요"
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
                placeholder="내용을 입력하세요"
                rows={10}
                value={form.content}
                onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button type="submit" className="btn-primary" disabled={submitting}>
                {submitting ? '등록중...' : '등록하기'}
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
