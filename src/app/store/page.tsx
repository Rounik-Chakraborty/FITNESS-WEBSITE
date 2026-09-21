'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import {
  ShoppingBag,
  Star,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { PRODUCTS } from '@/lib/mock-data';
import { formatINR } from '@/lib/utils';
import { Product } from '@/lib/types';

const CATEGORIES = ['All', 'Apparel', 'Gear', 'Supplements', 'Accessories'];

export default function StorePage() {
  const { openProductModal, addToCart } = useAppStore();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'low-high' | 'high-low'>('featured');
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1, product.sizes?.[0], product.colors?.[0]);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'low-high') return a.price - b.price;
    if (sortBy === 'high-low') return b.price - a.price;
    return 0;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#070709] text-white">
      {/* Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#141424] via-[#0A0A10] to-[#070709] border-b border-white/10 text-center relative">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-[#E2F163]/10 text-[#E2F163] text-xs font-black uppercase tracking-widest border border-[#E2F163]/25">
            PRO PERFORMANCE SHOP
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase font-display">
            ATHLETIC APPAREL & <span className="text-[#E2F163]">GEAR</span>
          </h1>
          <p className="text-sm sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Engineered heavyweight gym wear, unbreakable lifting equipment, and lab-tested protein supplements. Free express shipping on orders over ₹2,500.
          </p>
        </div>
      </section>

      {/* Filter and Search Toolbar */}
      <section className="sticky top-16 z-30 bg-[#0C0C14]/95 backdrop-blur-md border-b border-white/10 py-4 px-4 sm:px-6 lg:px-8 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#E2F163] text-black shadow-md shadow-[#E2F163]/20'
                    : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="Search gear..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-[#E2F163]"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 rounded-xl bg-[#14141E] border border-white/10 text-white text-xs outline-none"
            >
              <option value="featured">Featured</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* Product Catalog Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center space-y-3">
            <ShoppingBag className="w-12 h-12 text-zinc-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">No products match your search</h3>
            <p className="text-xs text-zinc-400">Try adjusting your filters or search keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => openProductModal(product)}
                className="rounded-3xl bg-[#111119] border border-white/10 overflow-hidden cursor-pointer group hover:border-[#E2F163]/40 transition-all flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-black">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#E2F163] text-black text-[10px] font-black uppercase tracking-wider shadow">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">
                      {product.category}
                    </span>
                    <h3 className="text-base font-bold text-white font-display mt-0.5 group-hover:text-[#E2F163] transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center text-amber-400 text-xs font-bold gap-1">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{product.rating}</span>
                      </div>
                      <span className="text-zinc-500 text-xs">({product.reviewCount})</span>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-lg font-black text-white font-display">
                        {formatINR(product.price)}
                      </div>
                      {product.originalPrice && (
                        <div className="text-[11px] text-zinc-500 line-through">
                          {formatINR(product.originalPrice)}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={(e) => handleQuickAdd(product, e)}
                      className="px-4 py-2 rounded-xl bg-white/5 hover:bg-[#E2F163] text-zinc-200 hover:text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 border border-white/10 hover:border-transparent"
                    >
                      {addedId === product.id ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Quick Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
