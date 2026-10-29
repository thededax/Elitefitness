import React, { useState } from 'react';
import { gymDb } from '../../lib/supabase';
import type { Announcement } from '../../lib/database.types';
import { Helmet } from 'react-helmet-async';

export default function OwnerNotifications() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [targetGroup, setTargetGroup] = useState<Announcement['target_group']>('all');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    setIsSending(true);
    gymDb.sendAnnouncement(title.trim(), body.trim(), targetGroup);
    setIsSending(false);

    setStatusMsg(`Announcement "${title}" broadcasted successfully to target audience!`);
    setTitle('');
    setBody('');
    setTimeout(() => setStatusMsg(null), 4000);
  };

  return (
    <>
      <Helmet>
        <title>Internal Announcements & Broadcasts | Elite Zumba & Fitness Studio</title>
      </Helmet>

      <div className="space-y-6 sm:space-y-8 max-w-4xl">
        
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[var(--accent-secondary,#FF2E44)] text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <span>In-App Member Communications</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold uppercase text-white tracking-wide">
            ANNOUNCEMENTS & MESSAGING
          </h1>
          <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary,#A0A0A0)]">
            Dispatch announcements directly to member dashboards without external SMS/WhatsApp overhead.
          </p>
        </div>

        {statusMsg && (
          <div className="p-4 rounded-2xl bg-green-500/15 border border-green-500/40 text-green-400 text-xs font-mono flex items-center gap-2">
            <span className="material-symbols-outlined text-base">check_circle</span>
            <span>{statusMsg}</span>
          </div>
        )}

        {/* Compose Form */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface,#121212)] border border-white/10">
          <h2 className="text-lg font-display font-bold uppercase text-white mb-6 pb-4 border-b border-white/10 flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--accent-primary,#D70015)]">campaign</span>
            <span>Compose Facility Announcement</span>
          </h2>

          <form onSubmit={handleBroadcast} className="space-y-5 text-xs font-mono">
            <div>
              <label className="block text-white/60 uppercase mb-1.5 font-bold">Target Audience *</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setTargetGroup('all')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    targetGroup === 'all'
                      ? 'bg-[var(--accent-primary,#D70015)] border-[var(--accent-primary,#D70015)] text-white shadow-md'
                      : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                  }`}
                >
                  <div className="font-bold uppercase text-xs">All Members</div>
                  <div className="text-[10px] opacity-80 mt-0.5">Every active gym profile</div>
                </button>

                <button
                  type="button"
                  onClick={() => setTargetGroup('active')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    targetGroup === 'active'
                      ? 'bg-[var(--accent-primary,#D70015)] border-[var(--accent-primary,#D70015)] text-white shadow-md'
                      : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                  }`}
                >
                  <div className="font-bold uppercase text-xs">Active Passes Only</div>
                  <div className="text-[10px] opacity-80 mt-0.5">Currently valid members</div>
                </button>

                <button
                  type="button"
                  onClick={() => setTargetGroup('expiring_soon')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    targetGroup === 'expiring_soon'
                      ? 'bg-yellow-500 border-yellow-500 text-black shadow-md'
                      : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                  }`}
                >
                  <div className="font-bold uppercase text-xs">Expiring (Next 7d)</div>
                  <div className="text-[10px] opacity-80 mt-0.5">Renewal reminder target</div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-white/60 uppercase mb-1.5 font-bold">Headline / Subject *</label>
              <input
                type="text"
                required
                placeholder="e.g. Schedule Change: Extended Sunday Zumba Session"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 focus:border-[var(--accent-primary,#D70015)] rounded-xl py-2.5 px-3.5 text-white outline-none font-sans text-sm"
              />
            </div>

            <div>
              <label className="block text-white/60 uppercase mb-1.5 font-bold">Announcement Content *</label>
              <textarea
                rows={4}
                required
                placeholder="Type the message that will be broadcasted to recipient athlete portals..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 focus:border-[var(--accent-primary,#D70015)] rounded-xl py-2.5 px-3.5 text-white outline-none font-sans text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="py-3 px-6 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-[var(--accent-primary,#D70015)] text-white hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(215,0,21,0.4)] disabled:opacity-50 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">send</span>
              <span>{isSending ? 'Dispatching...' : 'Dispatch In-App Broadcast'}</span>
            </button>
          </form>
        </div>

      </div>
    </>
  );
}
