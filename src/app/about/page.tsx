'use client';

import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { Flame, Sparkles, ShieldCheck, Zap, HeartPulse, Brain, Waves, ArrowRight, CheckCircle2, Award } from 'lucide-react';
import { TRAINERS } from '@/lib/mock-data';

export default function AboutPage() {
  const { openTrialModal } = useAppStore();

  const PILLARS = [
    {
      title: 'Biomechanical Overload',
      icon: Zap,
      color: '#E2F163',
      description: 'Zero guesswork. Every strength exercise is engineered around your joint levers and active tension curves for maximum motor unit recruitment without tendon strain.',
    },
    {
      title: 'High-Capacity Conditioning',
      icon: HeartPulse,
      color: '#FF334B',
      description: 'Hybrid aerobic and anaerobic intervals combining Assault Bikes, curved treadmills, and sled pushes to elevate VO2 max and mitochondrial density.',
    },
    {
      title: 'Contrast Cryo & Heat Recovery',
      icon: Waves,
      color: '#00F0FF',
      description: 'Accelerate muscular repair and autonomic nervous system recovery through Finnish 90°C dry saunas, eucalyptus steam, and 8°C cold plunge baths.',
    },
    {
      title: 'Biochemical & Nutrition Science',
      icon: Brain,
      color: '#D4AF37',
      description: 'Nutritional periodization aligned with your training split. InBody 570 scans, precise macro cycling, and clean supplementation protocols.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#070709] text-white">
      {/* Header Banner */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#12121E] via-[#0A0A10] to-[#070709] border-b border-white/10 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E2F163]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-[#E2F163]/10 text-[#E2F163] text-xs font-black uppercase tracking-widest border border-[#E2F163]/25">
            OUR GENESIS & ETHOS
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase font-display">
            ENGINEERED FOR THE <br />
            <span className="text-[#E2F163]">PHYSICAL ELITE</span>
          </h1>
          <p className="text-sm sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            We rejected the commercial gym model of crowded floors, broken machines, and disengaged trainers. EliteFit was built to set a new standard for athletic luxury and human performance.
          </p>
        </div>
      </section>

      {/* Origin Story (Asymmetric Editorial) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-black tracking-widest text-[#E2F163] uppercase">
              THE ELITEFIT STORY
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-display uppercase leading-tight">
              FROM A DISILLUSIONED ATHLETE TO A REVOLUTIONARY CLUB.
            </h2>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Founded in 2022 by decathletes and sports scientists, EliteFit began with a single mission: to create a training environment where serious individuals could train with the same caliber of equipment, biomechanics, and recovery protocols previously reserved for professional Olympians.
            </p>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Today, with flagship clubs across Kolkata, Siliguri, Durgapur, and Asansol, EliteFit serves a community of over 1,280 disciplined athletes—from high-powered corporate executives to competitive Hyrox racers and everyday fitness enthusiasts.
            </p>

            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                The Non-Negotiable Standards
              </h4>
              <ul className="space-y-2 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E2F163]" />
                  <span>Strict member capacity limits to eliminate waiting for equipment</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E2F163]" />
                  <span>Competition Eleiko & Rogue barbells with calibrated weight plates</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E2F163]" />
                  <span>100% CSCS, ACE, or Olympic certified coaching staff</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E2F163]" />
                  <span>Medical-grade InBody 570 composition tracking for every member</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-3xl overflow-hidden border border-white/15 h-96 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80"
                alt="EliteFit Flagship Floor"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Pillars Methodology */}
      <section className="py-20 bg-[#0A0A10] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black tracking-widest text-[#E2F163] uppercase">
              THE 4-PILLAR METHODOLOGY
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-display uppercase">
              HOW WE ENGINEER PROGRESS
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              A holistic, science-driven framework built to maximize human power output, stamina, and longevity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl p-6 bg-[#11111A] border border-white/10 hover:border-[#E2F163]/40 transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div>
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${pillar.color}20`, color: pillar.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 font-bold">
                      0{idx + 1} // PILLAR
                    </span>
                    <h3 className="text-lg font-bold text-white font-display mt-1">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership & Coaches Preview */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-black tracking-widest text-[#E2F163] uppercase">
              LEADERSHIP & PERFORMANCE DIRECTORS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-display uppercase mt-1">
              THE MINDS BEHIND ELITEFIT
            </h2>
          </div>
          <Link
            href="/trainers"
            className="text-xs font-bold text-[#E2F163] hover:underline flex items-center gap-1"
          >
            <span>Meet All Coaches</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {TRAINERS.slice(0, 3).map((coach) => (
            <div
              key={coach.id}
              className="rounded-3xl bg-[#111119] border border-white/10 overflow-hidden group"
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  src={coach.avatar}
                  alt={coach.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111119] via-transparent to-transparent" />
              </div>
              <div className="p-5 space-y-2">
                <h4 className="text-lg font-bold text-white font-display">{coach.name}</h4>
                <p className="text-xs text-[#E2F163] font-medium">{coach.role}</p>
                <p className="text-xs text-zinc-400 leading-relaxed pt-1">{coach.bio}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button
            onClick={() => openTrialModal()}
            className="px-8 py-4 rounded-2xl bg-[#E2F163] text-black font-extrabold text-sm uppercase tracking-wider hover:bg-[#d6e752] transition-all shadow-lg shadow-[#E2F163]/20"
          >
            EXPERIENCE ELITEFIT IN PERSON (FREE 1-DAY PASS)
          </button>
        </div>
      </section>
    </div>
  );
}
