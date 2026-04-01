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

  useEffect(() => {
    setLoading(true);
    fetch(`/api/qa?category=${category}&page=${page}&limit=10`)
      .then(res => res.json())
      .then(data => {
        setItems(data.items || []);
        setTotalPages(data.totalPages || 1);
        setExpandedId(null);
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [category, page]);

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
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', flexDirection: 'column' }}>
                  <div
                    className="glass-card"
                    style={{
                      padding: '20px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      cursor: item.isPrivate ? 'default' : 'pointer',
                      border: expandedId === item.id ? '1px solid var(--color-accent-light)' : undefined,
                      transition: 'all 0.2s',
                    }}
                    onClick={() => {
                      if (!item.isPrivate) {
                        setExpandedId(expandedId === item.id ? null : item.id);
                      }
                    }}
                  >
                    <span className={`badge ${item.status === 'answered' ? 'badge-answered' : 'badge-pending'}`}>
                      {QA_STATUS_LABELS[item.status as keyof typeof QA_STATUS_LABELS]}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {item.isPrivate && <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>🔒</span>}
                        <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                          {item.isPrivate ? '비공개 질문입니다' : item.title}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 16, fontSize: '0.8rem', color: 'var(--color-text-muted)', flexShrink: 0, alignItems: 'center' }}>
                      <span className={`badge ${item.category === 'consultation' ? 'badge-sleep-info' : 'badge-free'}`} style={{ fontSize: '0.7rem' }}>
                        {QA_CATEGORY_LABELS[item.category as keyof typeof QA_CATEGORY_LABELS]}
                      </span>
                      <span>{new Date(item.createdAt).toLocaleDateString('ko-KR')}</span>
                      {!item.isPrivate && (
                        <span style={{ 
                          display: 'inline-block', 
                          transform: expandedId === item.id ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s',
                          fontSize: '0.8rem'
                        }}>▼</span>
                      )}
                    </div>
                  </div>
                  
                  {expandedId === item.id && !item.isPrivate && (
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
                        marginBottom: item.answer ? 20 : 0, 
                        whiteSpace: 'pre-wrap', 
                        fontSize: '0.9375rem',
                        color: 'var(--color-text-secondary)',
                        lineHeight: 1.7 
                      }}>
                        <p style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, fontSize: '0.875rem' }}>질문 내용</p>
                        {item.content}
                      </div>
                      
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
