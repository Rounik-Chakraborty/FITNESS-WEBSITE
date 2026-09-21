'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { X, QrCode, CheckCircle2, Flame, MapPin, Calendar, Sparkles, ShieldCheck } from 'lucide-react';

export function QRPassModal() {
  const { isQRPassModalOpen, setQRPassModalOpen, currentUser } = useAppStore();
  const [hasScanned, setHasScanned] = useState(false);

  if (!isQRPassModalOpen) return null;

  const handleSimulateScan = () => {
    setHasScanned(true);
    setTimeout(() => setHasScanned(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={() => setQRPassModalOpen(false)}
      />

      <div className="relative w-full max-w-sm bg-gradient-to-b from-[#141420] to-[#0A0A10] border border-[#E2F163]/30 rounded-3xl shadow-2xl overflow-hidden z-10 p-6 text-center">
        {/* Close Button */}
        <button
          onClick={() => setQRPassModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Club Pass Top Header */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-lg bg-[#E2F163] text-black flex items-center justify-center font-black">
            <Flame className="w-4 h-4 fill-current" />
          </div>
          <span className="font-extrabold tracking-tight text-lg text-white font-display">
            ELITE<span className="text-[#E2F163]">FIT</span> DIGITAL PASS
          </span>
        </div>

        {/* Member Profile Avatar & Tier */}
        <div className="flex flex-col items-center mb-4">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-18 h-18 rounded-2xl object-cover border-2 border-[#E2F163] shadow-lg shadow-[#E2F163]/20"
            />
            <span className="absolute -bottom-1.5 -right-1.5 px-2 py-0.5 rounded-md bg-[#E2F163] text-black text-[9px] font-black tracking-wider uppercase shadow">
              {currentUser.membershipPlan}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white mt-2.5">{currentUser.name}</h3>
          <div className="flex items-center gap-1.5 text-xs text-[#25D366] font-semibold mt-0.5">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
            <span>ACTIVE MEMBERSHIP</span>
          </div>
        </div>

        {/* Animated Scanner QR Container */}
        <div className="relative p-4 rounded-2xl bg-black border border-white/10 mx-auto max-w-[220px] shadow-inner mb-4 overflow-hidden group">
          {/* Animated Laser Scan Line */}
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#E2F163] to-transparent shadow-[0_0_15px_#E2F163] animate-scanline pointer-events-none" />

          {/* SVG QR Code Simulation */}
          <div className="bg-white p-3 rounded-xl flex items-center justify-center aspect-square">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Corner position markers */}
              <rect x="5" y="5" width="25" height="25" fill="#000" rx="3" />
              <rect x="9" y="9" width="17" height="17" fill="#fff" rx="2" />
              <rect x="13" y="13" width="9" height="9" fill="#000" />

              <rect x="70" y="5" width="25" height="25" fill="#000" rx="3" />
              <rect x="74" y="9" width="17" height="17" fill="#fff" rx="2" />
              <rect x="78" y="13" width="9" height="9" fill="#000" />

              <rect x="5" y="70" width="25" height="25" fill="#000" rx="3" />
              <rect x="9" y="74" width="17" height="17" fill="#fff" rx="2" />
              <rect x="13" y="78" width="9" height="9" fill="#000" />

              {/* Data matrix pattern dots */}
              <rect x="35" y="10" width="6" height="6" fill="#000" />
              <rect x="45" y="10" width="6" height="6" fill="#000" />
              <rect x="55" y="10" width="6" height="6" fill="#000" />
              <rect x="35" y="20" width="6" height="6" fill="#000" />
              <rect x="50" y="25" width="6" height="6" fill="#000" />

              <rect x="10" y="35" width="6" height="6" fill="#000" />
              <rect x="25" y="35" width="6" height="6" fill="#000" />
              <rect x="40" y="40" width="20" height="20" fill="#E2F163" rx="4" />
              <rect x="47" y="47" width="6" height="6" fill="#000" />

              <rect x="70" y="35" width="6" height="6" fill="#000" />
              <rect x="85" y="45" width="6" height="6" fill="#000" />
              <rect x="35" y="70" width="6" height="6" fill="#000" />
              <rect x="50" y="75" width="6" height="6" fill="#000" />
              <rect x="65" y="70" width="6" height="6" fill="#000" />
              <rect x="80" y="80" width="6" height="6" fill="#000" />
              <rect x="70" y="85" width="6" height="6" fill="#000" />
            </svg>
          </div>

          <div className="mt-2 text-[10px] font-mono text-zinc-400 tracking-wider">
            {currentUser.qrPassCode}
          </div>
        </div>

        {/* Pass Details */}
        <div className="space-y-1.5 text-xs text-left bg-white/5 p-3 rounded-xl border border-white/10 mb-4">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#E2F163]" /> Home Club:</span>
            <span className="text-white font-medium truncate max-w-[170px]">{currentUser.homeBranch}</span>
          </div>
          <div className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#E2F163]" /> Valid Till:</span>
            <span className="text-white font-medium">{currentUser.membershipExpires}</span>
          </div>
          <div className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-[#E2F163]" /> Access Level:</span>
            <span className="text-[#E2F163] font-bold">Turnstile + Locker + Sauna</span>
          </div>
        </div>

        {/* Interactive Turnstile Test */}
        {hasScanned ? (
          <div className="p-3 bg-[#25D366]/10 border border-[#25D366]/30 rounded-xl text-[#25D366] text-xs font-bold flex items-center justify-center gap-1.5 animate-scale-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>ACCESS GRANTED • TURNSTILE UNLOCKED</span>
          </div>
        ) : (
          <button
            onClick={handleSimulateScan}
            className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-semibold transition-all"
          >
            Test Tap at Turnstile Scanner
          </button>
        )}
      </div>
    </div>
  );
}
