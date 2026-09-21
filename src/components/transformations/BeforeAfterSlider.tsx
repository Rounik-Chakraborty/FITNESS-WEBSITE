'use client';

import React, { useState, useRef, useCallback } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'BEFORE',
  afterLabel = 'AFTER',
  className = '',
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(100, (x / width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className={`relative select-none overflow-hidden cursor-ew-resize rounded-2xl ${className}`}
    >
      {/* After Image (Full background) */}
      <img
        src={afterImage}
        alt="After result"
        className="w-full h-full object-cover pointer-events-none"
      />
      <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[#E2F163] text-[10px] font-black tracking-widest uppercase border border-[#E2F163]/30">
        {afterLabel}
      </div>

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt="Before result"
          className="absolute inset-0 w-full h-full object-cover max-w-none"
          style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
        />
        <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-zinc-300 text-[10px] font-black tracking-widest uppercase border border-white/20">
          {beforeLabel}
        </div>
      </div>

      {/* Divider Bar & Handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-[#E2F163] shadow-[0_0_12px_#E2F163] pointer-events-none flex items-center justify-center"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="w-8 h-8 rounded-full bg-[#E2F163] text-black flex items-center justify-center font-black text-xs shadow-xl -ml-4 pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-110 transition-transform">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="m9 18-6-6 6-6M15 6l6 6-6 6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
