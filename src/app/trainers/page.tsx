'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import {
  Star,
  Award,
  Calendar,
  Sparkles,
  ArrowRight,
  Instagram,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import { TRAINERS } from '@/lib/mock-data';

const SPECIALTIES = [
  'All Coaches',
  'Athletic Performance',
  'Championship Boxing',
  'CrossFit & Gymnastics',
  'Mobility & Joint Longevity',
  'Hypertrophy Science',
  'Female Strength & Glute Lab',
];

export default function TrainersPage() {
  const { openTrainerModal } = useAppStore();
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Coaches');

  const filteredTrainers = TRAINERS.filter((t) => {
    if (selectedSpecialty === 'All Coaches') return true;
    return t.specialties.some((s) => s.toLowerCase().includes(selectedSpecialty.toLowerCase()));
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#070709] text-white">
      {/* Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#141424] via-[#0A0A10] to-[#070709] border-b border-white/10 text-center relative">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-[#E2F163]/10 text-[#E2F163] text-xs font-black uppercase tracking-widest border border-[#E2F163]/25">
            WORLD-CLASS FACULTY
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase font-display">
            MASTER COACHES & <span className="text-[#E2F163]">DIRECTORS</span>
          </h1>
          <p className="text-sm sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Every EliteFit coach holds elite international credentials (CSCS, USAW, NSCA) and actively competes at national or international standards.
          </p>

          {/* Specialties Filter */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2">
            {SPECIALTIES.map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedSpecialty === spec
                    ? 'bg-[#E2F163] text-black shadow-md shadow-[#E2F163]/20'
                    : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Trainers Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTrainers.map((trainer) => (
            <div
              key={trainer.id}
              className="rounded-3xl bg-[#111119] border border-white/10 overflow-hidden flex flex-col justify-between group hover:border-[#E2F163]/40 transition-all hover:-translate-y-1 hover:shadow-2xl"
            >
              {/* Image Banner */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={trainer.avatar}
                  alt={trainer.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111119] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white font-display">
                      {trainer.name}
                    </h3>
                    <p className="text-xs text-[#E2F163] font-semibold">{trainer.role}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-amber-400 text-xs font-bold border border-white/10">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{trainer.rating}</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-1">
                    {trainer.experienceYears} Years Clinical & Athletic Experience
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed italic">
                    &ldquo;{trainer.philosophy}&rdquo;
                  </p>
                </div>

                {/* Specialties */}
                <div className="space-y-1.5 pt-2 border-t border-white/10">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Core Specializations:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {trainer.specialties.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-[11px] text-zinc-300 font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certifications List */}
                <div className="space-y-1 text-xs text-zinc-400">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    <Award className="w-3.5 h-3.5 text-[#E2F163]" />
                    <span>Certifications:</span>
                  </div>
                  <div className="text-[11px] text-zinc-300 truncate">
                    {trainer.certifications.join(' • ')}
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => openTrainerModal(trainer)}
                    className="flex-1 py-3 rounded-xl bg-[#E2F163] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#d6e752] transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-[#E2F163]/20"
                  >
                    <span>BOOK 1-ON-1 PT</span>
                  </button>
                  <button
                    onClick={() => openTrainerModal(trainer)}
                    className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-semibold"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
