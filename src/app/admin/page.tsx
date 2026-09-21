'use client';

import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import {
  Users,
  CreditCard,
  Calendar,
  Kanban,
  TrendingUp,
  Activity,
  Flame,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { ADMIN_ANALYTICS, GYM_CLASSES } from '@/lib/mock-data';
import { formatINR } from '@/lib/utils';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export default function AdminOverviewPage() {
  const { leads, classes } = useAppStore();

  const newLeads = leads.filter((l) => l.stage === 'NEW');

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 1. TOP KPI METRIC CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-5 rounded-3xl bg-[#111119] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-semibold">
            <span>Total Members</span>
            <Users className="w-4 h-4 text-[#E2F163]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-display">
            {ADMIN_ANALYTICS.totalMembers}
          </div>
          <span className="text-[11px] text-emerald-400 font-semibold block">
            +64 this month (5.2%)
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-[#111119] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-semibold">
            <span>Active Athletes</span>
            <UserCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-display">
            {ADMIN_ANALYTICS.activeMembers}
          </div>
          <span className="text-[11px] text-zinc-400 font-semibold block">
            86.1% retention rate
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-[#111119] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-semibold">
            <span>Monthly Revenue</span>
            <CreditCard className="w-4 h-4 text-[#E2F163]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#E2F163] font-display">
            {ADMIN_ANALYTICS.monthlyRevenueFormatted}
          </div>
          <span className="text-[11px] text-emerald-400 font-semibold block">
            +₹32K above target
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-[#111119] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-semibold">
            <span>Class Bookings</span>
            <Calendar className="w-4 h-4 text-[#00F0FF]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-display">
            {ADMIN_ANALYTICS.bookingsThisMonth}
          </div>
          <span className="text-[11px] text-[#00F0FF] font-semibold block">
            91.4% avg studio fill
          </span>
        </div>

        <div className="col-span-2 lg:col-span-1 p-5 rounded-3xl bg-[#111119] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-semibold">
            <span>New Leads (CRM)</span>
            <Kanban className="w-4 h-4 text-[#FF334B]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-display">
            {ADMIN_ANALYTICS.newLeadsCount}
          </div>
          <span className="text-[11px] text-[#FF334B] font-semibold block">
            {newLeads.length} require contact
          </span>
        </div>
      </div>

      {/* 2. CHARTS ROW: REVENUE TRAJECTORY + CLASS POPULARITY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Revenue vs Target Area Chart */}
        <div className="lg:col-span-7 rounded-3xl bg-[#111119] border border-white/10 p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#E2F163] uppercase tracking-wider">
                Financial Velocity
              </span>
              <h3 className="text-xl font-bold text-white font-display">
                Monthly Revenue Performance (₹)
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-white/5 text-zinc-300 text-xs font-mono">
              FY 2026
            </span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ADMIN_ANALYTICS.revenueChart}>
                <defs>
                  <linearGradient id="revenueGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E2F163" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#E2F163" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="#6B7280" fontSize={11} tickLine={false} />
                <YAxis stroke="#6B7280" fontSize={11} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip
                  formatter={(val: any) => formatINR(Number(val))}
                  contentStyle={{
                    backgroundColor: '#0F0F18',
                    borderColor: 'rgba(255,255,255,0.15)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#E2F163"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#revenueGlow)"
                  name="Actual Revenue"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Studio Class Attendance Breakdown */}
        <div className="lg:col-span-5 rounded-3xl bg-[#111119] border border-white/10 p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#FF334B] uppercase tracking-wider">
                Capacity Optimization
              </span>
              <h3 className="text-xl font-bold text-white font-display">
                Top Studio Formats
              </h3>
            </div>
            <Link href="/admin/classes" className="text-xs text-[#E2F163] font-semibold hover:underline">
              Manage &rarr;
            </Link>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ADMIN_ANALYTICS.classPopularity} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" stroke="#6B7280" fontSize={10} tickLine={false} />
                <YAxis dataKey="name" type="category" stroke="#9CA3AF" fontSize={10} tickLine={false} width={90} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F0F18',
                    borderColor: 'rgba(255,255,255,0.15)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="attendees" fill="#FF334B" radius={[0, 8, 8, 0]} name="Attendees This Month" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 3. HOURLY CHECK-IN HEATMAP & LIVE CRM LEADS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Hourly Turnstile Checkins Bar Chart */}
        <div className="lg:col-span-7 rounded-3xl bg-[#111119] border border-white/10 p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#00F0FF] uppercase tracking-wider">
                Peak Floor Times
              </span>
              <h3 className="text-xl font-bold text-white font-display">
                Daily Check-in Distribution
              </h3>
            </div>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ADMIN_ANALYTICS.checkinHourlyHeatmap}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="hour" stroke="#6B7280" fontSize={10} tickLine={false} />
                <YAxis stroke="#6B7280" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F0F18',
                    borderColor: 'rgba(255,255,255,0.15)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="checkins" fill="#00F0FF" radius={[6, 6, 0, 0]} name="Turnstile Check-ins" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Lead Inquiries Widget */}
        <div className="lg:col-span-5 rounded-3xl bg-[#111119] border border-white/10 p-6 sm:p-8 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-white font-display uppercase">
                Incoming Leads Pipeline
              </h3>
              <Link href="/admin/leads" className="text-xs font-bold text-[#E2F163] hover:underline">
                Open CRM &rarr;
              </Link>
            </div>

            <div className="space-y-2.5 text-xs">
              {leads.slice(0, 4).map((lead) => (
                <div
                  key={lead.id}
                  className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-white text-xs">{lead.name}</div>
                    <div className="text-[11px] text-zinc-400">{lead.phone} • {lead.preferredLocation.split(' ')[0]}</div>
                    <div className="text-[10px] text-[#E2F163] truncate max-w-[180px]">{lead.fitnessGoal}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    lead.stage === 'NEW' ? 'bg-[#E2F163] text-black' :
                    lead.stage === 'CONTACTED' ? 'bg-amber-400/20 text-amber-300' :
                    lead.stage === 'TRIAL BOOKED' ? 'bg-cyan-400/20 text-cyan-300' :
                    'bg-emerald-400/20 text-emerald-300'
                  }`}>
                    {lead.stage}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/admin/leads"
            className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase tracking-wider text-center transition-all block mt-4"
          >
            Manage All {leads.length} Leads in CRM Pipeline
          </Link>
        </div>
      </div>
    </div>
  );
}
