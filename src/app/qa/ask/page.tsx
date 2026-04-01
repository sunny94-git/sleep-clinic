'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CATEGORIES = [
  { value: 'consultation', label: '진료상담' },
  { value: 'treatment', label: '치료문의' },
  { value: 'cost', label: '비용문의' },
  { value: 'symptom', label: '증상문의' },
];

export default function AskQuestionPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    category: 'consultation',
    title: '',
    content: '',
    authorEmail: '',
    isPrivate: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/qa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || '등록에 실패했습니다.');
      }
      router.push('/qa');
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
            <span className="gradient-text">질문하기</span>
          </h1>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: 32, fontSize: '0.9rem' }}>
            궁금한 점을 남겨주시면 전문의가 답변해드립니다.
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
                상담 분야
              </label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
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
                이메일
              </label>
              <input
                type="email"
                className="input-field"
                placeholder="답변 알림을 받을 이메일"
                value={form.authorEmail}
                onChange={e => setForm(f => ({ ...f, authorEmail: e.target.value }))}
                required
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-secondary)' }}>
                제목
              </label>
              <input
                className="input-field"
                placeholder="질문 제목을 입력하세요"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                required
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-secondary)' }}>
                내용
              </label>
              <textarea
                className="textarea-field"
                placeholder="증상이나 궁금한 점을 자세히 작성해주세요"
                rows={8}
                value={form.content}
                onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                required
              />
            </div>

            <div style={{ marginBottom: 32 }}>
              <label style={{
                display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
                fontSize: '0.9rem', color: 'var(--color-text-secondary)',
              }}>
                <input
                  type="checkbox"
                  checked={form.isPrivate}
                  onChange={e => setForm(f => ({ ...f, isPrivate: e.target.checked }))}
                  style={{ width: 18, height: 18, accentColor: 'var(--color-accent)' }}
                />
                🔒 비공개 질문으로 등록
              </label>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button type="submit" className="btn-primary" disabled={submitting}>
                {submitting ? '등록중...' : '질문 등록하기'}
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
