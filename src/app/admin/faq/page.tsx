'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
}

export default function AdminFAQPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ question: '', answer: '', order: 0 });
  const [saving, setSaving] = useState(false);

  const fetchFAQs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/faq');
      const data = await res.json();
      setFaqs(data.faqs || []);
    } catch { setFaqs([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchFAQs(); }, []);

  const handleAdd = async () => {
    if (!form.question || !form.answer) { alert('질문과 답변을 모두 입력해주세요.'); return; }
    setSaving(true);
    try {
      const res = await fetch('/api/faq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setShowAdd(false);
      setForm({ question: '', answer: '', order: 0 });
      fetchFAQs();
    } catch { alert('등록에 실패했습니다.'); }
    finally { setSaving(false); }
  };

  const handleUpdate = async (id: string) => {
    if (!form.question || !form.answer) { alert('질문과 답변을 모두 입력해주세요.'); return; }
    setSaving(true);
    try {
      const res = await fetch(`/api/faq/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setEditingId(null);
      setForm({ question: '', answer: '', order: 0 });
      fetchFAQs();
    } catch { alert('수정에 실패했습니다.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    try {
      const res = await fetch(`/api/faq/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      fetchFAQs();
    } catch { alert('삭제에 실패했습니다.'); }
  };

  const startEdit = (faq: FAQItem) => {
    setEditingId(faq.id);
    setForm({ question: faq.question, answer: faq.answer, order: faq.order });
    setShowAdd(false);
  };

  return (
    <div style={{ padding: '40px 24px 80px' }}>
      <div className="section-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <Link href="/admin" style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textDecoration: 'none', marginBottom: 8, display: 'inline-block' }}>
              ← 대시보드로 돌아가기
            </Link>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>
              <span style={{ color: 'var(--color-primary)' }}>자주 묻는 질문 관리</span>
            </h1>
          </div>
          <button
            className="btn-primary"
            style={{ padding: '10px 24px', fontSize: '0.875rem' }}
            onClick={() => { setShowAdd(true); setEditingId(null); setForm({ question: '', answer: '', order: faqs.length }); }}
          >
            + 새 FAQ 등록
          </button>
        </div>

        {/* Add Form */}
        {showAdd && (
          <div className="glass-card" style={{ padding: 28, marginBottom: 24 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16, color: 'var(--color-accent-light)' }}>새 FAQ 등록</h3>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6, color: 'var(--color-text-secondary)' }}>질문</label>
              <input className="input-field" value={form.question} onChange={e => setForm(f => ({ ...f, question: e.target.value }))} placeholder="질문을 입력하세요" />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6, color: 'var(--color-text-secondary)' }}>답변</label>
              <textarea className="textarea-field" rows={4} value={form.answer} onChange={e => setForm(f => ({ ...f, answer: e.target.value }))} placeholder="답변을 입력하세요" />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6, color: 'var(--color-text-secondary)' }}>순서 (숫자가 작을수록 위에 표시)</label>
              <input className="input-field" type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: parseInt(e.target.value) || 0 }))} style={{ width: 100 }} />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn-primary" onClick={handleAdd} disabled={saving} style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                {saving ? '등록중...' : '등록'}
              </button>
              <button className="btn-secondary" onClick={() => setShowAdd(false)} style={{ padding: '8px 20px', fontSize: '0.85rem' }}>취소</button>
            </div>
          </div>
        )}

        {/* FAQ List */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: 'var(--color-text-muted)' }}>로딩중...</div>
        ) : faqs.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: 60 }}>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: 16 }}>등록된 FAQ가 없습니다.</p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>위의 &apos;새 FAQ 등록&apos; 버튼을 눌러 추가해주세요.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqs.map((faq, i) => (
              <div key={faq.id} className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                {editingId === faq.id ? (
                  <div style={{ padding: 24 }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16, color: 'var(--color-accent-light)' }}>FAQ 수정</h3>
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6, color: 'var(--color-text-secondary)' }}>질문</label>
                      <input className="input-field" value={form.question} onChange={e => setForm(f => ({ ...f, question: e.target.value }))} />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6, color: 'var(--color-text-secondary)' }}>답변</label>
                      <textarea className="textarea-field" rows={4} value={form.answer} onChange={e => setForm(f => ({ ...f, answer: e.target.value }))} />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6, color: 'var(--color-text-secondary)' }}>순서</label>
                      <input className="input-field" type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: parseInt(e.target.value) || 0 }))} style={{ width: 100 }} />
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn-primary" onClick={() => handleUpdate(faq.id)} disabled={saving} style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                        {saving ? '저장중...' : '저장'}
                      </button>
                      <button className="btn-secondary" onClick={() => setEditingId(null)} style={{ padding: '8px 20px', fontSize: '0.85rem' }}>취소</button>
                    </div>
                  </div>
                ) : (
                  <div style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                          <span style={{
                            fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: 4,
                            background: 'rgba(44, 95, 124, 0.1)', color: 'var(--color-primary)',
                          }}>순서 {faq.order}</span>
                          <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text-primary)' }}>
                            Q. {faq.question}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, paddingLeft: 4 }}>
                          A. {faq.answer}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                        <button
                          className="btn-secondary"
                          onClick={() => startEdit(faq)}
                          style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                        >
                          ✎ 수정
                        </button>
                        <button
                          className="btn-secondary"
                          onClick={() => handleDelete(faq.id)}
                          style={{ padding: '6px 14px', fontSize: '0.8rem', color: '#fca5a5' }}
                        >
                          🗑 삭제
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
