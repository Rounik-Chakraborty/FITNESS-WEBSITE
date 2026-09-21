'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import {
  Calendar,
  Clock,
  Plus,
  Trash2,
  Edit2,
  Users,
  Flame,
  CheckCircle2,
  X,
  MapPin,
} from 'lucide-react';
import { GymClass } from '@/lib/types';
import { TRAINERS } from '@/lib/mock-data';

export default function AdminClassesPage() {
  const { classes, addClass, deleteClass } = useAppStore();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedClassRoster, setSelectedClassRoster] = useState<GymClass | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'HIIT' | 'CrossFit' | 'Yoga' | 'Strength' | 'Boxing' | 'Mobility' | 'Functional'>('HIIT');
  const [trainerId, setTrainerId] = useState(TRAINERS[0].id);
  const [day, setDay] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'>('Monday');
  const [time, setTime] = useState('06:00 PM');
  const [durationMinutes, setDurationMinutes] = useState(50);
  const [totalSeats, setTotalSeats] = useState(20);
  const [intensity, setIntensity] = useState<'Medium' | 'High' | 'Extreme'>('High');
  const [calorieBurn, setCalorieBurn] = useState('600-750 kcal');
  const [location, setLocation] = useState('Studio A (Main Turf)');
  const [description, setDescription] = useState('');

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    const trainer = TRAINERS.find((t) => t.id === trainerId) || TRAINERS[0];

    const newClass: GymClass = {
      id: `class-${Date.now()}`,
      title,
      category,
      trainerId: trainer.id,
      trainerName: trainer.name,
      trainerAvatar: trainer.avatar,
      trainerRole: trainer.role,
      day,
      time,
      durationMinutes,
      totalSeats,
      bookedSeats: 0,
      intensity,
      calorieBurn,
      location,
      description: description || 'High performance coached session.',
      image: trainer.coverImage || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    };

    addClass(newClass);
    setIsAddModalOpen(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono text-[#E2F163] font-bold uppercase tracking-widest">
            TIMETABLE & CAPACITY
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display uppercase">
            CLASS MANAGEMENT ({classes.length})
          </h2>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-[#E2F163] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#d6e752] transition-all flex items-center gap-2 shadow-lg shadow-[#E2F163]/20"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>+ Create New Class</span>
        </button>
      </div>

      {/* Class Schedule Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((c) => {
          const fillPercent = Math.round((c.bookedSeats / c.totalSeats) * 100);
          return (
            <div
              key={c.id}
              className="rounded-3xl bg-[#111119] border border-white/10 p-6 flex flex-col justify-between space-y-4 hover:border-[#E2F163]/40 transition-all shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="px-2.5 py-0.5 rounded bg-[#E2F163] text-black text-[9px] font-black uppercase tracking-wider">
                      {c.category}
                    </span>
                    <h3 className="text-xl font-bold text-white font-display mt-1">{c.title}</h3>
                  </div>
                  <button
                    onClick={() => deleteClass(c.id)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors"
                    title="Delete Class"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">{c.description}</p>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1.5 text-xs">
                  <div className="flex justify-between text-zinc-300">
                    <span>Schedule:</span>
                    <strong className="text-white">{c.day} @ {c.time} ({c.durationMinutes}m)</strong>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span>Instructor:</span>
                    <span className="text-white font-medium">Coach {c.trainerName}</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span>Zone:</span>
                    <span className="text-white font-medium">{c.location}</span>
                  </div>
                </div>

                {/* Seat Capacity Bar */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Seat Occupancy:</span>
                    <span className="text-[#E2F163] font-bold">
                      {c.bookedSeats} / {c.totalSeats} seats ({fillPercent}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        fillPercent >= 90 ? 'bg-red-400' : 'bg-[#E2F163]'
                      }`}
                      style={{ width: `${Math.min(100, fillPercent)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex gap-2">
                <button
                  onClick={() => setSelectedClassRoster(c)}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Inspect Attendee Roster</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add New Class Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsAddModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-[#0F0F18] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white font-display">Schedule New Studio Class</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateClass} className="space-y-3.5 text-xs">
              <div>
                <label className="text-zinc-400 block mb-1">Class Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Iron & Hypertrophy"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#E2F163]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-400 block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-[#14141E] border border-white/10 text-white outline-none"
                  >
                    {['HIIT', 'CrossFit', 'Yoga', 'Strength', 'Boxing', 'Mobility', 'Functional'].map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Assigned Coach</label>
                  <select
                    value={trainerId}
                    onChange={(e) => setTrainerId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#14141E] border border-white/10 text-white outline-none"
                  >
                    {TRAINERS.map((t) => (
                      <option key={t.id} value={t.id}>{t.name} ({t.role.split(' ')[0]})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-400 block mb-1">Day of Week</label>
                  <select
                    value={day}
                    onChange={(e) => setDay(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-[#14141E] border border-white/10 text-white outline-none"
                  >
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Start Time</label>
                  <input
                    type="text"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-400 block mb-1">Total Seat Limit</label>
                  <input
                    type="number"
                    min="5"
                    max="50"
                    required
                    value={totalSeats}
                    onChange={(e) => setTotalSeats(parseInt(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Estimated Burn (kcal)</label>
                  <input
                    type="text"
                    value={calorieBurn}
                    onChange={(e) => setCalorieBurn(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Studio Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#E2F163] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#d6e752] transition-all shadow-lg shadow-[#E2F163]/25 mt-2"
              >
                Publish Class to Timetable
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Attendee Roster Modal */}
      {selectedClassRoster && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedClassRoster(null)} />
          <div className="relative w-full max-w-md bg-[#0F0F18] border border-white/15 rounded-3xl p-6 shadow-2xl z-10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white font-display">{selectedClassRoster.title}</h3>
                <p className="text-xs text-zinc-400">
                  {selectedClassRoster.day} at {selectedClassRoster.time} ({selectedClassRoster.bookedSeats} athletes reserved)
                </p>
              </div>
              <button onClick={() => setSelectedClassRoster(null)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1 text-xs">
              {[
                { name: 'Alex Morgan', pass: 'EF-8924', status: 'Confirmed' },
                { name: 'Rohan Sen', pass: 'EF-1002', status: 'Confirmed' },
                { name: 'Pooja Bannerjee', pass: 'EF-1003', status: 'Confirmed' },
                { name: 'Dr. Debashis Guha', pass: 'EF-1007', status: 'Confirmed' },
              ].slice(0, selectedClassRoster.bookedSeats).map((athlete, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">{athlete.name}</div>
                    <span className="text-[10px] text-zinc-500 font-mono">Pass: {athlete.pass}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
                    {athlete.status}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedClassRoster(null)}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold"
            >
              Close Roster
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
