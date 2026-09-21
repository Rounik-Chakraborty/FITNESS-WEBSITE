'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import {
  Sparkles,
  Trophy,
  Dumbbell,
  ArrowRight,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { TRANSFORMATIONS } from '@/lib/mock-data';
import { BeforeAfterSlider } from '@/components/transformations/BeforeAfterSlider';

const CATEGORIES = ['All', 'Fat Loss', 'Muscle Gain', 'Athletic Recomp'];

export default function TransformationsPage() {
  const { openCaseModal, openTrialModal } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTransformations = TRANSFORMATIONS.filter((t) => {
    if (selectedCategory === 'All') return true;
    return t.category === selectedCategory;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#070709] text-white">
      {/* Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#141424] via-[#0A0A10] to-[#070709] border-b border-white/10 text-center relative">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-[#E2F163]/10 text-[#E2F163] text-xs font-black uppercase tracking-widest border border-[#E2F163]/25">
            MEASURABLE PHYSIQUE RESULTS
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase font-display">
            CLIENT <span className="text-[#E2F163]">TRANSFORMATIONS</span>
          </h1>
          <p className="text-sm sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Drag each interactive before/after comparison slider below to inspect actual athlete transformations achieved under the EliteFit coaching protocol.
          </p>

          {/* Category Filter Pills */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#E2F163] text-black shadow-md shadow-[#E2F163]/20'
                    : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Transformations Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {filteredTransformations.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-[#111119] border border-white/10 overflow-hidden p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:border-[#E2F163]/40 transition-all shadow-xl"
            >
              {/* Top Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E2F163]/10 text-[#E2F163] text-xs font-black uppercase tracking-wider border border-[#E2F163]/20">
                    {item.category} • {item.durationWeeks} WEEKS
                  </span>
                  <h3 className="text-2xl font-black text-white font-display mt-2">
                    {item.name}, {item.age}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    {item.occupation} • Coached by {item.trainerName}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Weight Delta
                  </span>
                  <span className="text-xl font-black text-[#E2F163] font-display">
                    {item.weightChangeKg > 0 ? `+${item.weightChangeKg} kg` : `${item.weightChangeKg} kg`}
                  </span>
                </div>
              </div>

              {/* Interactive Draggable Before/After Slider */}
              <div className="h-72 sm:h-80 w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <BeforeAfterSlider
                  beforeImage={item.beforeImage}
                  afterImage={item.afterImage}
                  beforeLabel="BEFORE"
                  afterLabel="AFTER"
                  className="w-full h-full"
                />
              </div>

              {/* Metrics row */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[10px] text-zinc-400 block uppercase font-bold">Body Fat</span>
                  <span className="text-base font-black text-[#E2F163] font-display">{item.bodyFatChangePercent}%</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[10px] text-zinc-400 block uppercase font-bold">Timeline</span>
                  <span className="text-base font-black text-white font-display">{item.durationWeeks} Weeks</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[10px] text-zinc-400 block uppercase font-bold">Frequency</span>
                  <span className="text-base font-black text-white font-display">{item.protocol.frequency.split(' ')[0]} / Wk</span>
                </div>
              </div>

              <blockquote className="text-xs text-zinc-300 italic border-l-2 border-[#E2F163] pl-3 leading-relaxed">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => openCaseModal(item)}
                  className="flex-1 py-3 rounded-xl bg-[#E2F163] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#d6e752] transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Read Full Case Study</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 text-center">
          <button
            onClick={() => openTrialModal()}
            className="px-8 py-4 rounded-2xl bg-[#E2F163] text-black font-extrabold text-sm uppercase tracking-wider hover:bg-[#d6e752] shadow-xl shadow-[#E2F163]/25"
          >
            CLAIM 1-DAY PASS & BEGIN YOUR TRANSFORMATION
          </button>
        </div>
      </section>
    </div>
  );
}
