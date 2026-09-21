'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import {
  LayoutDashboard,
  CalendarCheck,
  TrendingUp,
  CreditCard,
  User,
  QrCode,
  Bell,
  LogOut,
  Flame,
  ArrowUpRight,
  Shield,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

const DASHBOARD_NAV = [
  { name: 'Hub Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'My Bookings', href: '/dashboard/bookings', icon: CalendarCheck },
  { name: 'Fitness Progress & PRs', href: '/dashboard/progress', icon: TrendingUp },
  { name: 'My Membership', href: '/dashboard/membership', icon: CreditCard },
  { name: 'Profile & Settings', href: '/dashboard/profile', icon: User },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const {
    currentUser,
    notifications,
    markNotificationAsRead,
    setQRPassModalOpen,
    switchRole,
  } = useAppStore();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 lg:w-72 bg-[#0A0A10] border-r border-white/10 flex-col justify-between p-6 flex-shrink-0 min-h-screen sticky top-0">
        <div className="space-y-6">
          {/* Member Profile Badge */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <div className="relative flex-shrink-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-12 h-12 rounded-xl object-cover border border-[#E2F163]"
              />
              <span className="w-3 h-3 rounded-full bg-[#25D366] border-2 border-[#0A0A10] absolute -bottom-0.5 -right-0.5" />
            </div>
            <div className="overflow-hidden">
              <h4 className="font-bold text-white text-sm truncate">{currentUser.name}</h4>
              <div className="flex items-center gap-1.5 text-xs text-[#E2F163] font-bold">
                <Sparkles className="w-3 h-3" />
                <span>{currentUser.membershipPlan} Plan</span>
              </div>
            </div>
          </div>

          {/* Digital Pass Trigger */}
          <button
            onClick={() => setQRPassModalOpen(true)}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#E2F163]/20 via-[#E2F163]/10 to-transparent border border-[#E2F163]/40 hover:border-[#E2F163] text-[#E2F163] text-xs font-bold transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-2">
              <QrCode className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Digital Gym Pass</span>
            </div>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#E2F163] text-black font-black">
              SCAN
            </span>
          </button>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-3 pb-2">
              Member Navigation
            </div>
            {DASHBOARD_NAV.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#E2F163] text-black shadow-lg shadow-[#E2F163]/20 font-bold'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5]' : ''}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Controls */}
        <div className="pt-6 border-t border-white/10 space-y-2">
          {currentUser.role === 'admin' && (
            <Link
              href="/admin"
              className="w-full py-2.5 px-3 rounded-xl bg-[#FF334B]/10 border border-[#FF334B]/30 text-[#FF334B] hover:bg-[#FF334B]/20 text-xs font-bold transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5" />
                <span>Admin Operations</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          )}

          <button
            onClick={() => switchRole('guest')}
            className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-red-400 text-xs font-semibold transition-all flex items-center gap-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Session</span>
          </button>
        </div>
      </aside>

      {/* Main Dashboard Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-[#070709]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wider font-mono text-[#E2F163] font-bold">
              ATHLETE PLATFORM
            </div>
            <h1 className="text-lg sm:text-xl font-black text-white font-display">
              WELCOME BACK, {currentUser.name.toUpperCase()}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification Bell Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-all"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FF334B] text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Dropdown Menu */}
              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-[#12121D] border border-white/15 rounded-2xl shadow-2xl p-4 z-50 text-xs space-y-3 animate-scale-in">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                      Notifications ({notifications.length})
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">Live Sync</span>
                  </div>

                  <div className="max-h-64 overflow-y-auto space-y-2">
                    {notifications.length === 0 ? (
                      <p className="text-zinc-500 py-4 text-center">No notifications right now.</p>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => markNotificationAsRead(notif.id)}
                          className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                            notif.read
                              ? 'bg-white/5 border-white/5 text-zinc-400'
                              : 'bg-[#E2F163]/10 border-[#E2F163]/30 text-white font-medium'
                          }`}
                        >
                          <div className="font-bold text-xs">{notif.title}</div>
                          <div className="text-[11px] text-zinc-300 mt-0.5">{notif.message}</div>
                          <div className="text-[9px] text-zinc-500 mt-1">{notif.timestamp}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile QR Pass Button */}
            <button
              onClick={() => setQRPassModalOpen(true)}
              className="md:hidden p-2 rounded-xl bg-[#E2F163] text-black font-bold text-xs flex items-center gap-1"
            >
              <QrCode className="w-4 h-4" />
              <span>Pass</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
