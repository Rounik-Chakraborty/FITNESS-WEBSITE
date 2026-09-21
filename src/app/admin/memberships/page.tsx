'use client';

import React, { useState } from 'react';
import { MEMBERSHIP_PLANS } from '@/lib/mock-data';
import { MembershipPlan } from '@/lib/types';
import { CreditCard, Edit2, CheckCircle2, Sparkles, X, Plus, Save } from 'lucide-react';
import { formatINR } from '@/lib/utils';

export default function AdminMembershipsPage() {
  const [plans, setPlans] = useState<MembershipPlan[]>(MEMBERSHIP_PLANS);
  const [editingPlan, setEditingPlan] = useState<MembershipPlan | null>(null);
  const [editPrice, setEditPrice] = useState(0);

  const handleStartEdit = (plan: MembershipPlan) => {
    setEditingPlan(plan);
    setEditPrice(plan.priceMonthly);
  };

  const handleSavePrice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan) return;

    setPlans(
      plans.map((p) =>
        p.id === editingPlan.id
          ? { ...p, priceMonthly: editPrice, priceAnnualMonthly: Math.round(editPrice * 0.8) }
          : p
      )
    );
    setEditingPlan(null);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <span className="text-[10px] font-mono text-[#E2F163] font-bold uppercase tracking-widest">
          TIER CONFIGURATION & PRICING
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white font-display uppercase">
          MEMBERSHIP PLAN MANAGEMENT
        </h2>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="rounded-3xl bg-[#111119] border border-white/10 p-6 sm:p-7 flex flex-col justify-between space-y-4 hover:border-[#E2F163]/40 transition-all shadow-xl"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-white/10 text-white text-[10px] font-bold uppercase tracking-wider">
                  {plan.name}
                </span>
                <span className="text-[10px] text-emerald-400 font-bold uppercase">
                  ACTIVE
                </span>
              </div>

              <div>
                <div className="text-3xl font-black text-white font-display">
                  {formatINR(plan.priceMonthly)}
                </div>
                <span className="text-xs text-zinc-400">/ month (Monthly Cycle)</span>
                <div className="text-xs text-[#E2F163] font-semibold mt-0.5">
                  {formatINR(plan.priceAnnualMonthly)}/mo on Annual VIP
                </div>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed">{plan.tagline}</p>

              <div className="space-y-1.5 pt-3 border-t border-white/10 text-xs">
                {plan.features.slice(0, 4).map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E2F163] flex-shrink-0 mt-0.5" />
                    <span className="text-[11px] truncate">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleStartEdit(plan)}
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-[#E2F163] text-zinc-300 hover:text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Modify Pricing</span>
            </button>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setEditingPlan(null)} />
          <div className="relative w-full max-w-sm bg-[#0F0F18] border border-white/15 rounded-3xl p-6 shadow-2xl z-10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white font-display">
                Edit {editingPlan.name} Price
              </h3>
              <button onClick={() => setEditingPlan(null)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePrice} className="space-y-4 text-xs">
              <div>
                <label className="text-zinc-400 block mb-1">Monthly Fee (₹ INR)</label>
                <input
                  type="number"
                  step="100"
                  required
                  value={editPrice}
                  onChange={(e) => setEditPrice(parseInt(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#E2F163]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#E2F163] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#d6e752] transition-all"
              >
                Save New Price
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
