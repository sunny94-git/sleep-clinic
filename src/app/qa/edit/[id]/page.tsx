'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';

const CATEGORIES = [
  { value: 'consultation', label: '진료상담' },
  { value: 'treatment', label: '치료문의' },
  { value: 'cost', label: '비용문의' },
  { value: 'symptom', label: '증상문의' },
];

export default function EditQuestionPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [form, setForm] = useState({
    category: 'consultation',
    title: '',
    content: '',
    authorEmail: '',
    isPrivate: false,
    password: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/qa/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.error);
        if (data.status === 'answered') {
           alert('이미 답변된 질문은 수정할 수 없습니다.');
           router.push('/qa');
           return;
        }
        setForm(f => ({
          ...f,
          category: data.category,
          title: data.title,
          content: data.content,
          authorEmail: data.authorEmail,
          isPrivate: data.isPrivate,
        }));
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch(`/api/qa/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || '수정에 실패했습니다.');
      }
      alert('수정되었습니다.');
      router.push('/qa');
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
            <span className="gradient-text">질문 수정하기</span>
          </h1>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: 32, fontSize: '0.9rem' }}>
            기존에 작성한 내용을 수정합니다.
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

            <div style={{ marginBottom: 16 }}>
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
                🔒 비공개 질문으로 설정
              </label>
            </div>

            <div style={{ marginBottom: 32, padding: 16, background: 'rgba(0,0,0,0.1)', borderRadius: 8 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-secondary)' }}>
                본인 확인 비밀번호
              </label>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 12 }}>
                작성 시 입력했던 비밀번호를 입력해주세요.
              </p>
              <input
                type="password"
                className="input-field"
                placeholder="비밀번호"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                required
                minLength={4}
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
