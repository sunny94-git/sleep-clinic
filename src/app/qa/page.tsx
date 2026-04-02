'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { QA_CATEGORY_LABELS, QA_STATUS_LABELS } from '@/types';

interface QAItem {
  id: string;
  category: string;
  title: string;
  status: string;
  isPrivate: boolean;
  createdAt: string;
  content: string;
  answer?: string;
  _verified?: boolean;
}

const TABS = [
  { value: 'all', label: '전체' },
  { value: 'consultation', label: '진료상담' },
  { value: 'treatment', label: '치료문의' },
  { value: 'cost', label: '비용문의' },
  { value: 'symptom', label: '증상문의' },
];

export default function QAPage() {
  const [items, setItems] = useState<QAItem[]>([]);
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [verifyEmail, setVerifyEmail] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [verifyError, setVerifyError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletePassword, setDeletePassword] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/qa?category=${category}&page=${page}&limit=10`)
      .then(res => res.json())
      .then(data => {
        setItems(data.items || []);
        setTotalPages(data.totalPages || 1);
        setExpandedId(null);
        setVerifyingId(null);
        setDeletingId(null);
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [category, page]);

  const handleVerify = async (e: React.FormEvent, id: string) => {
    e.preventDefault();
    setIsVerifying(true);
    setVerifyError('');
    try {
      const res = await fetch(`/api/qa/${id}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: verifyEmail, password: verifyPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '인증에 실패했습니다.');

      setItems(prev => prev.map(item => item.id === id ? { ...item, ...data, _verified: true } : item));
      setVerifyingId(null);
      setExpandedId(id);
    } catch (err) {
      setVerifyError(err instanceof Error ? err.message : '오류가 발생했습니다.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!deletePassword) {
      alert('비밀번호를 입력해주세요.');
      return;
    }
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/qa/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: deletePassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '삭제에 실패했습니다.');

      alert('삭제되었습니다.');
      setItems(prev => prev.filter(item => item.id !== id));
      setDeletingId(null);
      setDeletePassword('');
    } catch (err) {
      alert(err instanceof Error ? err.message : '오류가 발생했습니다.');
    } finally {
      setIsDeleting(false);
    }
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
            <span className="gradient-text">Q&A 상담</span>
          </h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>궁금한 점을 질문하시면 전문의가 답변해드립니다</p>
        </div>
      </section>

      <section style={{ padding: '40px 24px 80px' }}>
        <div className="section-container">
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
            <Link href="/qa/ask" className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.875rem' }}>
              ❓ 질문하기
            </Link>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: 60, color: 'var(--color-text-muted)' }}>로딩중...</div>
          ) : items.length === 0 ? (
            <div className="glass-card" style={{ textAlign: 'center', padding: 60 }}>
              <p style={{ color: 'var(--color-text-muted)' }}>등록된 질문이 없습니다.</p>
            </div>
          ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {items.map(item => (
                  <div key={item.id} style={{ display: 'flex', flexDirection: 'column' }}>
                    <div
                      className="glass-card responsive-list-item"
                      style={{
                        cursor: item.isPrivate ? 'default' : 'pointer',
                        border: expandedId === item.id ? '1px solid var(--color-accent-light)' : undefined,
                      }}
                      onClick={() => {
                        if (!item.isPrivate || item._verified) {
                          setExpandedId(expandedId === item.id ? null : item.id);
                          setVerifyingId(null);
                          setDeletingId(null);
                        } else {
                          if (expandedId === item.id || verifyingId === item.id) {
                            setExpandedId(null);
                            setVerifyingId(null);
                            setDeletingId(null);
                          } else {
                            setVerifyingId(item.id);
                            setVerifyError('');
                            setVerifyPassword('');
                            setVerifyEmail('');
                            setDeletingId(null);
                          }
                        }
                      }}
                    >
                      <span className={`badge ${item.status === 'answered' ? 'badge-answered' : 'badge-pending'}`}>
                        {QA_STATUS_LABELS[item.status as keyof typeof QA_STATUS_LABELS]}
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          {item.isPrivate && <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>🔒</span>}
                          <span className="title" style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                            {item.isPrivate && !item._verified ? '비공개 질문입니다' : item.title}
                          </span>
                        </div>
                      </div>
                      <div className="meta-info" style={{ display: 'flex', gap: 16, fontSize: '0.8rem', color: 'var(--color-text-muted)', flexShrink: 0, alignItems: 'center' }}>
                        <span className={`badge ${item.category === 'consultation' ? 'badge-sleep-info' : 'badge-free'}`} style={{ fontSize: '0.7rem' }}>
                          {QA_CATEGORY_LABELS[item.category as keyof typeof QA_CATEGORY_LABELS]}
                        </span>
                        <span>{new Date(item.createdAt).toLocaleDateString('ko-KR')}</span>
                        {!item.isPrivate || item._verified ? (
                          <span style={{ 
                            display: 'inline-block', 
                            transform: expandedId === item.id ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s',
                            fontSize: '0.8rem'
                          }}>▼</span>
                        ) : (
                          item.isPrivate && verifyingId !== item.id && (
                             <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-accent-light)' }}>
                               인증필요
                             </span>
                          )
                        )}
                      </div>
                    </div>
                  
                  {verifyingId === item.id && (
                    <div className="glass-card" style={{ marginTop: 8, padding: '24px', background: 'rgba(255,255,255,0.02)', borderTop: 'none' }}>
                       <form onSubmit={(e) => handleVerify(e, item.id)}>
                         <p style={{ marginBottom: 16, fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                           비공개 질문을 열람하려면 작성 시 입력한 이메일과 비밀번호를 입력해주세요.
                         </p>
                         {verifyError && (
                           <p style={{ color: '#fca5a5', fontSize: '0.85rem', marginBottom: 16, background: 'rgba(239,68,68,0.1)', padding: '8px 12px', borderRadius: 6 }}>
                             {verifyError}
                           </p>
                         )}
                         <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
                           <input type="email" placeholder="이메일" value={verifyEmail} onChange={e => setVerifyEmail(e.target.value)} required className="input-field" style={{ flex: 1, minWidth: 200 }} />
                           <input type="password" placeholder="비밀번호" value={verifyPassword} onChange={e => setVerifyPassword(e.target.value)} required className="input-field" style={{ flex: 1, minWidth: 200 }} />
                         </div>
                         <div style={{ display: 'flex', gap: 8 }}>
                           <button type="submit" className="btn-primary" disabled={isVerifying} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                             {isVerifying ? '확인 중...' : '본인 확인'}
                           </button>
                           <button type="button" className="btn-secondary" onClick={() => setVerifyingId(null)} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>취소</button>
                         </div>
                       </form>
                    </div>
                  )}

                  {expandedId === item.id && (!item.isPrivate || item._verified) && (
                    <div className="glass-card" style={{ 
                      marginTop: 8, 
                      padding: '24px', 
                      background: 'rgba(255,255,255,0.02)',
                      borderTop: 'none',
                    }}>
                      <div style={{ 
                        padding: '16px 20px', 
                        background: 'rgba(0,0,0,0.15)', 
                        borderRadius: 12, 
                        marginBottom: item.answer ? 20 : 16, 
                        whiteSpace: 'pre-wrap', 
                        fontSize: '0.9375rem',
                        color: 'var(--color-text-secondary)',
                        lineHeight: 1.7 
                      }}>
                        <p style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, fontSize: '0.875rem' }}>질문 내용</p>
                        {item.content}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginBottom: item.answer ? 20 : 0 }}>
                        {item.status !== 'answered' && (
                          <Link href={`/qa/edit/${item.id}`} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>
                            ✎ 수정
                          </Link>
                        )}
                        <button 
                          onClick={() => setDeletingId(item.id)} 
                          className="btn-secondary" 
                          style={{ padding: '6px 12px', fontSize: '0.75rem', color: '#fca5a5' }}
                        >
                          🗑 삭제
                        </button>
                      </div>

                      {deletingId === item.id && (
                        <div style={{ 
                          padding: '16px', 
                          background: 'rgba(239,68,68,0.05)', 
                          borderRadius: 8, 
                          marginBottom: 20,
                          border: '1px solid rgba(239,68,68,0.1)'
                        }}>
                          <p style={{ fontSize: '0.85rem', color: '#fca5a5', marginBottom: 12 }}>질문을 삭제하시겠습니까? 비밀번호를 입력해주세요.</p>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <input 
                              type="password" 
                              placeholder="비밀번호" 
                              className="input-field" 
                              style={{ flex: 1, padding: '8px 12px', fontSize: '0.85rem' }} 
                              value={deletePassword}
                              onChange={e => setDeletePassword(e.target.value)}
                            />
                            <button 
                              onClick={() => handleDelete(item.id)} 
                              className="btn-primary" 
                              style={{ background: '#ef4444', padding: '8px 16px', fontSize: '0.85rem' }}
                              disabled={isDeleting}
                            >
                              {isDeleting ? '삭제중...' : '삭제 확정'}
                            </button>
                            <button 
                              onClick={() => { setDeletingId(null); setDeletePassword(''); }} 
                              className="btn-secondary" 
                              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                            >
                              취소
                            </button>
                          </div>
                        </div>
                      )}
                      
                      {item.answer && (
                        <div style={{ 
                          padding: '20px', 
                          background: 'rgba(108,92,231,0.08)', 
                          borderRadius: 12, 
                          borderLeft: '4px solid var(--color-accent-light)' 
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#fff', fontWeight: 'bold' }}>의</div>
                            <span style={{ fontWeight: 600, color: 'var(--color-accent-light)', fontSize: '0.9rem' }}>전문의 답변</span>
                          </div>
                          <div style={{ 
                            whiteSpace: 'pre-wrap', 
                            color: 'var(--color-text-primary)',
                            fontSize: '0.95rem',
                            lineHeight: 1.7
                          }}>
                            {item.answer}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

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
                    cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem',
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
