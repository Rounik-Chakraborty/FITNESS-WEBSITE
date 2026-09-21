'use client';

import React, { useState } from 'react';
import { Sparkles, Maximize2, Filter } from 'lucide-react';
import { LightboxModal } from '@/components/gallery/LightboxModal';

const GALLERY_IMAGES = [
  {
    id: 'g-1',
    url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=85',
    title: 'Dual-Level Olympic Strength Arena',
    category: 'Training',
    caption: 'Competition Eleiko barbells and deadlift platforms at our Kolkata Flagship.',
  },
  {
    id: 'g-2',
    url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=85',
    title: 'Finnish Dry Sauna & Hydro-Recovery Suite',
    category: 'Recovery & Spa',
    caption: 'Contrast thermal therapy suite equipped with 90°C Finnish dry heat and eucalyptus steam.',
  },
  {
    id: 'g-3',
    url: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=1200&q=85',
    title: 'Championship Boxing & Combat Ring',
    category: 'Classes',
    caption: 'Authentic 12-round boxing studio with heavy bags and speed ropes.',
  },
  {
    id: 'g-4',
    url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85',
    title: 'Calibrated Free Weight Vault',
    category: 'Equipment',
    caption: 'Full rack of dumbbells ranging from 2.5kg to 60kg solid steel hex.',
  },
  {
    id: 'g-5',
    url: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1200&q=85',
    title: 'Hyrox Pro AstroTurf Sprint Lane',
    category: 'Training',
    caption: 'Curved Woodway sprint decks and heavy sled pull tracks.',
  },
  {
    id: 'g-6',
    url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=85',
    title: 'Infrared Mind & Body Yoga Studio',
    category: 'Classes',
    caption: 'Heated at 28°C for deep fascial release, mobility, and breathwork.',
  },
  {
    id: 'g-7',
    url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1200&q=85',
    title: 'Durgapur Club Panoramic Cardio Deck',
    category: 'Equipment',
    caption: 'Assault air-bikes, Concept2 rowers, and SkiErgs overlooking the skyline.',
  },
  {
    id: 'g-8',
    url: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=1200&q=85',
    title: 'Gladiator Bootcamp Community Showdown',
    category: 'Community',
    caption: 'Saturday high-octane community workouts with live music and team relays.',
  },
];

const CATEGORIES = ['All', 'Training', 'Equipment', 'Classes', 'Recovery & Spa', 'Community'];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = GALLERY_IMAGES.filter((img) => {
    if (selectedCategory === 'All') return true;
    return img.category === selectedCategory;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#070709] text-white">
      {/* Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#141424] via-[#0A0A10] to-[#070709] border-b border-white/10 text-center relative">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-[#E2F163]/10 text-[#E2F163] text-xs font-black uppercase tracking-widest border border-[#E2F163]/25">
            VISUAL TOUR
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase font-display">
            THE ATHLETIC <span className="text-[#E2F163]">SANCTUARY</span>
          </h1>
          <p className="text-sm sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Take a visual tour through our competition lifting zones, high-capacity studio spaces, and sub-zero recovery suites.
          </p>

          {/* Filter Pills */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#E2F163] text-black shadow-md shadow-[#E2F163]/20'
                    : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Visual Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredImages.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="break-inside-avoid rounded-3xl overflow-hidden bg-[#111119] border border-white/10 hover:border-[#E2F163]/40 cursor-pointer group transition-all duration-300 relative shadow-xl"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                <span className="px-2.5 py-0.5 rounded bg-[#E2F163] text-black text-[9px] font-black uppercase tracking-wider self-start mb-2">
                  {item.category}
                </span>
                <h3 className="text-base font-bold text-white font-display leading-tight">{item.title}</h3>
                <p className="text-xs text-zinc-300 mt-1">{item.caption}</p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-[#E2F163] font-bold">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Click to expand</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        images={filteredImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIndex) => setLightboxIndex(newIndex)}
      />
    </div>
  );
}
