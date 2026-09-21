'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { Flame, Lock, Mail, User, Phone, ArrowRight, Sparkles } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { updateUser, switchRole } = useAppStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsRegistering(true);
    setTimeout(() => {
      setIsRegistering(false);
      switchRole('member');
      updateUser({
        name,
        email,
        phone: phone || '+91 98300 12345',
        membershipPlan: 'Pro',
        membershipStatus: 'Active',
      });
      router.push('/dashboard');
    }, 700);
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
            CREATE ATHLETE ACCOUNT
          </h2>
          <p className="text-xs text-zinc-400">
            Join Eastern India&apos;s premier performance community.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-3.5 text-xs">
          <div>
            <label className="text-zinc-400 block mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="Alex Morgan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#E2F163]"
              />
            </div>
          </div>

          <div>
            <label className="text-zinc-400 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="alex@elitefit.club"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#E2F163]"
              />
            </div>
          </div>

          <div>
            <label className="text-zinc-400 block mb-1">WhatsApp Phone Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                placeholder="+91 98300 12345"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#E2F163]"
              />
            </div>
          </div>

          <div>
            <label className="text-zinc-400 block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="Create secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#E2F163]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isRegistering}
            className="w-full py-3.5 rounded-xl bg-[#E2F163] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#d6e752] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#E2F163]/25 mt-2"
          >
            {isRegistering ? (
              <span>Creating Account...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4 fill-black" />
                <span>ACTIVATE MY ACCESS</span>
              </>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-zinc-400 pt-2 border-t border-white/10">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-[#E2F163] font-bold hover:underline">
            Sign In &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
