'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import {
  Shield,
  LayoutDashboard,
  Users,
  Dumbbell,
  Calendar,
  CreditCard,
  Kanban,
  ShoppingBag,
  TrendingUp,
  MapPin,
  Flame,
  ArrowRight,
  Sparkles,
  Radio,
  UserCheck,
} from 'lucide-react';
import { GYM_LOCATIONS } from '@/lib/mock-data';

const ADMIN_NAV = [
  { name: 'SaaS Overview', href: '/admin', icon: LayoutDashboard },
  { name: 'Member Directory', href: '/admin/members', icon: Users },
  { name: 'Class Timetables', href: '/admin/classes', icon: Calendar },
  { name: 'Trainer Faculty', href: '/admin/trainers', icon: Dumbbell },
  { name: 'Membership Plans', href: '/admin/memberships', icon: CreditCard },
  { name: 'Lead CRM Pipeline', href: '/admin/leads', icon: Kanban },
  { name: 'Store Orders', href: '/admin/orders', icon: ShoppingBag },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { leads, switchRole } = useAppStore();
  const [selectedClub, setSelectedClub] = useState(GYM_LOCATIONS[0].name);

  const newLeadsCount = leads.filter((l) => l.stage === 'NEW').length;

  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col md:flex-row">
      {/* Admin Desktop Sidebar */}
      <aside className="hidden md:flex w-64 lg:w-72 bg-[#090910] border-r border-white/10 flex-col justify-between p-6 flex-shrink-0 min-h-screen sticky top-0">
        <div className="space-y-6">
          {/* Admin Header Badge */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#FF334B]/10 border border-[#FF334B]/25">
            <div className="w-10 h-10 rounded-xl bg-[#FF334B] text-white flex items-center justify-center font-bold shadow-lg shadow-[#FF334B]/30">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                ADMIN OPERATIONS
              </h4>
              <span className="text-[10px] text-zinc-400 font-mono">
                Gym SaaS ERP v2.4
              </span>
            </div>
          </div>

          {/* Active Club Branch Selector */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-1">
              Active Management Branch
            </span>
            <select
              value={selectedClub}
              onChange={(e) => setSelectedClub(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-[#E2F163]"
            >
              {GYM_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.name} className="bg-[#090910]">
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          {/* Live Turnstile Occupancy Gauge */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400 flex items-center gap-1.5 font-medium">
                <Radio className="w-3.5 h-3.5 text-[#25D366] animate-pulse" />
                <span>Live Floor Occupancy</span>
              </span>
              <span className="text-[#E2F163] font-bold">142 / 200</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div className="w-[71%] h-full bg-gradient-to-r from-emerald-400 to-[#E2F163]" />
            </div>
            <div className="text-[10px] text-zinc-500 flex justify-between">
              <span>71% capacity</span>
              <span className="text-emerald-400 font-semibold">Normal flow</span>
            </div>
          </div>

          {/* Admin Navigation */}
          <nav className="space-y-1">
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-3 pb-1">
              Operations Menu
            </div>
            {ADMIN_NAV.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              const isCRM = item.name === 'Lead CRM Pipeline';

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#FF334B] text-white shadow-lg shadow-[#FF334B]/20 font-bold'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5]' : ''}`} />
                    <span>{item.name}</span>
                  </div>

                  {isCRM && newLeadsCount > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-[#E2F163] text-black font-black text-[9px]">
                      {newLeadsCount} New
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Switch to Member */}
        <div className="pt-6 border-t border-white/10 space-y-2">
          <Link
            href="/dashboard"
            className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-semibold transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[#E2F163]" />
              <span>Switch to Member View</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>

      {/* Main Admin Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-[#070709]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#FF334B] font-bold">
                OPERATIONS MANAGER CONSOLE
              </div>
              <h1 className="text-base sm:text-lg font-black text-white font-display">
                {selectedClub.toUpperCase()}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 text-xs font-semibold"
            >
              Public Site &rarr;
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
