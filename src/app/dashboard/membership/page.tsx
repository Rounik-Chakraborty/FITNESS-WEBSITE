'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import {
  CreditCard,
  Sparkles,
  CheckCircle2,
  Calendar,
  FileText,
  ArrowRight,
  ShieldCheck,
  Download,
  AlertCircle,
} from 'lucide-react';
import { formatINR } from '@/lib/utils';

export default function MyMembershipPage() {
  const { currentUser, addNotification } = useAppStore();
  const [downloadedInvoiceId, setDownloadedInvoiceId] = useState<string | null>(null);
  const [isRenewed, setIsRenewed] = useState(false);

  const handleDownloadInvoice = (invId: string) => {
    setDownloadedInvoiceId(invId);
    setTimeout(() => setDownloadedInvoiceId(null), 2000);
  };

  const handleRenew = () => {
    setIsRenewed(true);
    addNotification({
      title: 'Membership Renewed!',
      message: 'Your Elite tier access has been extended for another 12 months.',
      type: 'membership',
    });
  };

  const BILLING_HISTORY = [
    { id: 'INV-2026-0901', date: '01 Sep 2026', plan: 'Elite Membership (Annual)', amount: 38388, status: 'Paid', method: 'UPI (GPay)' },
    { id: 'INV-2025-0901', date: '01 Sep 2025', plan: 'Pro Membership (Annual)', amount: 23988, status: 'Paid', method: 'HDFC Credit Card' },
    { id: 'INV-2025-0115', date: '15 Jan 2025', plan: 'Initial Joining & Assessment', amount: 2499, status: 'Paid', method: 'UPI (PhonePe)' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono text-[#E2F163] font-bold uppercase tracking-widest">
            SUBSCRIPTION & PRIVILEGES
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display uppercase">
            MY MEMBERSHIP TIER
          </h2>
        </div>

        <Link
          href="/memberships"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E2F163] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#d6e752] transition-all shadow-lg shadow-[#E2F163]/20"
        >
          <span>UPGRADE / SWITCH TIER</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 1. Active Tier Details Card */}
      <div className="rounded-3xl bg-gradient-to-r from-[#181828] via-[#151522] to-[#0E0E18] border border-[#E2F163]/30 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 relative z-10">
          <div>
            <span className="px-3 py-1 rounded-full bg-[#E2F163]/20 text-[#E2F163] text-xs font-black uppercase tracking-widest border border-[#E2F163]/40">
              CURRENT TIER: {currentUser.membershipPlan.toUpperCase()}
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-white font-display uppercase mt-2">
              ELITE ATHLETE PRIVILEGE
            </h3>
            <p className="text-xs text-zinc-300 mt-1 max-w-lg">
              Unlimited multi-club access, recovery suite, permanent locker, and bi-weekly 1-on-1 PT consultations.
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-zinc-400 block">Annual Rate</span>
            <span className="text-3xl font-black text-white font-display">₹3,199</span>
            <span className="text-xs text-zinc-400">/ mo</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs relative z-10">
          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5">
            <span className="text-zinc-500 block text-[10px] uppercase font-bold">Start Date</span>
            <span className="text-white font-bold">{currentUser.joinedDate}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5">
            <span className="text-zinc-500 block text-[10px] uppercase font-bold">Next Renewal</span>
            <span className="text-white font-bold">{currentUser.membershipExpires}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5">
            <span className="text-zinc-500 block text-[10px] uppercase font-bold">Billing Cycle</span>
            <span className="text-white font-bold">Annual (20% Off)</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5">
            <span className="text-zinc-500 block text-[10px] uppercase font-bold">Account Status</span>
            <span className="text-[#25D366] font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
              <span>{currentUser.membershipStatus}</span>
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 relative z-10">
          <div className="text-xs text-zinc-400">
            Auto-renew is <strong className="text-white">ON</strong> for 24 October 2026.
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleRenew}
              className="px-5 py-2.5 rounded-xl bg-[#E2F163] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#d6e752] transition-all"
            >
              {isRenewed ? '✓ Extended for 12 Mo' : 'Renew Membership Early'}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Included Privileges Checklist */}
      <div className="rounded-3xl bg-[#11111A] border border-white/10 p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-white font-display uppercase tracking-wide flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#E2F163]" />
          <span>Active Inclusions & Privileges</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {[
            'All 4 Flagship Clubs (Kolkata, Siliguri, Durgapur, Asansol)',
            'Unlimited Studio Sessions (HIIT, Boxing, Yoga, CrossFit)',
            '48-Hour Priority Class Booking Window',
            'Finnish Dry Sauna, Steam & Cold Plunge Suites',
            'Permanent Executive Locker & Fresh Towels',
            'Bi-weekly 1-on-1 PT Consultations with Master Coaches',
            'InBody 570 Composition Tracking (Bi-weekly)',
            '20% Discount in the EliteFit Pro Store',
            'Unlimited Guest Passes (1 Guest per visit)',
          ].map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-2.5 text-zinc-300">
              <CheckCircle2 className="w-4 h-4 text-[#E2F163] flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Payment & Invoicing History */}
      <div className="rounded-3xl bg-[#11111A] border border-white/10 p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-white font-display uppercase tracking-wide flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-[#E2F163]" />
          <span>Payment History & Tax Invoices</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-zinc-400">
                <th className="pb-3 font-semibold">Invoice #</th>
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold">Description</th>
                <th className="pb-3 font-semibold">Payment Mode</th>
                <th className="pb-3 font-semibold">Amount</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {BILLING_HISTORY.map((inv) => (
                <tr key={inv.id} className="text-zinc-300 hover:bg-white/5 transition-colors">
                  <td className="py-3.5 font-mono text-white font-bold">{inv.id}</td>
                  <td className="py-3.5">{inv.date}</td>
                  <td className="py-3.5 font-medium text-white">{inv.plan}</td>
                  <td className="py-3.5">{inv.method}</td>
                  <td className="py-3.5 font-bold text-[#E2F163]">{formatINR(inv.amount)}</td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold text-[10px]">
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => handleDownloadInvoice(inv.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white font-medium text-xs transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{downloadedInvoiceId === inv.id ? 'Saved' : 'PDF'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
