'use client';

import React, { useState } from 'react';
import { TRAINERS } from '@/lib/mock-data';
import { Trainer } from '@/lib/types';
import {
  Dumbbell,
  Star,
  Award,
  Calendar,
  Clock,
  Plus,
  Edit2,
  X,
  CheckCircle2,
} from 'lucide-react';

export default function AdminTrainersPage() {
  const [trainers, setTrainers] = useState<Trainer[]>(TRAINERS);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono text-[#E2F163] font-bold uppercase tracking-widest">
            COACHING ROSTER & SHIFTS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display uppercase">
            TRAINER FACULTY MANAGEMENT ({trainers.length})
          </h2>
        </div>
      </div>

      {/* Trainers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainers.map((t) => (
          <div
            key={t.id}
            className="rounded-3xl bg-[#111119] border border-white/10 p-6 flex flex-col justify-between space-y-4 hover:border-[#E2F163]/40 transition-all shadow-xl"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-[#E2F163]"
                />
                <div>
                  <h3 className="text-lg font-bold text-white font-display">{t.name}</h3>
                  <p className="text-xs text-[#E2F163]">{t.role}</p>
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 mt-0.5">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{t.rating} ({t.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-2 text-xs">
                <div className="text-zinc-400">
                  <strong className="text-white block mb-0.5">Assigned Studio Classes:</strong>
                  <span>{t.classesTaught.join(', ')}</span>
                </div>
                <div className="text-zinc-400">
                  <strong className="text-white block mb-0.5">Available PT Shift Days:</strong>
                  <span>{t.availableSlots.map((s) => s.day).join(', ')}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {t.specialties.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded bg-white/5 text-zinc-300 text-[10px] font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-white/10">
              <button
                onClick={() => setSelectedTrainer(t)}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-[#E2F163] text-zinc-300 hover:text-black font-bold text-xs uppercase tracking-wider transition-all"
              >
                Manage Schedule & Shifts
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Shift Modal */}
      {selectedTrainer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedTrainer(null)} />
          <div className="relative w-full max-w-lg bg-[#0F0F18] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#E2F163] font-bold">COACH PROFILE</span>
                <h3 className="text-xl font-bold text-white font-display mt-0.5">{selectedTrainer.name}</h3>
              </div>
              <button onClick={() => setSelectedTrainer(null)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="font-bold text-white uppercase tracking-wider block text-[11px]">
                  Weekly 1-on-1 Consultation Slots
                </span>
                {selectedTrainer.availableSlots.map((slot, idx) => (
                  <div key={idx} className="flex justify-between items-center py-1 border-b border-white/5">
                    <strong className="text-white">{slot.day}</strong>
                    <span className="text-zinc-400">{slot.times.join(' • ')}</span>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="font-bold text-white uppercase tracking-wider block text-[11px]">
                  Assigned Classes
                </span>
                <div className="text-zinc-300">{selectedTrainer.classesTaught.join(', ')}</div>
              </div>
            </div>

            <button
              onClick={() => setSelectedTrainer(null)}
              className="w-full py-3 rounded-xl bg-[#E2F163] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#d6e752]"
            >
              Update Coach Shifts
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
