'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface SleepInfoItem {
  slug: string;
  type: 'ARTICLE' | 'CARDNEWS';
  title: string;
  desc: string;
  icon: string;
  content: string;
  order: number;
}

export default function AdminSleepInfoPage() {
  const [items, setItems] = useState<SleepInfoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState<SleepInfoItem>({ slug: '', type: 'ARTICLE', title: '', desc: '', icon: '📄', content: '', order: 0 });
  const [saving, setSaving] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/sleep-info');
      const data = await res.json();
      setItems(data.sleepInfos || []);
    } catch { setItems([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleAdd = async () => {
    if (!form.slug || !form.title || !form.content) { alert('필수 항목을 모두 입력해주세요.'); return; }
    setSaving(true);
    try {
      const res = await fetch('/api/sleep-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setShowAdd(false);
      setForm({ slug: '', type: 'ARTICLE', title: '', desc: '', icon: '📄', content: '', order: items.length });
      fetchItems();
    } catch { alert('등록에 실패했습니다. 슬러그 중복을 확인해주세요.'); }
    finally { setSaving(false); }
  };

  const handleUpdate = async (originalSlug: string) => {
    if (!form.slug || !form.title || !form.content) { alert('필수 항목을 모두 입력해주세요.'); return; }
    setSaving(true);
    try {
      const res = await fetch(`/api/sleep-info/${originalSlug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, newSlug: form.slug !== originalSlug ? form.slug : undefined }),
      });
      if (!res.ok) throw new Error();
      setEditingSlug(null);
      setForm({ slug: '', type: 'ARTICLE', title: '', desc: '', icon: '📄', content: '', order: 0 });
      fetchItems();
    } catch { alert('수정에 실패했습니다.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    try {
      const res = await fetch(`/api/sleep-info/${slug}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      fetchItems();
    } catch { alert('삭제에 실패했습니다.'); }
  };

  const startEdit = (item: SleepInfoItem) => {
    setEditingSlug(item.slug);
    setForm(item);
    setShowAdd(false);
  };

  const FormContent = ({ isEdit, originalSlug }: { isEdit?: boolean, originalSlug?: string }) => (
    <div style={{ padding: isEdit ? 24 : 0 }}>
      {isEdit && <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16, color: 'var(--color-accent-light)' }}>정보 수정</h3>}
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <label className="form-label" style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 6, display: 'block', color: 'var(--color-text-secondary)' }}>타입</label>
          <select className="input-field" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as 'ARTICLE' | 'CARDNEWS' }))}>
            <option value="ARTICLE">일반 글 (Article)</option>
            <option value="CARDNEWS">카드뉴스 (Cardnews)</option>
          </select>
        </div>
        <div>
          <label className="form-label" style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 6, display: 'block', color: 'var(--color-text-secondary)' }}>URL 슬러그 (영문)</label>
          <input className="input-field" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="예: insomnia" />
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label className="form-label" style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 6, display: 'block', color: 'var(--color-text-secondary)' }}>메인 제목</label>
        <input className="input-field" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="제목을 입력하세요" />
      </div>
      
      <div style={{ marginBottom: 16 }}>
        <label className="form-label" style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 6, display: 'block', color: 'var(--color-text-secondary)' }}>짧은 설명 (목록 표시용)</label>
        <input className="input-field" value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} placeholder="설명을 입력하세요" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '100px 100px', gap: 16, marginBottom: 16 }}>
        <div>
          <label className="form-label" style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 6, display: 'block', color: 'var(--color-text-secondary)' }}>아이콘</label>
          <input className="input-field" value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} placeholder="😴" />
        </div>
        <div>
          <label className="form-label" style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 6, display: 'block', color: 'var(--color-text-secondary)' }}>순서</label>
          <input className="input-field" type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: parseInt(e.target.value) || 0 }))} />
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label className="form-label" style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 6, display: 'block', color: 'var(--color-text-secondary)' }}>
          내용 (마크다운)
        </label>
        {form.type === 'CARDNEWS' && (
          <p style={{ fontSize: '0.8rem', color: 'var(--color-primary)', marginBottom: 8 }}>
            💡 카드뉴스는 이미지 태그를 순서대로 작성하세요. 예: <code>![1](/images/cardnews/part1/1.png)</code>
          </p>
        )}
        <textarea className="textarea-field" rows={10} value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder="마크다운 문법으로 내용을 입력하세요" />
      </div>
      
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="btn-primary" onClick={() => isEdit ? handleUpdate(originalSlug!) : handleAdd()} disabled={saving} style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
          {saving ? '저장중...' : '저장'}
        </button>
        <button className="btn-secondary" onClick={() => isEdit ? setEditingSlug(null) : setShowAdd(false)} style={{ padding: '8px 20px', fontSize: '0.85rem' }}>취소</button>
      </div>
    </div>
  );

  return (
    <div style={{ padding: '40px 24px 80px' }}>
      <div className="section-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <Link href="/admin" style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textDecoration: 'none', marginBottom: 8, display: 'inline-block' }}>
              ← 대시보드로 돌아가기
            </Link>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>
              <span style={{ color: 'var(--color-primary)' }}>수면 정보 관리</span>
            </h1>
          </div>
          <button
            className="btn-primary"
            style={{ padding: '10px 24px', fontSize: '0.875rem' }}
            onClick={() => { setShowAdd(true); setEditingSlug(null); setForm({ slug: '', type: 'ARTICLE', title: '', desc: '', icon: '📄', content: '', order: items.length }); }}
          >
            + 새 정보 등록
          </button>
        </div>

        {/* Add Form */}
        {showAdd && (
          <div className="glass-card" style={{ padding: 28, marginBottom: 24 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16, color: 'var(--color-accent-light)' }}>새 정보 등록</h3>
            <FormContent />
          </div>
        )}

        {/* List */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: 'var(--color-text-muted)' }}>로딩중...</div>
        ) : items.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: 60 }}>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: 16 }}>등록된 수면 정보가 없습니다.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {items.map((item) => (
              <div key={item.slug} className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                {editingSlug === item.slug ? (
                  <FormContent isEdit originalSlug={item.slug} />
                ) : (
                  <div style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                          <span style={{
                            fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: 4,
                            background: item.type === 'CARDNEWS' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(44, 95, 124, 0.1)',
                            color: item.type === 'CARDNEWS' ? '#10b981' : 'var(--color-primary)',
                          }}>
                            {item.type === 'CARDNEWS' ? '카드뉴스' : '일반 글'}
                          </span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>순서 {item.order} | 슬러그: {item.slug}</span>
                        </div>
                        <h3 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-text-primary)', marginBottom: 4 }}>
                          {item.icon} {item.title}
                        </h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                          {item.desc}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                        <button className="btn-secondary" onClick={() => startEdit(item)} style={{ padding: '6px 14px', fontSize: '0.8rem' }}>✎ 수정</button>
                        <button className="btn-secondary" onClick={() => handleDelete(item.slug)} style={{ padding: '6px 14px', fontSize: '0.8rem', color: '#fca5a5' }}>🗑 삭제</button>
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
