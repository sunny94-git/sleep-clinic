'use client';

import { useState, useEffect } from 'react';
import { QA_CATEGORY_LABELS, QA_STATUS_LABELS } from '@/types';

interface QAItem {
  id: string; category: string; title: string; content: string;
  authorEmail: string; status: string; answer?: string;
  isPrivate: boolean; createdAt: string;
}

export default function AdminQAPage() {
  const [items, setItems] = useState<QAItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [answering, setAnswering] = useState<string | null>(null);
  const [answerText, setAnswerText] = useState('');

  const loadItems = () => {
    setLoading(true);
    fetch('/api/qa?limit=50')
      .then(r => r.json())
      .then(data => setItems(data.items || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadItems(); }, []);

  const handleAnswer = async (id: string) => {
    if (!answerText.trim()) return;
    await fetch(`/api/qa/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer: answerText }),
    });
    setAnswering(null);
    setAnswerText('');
    loadItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('이 Q&A 게시글을 완전히 삭제하시겠습니까?\n삭제 후에는 복구할 수 없습니다.')) return;
    try {
      const res = await fetch(`/api/qa/${id}`, { method: 'DELETE' });
      if (!res.ok) alert('삭제 실패: ' + res.status);
    } catch (e) {
      alert('오류 발생: ' + e);
    }
    loadItems();
  };

  const handleTogglePrivacy = async (id: string, currentPrivacy: boolean) => {
    if (!confirm(`이 게시글을 ${currentPrivacy ? '공개' : '비공개'} 상태로 변경하시겠습니까?`)) return;
    try {
      const res = await fetch(`/api/qa/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPrivate: !currentPrivacy }),
      });
      if (!res.ok) alert('상태 변경 실패: ' + res.status);
    } catch (e) {
      alert('오류 발생: ' + e);
    }
    loadItems();
  };

  return (
    <div style={{ padding: '40px 24px 80px' }}>
      <div className="section-container">
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 32 }}>
          <span className="gradient-text">Q&A 관리</span>
        </h1>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: 'var(--color-text-muted)' }}>로딩중...</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {items.map(item => (
              <div key={item.id} className="glass-card" style={{ padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <span className={`badge ${item.status === 'answered' ? 'badge-answered' : 'badge-pending'}`}>
                    {QA_STATUS_LABELS[item.status as keyof typeof QA_STATUS_LABELS]}
                  </span>
                  <span className="badge badge-sleep-info" style={{ fontSize: '0.7rem' }}>
                    {QA_CATEGORY_LABELS[item.category as keyof typeof QA_CATEGORY_LABELS]}
                  </span>
                  {item.isPrivate ? (
                    <span style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 600 }}>🔒 비공개</span>
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>공개</span>
                  )}
                  <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    {new Date(item.createdAt).toLocaleDateString('ko-KR')}
                  </span>
                </div>

                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: 8, lineHeight: 1.7 }}>{item.content}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 16 }}>📧 {item.authorEmail}</p>

                {item.answer && (
                  <div style={{
                    background: 'rgba(16,185,129,0.05)', borderRadius: 10, padding: 16,
                    borderLeft: '3px solid var(--color-success)', marginBottom: 8,
                  }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-success)', fontWeight: 600, marginBottom: 6 }}>답변</p>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>{item.answer}</p>
                  </div>
                )}

                <div style={{ display: 'flex', gap: 8, marginTop: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                  {item.status === 'pending' && answering !== item.id && (
                    <button className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}
                      onClick={() => setAnswering(item.id)}>
                      답변하기
                    </button>
                  )}
                  <button 
                    onClick={() => handleTogglePrivacy(item.id, item.isPrivate)}
                    style={{
                      background: item.isPrivate ? 'rgba(156,163,175,0.1)' : 'rgba(108,92,231,0.1)',
                      border: `1px solid ${item.isPrivate ? 'rgba(156,163,175,0.2)' : 'rgba(108,92,231,0.2)'}`,
                      color: item.isPrivate ? '#9ca3af' : 'var(--color-accent-light)',
                      padding: '8px 20px', borderRadius: 8,
                      cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
                    }}
                  >
                    {item.isPrivate ? '공개로 전환' : '비공개 전환'}
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    style={{
                      background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                      color: '#fca5a5', padding: '8px 20px', borderRadius: 8,
                      cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
                    }}
                  >
                    삭제
                  </button>
                </div>

                {answering === item.id && (
                  <div style={{ marginTop: 12 }}>
                    <textarea
                      className="textarea-field"
                      value={answerText}
                      onChange={e => setAnswerText(e.target.value)}
                      placeholder="답변을 입력하세요..."
                      rows={4}
                    />
                    <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                      <button className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}
                        onClick={() => handleAnswer(item.id)}>
                        답변 등록
                      </button>
                      <button className="btn-secondary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}
                        onClick={() => { setAnswering(null); setAnswerText(''); }}>
                        취소
                      </button>
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
