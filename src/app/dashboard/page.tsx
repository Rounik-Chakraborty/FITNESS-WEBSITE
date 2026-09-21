'use client';

import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import {
  Flame,
  CalendarCheck,
  TrendingUp,
  CreditCard,
  QrCode,
  Sparkles,
  Clock,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Dumbbell,
  Activity,
  Heart,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { GYM_CLASSES } from '@/lib/mock-data';

export default function MemberDashboardPage() {
  const {
    currentUser,
    bookings,
    setQRPassModalOpen,
    openClassModal,
    setAIWidgetOpen,
  } = useAppStore();

  const upcomingBooking = bookings.find((b) => b.status === 'Upcoming');

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 1. TOP CARDS ROW: ACTIVE MEMBERSHIP + DIGITAL PASS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Membership Tier Hero Card */}
        <div className="lg:col-span-8 rounded-3xl bg-gradient-to-r from-[#181828] via-[#151522] to-[#0E0E18] border border-[#E2F163]/30 p-6 sm:p-8 relative overflow-hidden shadow-2xl flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E2F163]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#E2F163]/20 text-[#E2F163] text-xs font-black uppercase tracking-widest border border-[#E2F163]/40 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                MEMBERSHIP STATUS: {currentUser.membershipStatus.toUpperCase()}
              </span>
              <span className="text-xs font-mono text-zinc-400">
                Member ID: #{currentUser.id}
              </span>
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-white font-display uppercase tracking-tight">
                {currentUser.membershipPlan} ATHLETE TIER
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-xl">
                Unlimited multi-club access, high-capacity studio sessions, and contrast recovery suite privileges across Eastern India.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
                <span className="text-zinc-500 block text-[10px] uppercase font-bold">Expires On</span>
                <span className="text-white font-bold text-sm">24 October 2026</span>
              </div>
              <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
                <span className="text-zinc-500 block text-[10px] uppercase font-bold">Home Club</span>
                <span className="text-white font-bold text-sm truncate block">{currentUser.homeBranch.split(' ')[0]}</span>
              </div>
              <div className="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-black/40 border border-white/5">
                <span className="text-zinc-500 block text-[10px] uppercase font-bold">Total Check-ins</span>
                <span className="text-[#E2F163] font-bold text-sm">{currentUser.stats.totalCheckins} Sessions</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 relative z-10">
            <button
              onClick={() => setQRPassModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-[#E2F163] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#d6e752] transition-all flex items-center gap-2 shadow-lg shadow-[#E2F163]/20"
            >
              <QrCode className="w-4 h-4 stroke-[2.5]" />
              <span>LAUNCH DIGITAL ACCESS PASS</span>
            </button>

            <Link
              href="/dashboard/membership"
              className="text-xs font-bold text-zinc-400 hover:text-white flex items-center gap-1"
            >
              <span>Manage Plan & Billing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* AI Performance Assistant Prompt Card */}
        <div className="lg:col-span-4 rounded-3xl bg-[#12121D] border border-white/10 p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#E2F163] uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 fill-current" />
              <span>ELITEFIT AI COACH</span>
            </div>
            <h3 className="text-xl font-bold text-white font-display">
              Ready to adjust your weekly volume?
            </h3>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              Ask your AI coach to optimize today&apos;s macro split, design a 4-day hypertrophy rotation, or prescribe mobility work.
            </p>
          </div>

          <button
            onClick={() => setAIWidgetOpen(true)}
            className="w-full py-3 rounded-xl bg-white/5 hover:bg-[#E2F163] text-white hover:text-black font-extrabold text-xs uppercase tracking-wider border border-white/10 hover:border-transparent transition-all flex items-center justify-center gap-2"
          >
            <span>Ask AI Coach</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. WEEKLY ACTIVITY METRIC DIALS */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white font-display uppercase tracking-wide">
            WEEKLY ACTIVITY SUMMARY
          </h3>
          <Link
            href="/dashboard/progress"
            className="text-xs font-bold text-[#E2F163] hover:underline flex items-center gap-1"
          >
            <span>Detailed Analytics</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#111119] border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-zinc-400 text-xs">
              <span>Workouts Logged</span>
              <Dumbbell className="w-4 h-4 text-[#E2F163]" />
            </div>
            <div className="text-3xl font-black text-white font-display">
              {currentUser.stats.weeklyWorkouts} <span className="text-xs text-zinc-500 font-normal">/ 5 goal</span>
            </div>
            <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div className="w-[80%] h-full bg-[#E2F163]" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#111119] border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-zinc-400 text-xs">
              <span>Studio Classes</span>
              <Activity className="w-4 h-4 text-[#00F0FF]" />
            </div>
            <div className="text-3xl font-black text-white font-display">
              {currentUser.stats.weeklyClasses} <span className="text-xs text-zinc-500 font-normal">attended</span>
            </div>
            <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div className="w-[75%] h-full bg-[#00F0FF]" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#111119] border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-zinc-400 text-xs">
              <span>Calories Burned</span>
              <Flame className="w-4 h-4 text-[#FF334B]" />
            </div>
            <div className="text-3xl font-black text-white font-display">
              {currentUser.stats.weeklyCalories} <span className="text-xs text-zinc-500 font-normal">kcal</span>
            </div>
            <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div className="w-[85%] h-full bg-[#FF334B]" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#111119] border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-zinc-400 text-xs">
              <span>Active Streak</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-black text-[#E2F163] font-display">
              {currentUser.stats.streakDays} Days <span className="text-xs text-zinc-500 font-normal">🔥</span>
            </div>
            <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div className="w-full h-full bg-gradient-to-r from-amber-400 to-[#E2F163]" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. UPCOMING CLASS SPOTLIGHT */}
      <div className="rounded-3xl bg-[#11111A] border border-white/10 p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#E2F163] uppercase tracking-wider">
            <Clock className="w-4 h-4" />
            <span>UPCOMING CLASS ON YOUR SCHEDULE</span>
          </div>
          <Link
            href="/dashboard/bookings"
            className="text-xs font-bold text-zinc-400 hover:text-white"
          >
            All Bookings &rarr;
          </Link>
        </div>

        {upcomingBooking ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
            <div className="space-y-1">
              <span className="px-2 py-0.5 rounded bg-[#E2F163] text-black text-[9px] font-black uppercase tracking-wider">
                {upcomingBooking.category}
              </span>
              <h4 className="text-xl font-bold text-white font-display">
                {upcomingBooking.className}
              </h4>
              <p className="text-xs text-zinc-400">
                Coach {upcomingBooking.trainerName} • {upcomingBooking.date} at {upcomingBooking.time}
              </p>
              <div className="text-[11px] text-zinc-500 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#E2F163]" />
                <span>{upcomingBooking.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setQRPassModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-[#E2F163] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#d6e752]"
              >
                Scan Turnstile Code
              </button>
              <Link
                href="/dashboard/bookings"
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-semibold"
              >
                Details
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 space-y-3">
            <p className="text-xs text-zinc-400">You have no upcoming studio class bookings.</p>
            <Link
              href="/classes"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E2F163] text-black font-bold text-xs uppercase tracking-wider"
            >
              <span>Explore Weekly Class Schedule</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>

      {/* 4. QUICK ACTIONS GRID */}
      <div>
        <h3 className="text-lg font-bold text-white font-display uppercase tracking-wide mb-4">
          QUICK ATHLETE ACTIONS
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'Book Class', href: '/classes', icon: CalendarCheck, color: '#E2F163' },
            { label: 'My Progress', href: '/dashboard/progress', icon: TrendingUp, color: '#00F0FF' },
            { label: 'My Bookings', href: '/dashboard/bookings', icon: Clock, color: '#FF334B' },
            { label: 'My Membership', href: '/dashboard/membership', icon: CreditCard, color: '#D4AF37' },
            { label: 'Find Trainer', href: '/trainers', icon: Dumbbell, color: '#E2F163' },
            { label: 'Pro Store', href: '/store', icon: Sparkles, color: '#25D366' },
          ].map((action, idx) => {
            const Icon = action.icon;
            return (
              <Link
                key={idx}
                href={action.href}
                className="p-4 rounded-2xl bg-[#11111A] border border-white/10 hover:border-[#E2F163]/40 transition-all flex flex-col items-center justify-center text-center gap-2 group hover:-translate-y-1"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${action.color}15`, color: action.color }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-white group-hover:text-[#E2F163] transition-colors">
                  {action.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
