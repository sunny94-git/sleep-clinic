'use client';

import { useState } from 'react';

export default function Carousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      next();
    } else if (isRightSwipe) {
      prev();
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  if (!images || images.length === 0) return null;

  return (
    <div 
      style={{ position: 'relative', width: '100%', maxWidth: 700, margin: '16px auto 40px', overflow: 'hidden', borderRadius: 16, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div style={{ display: 'flex', transition: 'transform 0.3s ease-in-out', transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((src, idx) => (
          <img key={idx} src={src} alt={`Slide ${idx + 1}`} style={{ width: '100%', flexShrink: 0, height: 'auto', display: 'block' }} draggable={false} />
        ))}
      </div>
      
      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button onClick={prev} style={{ position: 'absolute', top: '50%', left: 16, transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.85)', color: '#333', border: 'none', width: 44, height: 44, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 10, transition: 'background 0.2s' }}>
            ❮
          </button>
          <button onClick={next} style={{ position: 'absolute', top: '50%', right: 16, transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.85)', color: '#333', border: 'none', width: 44, height: 44, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 10, transition: 'background 0.2s' }}>
            ❯
          </button>
          
          {/* Pagination Indicators */}
          <div style={{ position: 'absolute', bottom: 16, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 8, zIndex: 10 }}>
            {images.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentIndex(idx)}
                style={{ width: 10, height: 10, borderRadius: '50%', border: 'none', background: currentIndex === idx ? 'var(--color-primary)' : 'rgba(255,255,255,0.7)', padding: 0, cursor: 'pointer', transition: 'background 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} 
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
