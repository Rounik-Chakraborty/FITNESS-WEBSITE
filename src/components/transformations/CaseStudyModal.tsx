'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { X, Trophy, Dumbbell, Utensils, Calendar, Sparkles, ArrowRight } from 'lucide-react';
import { BeforeAfterSlider } from './BeforeAfterSlider';

export function CaseStudyModal() {
  const { selectedCaseModal, closeCaseModal, openTrialModal } = useAppStore();

  if (!selectedCaseModal) return null;

  const item = selectedCaseModal;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={closeCaseModal}
      />

      <div className="relative w-full max-w-2xl bg-[#0F0F18] border border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={closeCaseModal}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          {/* Header */}
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#E2F163]/10 text-[#E2F163] text-xs font-black uppercase tracking-wider border border-[#E2F163]/20">
              {item.category} • {item.durationWeeks} WEEKS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-2">
              {item.name}, {item.age}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              {item.occupation} • Coached by {item.trainerName}
            </p>
          </div>

          {/* Interactive Before/After Drag Slider */}
          <div className="h-64 sm:h-80 w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <BeforeAfterSlider
              beforeImage={item.beforeImage}
              afterImage={item.afterImage}
              className="w-full h-full"
            />
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">Total Weight</span>
              <span className="text-lg sm:text-2xl font-black text-[#E2F163] font-display">
                {item.weightChangeKg > 0 ? `+${item.weightChangeKg} kg` : `${item.weightChangeKg} kg`}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">Body Fat Delta</span>
              <span className="text-lg sm:text-2xl font-black text-[#E2F163] font-display">
                {item.bodyFatChangePercent}%
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">Timeline</span>
              <span className="text-lg sm:text-2xl font-black text-white font-display">
                {item.durationWeeks} Wks
              </span>
            </div>
          </div>

          {/* Quote */}
          <blockquote className="p-4 rounded-2xl bg-[#E2F163]/5 border-l-4 border-[#E2F163] text-zinc-300 text-xs sm:text-sm italic leading-relaxed">
            &ldquo;{item.quote}&rdquo;
          </blockquote>

          {/* Story & Protocol */}
          <div className="space-y-3 text-xs sm:text-sm text-zinc-400">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs font-display">
              Athlete Transformation Journey
            </h4>
            <p className="leading-relaxed">{item.story}</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5 text-xs">
            <div className="font-bold text-white uppercase tracking-wider text-[11px] mb-1">
              Engineered Protocol
            </div>
            <div className="flex items-start gap-2 text-zinc-300">
              <Dumbbell className="w-4 h-4 text-[#E2F163] flex-shrink-0 mt-0.5" />
              <span><strong>Training Split:</strong> {item.protocol.training}</span>
            </div>
            <div className="flex items-start gap-2 text-zinc-300">
              <Utensils className="w-4 h-4 text-[#E2F163] flex-shrink-0 mt-0.5" />
              <span><strong>Nutrition Blueprint:</strong> {item.protocol.nutrition}</span>
            </div>
            <div className="flex items-start gap-2 text-zinc-300">
              <Calendar className="w-4 h-4 text-[#E2F163] flex-shrink-0 mt-0.5" />
              <span><strong>Weekly Commitment:</strong> {item.protocol.frequency}</span>
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-2">
            <button
              onClick={() => {
                closeCaseModal();
                openTrialModal();
              }}
              className="w-full py-3.5 rounded-xl bg-[#E2F163] text-black font-extrabold text-sm uppercase tracking-wider hover:bg-[#d6e752] flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#E2F163]/25"
            >
              <Sparkles className="w-4 h-4 fill-black" />
              <span>START YOUR OWN TRANSFORMATION</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
