'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import {
  Flame,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Dumbbell,
  Users,
  Calendar,
  MapPin,
  ChevronRight,
  Star,
  Award,
  Zap,
  Activity,
  HeartPulse,
  Clock,
  Play,
  CheckCircle2,
} from 'lucide-react';
import {
  MEMBERSHIP_PLANS,
  GYM_CLASSES,
  TRAINERS,
  TRANSFORMATIONS,
  GYM_LOCATIONS,
} from '@/lib/mock-data';
import { formatINR } from '@/lib/utils';
import { BeforeAfterSlider } from '@/components/transformations/BeforeAfterSlider';

export default function HomePage() {
  const {
    openTrialModal,
    openClassModal,
    openTrainerModal,
    openCaseModal,
  } = useAppStore();

  const [selectedClassCategory, setSelectedClassCategory] = useState<string>('All');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const filteredClasses =
    selectedClassCategory === 'All'
      ? GYM_CLASSES.slice(0, 6)
      : GYM_CLASSES.filter((c) => c.category === selectedClassCategory);

  return (
    <div className="flex flex-col min-h-screen bg-[#070709] text-white overflow-hidden">
      {/* =========================================================================
          1. HERO SECTION (Cinematic, High-Impact Editorial)
         ========================================================================= */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-8 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Cinematic Backdrop Image with Dark Gradients */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=2000&q=85"
            alt="EliteFit Training Arena"
            className="w-full h-full object-cover object-center brightness-[0.28] scale-105 transition-transform duration-1000"
          />
          {/* Multi-layer gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070709] via-transparent to-[#070709]/80" />
          {/* Accent glow orb */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#E2F163]/10 rounded-full blur-[140px] pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 pt-12">
          {/* High-Energy Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl text-xs sm:text-sm font-semibold text-zinc-300 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-[#E2F163] animate-ping" />
            <span className="text-[#E2F163] font-bold">ELITE PERFORMANCE LABS</span>
            <span className="text-zinc-500">•</span>
            <span>4 Flagship Clubs in Eastern India</span>
          </div>

          {/* Primary Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] text-white font-display uppercase">
            TRAIN HARD. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E2F163] to-white">
              LIVE ELITE.
            </span>
          </h1>

          {/* Subtext */}
          <p className="max-w-2xl mx-auto text-sm sm:text-lg md:text-xl text-zinc-300 font-normal leading-relaxed">
            More than a gym. A performance-driven community built to help you become stronger, healthier, and better every day.
          </p>

          {/* Call To Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <button
              onClick={() => openTrialModal()}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#E2F163] text-black font-extrabold text-sm uppercase tracking-wider hover:bg-[#d6e752] hover:shadow-[0_0_35px_rgba(226,241,99,0.4)] active:scale-95 transition-all flex items-center justify-center gap-2.5"
            >
              <Sparkles className="w-4 h-4 fill-black" />
              <span>START YOUR JOURNEY (FREE PASS)</span>
            </button>

            <Link
              href="/memberships"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-extrabold text-sm uppercase tracking-wider border border-white/15 hover:border-white/30 backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              <span>EXPLORE MEMBERSHIPS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Live Metric Counters */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="text-2xl sm:text-3xl font-black text-white font-display">1,280+</div>
              <div className="text-xs text-zinc-400 font-medium mt-0.5 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#E2F163]" /> Active Athletes
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="text-2xl sm:text-3xl font-black text-white font-display">18+</div>
              <div className="text-xs text-zinc-400 font-medium mt-0.5 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-[#E2F163]" /> Master Coaches
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="text-2xl sm:text-3xl font-black text-white font-display">45+</div>
              <div className="text-xs text-zinc-400 font-medium mt-0.5 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-[#FF334B]" /> Weekly Sessions
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="text-2xl sm:text-3xl font-black text-white font-display">4</div>
              <div className="text-xs text-zinc-400 font-medium mt-0.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#E2F163]" /> Flagship Clubs
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. PERFORMANCE CULTURE & EDITORIAL MANIFESTO
         ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Story */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-black tracking-widest text-[#E2F163] uppercase">
              THE PERFORMANCE MANIFESTO
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-display uppercase leading-tight">
              DISCIPLINE BUILDS WHAT MOTIVATION STARTS.
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              We stripped away the noise of generic fitness franchises. EliteFit is an uncompromising athletic haven designed for people who take their health, power, and physical potential seriously.
            </p>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              From Swedish Eleiko barbells and curved Woodway sprint tracks to sub-zero recovery cryo and personalized nutrition algorithms, every square inch of our clubs is optimized for physical adaptation.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#11111A] border border-white/10">
                <Zap className="w-5 h-5 text-[#E2F163] mb-2" />
                <h4 className="font-bold text-white text-sm font-display">Biomechanical Rigor</h4>
                <p className="text-xs text-zinc-400 mt-1">Movement screening to eliminate injury and maximize force output.</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#11111A] border border-white/10">
                <HeartPulse className="w-5 h-5 text-[#FF334B] mb-2" />
                <h4 className="font-bold text-white text-sm font-display">Metabolic Threshold</h4>
                <p className="text-xs text-zinc-400 mt-1">High-capacity interval protocols that reshape your cardiovascular engine.</p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#E2F163] hover:underline"
              >
                <span>Read Full EliteFit Story & Philosophy</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Asymmetric Visual Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden border border-white/10 h-64 sm:h-72 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80"
                  alt="Strength Platform"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-5 rounded-3xl bg-[#141420] border border-white/10 space-y-2">
                <div className="text-xs font-mono text-[#E2F163] font-bold">ELEIKO CERTIFIED</div>
                <div className="text-base font-bold text-white font-display">Competition Lifting Zone</div>
                <p className="text-xs text-zinc-400">Calibrated bumper plates, competition power racks, and deadlift deadening platforms.</p>
              </div>
            </div>

            <div className="space-y-4 pt-8 sm:pt-12">
              <div className="p-5 rounded-3xl bg-[#141420] border border-white/10 space-y-2">
                <div className="text-xs font-mono text-[#25D366] font-bold">CONTRAST THERAPY</div>
                <div className="text-base font-bold text-white font-display">Dry Sauna & Cold Plunge</div>
                <p className="text-xs text-zinc-400">Reduce DOMS, accelerate cellular recovery, and modulate central nervous system stress.</p>
              </div>
              <div className="rounded-3xl overflow-hidden border border-white/10 h-64 sm:h-72 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80"
                  alt="Recovery Suite"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. INTERACTIVE CLASS SPOTLIGHT & BOOKING PREVIEW
         ========================================================================= */}
      <section className="py-20 bg-[#0A0A10] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-black tracking-widest text-[#E2F163] uppercase">
                STUDIO TIMETABLE
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display uppercase mt-1">
                HIGH-OCTANE GROUP SESSIONS
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {['All', 'HIIT', 'Boxing', 'CrossFit', 'Strength', 'Yoga'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedClassCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedClassCategory === cat
                      ? 'bg-[#E2F163] text-black shadow-lg shadow-[#E2F163]/20'
                      : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Classes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map((c) => (
              <div
                key={c.id}
                className="group rounded-3xl bg-[#12121B] border border-white/10 hover:border-[#E2F163]/40 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12121B] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[#E2F163] text-[10px] font-black uppercase tracking-wider border border-[#E2F163]/30">
                    {c.category}
                  </span>
                  <span className="absolute bottom-3 right-3 text-xs font-mono font-bold text-zinc-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-md">
                    {c.durationMinutes} MINS
                  </span>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white font-display group-hover:text-[#E2F163] transition-colors">
                      {c.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                      {c.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/10 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-zinc-300">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#E2F163]" />
                        <span>{c.day} • {c.time}</span>
                      </span>
                      <span className="text-[#FF334B] font-semibold">{c.calorieBurn}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={c.trainerAvatar}
                          alt={c.trainerName}
                          className="w-6 h-6 rounded-full object-cover border border-white/20"
                        />
                        <span className="text-xs text-zinc-400">Coach {c.trainerName}</span>
                      </div>
                      <span className="text-[11px] font-bold text-[#E2F163]">
                        {c.totalSeats - c.bookedSeats} seats left
                      </span>
                    </div>
                  </div>

                  {/* Book Trigger Button */}
                  <button
                    onClick={() => openClassModal(c)}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-[#E2F163] text-white hover:text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-white/10 hover:border-transparent"
                  >
                    <span>Reserve Spot</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/classes"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider border border-white/10"
            >
              <span>View Full Weekly Timetable (45+ Sessions)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. MASTER TRAINER SPOTLIGHT
         ========================================================================= */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-black tracking-widest text-[#E2F163] uppercase">
              ELITE COACHING STAFF
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display uppercase mt-1">
              GUIDED BY MASTER PRACTITIONERS
            </h2>
          </div>
          <Link
            href="/trainers"
            className="text-xs font-bold text-[#E2F163] hover:underline flex items-center gap-1"
          >
            <span>View All Coaches & Certifications</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRAINERS.slice(0, 3).map((trainer) => (
            <div
              key={trainer.id}
              className="rounded-3xl bg-[#111119] border border-white/10 overflow-hidden group hover:border-[#E2F163]/40 transition-all flex flex-col justify-between"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={trainer.avatar}
                  alt={trainer.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111119] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white font-display">
                      {trainer.name}
                    </h3>
                    <p className="text-xs text-[#E2F163] font-medium">{trainer.role}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-amber-400 text-xs font-bold border border-white/10">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{trainer.rating}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  &ldquo;{trainer.philosophy}&rdquo;
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {trainer.specialties.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[10px] text-zinc-300 font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => openTrainerModal(trainer)}
                    className="flex-1 py-2.5 rounded-xl bg-[#E2F163] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#d6e752] transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Book 1-on-1 PT</span>
                  </button>
                  <button
                    onClick={() => openTrainerModal(trainer)}
                    className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-semibold"
                  >
                    Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          5. INTERACTIVE CLIENT TRANSFORMATION SHOWCASE
         ========================================================================= */}
      <section className="py-20 bg-[#08080E] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-black tracking-widest text-[#E2F163] uppercase">
              PROVEN RESULTS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display uppercase">
              REAL BODIES. MEASURABLE TRANSFORMATION.
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Drag the interactive slider below to inspect actual athlete body recomposition metrics achieved at EliteFit.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Interactive Drag Slider for Hero Transformation */}
            <div className="rounded-3xl overflow-hidden border border-white/15 h-80 sm:h-96 shadow-2xl">
              <BeforeAfterSlider
                beforeImage={TRANSFORMATIONS[0].beforeImage}
                afterImage={TRANSFORMATIONS[0].afterImage}
                beforeLabel="BEFORE (84.5 KG)"
                afterLabel="AFTER (70.0 KG)"
                className="w-full h-full"
              />
            </div>

            {/* Case Details */}
            <div className="space-y-6">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#E2F163]/10 text-[#E2F163] text-xs font-black uppercase tracking-wider border border-[#E2F163]/20">
                  {TRANSFORMATIONS[0].category} • {TRANSFORMATIONS[0].durationWeeks} WEEKS
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-display mt-2">
                  {TRANSFORMATIONS[0].name}, {TRANSFORMATIONS[0].age}
                </h3>
                <p className="text-xs text-zinc-400">
                  {TRANSFORMATIONS[0].occupation} • Coached by {TRANSFORMATIONS[0].trainerName}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">Total Weight</span>
                  <span className="text-xl font-black text-[#E2F163] font-display">
                    {TRANSFORMATIONS[0].weightChangeKg} kg
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">Body Fat Delta</span>
                  <span className="text-xl font-black text-[#E2F163] font-display">
                    {TRANSFORMATIONS[0].bodyFatChangePercent}%
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">Deadlift PR</span>
                  <span className="text-xl font-black text-white font-display">180 kg</span>
                </div>
              </div>

              <blockquote className="p-4 rounded-2xl bg-[#E2F163]/5 border-l-4 border-[#E2F163] text-zinc-300 text-xs sm:text-sm italic leading-relaxed">
                &ldquo;{TRANSFORMATIONS[0].quote}&rdquo;
              </blockquote>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => openCaseModal(TRANSFORMATIONS[0])}
                  className="px-6 py-3 rounded-xl bg-[#E2F163] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#d6e752] transition-all flex items-center gap-2"
                >
                  <span>Read Full Case Study</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  href="/transformations"
                  className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider border border-white/10"
                >
                  View All Stories &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. MEMBERSHIP TIERS PREVIEW
         ========================================================================= */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-black tracking-widest text-[#E2F163] uppercase">
            MEMBERSHIP PRIVILEGES
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display uppercase">
            INVEST IN YOUR PHYSICAL PRIME
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Zero hidden fees. Zero lock-in contracts. Full access to cutting-edge facilities.
          </p>

          {/* Monthly vs Annual Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={`text-xs font-bold ${billingCycle === 'monthly' ? 'text-white' : 'text-zinc-500'}`}>
              Monthly Billing
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="w-14 h-8 rounded-full bg-[#181824] border border-white/15 p-1 relative transition-colors"
            >
              <div
                className={`w-6 h-6 rounded-full bg-[#E2F163] transition-transform duration-300 ${
                  billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-xs font-bold flex items-center gap-1.5 ${billingCycle === 'annual' ? 'text-white' : 'text-zinc-500'}`}>
              Annual VIP (Save 20%)
              <span className="px-2 py-0.5 rounded-full bg-[#E2F163]/20 text-[#E2F163] text-[10px] font-black">
                SAVE 20%
              </span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {MEMBERSHIP_PLANS.slice(0, 3).map((plan) => {
            const price = billingCycle === 'annual' ? plan.priceAnnualMonthly : plan.priceMonthly;
            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative transition-all duration-300 ${
                  plan.isPopular
                    ? 'bg-gradient-to-b from-[#181828] to-[#0F0F1A] border-2 border-[#E2F163] shadow-2xl shadow-[#E2F163]/10 scale-105'
                    : 'bg-[#0E0E16] border border-white/10 hover:border-white/20'
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#E2F163] text-black text-[10px] font-black uppercase tracking-wider shadow-lg">
                    {plan.badge}
                  </span>
                )}

                <div>
                  <h3 className="text-xl font-black text-white font-display uppercase">{plan.name}</h3>
                  <p className="text-xs text-zinc-400 mt-1 min-h-[32px]">{plan.tagline}</p>

                  <div className="my-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-black text-white font-display">
                        {formatINR(price)}
                      </span>
                      <span className="text-xs text-zinc-400">/ month</span>
                    </div>
                    {billingCycle === 'annual' && (
                      <span className="text-[11px] text-[#E2F163] font-semibold block mt-1">
                        Billed annually ({formatINR(price * 12)}/yr)
                      </span>
                    )}
                  </div>

                  <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs">
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-[#E2F163] flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <Link
                    href="/memberships"
                    className={`w-full py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      plan.isPopular
                        ? 'bg-[#E2F163] text-black hover:bg-[#d6e752] shadow-lg shadow-[#E2F163]/25'
                        : 'bg-white/10 hover:bg-white/15 text-white border border-white/10'
                    }`}
                  >
                    <span>CHOOSE {plan.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/memberships"
            className="text-xs font-bold text-zinc-400 hover:text-[#E2F163] underline"
          >
            Compare All 14 Feature Details in Full Matrix &rarr;
          </Link>
        </div>
      </section>

      {/* =========================================================================
          7. MULTI-LOCATION CLUB PREVIEW
         ========================================================================= */}
      <section className="py-20 bg-[#0A0A10] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-black tracking-widest text-[#E2F163] uppercase">
                CLUB NETWORK
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display uppercase mt-1">
                4 PREMIER CLUBS IN BENGAL
              </h2>
            </div>
            <Link
              href="/locations"
              className="text-xs font-bold text-[#E2F163] hover:underline flex items-center gap-1"
            >
              <span>Explore All Branch Facilities</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GYM_LOCATIONS.map((loc) => (
              <div
                key={loc.id}
                className="group rounded-3xl bg-[#11111A] border border-white/10 hover:border-[#E2F163]/30 overflow-hidden flex flex-col justify-between transition-all"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={loc.image}
                    alt={loc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11111A] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/80 text-[#E2F163] text-[10px] font-black uppercase tracking-wider">
                    {loc.city}
                  </span>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white font-display group-hover:text-[#E2F163]">
                      {loc.name}
                    </h3>
                    <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">{loc.address}</p>
                  </div>

                  <div className="pt-2 border-t border-white/5 space-y-1 text-[11px] text-zinc-400">
                    <div>Hours: <span className="text-zinc-300 font-medium">{loc.hoursWeekday}</span></div>
                    <div>Head Coach: <span className="text-white font-medium">{loc.headTrainer}</span></div>
                  </div>

                  <button
                    onClick={() => openTrialModal(loc.name)}
                    className="w-full py-2 rounded-xl bg-white/5 hover:bg-[#E2F163] text-zinc-300 hover:text-black text-xs font-bold transition-all"
                  >
                    Visit {loc.city} Club
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. HIGH-CONVERSION BOTTOM CTA BANNER
         ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto rounded-3xl bg-gradient-to-r from-[#141424] via-[#1B1B30] to-[#141424] border border-[#E2F163]/30 p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#E2F163]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="px-3.5 py-1 rounded-full bg-[#E2F163]/20 text-[#E2F163] text-xs font-extrabold uppercase tracking-widest border border-[#E2F163]/30">
              ZERO RISK • FULL FACILITY ACCESS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display uppercase leading-tight">
              YOUR NEXT LEVEL STARTS TODAY.
            </h2>
            <p className="text-xs sm:text-base text-zinc-300 leading-relaxed max-w-xl mx-auto">
              Claim your 1-Day VIP Pass to train on our strength floors, sweat through a studio class, and recover in the Finnish sauna.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <button
                onClick={() => openTrialModal()}
                className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-[#E2F163] text-black font-extrabold text-sm uppercase tracking-wider hover:bg-[#d6e752] hover:shadow-[0_0_30px_rgba(226,241,99,0.35)] transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 fill-black" />
                <span>BOOK FREE VIP TRIAL PASS</span>
              </button>
              <Link
                href="/memberships"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm uppercase tracking-wider border border-white/10"
              >
                View Plans & Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
