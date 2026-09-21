'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  User,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { GYM_LOCATIONS } from '@/lib/mock-data';

export default function LocationsPage() {
  const { openTrialModal } = useAppStore();
  const [selectedBranchId, setSelectedBranchId] = useState(GYM_LOCATIONS[0].id);

  const activeBranch = GYM_LOCATIONS.find((l) => l.id === selectedBranchId) || GYM_LOCATIONS[0];

  return (
    <div className="flex flex-col min-h-screen bg-[#070709] text-white">
      {/* Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#141424] via-[#0A0A10] to-[#070709] border-b border-white/10 text-center relative">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-[#E2F163]/10 text-[#E2F163] text-xs font-black uppercase tracking-widest border border-[#E2F163]/25">
            EASTERN INDIA FOOTPRINT
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase font-display">
            OUR <span className="text-[#E2F163]">LOCATIONS</span>
          </h1>
          <p className="text-sm sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Multi-club access included with Pro and Elite memberships. Train across Kolkata, Siliguri, Durgapur, and Asansol seamlessly.
          </p>

          {/* Branch Switcher Tabs */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2">
            {GYM_LOCATIONS.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setSelectedBranchId(loc.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  selectedBranchId === loc.id
                    ? 'bg-[#E2F163] text-black shadow-lg shadow-[#E2F163]/25'
                    : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{loc.city} ({loc.name.split(' ')[1] || 'Club'})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Active Location Showcase */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Location Photo & Overview */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-3xl overflow-hidden border border-white/15 h-80 sm:h-96 shadow-2xl relative">
              <img
                src={activeBranch.image}
                alt={activeBranch.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded bg-[#E2F163] text-black text-[10px] font-black uppercase tracking-wider">
                    {activeBranch.city} CLUB
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white font-display mt-1">
                    {activeBranch.name}
                  </h2>
                </div>
              </div>
            </div>

            {/* Facilities & Amenities */}
            <div className="p-6 rounded-3xl bg-[#111119] border border-white/10 space-y-4">
              <h3 className="text-base font-bold text-white uppercase tracking-wider font-display flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#E2F163]" />
                <span>Club Facilities & Recovery Suite</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {activeBranch.facilities.map((fac, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-[#E2F163] flex-shrink-0" />
                    <span>{fac}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Hours, Contact & Directions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#111119] border border-white/10 space-y-5">
              <h3 className="text-lg font-bold text-white font-display uppercase">
                Club Information
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3 text-zinc-300">
                  <MapPin className="w-4 h-4 text-[#E2F163] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Address</strong>
                    <span>{activeBranch.address}</span>
                    <span className="block text-[11px] text-zinc-500 mt-0.5">{activeBranch.landmark}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-zinc-300">
                  <Clock className="w-4 h-4 text-[#E2F163] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Operating Hours</strong>
                    <div>Mon - Sat: <span className="text-white font-medium">{activeBranch.hoursWeekday}</span></div>
                    <div>Sunday: <span className="text-white font-medium">{activeBranch.hoursWeekend}</span></div>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-zinc-300">
                  <Phone className="w-4 h-4 text-[#E2F163] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Concierge Desk</strong>
                    <span className="font-mono text-white">{activeBranch.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-zinc-300">
                  <User className="w-4 h-4 text-[#E2F163] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Club Leadership</strong>
                    <div>General Manager: <span className="text-white font-medium">{activeBranch.managerName}</span></div>
                    <div>Head Coach: <span className="text-white font-medium">{activeBranch.headTrainer}</span></div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-3 border-t border-white/10">
                <button
                  onClick={() => openTrialModal(activeBranch.name)}
                  className="w-full py-3.5 rounded-xl bg-[#E2F163] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#d6e752] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#E2F163]/20"
                >
                  <Sparkles className="w-4 h-4 fill-black" />
                  <span>CLAIM FREE TRIAL AT THIS CLUB</span>
                </button>

                <a
                  href={activeBranch.mapEmbedUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>GET DIRECTIONS IN GOOGLE MAPS</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
