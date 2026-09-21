'use client';

import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
  caption: string;
}

interface LightboxModalProps {
  images: GalleryImage[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export function LightboxModal({ images, currentIndex, onClose, onNavigate }: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % images.length);
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, images.length, onClose, onNavigate]);

  if (currentIndex === null || !images[currentIndex]) return null;

  const current = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
      <div
        className="fixed inset-0 bg-black/95 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />

      <div className="relative max-w-5xl w-full flex flex-col items-center z-10">
        {/* Top Controls */}
        <div className="w-full flex items-center justify-between pb-4 text-white">
          <div>
            <span className="px-2.5 py-0.5 rounded bg-[#E2F163] text-black text-[10px] font-black uppercase tracking-wider">
              {current.category}
            </span>
            <span className="text-xs text-zinc-400 ml-3">
              {currentIndex + 1} of {images.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Main Image */}
        <div className="relative w-full max-h-[70vh] flex items-center justify-center rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
          <img
            src={current.url}
            alt={current.title}
            className="max-h-[70vh] w-auto object-contain"
          />

          {/* Nav Arrows */}
          <button
            onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
            className="absolute left-4 p-3 rounded-full bg-black/70 hover:bg-[#E2F163] text-white hover:text-black transition-all border border-white/10"
          >
            <ChevronLeft className="w-6 h-6 stroke-[3]" />
          </button>
          <button
            onClick={() => onNavigate((currentIndex + 1) % images.length)}
            className="absolute right-4 p-3 rounded-full bg-black/70 hover:bg-[#E2F163] text-white hover:text-black transition-all border border-white/10"
          >
            <ChevronRight className="w-6 h-6 stroke-[3]" />
          </button>
        </div>

        {/* Caption */}
        <div className="w-full text-center pt-4">
          <h3 className="text-lg font-bold text-white font-display">{current.title}</h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-lg mx-auto">{current.caption}</p>
        </div>
      </div>
    </div>
  );
}
