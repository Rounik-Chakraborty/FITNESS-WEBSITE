'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import {
  CalendarCheck,
  Clock,
  MapPin,
  Flame,
  QrCode,
  X,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

export default function MyBookingsPage() {
  const { bookings, cancelBooking, setQRPassModalOpen } = useAppStore();
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Completed' | 'Cancelled'>('Upcoming');
  const [cancelModalId, setCancelModalId] = useState<string | null>(null);

  const filteredBookings = bookings.filter((b) => b.status === activeTab);

  const handleConfirmCancel = () => {
    if (cancelModalId) {
      cancelBooking(cancelModalId);
      setCancelModalId(null);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono text-[#E2F163] font-bold uppercase tracking-widest">
            STUDIO RESERVATIONS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display uppercase">
            MY CLASS BOOKINGS
          </h2>
        </div>

        <Link
          href="/classes"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E2F163] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#d6e752] transition-all shadow-lg shadow-[#E2F163]/20"
        >
          <Calendar className="w-4 h-4 fill-black" />
          <span>+ BOOK NEW CLASS</span>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        {(['Upcoming', 'Completed', 'Cancelled'] as const).map((tab) => {
          const count = bookings.filter((b) => b.status === tab).length;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === tab
                  ? 'bg-[#E2F163] text-black shadow-md shadow-[#E2F163]/20'
                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{tab}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  activeTab === tab ? 'bg-black/20 text-black' : 'bg-white/10 text-zinc-300'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="py-20 text-center rounded-3xl bg-[#111119] border border-white/10 space-y-3">
            <CalendarCheck className="w-12 h-12 text-zinc-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">No {activeTab.toLowerCase()} sessions found</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Reserve your spot in high-capacity HIIT, boxing, CrossFit, or yoga classes.
            </p>
            {activeTab === 'Upcoming' && (
              <Link
                href="/classes"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E2F163] text-black font-extrabold text-xs uppercase tracking-wider mt-2"
              >
                <span>Browse Schedule</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        ) : (
          filteredBookings.map((b) => (
            <div
              key={b.id}
              className="p-6 rounded-3xl bg-[#11111A] border border-white/10 hover:border-white/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-[#E2F163] text-black text-[10px] font-black uppercase tracking-wider">
                    {b.category}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">Pass Code: {b.qrCheckinCode}</span>
                </div>

                <h3 className="text-xl font-bold text-white font-display">{b.className}</h3>
                <p className="text-xs text-zinc-400">
                  Lead Coach: <strong className="text-zinc-200">{b.trainerName}</strong>
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-300 pt-1">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#E2F163]" />
                    <span>{b.date} at {b.time}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#E2F163]" />
                    <span>{b.location}</span>
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {b.status === 'Upcoming' && (
                  <>
                    <button
                      onClick={() => setQRPassModalOpen(true)}
                      className="px-4 py-2.5 rounded-xl bg-[#E2F163] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#d6e752] transition-all flex items-center gap-1.5 shadow-md shadow-[#E2F163]/20"
                    >
                      <QrCode className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Check-In Pass</span>
                    </button>
                    <button
                      onClick={() => setCancelModalId(b.id)}
                      className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 border border-white/10 hover:border-red-500/30 text-xs font-semibold transition-all"
                    >
                      Cancel
                    </button>
                  </>
                )}

                {b.status === 'Completed' && (
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Attended</span>
                  </span>
                )}

                {b.status === 'Cancelled' && (
                  <span className="px-3 py-1.5 rounded-xl bg-zinc-800 text-zinc-500 text-xs font-bold">
                    Cancelled (Spot Released)
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      {cancelModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setCancelModalId(null)} />
          <div className="relative w-full max-w-sm bg-[#0F0F18] border border-white/15 rounded-3xl p-6 shadow-2xl z-10 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white font-display">Cancel this session?</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Your spot will be released to athletes on the waiting list.
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setCancelModalId(null)}
                className="flex-1 py-2.5 rounded-xl bg-white/5 text-zinc-300 text-xs font-semibold hover:bg-white/10"
              >
                Keep Booking
              </button>
              <button
                onClick={handleConfirmCancel}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-xs font-bold hover:bg-red-600"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
