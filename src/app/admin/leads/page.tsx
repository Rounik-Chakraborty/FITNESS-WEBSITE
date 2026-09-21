'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { LeadStage, Lead } from '@/lib/types';
import {
  Kanban,
  Phone,
  Mail,
  MapPin,
  Calendar,
  MessageSquare,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Plus,
  X,
  Target,
} from 'lucide-react';
import { generateWhatsAppLink } from '@/lib/utils';

const STAGES: LeadStage[] = ['NEW', 'CONTACTED', 'TRIAL BOOKED', 'CONVERTED'];

export default function AdminLeadsPage() {
  const { leads, updateLeadStage, addLead } = useAppStore();
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);

  // Quick lead form
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Kolkata Flagship Club');
  const [goal, setGoal] = useState('Fat Loss & Athletic Recomp');

  const handleCreateManualLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    addLead({
      name,
      phone,
      email: `${name.toLowerCase().replace(/\s+/g, '.')}@inquiry.com`,
      preferredLocation: location,
      preferredDate: new Date().toISOString().split('T')[0],
      fitnessGoal: goal,
      source: 'WhatsApp Direct',
      notes: 'Manually logged by front desk concierge.',
    });

    setName('');
    setPhone('');
    setIsAddLeadModalOpen(false);
  };

  const getStageColor = (stage: LeadStage) => {
    switch (stage) {
      case 'NEW':
        return 'border-[#E2F163] text-[#E2F163] bg-[#E2F163]/10';
      case 'CONTACTED':
        return 'border-amber-400 text-amber-300 bg-amber-400/10';
      case 'TRIAL BOOKED':
        return 'border-cyan-400 text-cyan-300 bg-cyan-400/10';
      case 'CONVERTED':
        return 'border-emerald-400 text-emerald-300 bg-emerald-400/10';
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono text-[#E2F163] font-bold uppercase tracking-widest">
            SALES PIPELINE & CRM
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display uppercase">
            LEAD MANAGEMENT ({leads.length})
          </h2>
        </div>

        <button
          onClick={() => setIsAddLeadModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-[#E2F163] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#d6e752] transition-all flex items-center gap-2 shadow-lg shadow-[#E2F163]/20"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>+ Log Walk-in / Phone Lead</span>
        </button>
      </div>

      {/* Visual Kanban Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {STAGES.map((stage) => {
          const stageLeads = leads.filter((l) => l.stage === stage);
          return (
            <div
              key={stage}
              className="rounded-3xl bg-[#111119] border border-white/10 p-4 space-y-4 shadow-xl flex flex-col min-h-[480px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${getStageColor(stage)}`}>
                  {stage}
                </span>
                <span className="text-xs font-mono font-bold text-zinc-400">
                  {stageLeads.length}
                </span>
              </div>

              {/* Lead Cards in Stage */}
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[620px] pr-1">
                {stageLeads.length === 0 ? (
                  <div className="text-center py-12 text-zinc-600 text-xs font-medium">
                    No leads in this stage
                  </div>
                ) : (
                  stageLeads.map((lead) => {
                    const nextStageIndex = STAGES.indexOf(lead.stage) + 1;
                    const nextStage = nextStageIndex < STAGES.length ? STAGES[nextStageIndex] : null;

                    const whatsappUrl = generateWhatsAppLink(
                      lead.phone,
                      `Hi ${lead.name}, this is the concierge from EliteFit (${lead.preferredLocation}). We received your request regarding ${lead.fitnessGoal}. Are you free for a quick walkthrough this week?`
                    );

                    return (
                      <div
                        key={lead.id}
                        className="p-4 rounded-2xl bg-[#181824] border border-white/5 hover:border-white/20 transition-all space-y-3"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="font-bold text-white text-xs">{lead.name}</h4>
                            <span className="text-[9px] text-zinc-500 font-mono">{lead.source}</span>
                          </div>
                          <div className="text-[11px] text-zinc-400 mt-0.5">{lead.phone}</div>
                        </div>

                        <div className="space-y-1 text-[11px] text-zinc-300">
                          <div className="flex items-center gap-1 text-[#E2F163] font-semibold">
                            <Target className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{lead.fitnessGoal}</span>
                          </div>
                          <div className="flex items-center gap-1 text-zinc-400 text-[10px]">
                            <MapPin className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{lead.preferredLocation.split(' ')[0]}</span>
                          </div>
                        </div>

                        {lead.notes && (
                          <div className="p-2 rounded-xl bg-black/40 text-[10px] text-zinc-400 italic">
                            &ldquo;{lead.notes}&rdquo;
                          </div>
                        )}

                        {/* Actions */}
                        <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 transition-all flex items-center gap-1 text-[11px] font-bold"
                            title="Chat with lead on WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>

                          {nextStage && (
                            <button
                              onClick={() => updateLeadStage(lead.id, nextStage)}
                              className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-[10px] font-bold flex items-center gap-1 transition-all"
                              title={`Advance to ${nextStage}`}
                            >
                              <span>Advance</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Manual Add Lead Modal */}
      {isAddLeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsAddLeadModalOpen(false)} />
          <div className="relative w-full max-w-md bg-[#0F0F18] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white font-display">Log Walk-In Prospect Lead</h3>
              <button onClick={() => setIsAddLeadModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualLead} className="space-y-3.5 text-xs">
              <div>
                <label className="text-zinc-400 block mb-1">Prospect Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Suman Sen"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#E2F163]"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">WhatsApp Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98300 00000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#E2F163]"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Target Fitness Objective</label>
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#E2F163]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#E2F163] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#d6e752] transition-all shadow-lg shadow-[#E2F163]/25 mt-2"
              >
                Log Lead into Pipeline
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
