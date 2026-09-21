'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { X, Star, Award, CheckCircle2, MessageSquare, Calendar, Clock, Sparkles } from 'lucide-react';
import { generateWhatsAppLink } from '@/lib/utils';

export function TrainerBookingModal() {
  const { selectedTrainerModal, closeTrainerModal, addNotification, currentUser } = useAppStore();
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (!selectedTrainerModal) return null;

  const trainer = selectedTrainerModal;
  const currentDaySlots = trainer.availableSlots.find((s) => s.day === selectedDay) || trainer.availableSlots[0];

  const handleBookSession = () => {
    if (!selectedDay) setSelectedDay(currentDaySlots.day);
    if (!selectedTime) setSelectedTime(currentDaySlots.times[0]);

    setIsConfirmed(true);
    addNotification({
      title: 'PT Session Requested',
      message: `1-on-1 consultation request sent to ${trainer.name} for ${selectedDay || currentDaySlots.day} at ${selectedTime || currentDaySlots.times[0]}.`,
      type: 'booking',
      actionUrl: '/dashboard/bookings',
    });
  };

  const handleClose = () => {
    setIsConfirmed(false);
    setSelectedDay('');
    setSelectedTime('');
    closeTrainerModal();
  };

  const activeDay = selectedDay || trainer.availableSlots[0]?.day;
  const activeTimes = trainer.availableSlots.find((s) => s.day === activeDay)?.times || [];

  const whatsappMsg = `Hi EliteFit! I would like to book a 1-on-1 Personal Training consultation with Coach ${trainer.name} on ${activeDay} at ${selectedTime || activeTimes[0]}.`;
  const whatsappUrl = generateWhatsAppLink('+919830123456', whatsappMsg);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-lg bg-[#0F0F18] border border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {!isConfirmed ? (
          <div className="space-y-5">
            {/* Trainer Header */}
            <div className="flex items-center gap-4">
              <img
                src={trainer.avatar}
                alt={trainer.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#E2F163]"
              />
              <div>
                <span className="text-[10px] font-bold text-[#E2F163] uppercase tracking-wider">
                  Master Coach Profile
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white font-display">
                  {trainer.name}
                </h3>
                <p className="text-xs text-zinc-400">{trainer.role}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center text-amber-400 text-xs font-bold gap-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{trainer.rating}</span>
                  </div>
                  <span className="text-zinc-500 text-xs">({trainer.reviewCount} athlete reviews)</span>
                </div>
              </div>
            </div>

            {/* Specialties & Certifications */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Specialties</div>
              <div className="flex flex-wrap gap-1.5">
                {trainer.specialties.map((spec) => (
                  <span
                    key={spec}
                    className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-200 text-xs font-medium"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-1.5 text-xs text-zinc-400">
              <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#E2F163]" />
                <span>Verified Credentials</span>
              </div>
              <ul className="grid grid-cols-2 gap-1 text-[11px]">
                {trainer.certifications.map((cert) => (
                  <li key={cert} className="text-zinc-300 truncate">• {cert}</li>
                ))}
              </ul>
            </div>

            {/* Slot Picker */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#E2F163]" />
                <span>Select Available Consultation Day</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {trainer.availableSlots.map((slot) => (
                  <button
                    key={slot.day}
                    type="button"
                    onClick={() => {
                      setSelectedDay(slot.day);
                      setSelectedTime(slot.times[0]);
                    }}
                    className={`p-2 rounded-xl text-xs font-semibold transition-all border ${
                      activeDay === slot.day
                        ? 'bg-[#E2F163] text-black border-[#E2F163] font-bold'
                        : 'bg-white/5 border-white/5 text-zinc-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {slot.day}
                  </button>
                ))}
              </div>

              <div className="text-xs font-bold text-white flex items-center gap-1.5 pt-1">
                <Clock className="w-3.5 h-3.5 text-[#E2F163]" />
                <span>Select Time Slot</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {activeTimes.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTime(t)}
                    className={`p-2 rounded-xl text-xs transition-all border ${
                      (selectedTime || activeTimes[0]) === t
                        ? 'bg-[#E2F163]/20 border-[#E2F163] text-[#E2F163] font-bold'
                        : 'bg-white/5 border-white/5 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleBookSession}
                className="w-full py-3.5 rounded-xl bg-[#E2F163] text-black font-extrabold text-sm uppercase tracking-wider hover:bg-[#d6e752] hover:shadow-lg hover:shadow-[#E2F163]/30 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 fill-black" />
                <span>REQUEST 1-ON-1 PT CONSULTATION</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#25D366] text-xs font-bold flex items-center justify-center gap-2 transition-all border border-white/10"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat with Coach on WhatsApp</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#E2F163]/20 border-2 border-[#E2F163] text-[#E2F163] flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-white font-display">
                REQUEST SENT TO COACH {trainer.name.toUpperCase()}!
              </h3>
              <p className="text-sm text-zinc-400 mt-1">
                Your 1-on-1 consultation is requested for <strong className="text-white">{activeDay}</strong> at <strong className="text-white">{selectedTime || activeTimes[0]}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left text-xs space-y-2">
              <div className="flex justify-between text-zinc-400">
                <span>Athlete:</span>
                <span className="text-white font-bold">{currentUser.name}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Location:</span>
                <span className="text-white font-bold">{currentUser.homeBranch}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Assessment:</span>
                <span className="text-[#E2F163] font-bold">Biomechanical & Nutrition Screen Included</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl bg-[#25D366] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Open WhatsApp To Confirm Directly</span>
              </a>

              <button
                onClick={handleClose}
                className="w-full py-2.5 rounded-xl bg-white/5 text-zinc-400 hover:text-white text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
