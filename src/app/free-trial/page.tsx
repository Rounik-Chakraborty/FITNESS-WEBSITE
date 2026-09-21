'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import {
  Sparkles,
  CheckCircle2,
  MessageSquare,
  MapPin,
  Calendar,
  Target,
  User,
  Phone,
  Mail,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { generateWhatsAppLink } from '@/lib/utils';
import { GYM_LOCATIONS } from '@/lib/mock-data';

const GOAL_OPTIONS = [
  'Fat Loss & Body Recomposition',
  'Muscle Hypertrophy & Strength',
  'Championship Boxing Conditioning',
  'Hyrox Athletic Racing',
  'Mobility & Posture Rehab',
  'General High-Energy Health',
];

export default function FreeTrialPage() {
  const { addLead } = useAppStore();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState(GYM_LOCATIONS[0].name);
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [goal, setGoal] = useState(GOAL_OPTIONS[0]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    addLead({
      name,
      phone,
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      preferredLocation: location,
      preferredDate: date,
      fitnessGoal: goal,
      source: 'Website Trial',
    });

    setIsSubmitted(true);
  };

  const whatsappMessage = `Hi EliteFit! I just reserved a VIP 1-Day Trial Pass for ${name} at ${location} for ${date}. My main goal is: ${goal}. Please confirm my session slot!`;
  const whatsappUrl = generateWhatsAppLink('+919830123456', whatsappMessage);

  return (
    <div className="flex flex-col min-h-screen bg-[#070709] text-white">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#141424] via-[#0A0A10] to-[#070709] border-b border-white/10 text-center relative">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-[#E2F163]/10 text-[#E2F163] text-xs font-black uppercase tracking-widest border border-[#E2F163]/25">
            COMPLIMENTARY 1-DAY PASS
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase font-display">
            EXPERIENCE <span className="text-[#E2F163]">ELITEFIT</span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 max-w-xl mx-auto leading-relaxed">
            Train on our competition strength platforms, join any studio class, and decompress in the Finnish sauna. 100% complimentary.
          </p>
        </div>
      </section>

      {/* Main Trial Form */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto flex-1 w-full">
        <div className="rounded-3xl bg-[#0F0F18] border border-white/15 p-6 sm:p-10 shadow-2xl">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#E2F163]" /> Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#E2F163] text-white outline-none placeholder:text-zinc-600 transition-all text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#E2F163]" /> WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98300 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#E2F163] text-white outline-none placeholder:text-zinc-600 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#E2F163]" /> Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="alex@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#E2F163] text-white outline-none placeholder:text-zinc-600 transition-all text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#E2F163]" /> Preferred Club Location
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#14141E] border border-white/10 focus:border-[#E2F163] text-white outline-none text-sm"
                  >
                    {GYM_LOCATIONS.map((loc) => (
                      <option key={loc.id} value={loc.name} className="bg-[#14141E] text-white">
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#E2F163]" /> Date of Visit
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#E2F163] text-white outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-[#E2F163]" /> Select Primary Training Goal
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {GOAL_OPTIONS.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGoal(g)}
                      className={`text-left p-3 rounded-xl text-xs transition-all border ${
                        goal === g
                          ? 'bg-[#E2F163]/15 border-[#E2F163] text-[#E2F163] font-bold'
                          : 'bg-white/5 border-white/5 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#E2F163] text-black font-extrabold text-sm uppercase tracking-wider hover:bg-[#d6e752] hover:shadow-[0_0_30px_rgba(226,241,99,0.3)] transition-all flex items-center justify-center gap-2 mt-4"
              >
                <span>GENERATE VIP 1-DAY PASS</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </form>
          ) : (
            <div className="text-center py-8 space-y-6">
              <div className="w-20 h-20 rounded-full bg-[#E2F163]/20 border-2 border-[#E2F163] text-[#E2F163] flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-3xl font-black text-white font-display">
                  PASS GENERATED FOR {name.toUpperCase()}!
                </h3>
                <p className="text-sm text-zinc-400 mt-2 max-w-md mx-auto">
                  Your complimentary 1-Day Pass is active for <strong className="text-white">{date}</strong> at <strong className="text-white">{location}</strong>.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-left space-y-2 text-xs max-w-md mx-auto">
                <div className="flex justify-between text-zinc-400">
                  <span>Pass Code:</span>
                  <span className="font-mono text-[#E2F163] font-bold">EF-VIP-{Math.floor(1000 + Math.random() * 9000)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Goal Focus:</span>
                  <span className="text-white font-medium">{goal}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Includes:</span>
                  <span className="text-emerald-400 font-semibold">Free InBody Scan + Sauna Access</span>
                </div>
              </div>

              <div className="max-w-md mx-auto space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 rounded-xl bg-[#25D366] text-black font-extrabold text-sm uppercase tracking-wider hover:bg-[#20ba59] hover:shadow-lg hover:shadow-[#25D366]/30 flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquare className="w-5 h-5 fill-current" />
                  <span>Confirm on WhatsApp (Instant Front Desk Chat)</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
