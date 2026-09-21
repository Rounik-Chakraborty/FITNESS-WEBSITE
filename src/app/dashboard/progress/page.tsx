'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import {
  TrendingUp,
  Flame,
  Dumbbell,
  Plus,
  Trophy,
  Calendar,
  Sparkles,
  CheckCircle2,
  X,
  Target,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
} from 'recharts';

export default function FitnessProgressPage() {
  const { prRecords, weightHistory, addPRRecord, addWeightLog } = useAppStore();

  const [timeRange, setTimeRange] = useState<'7D' | '30D' | '90D' | '1Y'>('90D');
  const [isPRModalOpen, setIsPRModalOpen] = useState(false);
  const [isWeightModalOpen, setIsWeightModalOpen] = useState(false);

  // New PR form
  const [exercise, setExercise] = useState('Conventional Deadlift');
  const [weight, setWeight] = useState(195);
  const [reps, setReps] = useState(1);

  // New Weight form
  const [newWeight, setNewWeight] = useState(79.8);
  const [newBodyFat, setNewBodyFat] = useState(14.2);

  const handleSavePR = (e: React.FormEvent) => {
    e.preventDefault();
    addPRRecord({
      exercise,
      weight,
      unit: 'kg',
      reps,
      previousRecord: prRecords.find((p) => p.exercise === exercise)?.weight,
    });
    setIsPRModalOpen(false);
  };

  const handleSaveWeight = (e: React.FormEvent) => {
    e.preventDefault();
    addWeightLog(newWeight, newBodyFat);
    setIsWeightModalOpen(false);
  };

  const weeklyWorkoutFrequencyData = [
    { day: 'Mon', workouts: 1, calories: 720 },
    { day: 'Tue', workouts: 1, calories: 650 },
    { day: 'Wed', workouts: 0, calories: 200 },
    { day: 'Thu', workouts: 1, calories: 810 },
    { day: 'Fri', workouts: 1, calories: 600 },
    { day: 'Sat', workouts: 1, calories: 920 },
    { day: 'Sun', workouts: 0, calories: 150 },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header & Fast Log Triggers */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono text-[#E2F163] font-bold uppercase tracking-widest">
            BIOMETRIC TRACKING & METRICS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display uppercase">
            FITNESS PROGRESS & RECORDS
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsWeightModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5 text-[#E2F163]" />
            <span>Log Weight</span>
          </button>

          <button
            onClick={() => setIsPRModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#E2F163] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#d6e752] transition-all flex items-center gap-1.5 shadow-lg shadow-[#E2F163]/20"
          >
            <Trophy className="w-3.5 h-3.5 fill-black" />
            <span>+ Log New PR</span>
          </button>
        </div>
      </div>

      {/* 1. Weight & Body Fat Progression Chart */}
      <div className="rounded-3xl bg-[#111119] border border-white/10 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-[#E2F163] uppercase tracking-wider">
              Body Composition Trajectory
            </span>
            <h3 className="text-xl font-bold text-white font-display">
              Weight & Body Fat Progression
            </h3>
          </div>

          {/* Time Range Selector */}
          <div className="flex items-center gap-1 bg-black/40 border border-white/10 p-1 rounded-xl">
            {(['7D', '30D', '90D', '1Y'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  timeRange === r
                    ? 'bg-[#E2F163] text-black shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Recharts Area Chart */}
        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weightHistory}>
              <defs>
                <linearGradient id="weightGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E2F163" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#E2F163" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" stroke="#6B7280" fontSize={11} tickLine={false} />
              <YAxis
                domain={['dataMin - 2', 'dataMax + 2']}
                stroke="#6B7280"
                fontSize={11}
                tickLine={false}
                unit="kg"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F0F18',
                  borderColor: 'rgba(255,255,255,0.15)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="weight"
                stroke="#E2F163"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#weightGlow)"
                name="Weight (kg)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-zinc-400 block text-[10px] uppercase font-bold">Starting Weight</span>
            <span className="text-base font-black text-white font-display">84.5 kg</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-zinc-400 block text-[10px] uppercase font-bold">Current Weight</span>
            <span className="text-base font-black text-[#E2F163] font-display">80.2 kg</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-zinc-400 block text-[10px] uppercase font-bold">Total Lost</span>
            <span className="text-base font-black text-emerald-400 font-display">-4.3 kg</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-zinc-400 block text-[10px] uppercase font-bold">Est. Body Fat</span>
            <span className="text-base font-black text-white font-display">14.5% (-3.7%)</span>
          </div>
        </div>
      </div>

      {/* 2. Personal Records (PR) Wall */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#E2F163] uppercase tracking-wider">
              Strength Overload
            </span>
            <h3 className="text-xl font-bold text-white font-display">
              Personal Records (PR) Wall
            </h3>
          </div>
          <button
            onClick={() => setIsPRModalOpen(true)}
            className="text-xs font-bold text-[#E2F163] hover:underline flex items-center gap-1"
          >
            <span>+ Log Record</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {prRecords.map((pr) => (
            <div
              key={pr.id}
              className="p-5 rounded-3xl bg-[#11111A] border border-white/10 hover:border-[#E2F163]/40 transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm group-hover:text-[#E2F163] transition-colors">
                    {pr.exercise}
                  </h4>
                  <span className="text-[10px] text-zinc-500 font-mono">Logged: {pr.date}</span>
                </div>
                <Trophy className="w-5 h-5 text-[#E2F163] flex-shrink-0" />
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white font-display">
                  {pr.weight} {pr.unit}
                </span>
                <span className="text-xs text-zinc-400 font-medium">({pr.reps} {pr.reps === 1 ? 'rep max' : 'reps'})</span>
              </div>

              {pr.previousRecord && (
                <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 pt-2 border-t border-white/5">
                  <span>+{pr.weight - pr.previousRecord}kg vs previous benchmark ({pr.previousRecord}kg)</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3. Weekly Workout Volume Bar Chart */}
      <div className="rounded-3xl bg-[#111119] border border-white/10 p-6 sm:p-8 space-y-4">
        <div>
          <span className="text-xs font-bold text-[#00F0FF] uppercase tracking-wider">
            Cardiovascular & Caloric Output
          </span>
          <h3 className="text-xl font-bold text-white font-display">
            Daily Calorie Burn (Current Week)
          </h3>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyWorkoutFrequencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" stroke="#6B7280" fontSize={11} tickLine={false} />
              <YAxis stroke="#6B7280" fontSize={11} tickLine={false} unit="kcal" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F0F18',
                  borderColor: 'rgba(255,255,255,0.15)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="calories" fill="#E2F163" radius={[8, 8, 0, 0]} name="Calories Burned" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Log New PR Modal */}
      {isPRModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsPRModalOpen(false)} />
          <div className="relative w-full max-w-md bg-[#0F0F18] border border-white/15 rounded-3xl p-6 shadow-2xl z-10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#E2F163]" />
                <span>Log Personal Record (PR)</span>
              </h3>
              <button onClick={() => setIsPRModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePR} className="space-y-3.5 text-xs">
              <div>
                <label className="text-zinc-400 block mb-1">Exercise / Movement</label>
                <select
                  value={exercise}
                  onChange={(e) => setExercise(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none"
                >
                  <option value="Conventional Deadlift" className="bg-[#0F0F18]">Conventional Deadlift</option>
                  <option value="Barbell Back Squat" className="bg-[#0F0F18]">Barbell Back Squat</option>
                  <option value="Barbell Flat Bench Press" className="bg-[#0F0F18]">Barbell Flat Bench Press</option>
                  <option value="Standing Overhead Barbell Press" className="bg-[#0F0F18]">Standing Overhead Barbell Press</option>
                  <option value="Weighted Pull-Up" className="bg-[#0F0F18]">Weighted Pull-Up</option>
                  <option value="Barbell Hip Thrust" className="bg-[#0F0F18]">Barbell Hip Thrust</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-400 block mb-1">Weight (KG)</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={weight}
                    onChange={(e) => setWeight(parseFloat(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Reps Completed</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    required
                    value={reps}
                    onChange={(e) => setReps(parseInt(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#E2F163] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#d6e752] transition-all shadow-lg shadow-[#E2F163]/25 mt-2"
              >
                Save Personal Record
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Log Today's Weight Modal */}
      {isWeightModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsWeightModalOpen(false)} />
          <div className="relative w-full max-w-md bg-[#0F0F18] border border-white/15 rounded-3xl p-6 shadow-2xl z-10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                <Target className="w-5 h-5 text-[#E2F163]" />
                <span>Log Weigh-In</span>
              </h3>
              <button onClick={() => setIsWeightModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveWeight} className="space-y-3.5 text-xs">
              <div>
                <label className="text-zinc-400 block mb-1">Morning Body Weight (KG)</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={newWeight}
                  onChange={(e) => setNewWeight(parseFloat(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Body Fat % (Optional from InBody)</label>
                <input
                  type="number"
                  step="0.1"
                  value={newBodyFat}
                  onChange={(e) => setNewBodyFat(parseFloat(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#E2F163] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#d6e752] transition-all shadow-lg shadow-[#E2F163]/25 mt-2"
              >
                Log Entry & Update Charts
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
