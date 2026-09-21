'use client';

import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { generateWhatsAppLink } from '@/lib/utils';

export function WhatsAppFloatingCTA() {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappUrl = generateWhatsAppLink(
    '+919830123456',
    "Hi EliteFit, I'd like to ask a question about membership plans and book a free trial session."
  );

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end">
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-72 bg-[#0F0F18] border border-white/15 rounded-2xl p-4 shadow-2xl animate-scale-in text-xs space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
              <span className="font-bold text-white">EliteFit Concierge Online</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-zinc-300">
            Have questions about memberships, personal training, or class timings? Chat with our team now.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 px-3 rounded-xl bg-[#25D366] text-black font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-[#20ba59] transition-all"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Start WhatsApp Chat</span>
          </a>
        </div>
      )}

      {/* Floating Trigger Button */}
      <div className="flex items-center gap-2">
        {!isOpen && (
          <div className="hidden sm:block bg-[#0D0D14]/90 border border-white/10 px-3 py-1.5 rounded-full text-xs text-zinc-300 font-medium shadow-lg backdrop-blur-md">
            Questions? <span className="text-[#25D366] font-bold">Chat with us</span>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-black flex items-center justify-center shadow-2xl shadow-[#25D366]/40 hover:scale-110 active:scale-95 transition-all group"
          title="Chat on WhatsApp"
        >
          {isOpen ? (
            <X className="w-6 h-6 stroke-[2.5]" />
          ) : (
            <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
          )}
        </button>
      </div>
    </div>
  );
}
