'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  Shield,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Edit2,
  Trash2,
  Sparkles,
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
} from 'lucide-react';

interface MockMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: 'Basic' | 'Pro' | 'Elite' | 'VIP';
  status: 'Active' | 'Expiring Soon' | 'Expired' | 'Suspended';
  branch: string;
  expiry: string;
  checkins: number;
}

const INITIAL_MEMBERS: MockMember[] = [
  { id: 'EF-1001', name: 'Alex Morgan', email: 'alex.morgan@elitefit.club', phone: '+91 98301 23456', plan: 'Elite', status: 'Active', branch: 'Kolkata Flagship', expiry: '2026-10-24', checkins: 148 },
  { id: 'EF-1002', name: 'Rohan Sen', email: 'rohan.sen@techcorp.in', phone: '+91 98305 67890', plan: 'Pro', status: 'Active', branch: 'Kolkata Flagship', expiry: '2026-08-15', checkins: 112 },
  { id: 'EF-1003', name: 'Pooja Bannerjee', email: 'pooja.b@legal.in', phone: '+91 98311 44556', plan: 'Elite', status: 'Active', branch: 'Siliguri City Centre', expiry: '2026-12-01', checkins: 94 },
  { id: 'EF-1004', name: 'Vikramaditya Roy', email: 'vikram.roy@realty.com', phone: '+91 98322 99887', plan: 'VIP', status: 'Active', branch: 'Durgapur Junction', expiry: '2027-01-10', checkins: 165 },
  { id: 'EF-1005', name: 'Ananya Mukherjee', email: 'ananya.m@creative.io', phone: '+91 98333 11224', plan: 'Pro', status: 'Expiring Soon', branch: 'Kolkata Flagship', expiry: '2026-09-28', checkins: 78 },
  { id: 'EF-1006', name: 'Karan Mehra', email: 'karan.m@gmail.com', phone: '+91 98344 77889', plan: 'Basic', status: 'Expired', branch: 'Asansol Grand Club', expiry: '2026-09-01', checkins: 42 },
  { id: 'EF-1007', name: 'Dr. Debashis Guha', email: 'dr.guha@medicare.in', phone: '+91 98355 22334', plan: 'Elite', status: 'Active', branch: 'Kolkata Flagship', expiry: '2026-11-19', checkins: 130 },
];

