'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import {
  Menu,
  X,
  Search,
  ShoppingBag,
  Flame,
  QrCode,
  User as UserIcon,
  Shield,
  Phone,
  Sparkles,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Memberships', href: '/memberships' },
  { name: 'Classes', href: '/classes' },
  { name: 'Trainers', href: '/trainers' },
  { name: 'Transformations', href: '/transformations' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Locations', href: '/locations' },
  { name: 'Store', href: '/store' },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const {
    currentUser,
    cart,
    setCartOpen,
    setSearchOpen,
    openTrialModal,
    setQRPassModalOpen,
  } = useAppStore();

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#070709]/90 backdrop-blur-md border-b border-white/10 shadow-2xl py-3'
            : 'bg-gradient-to-b from-[#070709]/95 via-[#070709]/80 to-transparent border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="w-10 h-10 rounded-xl bg-[#E2F163] text-black flex items-center justify-center font-extrabold text-xl shadow-lg shadow-[#E2F163]/20 group-hover:scale-105 transition-transform">
                <Flame className="w-6 h-6 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold tracking-tighter text-xl text-white flex items-center gap-1.5 font-display">
                  ELITE<span className="text-[#E2F163]">FIT</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-semibold -mt-1 hidden sm:block">
                  TRAIN HARD • LIVE ELITE
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-[#E2F163] bg-white/5 font-semibold shadow-inner'
                        : 'text-zinc-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons & CTAs */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Global Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all flex items-center gap-1.5 text-xs"
                title="Search (Cmd+K)"
              >
                <Search className="w-4 h-4" />
                <span className="hidden xl:inline bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-zinc-400 font-mono">
                  ⌘K
                </span>
              </button>

              {/* Merch Cart Button */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
                title="Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E2F163] text-black text-[10px] font-bold flex items-center justify-center animate-scale-in">
                    {totalCartItems}
                  </span>
                )}
              </button>

              {/* Digital Pass / Member Quick Link */}
              {currentUser.role === 'admin' ? (
                <Link
                  href="/admin"
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FF334B]/10 border border-[#FF334B]/30 text-[#FF334B] hover:bg-[#FF334B]/20 text-xs font-bold transition-all"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin SaaS</span>
                </Link>
              ) : (
                <button
                  onClick={() => setQRPassModalOpen(true)}
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#E2F163]/40 text-zinc-200 hover:text-[#E2F163] text-xs font-semibold transition-all"
                  title="Show Gym Digital QR Access Pass"
                >
                  <QrCode className="w-3.5 h-3.5 text-[#E2F163]" />
                  <span>Pass</span>
                </button>
              )}

              {/* Member Dashboard Link */}
              <Link
                href={currentUser.role === 'admin' ? '/admin' : '/dashboard'}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-zinc-200 hover:text-white text-xs font-semibold transition-all"
              >
                <UserIcon className="w-3.5 h-3.5 text-[#E2F163]" />
                <span className="max-w-[80px] truncate">{currentUser.name.split(' ')[0]}</span>
              </Link>

              {/* Primary Free Trial CTA */}
              <button
                onClick={() => openTrialModal()}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#E2F163] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#d6e752] hover:shadow-lg hover:shadow-[#E2F163]/25 active:scale-95 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 fill-black" />
                <span>Free Trial</span>
              </button>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 border border-white/10 transition-all"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-full max-w-sm bg-[#0C0C12] border-r border-white/10 h-full flex flex-col z-10 p-6 overflow-y-auto">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[#E2F163] text-black flex items-center justify-center font-black">
                  <Flame className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <span className="font-extrabold tracking-tight text-lg text-white font-display">
                    ELITE<span className="text-[#E2F163]">FIT</span>
                  </span>
                  <div className="text-[10px] text-zinc-400 font-semibold">CLUB ECOSYSTEM</div>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-white/5 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Mobile CTAs */}
            <div className="py-4 space-y-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openTrialModal();
                }}
                className="w-full py-3 rounded-xl bg-[#E2F163] text-black font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#E2F163]/20"
              >
                <Sparkles className="w-4 h-4 fill-black" />
                <span>Book A Free Trial</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setQRPassModalOpen(true);
                }}
                className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-xs flex items-center justify-center gap-2"
              >
                <QrCode className="w-4 h-4 text-[#E2F163]" />
                <span>Show Digital QR Access Pass</span>
              </button>
            </div>

            {/* Navigation Links */}
            <div className="py-4 space-y-1">
              <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider px-3 pb-2">
                Explore EliteFit
              </div>
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#E2F163]/10 text-[#E2F163] font-bold border border-[#E2F163]/20'
                        : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 opacity-40" />
                  </Link>
                );
              })}
            </div>

            {/* Member / Admin Links */}
            <div className="pt-4 mt-auto border-t border-white/10 space-y-2">
              <Link
                href="/dashboard"
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-semibold"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#E2F163]/20 text-[#E2F163] flex items-center justify-center font-bold">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div>{currentUser.name}</div>
                    <div className="text-[10px] text-[#E2F163]">{currentUser.membershipPlan} Plan • {currentUser.membershipStatus}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-400" />
              </Link>

              {currentUser.role === 'admin' && (
                <Link
                  href="/admin"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#FF334B]/10 border border-[#FF334B]/20 text-[#FF334B] text-xs font-bold"
                >
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>Admin SaaS Dashboard</span>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
