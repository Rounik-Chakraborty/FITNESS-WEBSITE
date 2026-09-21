'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import {
  Calendar,
  Clock,
  Flame,
  User,
  MapPin,
  Filter,
  ArrowRight,
  ShieldCheck,
  Search,
  CheckCircle2,
} from 'lucide-react';
import { GYM_CLASSES, GYM_LOCATIONS } from '@/lib/mock-data';

const DAYS = ['All Days', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const CATEGORIES = ['All', 'HIIT', 'Boxing', 'CrossFit', 'Strength', 'Yoga', 'Mobility', 'Functional'];
const INTENSITIES = ['All', 'Medium', 'High', 'Extreme'];

export default function ClassesPage() {
  const { classes, openClassModal, bookings } = useAppStore();

  const [selectedDay, setSelectedDay] = useState('All Days');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedIntensity, setSelectedIntensity] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClasses = classes.filter((c) => {
    const matchesDay = selectedDay === 'All Days' || c.day === selectedDay;
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesIntensity = selectedIntensity === 'All' || c.intensity === selectedIntensity;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.trainerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDay && matchesCat && matchesIntensity && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#070709] text-white">
      {/* Page Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#141424] via-[#0A0A10] to-[#070709] border-b border-white/10 text-center relative">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-[#E2F163]/10 text-[#E2F163] text-xs font-black uppercase tracking-widest border border-[#E2F163]/25">
            STUDIO TIMETABLE
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase font-display">
            HIGH-INTENSITY <span className="text-[#E2F163]">STUDIO SESSIONS</span>
          </h1>
          <p className="text-sm sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Coached by master practitioners in dedicated biomechanical studios. Reserve your slot up to 48 hours in advance.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="sticky top-16 z-30 bg-[#0C0C14]/95 backdrop-blur-md border-b border-white/10 py-4 px-4 sm:px-6 lg:px-8 shadow-xl">
        <div className="max-w-7xl mx-auto space-y-3">
          {/* Day of the Week Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {DAYS.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedDay === day
                    ? 'bg-[#E2F163] text-black shadow-md shadow-[#E2F163]/20'
                    : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Secondary Filters: Category & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                    selectedCategory === cat
                      ? 'bg-white/15 border-white/30 text-white font-bold'
                      : 'bg-transparent border-white/5 text-zinc-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64 flex-shrink-0">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="Search class or trainer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-[#E2F163]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Class Schedule Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        {filteredClasses.length === 0 ? (
          <div className="py-24 text-center space-y-3">
            <Calendar className="w-12 h-12 text-zinc-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">No sessions match your filter</h3>
            <p className="text-xs text-zinc-400">
              Try switching the day or resetting the category filter.
            </p>
            <button
              onClick={() => {
                setSelectedDay('All Days');
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map((c) => {
              const isBooked = bookings.some(
                (b) => b.classId === c.id && b.status === 'Upcoming'
              );
              const isFull = c.bookedSeats >= c.totalSeats;

              return (
                <div
                  key={c.id}
                  className="rounded-3xl bg-[#11111A] border border-white/10 hover:border-[#E2F163]/40 overflow-hidden transition-all flex flex-col justify-between group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#11111A] via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 text-[#E2F163] text-[10px] font-black uppercase tracking-wider border border-[#E2F163]/30">
                      {c.category}
                    </span>
                    <span className="absolute bottom-3 right-3 text-xs font-mono font-bold text-zinc-300 bg-black/60 px-2 py-0.5 rounded">
                      {c.durationMinutes} MINS
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-white font-display group-hover:text-[#E2F163] transition-colors">
                        {c.title}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed line-clamp-2">
                        {c.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/10 space-y-2 text-xs">
                      <div className="flex items-center justify-between text-zinc-300">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#E2F163]" />
                          <span>{c.day} • {c.time}</span>
                        </span>
                        <span className="text-[#FF334B] font-semibold">{c.calorieBurn}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={c.trainerAvatar}
                            alt={c.trainerName}
                            className="w-6 h-6 rounded-full object-cover border border-white/20"
                          />
                          <span className="text-xs text-zinc-400">Coach {c.trainerName}</span>
                        </div>
                        <span className="text-[11px] font-bold text-[#E2F163]">
                          {c.totalSeats - c.bookedSeats} / {c.totalSeats} seats
                        </span>
                      </div>
                    </div>

                    {/* Book Trigger Button */}
                    {isBooked ? (
                      <div className="w-full py-2.5 rounded-xl bg-[#E2F163]/10 border border-[#E2F163]/30 text-[#E2F163] font-bold text-xs flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Booked (In Your Schedule)</span>
                      </div>
                    ) : isFull ? (
                      <button
                        disabled
                        className="w-full py-2.5 rounded-xl bg-zinc-800 text-zinc-500 font-bold text-xs uppercase tracking-wider cursor-not-allowed"
                      >
                        Class Full (Waitlist)
                      </button>
                    ) : (
                      <button
                        onClick={() => openClassModal(c)}
                        className="w-full py-2.5 rounded-xl bg-[#E2F163] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#d6e752] transition-all flex items-center justify-center gap-2"
                      >
                        <span>Book Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
