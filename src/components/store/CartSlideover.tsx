'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { formatINR } from '@/lib/utils';
import { CheckoutModal } from './CheckoutModal';

const FREE_SHIPPING_THRESHOLD = 2500;

export function CartSlideover() {
  const {
    cart,
    isCartOpen,
    setCartOpen,
    removeFromCart,
    updateCartQuantity,
    promoCode,
    discountPercent,
    applyPromoCode,
  } = useAppStore();

  const [inputCode, setInputCode] = useState('');
  const [promoMsg, setPromoMsg] = useState<{ success: boolean; text: string } | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalTotal = subtotal - discountAmount;
  const progressToFreeShip = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShip = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode) return;
    const res = applyPromoCode(inputCode);
    setPromoMsg({ success: res.success, text: res.message });
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-end">
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          onClick={() => setCartOpen(false)}
        />

        <div className="relative w-full max-w-md bg-[#0C0C14] border-l border-white/15 h-full flex flex-col z-10 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#E2F163]" />
              <h3 className="font-extrabold text-white text-lg font-display">
                ATHLETE GEAR BAG ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={() => setCartOpen(false)}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="px-5 py-3 bg-white/5 border-b border-white/10 text-xs">
            <div className="flex justify-between font-semibold mb-1.5">
              <span className="text-zinc-300">
                {remainingForFreeShip === 0 ? (
                  <span className="text-[#E2F163] flex items-center gap-1 font-bold">
                    <Sparkles className="w-3.5 h-3.5 fill-current" /> Free Express Shipping Unlocked!
                  </span>
                ) : (
                  `Add ${formatINR(remainingForFreeShip)} more for Free Express Delivery`
                )}
              </span>
              <span className="text-zinc-400">{Math.round(progressToFreeShip)}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#E2F163] to-emerald-400 transition-all duration-500 rounded-full"
                style={{ width: `${progressToFreeShip}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-zinc-600 mx-auto" />
                <h4 className="text-base font-bold text-white">Your gear bag is empty</h4>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                  Upgrade your gym fits, heavy-duty lifting straps, and premium whey isolate in the Elite Store.
                </p>
                <button
                  onClick={() => setCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#E2F163] text-black font-extrabold text-xs uppercase tracking-wider mt-2"
                >
                  Explore Store
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="p-3 rounded-2xl bg-white/5 border border-white/5 flex gap-3 items-center group"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0 bg-black"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-white text-xs truncate">
                      {item.product.name}
                    </h5>
                    <div className="text-[11px] text-zinc-400 mt-0.5">
                      {item.selectedSize && <span className="mr-2">Size: {item.selectedSize}</span>}
                      {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                    </div>
                    <div className="font-bold text-[#E2F163] text-xs mt-1">
                      {formatINR(item.product.price)}
                    </div>
                  </div>

                  {/* Quantity and Delete */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-zinc-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-center rounded-lg bg-black/40 border border-white/10 p-0.5">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="w-5 h-5 rounded text-zinc-400 hover:text-white flex items-center justify-center font-bold text-xs"
                      >
                        -
                      </button>
                      <span className="w-5 text-center text-xs font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="w-5 h-5 rounded text-zinc-400 hover:text-white flex items-center justify-center font-bold text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-white/10 bg-[#09090F] space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Promo code (Try ELITE10)"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-[#E2F163]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all"
                >
                  Apply
                </button>
              </form>

              {promoMsg && (
                <div className={`text-[11px] font-semibold ${promoMsg.success ? 'text-[#E2F163]' : 'text-red-400'}`}>
                  {promoMsg.text}
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">{formatINR(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#E2F163]">
                    <span>Discount ({promoCode})</span>
                    <span>-{formatINR(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-emerald-400 font-semibold">
                    {remainingForFreeShip === 0 ? 'FREE' : formatINR(149)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-white/10 font-display">
                  <span>Total Amount</span>
                  <span className="text-[#E2F163]">
                    {formatINR(finalTotal + (remainingForFreeShip === 0 ? 0 : 149))}
                  </span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full py-3.5 rounded-xl bg-[#E2F163] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#d6e752] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#E2F163]/25"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal
          cart={cart}
          total={finalTotal + (remainingForFreeShip === 0 ? 0 : 149)}
          onClose={() => setIsCheckoutOpen(false)}
        />
      )}
    </>
  );
}
