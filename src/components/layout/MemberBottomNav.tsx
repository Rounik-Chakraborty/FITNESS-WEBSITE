'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, CalendarCheck, TrendingUp, CreditCard, QrCode } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export function MemberBottomNav() {
  const pathname = usePathname();
  const { setQRPassModalOpen } = useAppStore();

  const NAV_ITEMS = [
    { name: 'Hub', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Bookings', href: '/dashboard/bookings', icon: CalendarCheck },
    { name: 'Progress', href: '/dashboard/progress', icon: TrendingUp },
    { name: 'Plan', href: '/dashboard/membership', icon: CreditCard },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A10]/95 backdrop-blur-xl border-t border-white/10 px-2 py-2 safe-area-bottom">
      <div className="grid grid-cols-5 items-center justify-items-center">
        {NAV_ITEMS.slice(0, 2).map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                isActive ? 'text-[#E2F163]' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[10px] font-semibold mt-1">{item.name}</span>
            </Link>
          );
        })}

        {/* Center Digital Pass Button */}
        <button
          onClick={() => setQRPassModalOpen(true)}
          className="flex flex-col items-center justify-center -mt-5"
        >
          <div className="w-12 h-12 rounded-full bg-[#E2F163] text-black flex items-center justify-center shadow-lg shadow-[#E2F163]/30 hover:scale-105 active:scale-95 transition-transform">
            <QrCode className="w-6 h-6 stroke-[2.5]" />
          </div>
          <span className="text-[10px] font-bold text-[#E2F163] mt-1">Pass</span>
        </button>

        {NAV_ITEMS.slice(2).map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                isActive ? 'text-[#E2F163]' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[10px] font-semibold mt-1">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
