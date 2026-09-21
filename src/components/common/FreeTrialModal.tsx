'use client';

import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { X, Sparkles, CheckCircle2, MessageSquare, MapPin, Calendar, Target, User, Phone, Mail, ArrowRight } from 'lucide-react';
import { generateWhatsAppLink } from '@/lib/utils';
import { GYM_LOCATIONS } from '@/lib/mock-data';

const GOAL_OPTIONS = [
  'Fat Loss & Body Recomposition',
  'Muscle Hypertrophy & Power',
  'Championship Boxing Conditioning',
  'Hyrox Athletic Racing',
  'Mobility & Posture Rehab',
  'General High-Energy Health',
];

export function FreeTrialModal() {
  const { isTrialModalOpen, closeTrialModal, trialModalLocation, addLead } = useAppStore();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState(GYM_LOCATIONS[0].name);
  const [date, setDate] = useState('');
  const [goal, setGoal] = useState(GOAL_OPTIONS[0]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (trialModalLocation) {
      setLocation(trialModalLocation);
    }
  }, [trialModalLocation]);

  // Set default date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  if (!isTrialModalOpen) return null;

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

  const handleClose = () => {
    setIsSubmitted(false);
    setName('');
    setPhone('');
    setEmail('');
    closeTrialModal();
  };

  const whatsappMessage = `Hi EliteFit! I just reserved a VIP 1-Day Trial Pass for ${name} at ${location} for ${date}. My main goal is: ${goal}. Please confirm my session slot!`;
  const whatsappUrl = generateWhatsAppLink('+919830123456', whatsappMessage);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-lg bg-[#0E0E16] border border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8">
        {/* Header Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full bg-[#E2F163]/10 text-[#E2F163] text-xs font-extrabold tracking-wider uppercase border border-[#E2F163]/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                VIP 1-DAY PASS
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
              EXPERIENCE <span className="text-[#E2F163]">ELITEFIT</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 mb-6">
              Full access to our Olympic weight platforms, recovery dry sauna, and 1 high-intensity studio class. Zero strings attached.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#E2F163] text-white text-sm outline-none placeholder:text-zinc-600 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#E2F163]" /> Phone (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98300 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#E2F163] text-white text-sm outline-none placeholder:text-zinc-600 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#E2F163]" /> Email (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="alex@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#E2F163] text-white text-sm outline-none placeholder:text-zinc-600 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#E2F163]" /> Preferred Club
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#14141E] border border-white/10 focus:border-[#E2F163] text-white text-sm outline-none"
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
                    <Calendar className="w-3.5 h-3.5 text-[#E2F163]" /> Trial Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#E2F163] text-white text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-[#E2F163]" /> Primary Fitness Goal
                </label>
                <div className="grid grid-cols-2 gap-1.5 max-h-32 overflow-y-auto pr-1">
                  {GOAL_OPTIONS.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGoal(g)}
                      className={`text-left p-2 rounded-lg text-xs transition-all border ${
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
                className="w-full py-3.5 rounded-xl bg-[#E2F163] text-black font-extrabold text-sm uppercase tracking-wider hover:bg-[#d6e752] hover:shadow-lg hover:shadow-[#E2F163]/30 transition-all flex items-center justify-center gap-2 mt-4"
              >
                <span>CLAIM 1-DAY PASS</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#E2F163]/20 border-2 border-[#E2F163] text-[#E2F163] flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-white tracking-tight font-display">
                YOU&apos;RE ON THE LIST, {name.toUpperCase()}!
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-sm mx-auto">
                Your 1-Day VIP Pass is reserved for <strong className="text-white">{date}</strong> at <strong className="text-white">{location}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left space-y-2 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Pass Passcode:</span>
                <span className="font-mono text-[#E2F163] font-bold">EF-PASS-{Math.floor(1000 + Math.random() * 9000)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Target Focus:</span>
                <span className="text-white font-medium">{goal}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Includes:</span>
                <span className="text-white font-medium">Free InBody Scan + Sauna</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-xl bg-[#25D366] text-black font-extrabold text-sm uppercase tracking-wider hover:bg-[#20ba59] hover:shadow-lg hover:shadow-[#25D366]/30 flex items-center justify-center gap-2 transition-all"
              >
                <MessageSquare className="w-5 h-5 fill-current" />
                <span>Continue on WhatsApp (Instant Confirm)</span>
              </a>

              <button
                onClick={handleClose}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-semibold"
              >
                Close & Explore Classes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
