'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import {
  Sparkles,
  X,
  Send,
  RotateCcw,
  Bot,
  User,
  Dumbbell,
  Apple,
  Calendar,
  AlertCircle,
  Minimize2,
  Maximize2,
} from 'lucide-react';
import { GYM_CLASSES } from '@/lib/mock-data';

const SUGGESTED_PROMPTS = [
  'I want to drop 10kg body fat',
  'Build a 4-day Hypertrophy split',
  'Pre-workout meal & macro timing',
  'Mobility routine for squat depth',
];

export function EliteFitAIWidget() {
  const {
    aiMessages,
    isAITyping,
    isAIWidgetOpen,
    setAIWidgetOpen,
    sendAIMessage,
    resetAIChat,
    openClassModal,
  } = useAppStore();

  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAIWidgetOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [aiMessages, isAITyping, isAIWidgetOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isAITyping) return;
    const text = input;
    setInput('');
    sendAIMessage(text);
  };

  const handlePromptClick = (p: string) => {
    if (isAITyping) return;
    sendAIMessage(p);
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 sm:left-6 z-40">
      {/* Floating Launch Button */}
      {!isAIWidgetOpen && (
        <button
          onClick={() => setAIWidgetOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#0D0D15] border border-[#E2F163]/40 text-white shadow-2xl hover:border-[#E2F163] hover:shadow-[0_0_25px_rgba(226,241,99,0.3)] transition-all group active:scale-95"
        >
          <div className="w-8 h-8 rounded-full bg-[#E2F163] text-black flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4 fill-black animate-spin-slow" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-black text-white tracking-wide font-display flex items-center gap-1.5">
              <span>ELITEFIT AI</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E2F163] animate-ping" />
            </div>
            <div className="text-[10px] text-zinc-400">Ask your AI Coach</div>
          </div>
        </button>
      )}

      {/* Expandable Chat Widget */}
      {isAIWidgetOpen && (
        <div className="w-[92vw] sm:w-96 md:w-[420px] h-[520px] bg-[#0C0C14] border border-[#E2F163]/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#141422] to-[#0D0D16] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#E2F163] text-black flex items-center justify-center font-bold shadow-md shadow-[#E2F163]/30">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-black text-white tracking-wide font-display flex items-center gap-1.5">
                  <span>ELITEFIT AI COACH</span>
                  <span className="px-1.5 py-0.2 rounded bg-[#E2F163]/20 text-[#E2F163] text-[9px] font-bold">
                    PRO
                  </span>
                </div>
                <div className="text-[10px] text-zinc-400">Sports Science & Nutrition Architect</div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={resetAIChat}
                title="Reset conversation"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setAIWidgetOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {aiMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-6 h-6 rounded-lg bg-[#E2F163] text-black flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#E2F163] text-black font-semibold'
                      : 'bg-white/5 border border-white/10 text-zinc-200'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Render Structured Plan if provided by AI */}
                  {msg.structuredPlan && (
                    <div className="mt-3 pt-3 border-t border-white/10 space-y-3">
                      <div className="font-bold text-[#E2F163] text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <Dumbbell className="w-3.5 h-3.5" />
                        <span>{msg.structuredPlan.goal}</span>
                      </div>

                      {/* Weekly Split Days */}
                      <div className="space-y-1.5">
                        {msg.structuredPlan.weeklySplit.map((split, idx) => (
                          <div
                            key={idx}
                            className="p-2 rounded-xl bg-black/40 border border-white/5"
                          >
                            <div className="font-bold text-white text-[11px]">
                              {split.day}: <span className="text-zinc-300 font-normal">{split.focus}</span>
                            </div>
                            <ul className="list-disc list-inside text-[10px] text-zinc-400 mt-1 space-y-0.5">
                              {split.exercises.map((ex, eIdx) => (
                                <li key={eIdx}>{ex}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Nutrition Tips */}
                      <div className="p-2 rounded-xl bg-[#E2F163]/10 border border-[#E2F163]/20 text-[11px] text-zinc-200 space-y-1">
                        <div className="font-bold text-[#E2F163] flex items-center gap-1">
                          <Apple className="w-3 h-3" />
                          <span>Fuel & Recovery Blueprint</span>
                        </div>
                        <ul className="text-[10px] text-zinc-300 space-y-0.5">
                          {msg.structuredPlan.nutritionTips.map((tip, tIdx) => (
                            <li key={tIdx}>• {tip}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Recommended Classes with direct booking trigger */}
                      {msg.structuredPlan.recommendedClasses.length > 0 && (
                        <div className="space-y-1 pt-1">
                          <div className="text-[10px] uppercase font-bold text-zinc-400">
                            Recommended Studio Classes:
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {msg.structuredPlan.recommendedClasses.map((clsName) => {
                              const foundClass = GYM_CLASSES.find((c) =>
                                c.title.toLowerCase().includes(clsName.toLowerCase())
                              );
                              return (
                                <button
                                  key={clsName}
                                  onClick={() => {
                                    if (foundClass) openClassModal(foundClass);
                                  }}
                                  className="px-2.5 py-1 rounded-lg bg-[#E2F163]/20 border border-[#E2F163] text-[#E2F163] text-[10px] font-bold hover:bg-[#E2F163] hover:text-black transition-all"
                                >
                                  Book {clsName} &rarr;
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-6 h-6 rounded-lg bg-zinc-700 text-white flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isAITyping && (
              <div className="flex items-center gap-2 text-zinc-400 text-xs">
                <div className="w-6 h-6 rounded-lg bg-[#E2F163] text-black flex items-center justify-center font-bold">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E2F163] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E2F163] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E2F163] animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Pills */}
          <div className="px-4 py-2 border-t border-white/5 bg-black/40 overflow-x-auto flex gap-1.5 no-scrollbar">
            {SUGGESTED_PROMPTS.map((p) => (
              <button
                key={p}
                onClick={() => handlePromptClick(p)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 text-[10px] border border-white/5 hover:border-[#E2F163]/30 transition-all flex-shrink-0"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="px-4 py-1 bg-black text-[9px] text-zinc-500 text-center border-t border-white/5 flex items-center justify-center gap-1">
            <AlertCircle className="w-2.5 h-2.5 text-zinc-500" />
            <span>Informational fitness assistant. Not medical advice.</span>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-[#090910] border-t border-white/10 flex gap-2">
            <input
              type="text"
              placeholder="Ask for custom split, macro advice, or mobility..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-[#E2F163] transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || isAITyping}
              className="px-3.5 py-2.5 rounded-xl bg-[#E2F163] text-black font-bold text-xs hover:bg-[#d6e752] transition-all disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
