'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  QrCode,
  Check,
  Building,
  Lock,
} from 'lucide-react';
import { MEMBERSHIP_PLANS, PLAN_COMPARISON_MATRIX } from '@/lib/mock-data';
import { formatINR } from '@/lib/utils';
import { MembershipPlan } from '@/lib/types';

export default function MembershipsPage() {
  const { updateUser, addNotification, currentUser } = useAppStore();

  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<MembershipPlan | null>(null);
  const [paymentMode, setPaymentMode] = useState<'upi' | 'card' | 'desk'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isActivated, setIsActivated] = useState(false);

  const handleStartCheckout = (plan: MembershipPlan) => {
    setSelectedPlanForCheckout(plan);
    setIsActivated(false);
  };

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlanForCheckout) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsActivated(true);

      // Upgrade member profile
      const expiry = new Date();
      expiry.setFullYear(expiry.getFullYear() + 1);

      updateUser({
        membershipPlan: selectedPlanForCheckout.name as any,
        membershipStatus: 'Active',
        membershipExpires: expiry.toISOString().split('T')[0],
      });

      addNotification({
        title: 'Membership Activated!',
        message: `Welcome to the ${selectedPlanForCheckout.name} tier! Your all-club pass is now active.`,
        type: 'membership',
        actionUrl: '/dashboard/membership',
      });
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#070709] text-white">
      {/* Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#141424] via-[#0A0A10] to-[#070709] border-b border-white/10 text-center relative">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-[#E2F163]/10 text-[#E2F163] text-xs font-black uppercase tracking-widest border border-[#E2F163]/25">
            TRANSPARENT PRICING
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase font-display">
            MEMBERSHIP <span className="text-[#E2F163]">TIERS</span>
          </h1>
          <p className="text-sm sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Choose the level of access engineered for your athletic aspirations. Zero sign-up fees. Cancel or upgrade anytime.
          </p>

          {/* Billing Cycle Switch */}
          <div className="pt-6 flex items-center justify-center gap-3">
            <span className={`text-xs font-bold ${billingCycle === 'monthly' ? 'text-white' : 'text-zinc-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="w-14 h-8 rounded-full bg-[#181824] border border-white/15 p-1 relative transition-colors"
            >
              <div
                className={`w-6 h-6 rounded-full bg-[#E2F163] transition-transform duration-300 ${
                  billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-xs font-bold flex items-center gap-1.5 ${billingCycle === 'annual' ? 'text-white' : 'text-zinc-500'}`}>
              Annual VIP
              <span className="px-2 py-0.5 rounded-full bg-[#E2F163]/20 text-[#E2F163] text-[10px] font-black">
                SAVE 20%
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {MEMBERSHIP_PLANS.map((plan) => {
            const price = billingCycle === 'annual' ? plan.priceAnnualMonthly : plan.priceMonthly;
            const isCurrent = currentUser.membershipPlan.toLowerCase() === plan.name.toLowerCase();

            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative transition-all duration-300 ${
                  plan.isPopular
                    ? 'bg-gradient-to-b from-[#181828] to-[#0F0F1A] border-2 border-[#E2F163] shadow-2xl shadow-[#E2F163]/10 scale-105'
                    : 'bg-[#0E0E16] border border-white/10 hover:border-white/20'
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-[#E2F163] text-black text-[9px] font-black uppercase tracking-wider shadow">
                    {plan.badge}
                  </span>
                )}

                <div>
                  <h3 className="text-xl font-black text-white font-display uppercase">{plan.name}</h3>
                  <p className="text-[11px] text-zinc-400 mt-1 min-h-[30px]">{plan.tagline}</p>

                  <div className="my-5">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black text-white font-display">
                        {formatINR(price)}
                      </span>
                      <span className="text-xs text-zinc-400">/ mo</span>
                    </div>
                    {billingCycle === 'annual' && (
                      <span className="text-[10px] text-[#E2F163] font-semibold block mt-0.5">
                        {formatINR(price * 12)} billed annually
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 pt-4 border-t border-white/10 text-xs">
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#E2F163] flex-shrink-0 mt-0.5" />
                        <span className="text-[11px]">{feat}</span>
                      </div>
                    ))}
                    {plan.limitations?.map((limit, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-zinc-500">
                        <XCircle className="w-3.5 h-3.5 text-zinc-600 flex-shrink-0 mt-0.5" />
                        <span className="text-[11px] line-through">{limit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  {isCurrent ? (
                    <button
                      disabled
                      className="w-full py-3 rounded-xl bg-[#E2F163]/20 border border-[#E2F163] text-[#E2F163] font-extrabold text-xs uppercase tracking-wider"
                    >
                      CURRENT PLAN
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStartCheckout(plan)}
                      className={`w-full py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                        plan.isPopular
                          ? 'bg-[#E2F163] text-black hover:bg-[#d6e752] shadow-lg shadow-[#E2F163]/25'
                          : 'bg-white/10 hover:bg-white/15 text-white border border-white/10'
                      }`}
                    >
                      <span>CHOOSE {plan.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Plan Comparison Matrix */}
      <section className="py-20 bg-[#0A0A10] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-black tracking-widest text-[#E2F163] uppercase">
              FEATURE-BY-FEATURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-display uppercase">
              COMPARE MEMBERSHIP BENEFITS
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Detailed breakdown of club privileges, recovery amenities, and coaching inclusions.
            </p>
          </div>

          {/* Desktop Matrix Table */}
          <div className="hidden md:block rounded-3xl bg-[#11111A] border border-white/10 overflow-hidden shadow-2xl">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-4 font-bold text-white uppercase tracking-wider text-xs">Feature</th>
                  <th className="p-4 font-bold text-zinc-300 uppercase tracking-wider text-center">BASIC (₹1,499)</th>
                  <th className="p-4 font-bold text-[#E2F163] uppercase tracking-wider text-center bg-[#E2F163]/5">PRO (₹2,499)</th>
                  <th className="p-4 font-bold text-amber-400 uppercase tracking-wider text-center">ELITE (₹3,999)</th>
                  <th className="p-4 font-bold text-[#FF334B] uppercase tracking-wider text-center">PERSONAL TRAINING</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {PLAN_COMPARISON_MATRIX.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-semibold text-white">
                      <div>{item.name}</div>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-wider">{item.category}</span>
                    </td>
                    <td className="p-4 text-center">
                      {typeof item.basic === 'boolean' ? (
                        item.basic ? <Check className="w-4 h-4 text-[#E2F163] mx-auto" /> : <XCircle className="w-4 h-4 text-zinc-600 mx-auto" />
                      ) : (
                        <span className="text-zinc-300 font-medium">{item.basic}</span>
                      )}
                    </td>
                    <td className="p-4 text-center bg-[#E2F163]/5">
                      {typeof item.pro === 'boolean' ? (
                        item.pro ? <Check className="w-4 h-4 text-[#E2F163] mx-auto" /> : <XCircle className="w-4 h-4 text-zinc-600 mx-auto" />
                      ) : (
                        <span className="text-[#E2F163] font-bold">{item.pro}</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {typeof item.elite === 'boolean' ? (
                        item.elite ? <Check className="w-4 h-4 text-amber-400 mx-auto" /> : <XCircle className="w-4 h-4 text-zinc-600 mx-auto" />
                      ) : (
                        <span className="text-amber-400 font-bold">{item.elite}</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {typeof item.pt === 'boolean' ? (
                        item.pt ? <Check className="w-4 h-4 text-[#FF334B] mx-auto" /> : <XCircle className="w-4 h-4 text-zinc-600 mx-auto" />
                      ) : (
                        <span className="text-[#FF334B] font-bold">{item.pt}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Comparison Cards */}
          <div className="md:hidden space-y-4">
            {PLAN_COMPARISON_MATRIX.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#11111A] border border-white/10 space-y-2 text-xs">
                <div className="font-bold text-white text-sm">{item.name}</div>
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-[11px]">
                  <div>
                    <span className="text-zinc-500 block">BASIC:</span>
                    <span className="text-zinc-300">{typeof item.basic === 'boolean' ? (item.basic ? 'Included' : 'No') : item.basic}</span>
                  </div>
                  <div>
                    <span className="text-[#E2F163] block font-bold">PRO:</span>
                    <span className="text-zinc-200">{typeof item.pro === 'boolean' ? (item.pro ? 'Included' : 'No') : item.pro}</span>
                  </div>
                  <div>
                    <span className="text-amber-400 block font-bold">ELITE:</span>
                    <span className="text-zinc-200">{typeof item.elite === 'boolean' ? (item.elite ? 'Included' : 'No') : item.elite}</span>
                  </div>
                  <div>
                    <span className="text-[#FF334B] block font-bold">PT:</span>
                    <span className="text-zinc-200">{typeof item.pt === 'boolean' ? (item.pt ? 'Included' : 'No') : item.pt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step-by-Step Membership Checkout Modal */}
      {selectedPlanForCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedPlanForCheckout(null)}
          />

          <div className="relative w-full max-w-lg bg-[#0F0F18] border border-white/15 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto">
            {!isActivated ? (
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#E2F163]/10 text-[#E2F163] text-xs font-black uppercase tracking-wider border border-[#E2F163]/20">
                  MEMBERSHIP ENROLLMENT
                </span>
                <h2 className="text-2xl font-black text-white font-display mt-2">
                  JOIN {selectedPlanForCheckout.name} TIER
                </h2>
                <p className="text-xs text-zinc-400 mt-1 mb-6">
                  Athlete: <strong className="text-white">{currentUser.name}</strong> • Immediate access across all clubs
                </p>

                <form onSubmit={handleConfirmPayment} className="space-y-4 text-xs">
                  {/* Summary Card */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex justify-between text-zinc-400">
                      <span>Selected Plan:</span>
                      <span className="text-white font-bold">{selectedPlanForCheckout.name}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Billing Frequency:</span>
                      <span className="text-white font-medium capitalize">{billingCycle}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Registration / Joining Fee:</span>
                      <span className="text-emerald-400 font-bold">₹0 (Waived)</span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                      <span>Total Payable:</span>
                      <span className="text-[#E2F163] font-display">
                        {formatINR(billingCycle === 'annual' ? selectedPlanForCheckout.priceAnnualMonthly * 12 : selectedPlanForCheckout.priceMonthly)}
                      </span>
                    </div>
                  </div>

                  {/* Payment Mode Selector */}
                  <div className="space-y-2">
                    <label className="font-bold text-white uppercase tracking-wider block text-[11px]">
                      Select Payment Mode
                    </label>
                    <div className="space-y-1.5">
                      <label
                        onClick={() => setPaymentMode('upi')}
                        className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer ${
                          paymentMode === 'upi'
                            ? 'bg-[#E2F163]/15 border-[#E2F163] text-white font-bold'
                            : 'bg-white/5 border-white/5 text-zinc-400 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <QrCode className="w-4 h-4 text-[#E2F163]" />
                          <span>Instant UPI (Google Pay, PhonePe, Paytm)</span>
                        </div>
                      </label>

                      <label
                        onClick={() => setPaymentMode('card')}
                        className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer ${
                          paymentMode === 'card'
                            ? 'bg-[#E2F163]/15 border-[#E2F163] text-white font-bold'
                            : 'bg-white/5 border-white/5 text-zinc-400 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-[#E2F163]" />
                          <span>Credit / Debit Card (Visa, Mastercard, RuPay)</span>
                        </div>
                      </label>

                      <label
                        onClick={() => setPaymentMode('desk')}
                        className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer ${
                          paymentMode === 'desk'
                            ? 'bg-[#E2F163]/15 border-[#E2F163] text-white font-bold'
                            : 'bg-white/5 border-white/5 text-zinc-400 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-[#E2F163]" />
                          <span>Pay at Club Front Desk</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-3.5 rounded-xl bg-[#E2F163] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#d6e752] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#E2F163]/25 disabled:opacity-60"
                  >
                    {isProcessing ? (
                      <span className="animate-pulse">Authorizing Membership Pass...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Confirm & Activate Plan</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#E2F163]/20 border-2 border-[#E2F163] text-[#E2F163] flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div>
                  <h3 className="text-2xl font-black text-white font-display">
                    WELCOME TO {selectedPlanForCheckout.name} TIER!
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                    Your membership pass is active and synced to your digital wallet.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left text-xs space-y-2">
                  <div className="flex justify-between text-zinc-400">
                    <span>Member:</span>
                    <span className="text-white font-bold">{currentUser.name}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Pass QR Code:</span>
                    <span className="text-[#E2F163] font-bold font-mono">{currentUser.qrPassCode}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Valid Through:</span>
                    <span className="text-white font-bold">{currentUser.membershipExpires}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setSelectedPlanForCheckout(null)}
                    className="w-full py-3 rounded-xl bg-[#E2F163] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#d6e752]"
                  >
                    Go To Member Platform
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