export default function AdminMembersPage() {
  const [members, setMembers] = useState<MockMember[]>(INITIAL_MEMBERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedPlan, setSelectedPlan] = useState<string>('All');
  const [activeMemberModal, setActiveMemberModal] = useState<MockMember | null>(null);

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.phone.includes(searchQuery) ||
      m.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || m.status === selectedStatus;
    const matchesPlan = selectedPlan === 'All' || m.plan === selectedPlan;

    return matchesSearch && matchesStatus && matchesPlan;
  });

  const handleToggleSuspend = (id: string) => {
    setMembers(members.map((m) => {
      if (m.id === id) {
        return { ...m, status: m.status === 'Suspended' ? 'Active' : 'Suspended' };
      }
      return m;
    }));
    if (activeMemberModal?.id === id) {
      setActiveMemberModal(null);
    }
  };

  const handleUpdatePlan = (id: string, newPlan: MockMember['plan']) => {
    setMembers(members.map((m) => (m.id === id ? { ...m, plan: newPlan } : m)));
    if (activeMemberModal?.id === id) {
      setActiveMemberModal({ ...activeMemberModal, plan: newPlan });
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono text-[#E2F163] font-bold uppercase tracking-widest">
            MEMBER DIRECTORY & ERP
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display uppercase">
            MEMBER MANAGEMENT ({members.length})
          </h2>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-[#111119] border border-white/10">
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search name, phone, email, or member ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-[#E2F163]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Expiring Soon">Expiring Soon</option>
            <option value="Expired">Expired</option>
            <option value="Suspended">Suspended</option>
          </select>

          <select
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
            className="px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs outline-none"
          >
            <option value="All">All Tiers</option>
            <option value="Basic">Basic</option>
            <option value="Pro">Pro</option>
            <option value="Elite">Elite</option>
            <option value="VIP">VIP</option>
          </select>
        </div>
      </div>

      {/* Members Directory Table */}
      <div className="rounded-3xl bg-[#111119] border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-zinc-400">
                <th className="p-4 font-semibold">Member</th>
                <th className="p-4 font-semibold">Tier</th>
                <th className="p-4 font-semibold">Home Branch</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Expiry Date</th>
                <th className="p-4 font-semibold">Check-ins</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredMembers.map((m) => (
                <tr key={m.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-white text-sm">{m.name}</div>
                    <div className="text-[11px] text-zinc-400">{m.email} • {m.phone}</div>
                    <span className="text-[10px] text-zinc-500 font-mono">{m.id}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                      m.plan === 'Elite' ? 'bg-[#E2F163]/20 text-[#E2F163] border border-[#E2F163]/30' :
                      m.plan === 'Pro' ? 'bg-cyan-500/20 text-cyan-300' :
                      m.plan === 'VIP' ? 'bg-amber-400/20 text-amber-300' :
                      'bg-zinc-800 text-zinc-300'
                    }`}>
                      {m.plan}
                    </span>
                  </td>
                  <td className="p-4 text-zinc-300">{m.branch}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                      m.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' :
                      m.status === 'Expiring Soon' ? 'bg-amber-500/10 text-amber-400' :
                      m.status === 'Suspended' ? 'bg-red-500/10 text-red-400' :
                      'bg-zinc-800 text-zinc-500'
                    }`}>
                      {m.status}
                    </span>
                  </td>
                  <td className="p-4 text-zinc-300 font-mono">{m.expiry}</td>
                  <td className="p-4 font-bold text-white">{m.checkins}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setActiveMemberModal(m)}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#E2F163] text-zinc-300 hover:text-black font-bold text-xs transition-all"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Member Details Drawer / Modal */}
      {activeMemberModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setActiveMemberModal(null)} />

          <div className="relative w-full max-w-lg bg-[#0F0F18] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#E2F163] font-bold">MEMBER DOSSIER</span>
                <h3 className="text-xl font-black text-white font-display mt-0.5">{activeMemberModal.name}</h3>
              </div>
              <button onClick={() => setActiveMemberModal(null)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Member ID:</span>
                <span className="font-mono text-white">{activeMemberModal.id}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Contact Email:</span>
                <span className="text-white">{activeMemberModal.email}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Phone:</span>
                <span className="text-white">{activeMemberModal.phone}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Assigned Club:</span>
                <span className="text-white">{activeMemberModal.branch}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Expiry Date:</span>
                <span className="text-white font-mono">{activeMemberModal.expiry}</span>
              </div>
            </div>

            {/* Change Plan Tier */}
            <div className="space-y-2 text-xs">
              <label className="font-bold text-white uppercase tracking-wider block text-[11px]">
                Modify Membership Tier
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['Basic', 'Pro', 'Elite', 'VIP'] as const).map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => handleUpdatePlan(activeMemberModal.id, tier)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                      activeMemberModal.plan === tier
                        ? 'bg-[#E2F163] text-black border-[#E2F163]'
                        : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            {/* Suspend / Reactivate Account */}
            <div className="pt-2 border-t border-white/10 flex gap-2">
              <button
                type="button"
                onClick={() => handleToggleSuspend(activeMemberModal.id)}
                className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                  activeMemberModal.status === 'Suspended'
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                    : 'bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white'
                }`}
              >
                {activeMemberModal.status === 'Suspended' ? 'Reactivate Turnstile Access' : 'Suspend Account'}
              </button>

              <button
                onClick={() => setActiveMemberModal(null)}
                className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
