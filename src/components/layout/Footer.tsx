'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Flame, ArrowUpRight, Send, CheckCircle2, MessageSquare, MapPin, Phone, Mail, Instagram, Youtube, Twitter } from 'lucide-react';
import { generateWhatsAppLink } from '@/lib/utils';
import { GYM_LOCATIONS } from '@/lib/mock-data';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 4000);
  };

  return (
    <footer className="bg-[#050508] border-t border-white/10 text-zinc-400 pt-16 pb-24 md:pb-16 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#E2F163]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section: Brand Statement & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          <div className="lg:col-span-6 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group inline-flex">
              <div className="w-10 h-10 rounded-xl bg-[#E2F163] text-black flex items-center justify-center font-extrabold text-xl">
                <Flame className="w-6 h-6 fill-current" />
              </div>
              <span className="font-extrabold tracking-tighter text-2xl text-white font-display">
                ELITE<span className="text-[#E2F163]">FIT</span>
              </span>
            </Link>
            <p className="text-xl sm:text-2xl font-extrabold text-white tracking-tight font-display max-w-lg leading-snug">
              TRAIN WITH PURPOSE. <br />
              <span className="text-zinc-500">YOUR STRONGEST VERSION IS BUILT HERE.</span>
            </p>
            <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
              A high-performance athletic club ecosystem combining Olympic-tier equipment, science-backed biomechanical coaching, and elite recovery suites across Eastern India.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={generateWhatsAppLink('+919830123456', 'Hi EliteFit Team, I would like to inquire about membership and schedules.')}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20 font-bold text-xs transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 relative">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E2F163]">
                The Elite Blueprint
              </span>
              <h3 className="text-lg font-bold text-white mt-1">
                Receive weekly training protocols & nutrition science
              </h3>
              <p className="text-xs text-zinc-400 mt-1 mb-4">
                Zero spam. Only actionable strength periodization, macro guides, and workshop drops.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 p-3 bg-[#E2F163]/10 border border-[#E2F163]/30 rounded-xl text-[#E2F163] text-sm font-semibold">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>Welcome to the circle! Check your inbox for the Hypertrophy Protocol.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#E2F163] text-white text-sm outline-none placeholder:text-zinc-500 transition-all"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#E2F163] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#d6e752] flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Middle Section: Categorized Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-12 border-b border-white/10 text-xs">
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4 text-xs font-display">
              Training Programs
            </h4>
            <ul className="space-y-2.5">
              <li><Link href="/classes" className="hover:text-[#E2F163] transition-colors">HIIT Inferno</Link></li>
              <li><Link href="/classes" className="hover:text-[#E2F163] transition-colors">Championship Boxing</Link></li>
              <li><Link href="/classes" className="hover:text-[#E2F163] transition-colors">Hyrox Athletic Prep</Link></li>
              <li><Link href="/classes" className="hover:text-[#E2F163] transition-colors">Iron & Hypertrophy</Link></li>
              <li><Link href="/classes" className="hover:text-[#E2F163] transition-colors">Zen Flow Yoga</Link></li>
              <li><Link href="/classes" className="hover:text-[#E2F163] transition-colors">Mobility & Decompression</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4 text-xs font-display">
              Memberships
            </h4>
            <ul className="space-y-2.5">
              <li><Link href="/memberships" className="hover:text-[#E2F163] transition-colors">BASIC (₹1,499/mo)</Link></li>
              <li><Link href="/memberships" className="hover:text-[#E2F163] transition-colors">PRO (₹2,499/mo)</Link></li>
              <li><Link href="/memberships" className="hover:text-[#E2F163] transition-colors">ELITE (₹3,999/mo)</Link></li>
              <li><Link href="/memberships" className="hover:text-[#E2F163] transition-colors">1-on-1 Personal Training</Link></li>
              <li><Link href="/memberships" className="hover:text-[#E2F163] transition-colors">Plan Comparison Matrix</Link></li>
              <li><Link href="/free-trial" className="hover:text-[#E2F163] text-[#E2F163] font-semibold transition-colors">Book Free Day Pass</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4 text-xs font-display">
              Our Clubs
            </h4>
            <ul className="space-y-2.5">
              {GYM_LOCATIONS.map((loc) => (
                <li key={loc.id}>
                  <Link href="/locations" className="hover:text-[#E2F163] transition-colors">
                    {loc.city} ({loc.name.split(' ')[1] || 'Club'})
                  </Link>
                </li>
              ))}
              <li><Link href="/gallery" className="hover:text-[#E2F163] transition-colors">Club Visual Tour</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4 text-xs font-display">
              Community & Results
            </h4>
            <ul className="space-y-2.5">
              <li><Link href="/transformations" className="hover:text-[#E2F163] transition-colors">Client Transformations</Link></li>
              <li><Link href="/trainers" className="hover:text-[#E2F163] transition-colors">Master Coaches Roster</Link></li>
              <li><Link href="/about" className="hover:text-[#E2F163] transition-colors">The Elite Philosophy</Link></li>
              <li><Link href="/store" className="hover:text-[#E2F163] transition-colors">Apparel & Pro Store</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#E2F163] transition-colors">Member Platform</Link></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h4 className="font-bold text-white uppercase tracking-wider mb-4 text-xs font-display">
              Headquarters
            </h4>
            <p className="text-zinc-400 mb-2 leading-relaxed">
              18/2 Park Street, 5th Floor, Kolkata, WB 700016
            </p>
            <p className="text-zinc-400 flex items-center gap-1.5 mb-1">
              <Phone className="w-3.5 h-3.5 text-[#E2F163]" />
              <span>+91 (033) 4001 8800</span>
            </p>
            <p className="text-zinc-400 flex items-center gap-1.5 mb-4">
              <Mail className="w-3.5 h-3.5 text-[#E2F163]" />
              <span>concierge@elitefit.club</span>
            </p>
            <div className="text-[11px] text-zinc-500 font-mono">
              Mon-Sat: 05:00 - 23:00 <br />
              Sunday: 06:00 - 22:00
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Socials */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} ELITEFIT ATHLETIC CLUBS. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">Terms of Membership</span>
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">Medical Disclaimer</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
