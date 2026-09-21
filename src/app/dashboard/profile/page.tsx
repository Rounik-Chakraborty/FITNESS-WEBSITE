'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Heart,
  Save,
  CheckCircle2,
  Shield,
  Sparkles,
  Camera,
} from 'lucide-react';
import { GYM_LOCATIONS } from '@/lib/mock-data';

export default function MemberProfilePage() {
  const { currentUser, updateUser, addNotification } = useAppStore();

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  const [homeBranch, setHomeBranch] = useState(currentUser.homeBranch);
  const [emergencyContact, setEmergencyContact] = useState('+91 98305 99887 (Priya Morgan - Spouse)');
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name,
      email,
      phone,
      homeBranch,
    });
    setIsSaved(true);
    addNotification({
      title: 'Profile Updated',
      message: 'Your athlete preferences and club assignments have been updated.',
      type: 'membership',
    });
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <span className="text-[10px] font-mono text-[#E2F163] font-bold uppercase tracking-widest">
          ATHLETE IDENTITY & PREFERENCES
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white font-display uppercase">
          PROFILE & SETTINGS
        </h2>
      </div>

      <form onSubmit={handleSaveProfile} className="space-y-6 text-xs sm:text-sm">
        {/* Avatar Banner */}
        <div className="p-6 rounded-3xl bg-[#111119] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-[#E2F163]"
              />
              <button
                type="button"
                className="absolute -bottom-1 -right-1 p-1.5 rounded-lg bg-[#E2F163] text-black shadow hover:scale-110 transition-transform"
                title="Update Avatar"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-display">{name}</h3>
              <p className="text-xs text-zinc-400">{currentUser.membershipPlan} Plan Member</p>
              <span className="inline-block text-[10px] font-mono text-[#E2F163] mt-1">
                Pass Code: {currentUser.qrPassCode}
              </span>
            </div>
          </div>

          <div className="text-right sm:text-right text-xs text-zinc-400">
            <div>Member Since: <strong className="text-white">{currentUser.joinedDate}</strong></div>
            <div>Total Check-ins: <strong className="text-[#E2F163]">{currentUser.stats.totalCheckins}</strong></div>
          </div>
        </div>

        {/* Personal Details */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#111119] border border-white/10 space-y-4">
          <h4 className="text-base font-bold text-white font-display uppercase flex items-center gap-2">
            <User className="w-4 h-4 text-[#E2F163]" />
            <span>Contact & Bio Information</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-zinc-400 block mb-1">Full Legal Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#E2F163]"
              />
            </div>

            <div>
              <label className="text-zinc-400 block mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#E2F163]"
              />
            </div>

            <div>
              <label className="text-zinc-400 block mb-1">WhatsApp Phone Number</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#E2F163]"
              />
            </div>

            <div>
              <label className="text-zinc-400 block mb-1">Primary Home Club</label>
              <select
                value={homeBranch}
                onChange={(e) => setHomeBranch(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#14141E] border border-white/10 text-white outline-none focus:border-[#E2F163]"
              >
                {GYM_LOCATIONS.map((loc) => (
                  <option key={loc.id} value={loc.name} className="bg-[#14141E] text-white">
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="text-zinc-400 block mb-1">Emergency Contact (Name & Number)</label>
              <input
                type="text"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#E2F163]"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between pt-2">
          {isSaved ? (
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold animate-scale-in">
              <CheckCircle2 className="w-4 h-4" />
              <span>Profile changes saved successfully!</span>
            </div>
          ) : (
            <div />
          )}

          <button
            type="submit"
            className="px-8 py-3.5 rounded-xl bg-[#E2F163] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#d6e752] transition-all flex items-center gap-2 shadow-lg shadow-[#E2F163]/25 ml-auto"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
}
