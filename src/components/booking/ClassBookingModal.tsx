'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { X, Calendar, Clock, MapPin, Flame, User, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export function ClassBookingModal() {
  const { selectedClassModal, closeClassModal, bookClass, bookings } = useAppStore();
  const [statusMessage, setStatusMessage] = useState<{ success: boolean; text: string } | null>(null);

  if (!selectedClassModal) return null;

  const gymClass = selectedClassModal;
  const isAlreadyBooked = bookings.some(
    (b) => b.classId === gymClass.id && b.status === 'Upcoming'
  );
  const isFull = gymClass.bookedSeats >= gymClass.totalSeats;

  const handleConfirmBooking = () => {
    const result = bookClass(gymClass);
    setStatusMessage({ success: result.success, text: result.message });
  };

  const handleClose = () => {
    setStatusMessage(null);
    closeClassModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-lg bg-[#0F0F18] border border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {statusMessage?.success ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#E2F163]/20 border-2 border-[#E2F163] text-[#E2F163] flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-white font-display">SPOT CONFIRMED!</h3>
              <p className="text-sm text-zinc-400 mt-1">
                You are registered for <strong className="text-white">{gymClass.title}</strong> with Coach {gymClass.trainerName}.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left text-xs space-y-2">
              <div className="flex justify-between text-zinc-400">
                <span>Schedule:</span>
                <span className="text-white font-bold">{gymClass.day} at {gymClass.time} ({gymClass.durationMinutes} mins)</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Studio Zone:</span>
                <span className="text-white font-bold">{gymClass.location}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Burn Estimate:</span>
                <span className="text-[#E2F163] font-bold">{gymClass.calorieBurn}</span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <Link
                href="/dashboard/bookings"
                onClick={handleClose}
                className="w-full py-3 rounded-xl bg-[#E2F163] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#d6e752] flex items-center justify-center gap-2 transition-all"
              >
                <span>View My Bookings</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={handleClose}
                className="w-full py-2.5 rounded-xl bg-white/5 text-zinc-400 hover:text-white text-xs font-semibold"
              >
                Back to Schedule
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Class Hero Banner */}
            <div className="relative h-44 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-5 overflow-hidden">
              <img
                src={gymClass.image}
                alt={gymClass.title}
                className="w-full h-full object-cover brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F18] via-[#0F0F18]/40 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded-md bg-[#E2F163] text-black text-[10px] font-black uppercase tracking-wider">
                    {gymClass.category}
                  </span>
                  <h3 className="text-2xl font-black text-white font-display mt-1">
                    {gymClass.title}
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-zinc-300 text-xs font-semibold border border-white/10">
                  {gymClass.durationMinutes} Mins
                </span>
              </div>
            </div>

            {/* Coach & Class Details */}
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <img
                    src={gymClass.trainerAvatar}
                    alt={gymClass.trainerName}
                    className="w-10 h-10 rounded-full object-cover border border-white/20"
                  />
                  <div>
                    <div className="font-bold text-white text-xs sm:text-sm">{gymClass.trainerName}</div>
                    <div className="text-[11px] text-zinc-400">{gymClass.trainerRole}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-wider text-zinc-400">Available Seats</div>
                  <div className="font-black text-sm text-[#E2F163]">
                    {gymClass.totalSeats - gymClass.bookedSeats} / {gymClass.totalSeats}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#E2F163] flex-shrink-0" />
                  <div>
                    <span className="text-zinc-500 block text-[10px]">Date</span>
                    <span className="text-white font-semibold">{gymClass.day}</span>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#E2F163] flex-shrink-0" />
                  <div>
                    <span className="text-zinc-500 block text-[10px]">Time</span>
                    <span className="text-white font-semibold">{gymClass.time}</span>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#E2F163] flex-shrink-0" />
                  <div>
                    <span className="text-zinc-500 block text-[10px]">Studio Zone</span>
                    <span className="text-white font-semibold truncate">{gymClass.location}</span>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#FF334B] flex-shrink-0" />
                  <div>
                    <span className="text-zinc-500 block text-[10px]">Estimated Burn</span>
                    <span className="text-white font-semibold">{gymClass.calorieBurn}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed pt-1">
                {gymClass.description}
              </p>

              {statusMessage && !statusMessage.success && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{statusMessage.text}</span>
                </div>
              )}

              {/* Action Button */}
              {isAlreadyBooked ? (
                <div className="p-3 bg-[#E2F163]/10 border border-[#E2F163]/30 rounded-xl text-[#E2F163] text-center font-bold text-xs">
                  ✓ You have already reserved a spot in this session.
                </div>
              ) : isFull ? (
                <button
                  disabled
                  className="w-full py-3.5 rounded-xl bg-zinc-800 text-zinc-500 font-bold text-xs uppercase tracking-wider cursor-not-allowed"
                >
                  Class Full (Waitlist Only)
                </button>
              ) : (
                <button
                  onClick={handleConfirmBooking}
                  className="w-full py-3.5 rounded-xl bg-[#E2F163] text-black font-extrabold text-sm uppercase tracking-wider hover:bg-[#d6e752] hover:shadow-lg hover:shadow-[#E2F163]/30 transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                  <span>Confirm Class Reservation</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
