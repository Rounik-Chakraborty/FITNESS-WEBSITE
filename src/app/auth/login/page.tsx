'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { Flame, Lock, Mail, ArrowRight, Shield, User, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { switchRole } = useAppStore();

  const [email, setEmail] = useState('alex.morgan@elitefit.club');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      switchRole('member');
      router.push('/dashboard');
    }, 600);
  };

  const handleFastDemoMember = () => {
    switchRole('member');
    router.push('/dashboard');
  };

  const handleFastDemoAdmin = () => {
    switchRole('admin');
    router.push('/admin');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0F0F18] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#E2F163] text-black flex items-center justify-center font-black">
              <Flame className="w-5 h-5 fill-current" />
            </div>
            <span className="font-extrabold tracking-tight text-xl text-white font-display">
              ELITE<span className="text-[#E2F163]">FIT</span>
            </span>
          </Link>
          <h2 className="text-2xl font-black text-white font-display uppercase mt-2">
            ATHLETE LOGIN
          </h2>
          <p className="text-xs text-zinc-400">
            Access your bookings, workout analytics, and digital access pass.
          </p>
        </div>

        {/* 1-Click Instant Demo Login Helpers */}
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block text-center">
            ⚡ 1-Click Fast Evaluator Logins:
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={handleFastDemoMember}
              className="p-2.5 rounded-xl bg-[#E2F163] text-black font-bold flex items-center justify-center gap-1.5 hover:bg-[#d6e752] transition-all"
            >
              <User className="w-3.5 h-3.5" />
              <span>Alex (Member)</span>
            </button>
            <button
              type="button"
              onClick={handleFastDemoAdmin}
              className="p-2.5 rounded-xl bg-[#FF334B] text-white font-bold flex items-center justify-center gap-1.5 hover:bg-[#ff203a] transition-all"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin (SaaS)</span>
            </button>
          </div>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="text-zinc-400 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#E2F163]"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-zinc-400">Password</label>
              <span className="text-[#E2F163] text-[11px] cursor-pointer hover:underline">
                Forgot password?
              </span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#E2F163]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full py-3.5 rounded-xl bg-[#E2F163] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#d6e752] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#E2F163]/25"
          >
            {isLoggingIn ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>SIGN IN TO HUB</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-zinc-400 pt-2 border-t border-white/10">
          Not a member yet?{' '}
          <Link href="/free-trial" className="text-[#E2F163] font-bold hover:underline">
            Claim 1-Day Trial Pass
          </Link>
        </div>
      </div>
    </div>
  );
}
