'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { Search, X, Dumbbell, User as UserIcon, MapPin, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { GYM_CLASSES, TRAINERS, GYM_LOCATIONS, PRODUCTS } from '@/lib/mock-data';

export function GlobalSearchModal() {
  const { isSearchOpen, setSearchOpen, openClassModal, openTrainerModal, openProductModal } = useAppStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedClasses = GYM_CLASSES.filter(
    (c) => c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q) || c.trainerName.toLowerCase().includes(q)
  );

  const matchedTrainers = TRAINERS.filter(
    (t) => t.name.toLowerCase().includes(q) || t.role.toLowerCase().includes(q) || t.specialties.some(s => s.toLowerCase().includes(q))
  );

  const matchedLocations = GYM_LOCATIONS.filter(
    (l) => l.city.toLowerCase().includes(q) || l.name.toLowerCase().includes(q) || l.address.toLowerCase().includes(q)
  );

  const matchedProducts = PRODUCTS.filter(
    (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
  );

  const totalResults = matchedClasses.length + matchedTrainers.length + matchedLocations.length + matchedProducts.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={() => setSearchOpen(false)}
      />

      <div className="relative w-full max-w-2xl bg-[#0D0D14] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
          <Search className="w-5 h-5 text-[#E2F163] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search classes, trainers, clubs, gear, or workouts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-white placeholder:text-zinc-500 text-sm sm:text-base outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setSearchOpen(false)}
            className="px-2 py-1 rounded bg-white/5 text-zinc-400 hover:text-white text-xs font-mono"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="p-4 overflow-y-auto space-y-5 text-sm">
          {!query ? (
            <div className="py-6 text-center space-y-3">
              <Sparkles className="w-8 h-8 text-[#E2F163] mx-auto opacity-70" />
              <div className="text-zinc-300 font-semibold">Quick Shortcuts</div>
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-md mx-auto text-xs">
                {['HIIT Inferno', 'Alex Morgan', 'Park Street Flagship', 'PRO Membership', 'Lifting Straps', 'Member Dashboard'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 hover:border-[#E2F163]/40 transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-12 text-center text-zinc-400 space-y-2">
              <p>No results found for &ldquo;<span className="text-white font-semibold">{query}</span>&rdquo;</p>
              <p className="text-xs text-zinc-500">Try searching &ldquo;Boxing&rdquo;, &ldquo;Elena&rdquo;, &ldquo;Kolkata&rdquo;, or &ldquo;T-shirt&rdquo;</p>
            </div>
          ) : (
            <>
              {/* Classes */}
              {matchedClasses.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Dumbbell className="w-3.5 h-3.5 text-[#E2F163]" />
                    <span>Studio Classes ({matchedClasses.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedClasses.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => {
                          setSearchOpen(false);
                          openClassModal(c);
                        }}
                        className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-[#E2F163]/30 cursor-pointer flex items-center justify-between transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-8 rounded-full bg-[#E2F163]" />
                          <div>
                            <div className="font-bold text-white text-sm">{c.title}</div>
                            <div className="text-xs text-zinc-400">
                              {c.day} • {c.time} • Coach {c.trainerName} ({c.totalSeats - c.bookedSeats} seats left)
                            </div>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-[#E2F163] px-2.5 py-1 rounded-md bg-[#E2F163]/10">
                          Book Spot
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Trainers */}
              {matchedTrainers.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <UserIcon className="w-3.5 h-3.5 text-[#E2F163]" />
                    <span>Master Coaches ({matchedTrainers.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {matchedTrainers.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => {
                          setSearchOpen(false);
                          openTrainerModal(t);
                        }}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-[#E2F163]/30 cursor-pointer flex items-center gap-3 transition-all"
                      >
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="w-10 h-10 rounded-full object-cover border border-white/20"
                        />
                        <div className="overflow-hidden">
                          <div className="font-bold text-white text-xs truncate">{t.name}</div>
                          <div className="text-[11px] text-zinc-400 truncate">{t.role}</div>
                          <div className="text-[10px] text-[#E2F163] font-semibold">★ {t.rating} ({t.experienceYears} yrs exp)</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Products */}
              {matchedProducts.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <ShoppingBag className="w-3.5 h-3.5 text-[#E2F163]" />
                    <span>Store Merchandise ({matchedProducts.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {matchedProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          setSearchOpen(false);
                          openProductModal(p);
                        }}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-[#E2F163]/30 cursor-pointer flex items-center gap-3 transition-all"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div className="overflow-hidden">
                          <div className="font-bold text-white text-xs truncate">{p.name}</div>
                          <div className="text-[11px] text-[#E2F163] font-bold">₹{p.price}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Locations */}
              {matchedLocations.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#E2F163]" />
                    <span>Gym Locations ({matchedLocations.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedLocations.map((loc) => (
                      <div
                        key={loc.id}
                        onClick={() => {
                          setSearchOpen(false);
                          router.push('/locations');
                        }}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/20 cursor-pointer flex items-center justify-between transition-all"
                      >
                        <div>
                          <div className="font-bold text-white text-xs">{loc.name}</div>
                          <div className="text-[11px] text-zinc-400">{loc.address}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-zinc-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
