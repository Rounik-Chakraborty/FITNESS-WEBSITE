'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { CartItem } from '@/lib/types';
import { X, CheckCircle2, ShieldCheck, CreditCard, QrCode, Building, ArrowRight, Truck } from 'lucide-react';
import { formatINR } from '@/lib/utils';

interface CheckoutModalProps {
  cart: CartItem[];
  total: number;
  onClose: () => void;
}

export function CheckoutModal({ cart, total, onClose }: CheckoutModalProps) {
  const { clearCart, addNotification, currentUser } = useAppStore();

  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone);
  const [address, setAddress] = useState('Flat 4B, Silver Heights, Park Street, Kolkata');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'gym_desk'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const newOrderId = `EF-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(newOrderId);
      setIsProcessing(false);
      setOrderPlaced(true);

      addNotification({
        title: 'Order Confirmed!',
        message: `Your order #${newOrderId} for ${formatINR(total)} has been dispatched for delivery.`,
        type: 'achievement',
      });

      clearCart();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-[#0F0F18] border border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {!orderPlaced ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#E2F163]/10 text-[#E2F163] text-xs font-black uppercase tracking-wider border border-[#E2F163]/20">
                PRO STORE CHECKOUT
              </span>
            </div>
            <h2 className="text-2xl font-black text-white font-display">
              FINAL STEP: DISPATCH GEAR
            </h2>
            <p className="text-xs text-zinc-400 mt-1 mb-5">
              Total Payable: <strong className="text-[#E2F163] text-sm">{formatINR(total)}</strong> ({cart.length} unique items)
            </p>

            <form onSubmit={handlePlaceOrder} className="space-y-4 text-xs">
              <div className="space-y-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="font-bold text-white uppercase tracking-wider block text-[11px]">
                  1. Shipping & Contact
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-zinc-400 block mb-1">Athlete Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white outline-none focus:border-[#E2F163]"
                    />
                  </div>
                  <div>
                    <label className="text-zinc-400 block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white outline-none focus:border-[#E2F163]"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Delivery Address</label>
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white outline-none focus:border-[#E2F163] resize-none"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2 p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="font-bold text-white uppercase tracking-wider block text-[11px]">
                  2. Choose Payment Method
                </span>
                <div className="space-y-1.5">
                  <label
                    onClick={() => setPaymentMethod('upi')}
                    className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'upi'
                        ? 'bg-[#E2F163]/15 border-[#E2F163] text-white font-bold'
                        : 'bg-white/5 border-white/5 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <QrCode className="w-4 h-4 text-[#E2F163]" />
                      <span>Instant UPI (GPay / PhonePe / Paytm)</span>
                    </div>
                    <span className="text-[10px] text-[#E2F163]">Fastest</span>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-[#E2F163]/15 border-[#E2F163] text-white font-bold'
                        : 'bg-white/5 border-white/5 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#E2F163]" />
                      <span>Credit / Debit Card (Visa / Mastercard / Amex)</span>
                    </div>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('gym_desk')}
                    className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'gym_desk'
                        ? 'bg-[#E2F163]/15 border-[#E2F163] text-white font-bold'
                        : 'bg-white/5 border-white/5 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-[#E2F163]" />
                      <span>Pay at Gym Front Desk & Pick Up</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 rounded-xl bg-[#E2F163] text-black font-extrabold text-sm uppercase tracking-wider hover:bg-[#d6e752] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#E2F163]/25 disabled:opacity-60"
              >
                {isProcessing ? (
                  <span className="animate-pulse">Processing Order Securely...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                    <span>Authorize Payment • {formatINR(total)}</span>
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
              <h3 className="text-2xl font-black text-white font-display">ORDER CONFIRMED!</h3>
              <p className="text-sm text-zinc-400 mt-1">
                Receipt #{orderId} generated for <strong className="text-white">{name}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left text-xs space-y-2">
              <div className="flex justify-between text-zinc-400">
                <span>Order Total:</span>
                <span className="text-[#E2F163] font-bold">{formatINR(total)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Payment Mode:</span>
                <span className="text-white font-medium uppercase">{paymentMethod.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Estimated Delivery:</span>
                <span className="text-white font-medium">Within 48 Hours via Bluedart Air</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-[#E2F163] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#d6e752]"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
