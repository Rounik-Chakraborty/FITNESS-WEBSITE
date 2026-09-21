'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { X, Star, ShoppingBag, CheckCircle2, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { formatINR } from '@/lib/utils';

export function ProductModal() {
  const { selectedProductModal, closeProductModal, addToCart } = useAppStore();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!selectedProductModal) return null;

  const product = selectedProductModal;
  const activeSize = selectedSize || product.sizes?.[0];
  const activeColor = selectedColor || product.colors?.[0];

  const handleAddToCart = () => {
    addToCart(product, quantity, activeSize, activeColor);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      closeProductModal();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={closeProductModal}
      />

      <div className="relative w-full max-w-2xl bg-[#0F0F18] border border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={closeProductModal}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* Product Image */}
          <div className="relative rounded-2xl overflow-hidden bg-black aspect-square border border-white/10">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#E2F163] text-black text-[10px] font-black uppercase tracking-wider shadow">
                {product.badge}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                {product.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display mt-0.5 leading-tight">
                {product.name}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center text-amber-400 text-xs font-bold gap-1">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-zinc-500 text-xs">({product.reviewCount} reviews)</span>
                <span className="text-emerald-400 text-xs font-semibold ml-auto">
                  {product.inStock ? `In Stock (${product.stockCount} left)` : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-black text-white font-display">
                {formatINR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-zinc-500 line-through">
                  {formatINR(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-zinc-300">Select Size:</span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                        activeSize === s
                          ? 'bg-[#E2F163] text-black border-[#E2F163]'
                          : 'bg-white/5 border-white/10 text-zinc-300 hover:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-zinc-300">Select Color:</span>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all border ${
                        activeColor === c
                          ? 'bg-[#E2F163]/20 border-[#E2F163] text-[#E2F163] font-bold'
                          : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Controls & Add to Cart */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center rounded-xl bg-white/5 border border-white/10 p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 font-bold"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm font-bold text-white">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 rounded-xl bg-[#E2F163] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#d6e752] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#E2F163]/20"
              >
                {added ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 fill-black" />
                    <span>Add to Bag • {formatINR(product.price * quantity)}</span>
                  </>
                )}
              </button>
            </div>

            {/* Micro Guarantees */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-[10px] text-zinc-400 text-center">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#E2F163]" />
                <span>Express 48h Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E2F163]" />
                <span>100% Authentic Gear</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCw className="w-3.5 h-3.5 text-[#E2F163]" />
                <span>Easy Exchange at Gym</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
