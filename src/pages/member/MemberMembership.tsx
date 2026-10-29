import React, { useState, useEffect } from 'react';
import { useAuth } from '../../lib/AuthContext';
import { gymDb } from '../../lib/supabase';
import type { Membership } from '../../lib/database.types';
import { Helmet } from 'react-helmet-async';

export default function MemberMembership() {
  const { user } = useAuth();
  const [membership, setMembership] = useState<Membership | null>(null);
  const [history, setHistory] = useState<Membership[]>([]);

  useEffect(() => {
    if (user) {
      setMembership(gymDb.getMemberCurrentMembership(user.id));
      setHistory(gymDb.getMembershipHistory(user.id));
    }
  }, [user]);

  if (!user) return null;

  // Calculate remaining days
  let remainingDays = 0;
  if (membership) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const exp = new Date(membership.expiry_date);
    exp.setHours(0, 0, 0, 0);
    remainingDays = Math.ceil((exp.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  }

  return (
    <>
      <Helmet>
        <title>My Membership Plan & Validity | Elite Zumba & Fitness Studio</title>
      </Helmet>

      <div className="space-y-6 sm:space-y-8">
        
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[var(--accent-secondary,#FF2E44)] text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <span>Billing & Access Ledger</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold uppercase text-white tracking-wide">
            MY MEMBERSHIP
          </h1>
          <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary,#A0A0A0)]">
            Active plan status, duration, expiry timeline, and renewal records.
          </p>
        </div>

        {/* Primary Membership Pass Card */}
        {membership ? (
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[var(--bg-surface-elevated,#181818)] via-[var(--bg-surface,#121212)] to-[var(--bg-canvas,#080808)] border border-white/15 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent-primary,#D70015)]/10 blur-[100px] pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[var(--accent-secondary,#FF2E44)] font-bold uppercase tracking-widest">
                    CURRENT PLAN TIER
                  </span>
                  {membership.status === 'active' && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-green-500/20 text-green-400 border border-green-500/30">
                      Active
                    </span>
                  )}
                  {membership.status === 'expiring_soon' && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                      Expiring Soon
                    </span>
                  )}
                  {membership.status === 'expired' && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-red-500/20 text-red-400 border border-red-500/30">
                      Expired
                    </span>
                  )}
                  {membership.status === 'suspended' && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-orange-500/20 text-orange-400 border border-orange-500/30">
                      Suspended
                    </span>
                  )}
                </div>

                <div className="text-2xl sm:text-4xl font-display font-extrabold uppercase text-white mt-1">
                  {membership.plan_name_snapshot}
                </div>
              </div>

              <div className="text-left md:text-right">
                <div className="text-[10px] font-mono uppercase text-white/50">Plan Price Paid</div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-white">
                  ₹{membership.price_snapshot.toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] font-mono text-white/40">
                  {membership.duration_days_snapshot} Days Duration
                </div>
              </div>
            </div>

            {/* Validity Timeline */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-[10px] font-mono uppercase text-white/40">Enrollment Date</div>
                <div className="text-base font-mono font-bold text-white mt-1">
                  {membership.start_date}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-[10px] font-mono uppercase text-white/40">Expiration Date</div>
                <div className="text-base font-mono font-bold text-white mt-1">
                  {membership.expiry_date}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-[10px] font-mono uppercase text-white/40">Remaining Time</div>
                <div className="text-base font-mono font-bold mt-1">
                  {remainingDays > 0 ? (
                    <span className="text-green-400">{remainingDays} Days Left</span>
                  ) : (
                    <span className="text-red-400">0 Days (Expired)</span>
                  )}
                </div>
              </div>
            </div>

            {/* Renewal Callout */}
            <div className="relative z-10 mt-6 p-4 rounded-2xl bg-[var(--bg-canvas,#080808)] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[var(--text-secondary,#A0A0A0)] font-sans">
                <strong className="text-white block font-mono uppercase">Need to renew or upgrade your tier?</strong>
                Visit front desk reception on the 5th floor or chat directly with our concierge via WhatsApp.
              </div>
              <a
                href="https://wa.me/919065516492?text=Hello%20Elite%20Fitness%2C%20I%20would%20like%20to%20renew%20my%20membership."
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 rounded-xl text-xs font-mono font-bold uppercase bg-[#25D366] text-white hover:bg-white hover:text-black transition-all shadow-md shrink-0 flex items-center gap-1.5"
              >
                <span>WhatsApp Renewal Desk</span>
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            </div>

          </div>
        ) : (
          <div className="p-12 rounded-3xl bg-[var(--bg-surface,#121212)] border border-white/10 text-center">
            <h2 className="text-xl font-display font-bold uppercase text-white mb-2">
              No Current Membership Record
            </h2>
            <p className="text-xs text-[var(--text-secondary,#A0A0A0)] max-w-md mx-auto">
              Please contact the front desk at Savitri Tower to activate your gym access pass.
            </p>
          </div>
        )}

        {/* Historical Memberships Ledger */}
        <div className="p-6 rounded-3xl bg-[var(--bg-surface,#121212)] border border-white/10">
          <h2 className="text-lg font-display font-bold uppercase text-white mb-4">
            Membership History
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="border-b border-white/10 text-white/50 uppercase text-[10px]">
                <tr>
                  <th className="pb-3">Plan Name</th>
                  <th className="pb-3">Start Date</th>
                  <th className="pb-3">Expiry Date</th>
                  <th className="pb-3">Duration</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {history.map((m) => (
                  <tr key={m.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 text-white font-bold">{m.plan_name_snapshot}</td>
                    <td className="py-3.5 text-white/80">{m.start_date}</td>
                    <td className="py-3.5 text-white/80">{m.expiry_date}</td>
                    <td className="py-3.5 text-white/80">{m.duration_days_snapshot} Days</td>
                    <td className="py-3.5 text-white font-bold">₹{m.price_snapshot}</td>
                    <td className="py-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-white/10 text-white">
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </>
  );
}
