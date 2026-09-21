'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { Shield, User as UserIcon, Sparkles, Check } from 'lucide-react';
import Link from 'next/link';

export function RoleSwitcherBanner() {
  const { currentUser, switchRole } = useAppStore();

  return (
    <div className="bg-[#0D0D15] border-b border-white/10 px-4 py-1.5 text-xs text-zinc-400 flex flex-wrap items-center justify-between gap-2 z-50">
      <div className="flex items-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-[#E2F163] animate-ping" />
        <span className="font-semibold text-white tracking-wide uppercase text-[11px]">
          Demo Environment:
        </span>
        <span className="hidden sm:inline text-zinc-400">
          Switch role to test Member Platform vs Admin Dashboard
        </span>
      </div>

      <div className="flex items-center gap-1.5 flex-wrap">
        <button
          onClick={() => switchRole('member')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all font-medium ${
            currentUser.role === 'member'
              ? 'bg-[#E2F163] text-black font-bold shadow-sm'
              : 'bg-white/5 text-zinc-300 hover:bg-white/10'
          }`}
        >
          <UserIcon className="w-3.5 h-3.5" />
          <span>Alex (Elite Member)</span>
          {currentUser.role === 'member' && <Check className="w-3 h-3" />}
        </button>

        <button
          onClick={() => switchRole('admin')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all font-medium ${
            currentUser.role === 'admin'
              ? 'bg-[#FF334B] text-white font-bold shadow-sm'
              : 'bg-white/5 text-zinc-300 hover:bg-white/10'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Gym Manager (Admin SaaS)</span>
          {currentUser.role === 'admin' && <Check className="w-3 h-3" />}
        </button>

        <button
          onClick={() => switchRole('guest')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all font-medium ${
            currentUser.role === 'guest'
              ? 'bg-zinc-700 text-white font-bold'
              : 'bg-white/5 text-zinc-400 hover:bg-white/10'
          }`}
        >
          <span>Guest</span>
        </button>

        {currentUser.role === 'admin' ? (
          <Link
            href="/admin"
            className="ml-2 underline text-[#E2F163] hover:text-white font-semibold flex items-center gap-1"
          >
            Go to Admin &rarr;
          </Link>
        ) : (
          <Link
            href="/dashboard"
            className="ml-2 underline text-[#E2F163] hover:text-white font-semibold flex items-center gap-1"
          >
            Member Hub &rarr;
          </Link>
        )}
      </div>
    </div>
  );
}
