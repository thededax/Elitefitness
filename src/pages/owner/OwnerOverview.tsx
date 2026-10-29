import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gymDb } from '../../lib/supabase';
import type { OwnerMetrics, Attendance, Profile } from '../../lib/database.types';
import { Helmet } from 'react-helmet-async';

export default function OwnerOverview() {
  const [metrics, setMetrics] = useState<OwnerMetrics | null>(null);
  const [recentAttendance, setRecentAttendance] = useState<Attendance[]>([]);
  const [membersWithDetails, setMembersWithDetails] = useState<any[]>([]);

  useEffect(() => {
    setMetrics(gymDb.getOwnerMetrics());
    setRecentAttendance(gymDb.getAllAttendance().slice(0, 6));
    setMembersWithDetails(gymDb.getAllMembersWithDetails());
  }, []);

  if (!metrics) return null;

  const expiringMembers = membersWithDetails.filter(
    (m) => m.membership?.status === 'expiring_soon'
  );

  return (
    <>
      <Helmet>
        <title>Owner Executive Dashboard | Elite Zumba & Fitness Studio</title>
      </Helmet>

      <div className="space-y-6 sm:space-y-8">
        
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[var(--bg-surface,#121212)] to-[var(--bg-surface-elevated,#181818)] border border-white/10 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-[var(--accent-primary,#D70015)]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[var(--accent-secondary,#FF2E44)] text-xs font-mono font-semibold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span>Facility Command Center</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-display font-extrabold uppercase text-white tracking-wide leading-tight">
              ELITE MANAGEMENT SYSTEM
            </h1>
            <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary,#A0A0A0)] mt-1">
              Live operational metrics, turnstile attendance, and member retention monitoring.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap gap-2.5">
            <Link
              to="/owner/members"
              className="py-3 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-[var(--accent-primary,#D70015)] text-white hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(215,0,21,0.4)] flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">person_add</span>
              <span>Register Member</span>
            </Link>

            <Link
              to="/owner/qr-code"
              className="py-3 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-white/10 hover:bg-white text-white hover:text-black transition-all border border-white/10 flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">print</span>
              <span>Print QR Poster</span>
            </Link>
          </div>
        </div>

        {/* 6 Core Executive KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          
          {/* 1. Total Members */}
          <div className="p-4 rounded-2xl bg-[var(--bg-surface,#121212)] border border-white/10 flex flex-col justify-between">
            <div className="text-[10px] font-mono text-white/50 uppercase">Total Members</div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-white mt-2">
              {metrics.total_members}
            </div>
            <div className="text-[10px] font-mono text-white/40 mt-1">Registered Profiles</div>
          </div>

          {/* 2. Active Memberships */}
          <div className="p-4 rounded-2xl bg-[var(--bg-surface,#121212)] border border-white/10 flex flex-col justify-between">
            <div className="text-[10px] font-mono text-green-400 uppercase font-semibold">Active Passes</div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-green-400 mt-2">
              {metrics.active_members}
            </div>
            <div className="text-[10px] font-mono text-white/40 mt-1">In Good Standing</div>
          </div>

          {/* 3. Expiring Soon */}
          <div className="p-4 rounded-2xl bg-[var(--bg-surface,#121212)] border border-white/10 flex flex-col justify-between">
            <div className="text-[10px] font-mono text-yellow-400 uppercase font-semibold">Expiring (7d)</div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-yellow-400 mt-2">
              {metrics.expiring_soon}
            </div>
            <div className="text-[10px] font-mono text-white/40 mt-1">Requires Outreach</div>
          </div>

          {/* 4. Expired */}
          <div className="p-4 rounded-2xl bg-[var(--bg-surface,#121212)] border border-white/10 flex flex-col justify-between">
            <div className="text-[10px] font-mono text-red-400 uppercase font-semibold">Expired</div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-red-400 mt-2">
              {metrics.expired_members}
            </div>
            <div className="text-[10px] font-mono text-white/40 mt-1">Access Suspended</div>
          </div>

          {/* 5. Today's Attendance */}
          <div className="p-4 rounded-2xl bg-[var(--bg-surface,#121212)] border border-white/10 flex flex-col justify-between">
            <div className="text-[10px] font-mono text-[var(--accent-secondary,#FF2E44)] uppercase font-semibold">Today's Check-Ins</div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-[var(--accent-secondary,#FF2E44)] mt-2">
              {metrics.today_checkins}
            </div>
            <div className="text-[10px] font-mono text-white/40 mt-1">Turnstile Scans</div>
          </div>

          {/* 6. Monthly Revenue */}
          <div className="p-4 rounded-2xl bg-[var(--bg-surface,#121212)] border border-white/10 flex flex-col justify-between">
            <div className="text-[10px] font-mono text-white/50 uppercase">Month Collected</div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-white mt-2">
              ₹{metrics.month_revenue.toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] font-mono text-white/40 mt-1">Verified Receipts</div>
          </div>

        </div>

        {/* Two-Column Operations Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Left: Expiring Members High-Priority Outreach (7 Cols) */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-[var(--bg-surface,#121212)] border border-white/10">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <h2 className="text-lg font-display font-bold uppercase text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-yellow-400">notification_important</span>
                <span>Priority Membership Renewals</span>
              </h2>
              <Link to="/owner/members?status=expiring_soon" className="text-xs font-mono text-[var(--accent-secondary,#FF2E44)] hover:underline">
                View All ({expiringMembers.length}) →
              </Link>
            </div>

            <div className="space-y-3">
              {expiringMembers.map((m) => (
                <div
                  key={m.profile.id}
                  className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between gap-4 text-xs font-mono"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={m.profile.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}
                      alt={m.profile.full_name}
                      className="w-10 h-10 rounded-xl object-cover border border-white/10"
                    />
                    <div>
                      <div className="font-display font-bold uppercase text-white text-sm">
                        {m.profile.full_name}
                      </div>
                      <div className="text-white/50 text-[11px]">
                        {m.membership?.plan_name_snapshot} • Expires: <strong className="text-yellow-400">{m.membership?.expiry_date}</strong> ({m.remainingDays}d)
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/owner/members/${m.profile.id}`}
                      className="py-1.5 px-3 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-bold uppercase text-[11px] transition-all"
                    >
                      Renew
                    </Link>
                  </div>
                </div>
              ))}

              {expiringMembers.length === 0 && (
                <div className="text-center py-8 text-white/40 font-mono text-xs">
                  No memberships expiring within the next 7 days.
                </div>
              )}
            </div>
          </div>

          {/* Right: Live Attendance Feed (5 Cols) */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-[var(--bg-surface,#121212)] border border-white/10 flex flex-col">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <h2 className="text-lg font-display font-bold uppercase text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--accent-primary,#D70015)]">checklist</span>
                <span>Recent Turnstile Scans</span>
              </h2>
              <Link to="/owner/attendance" className="text-xs font-mono text-[var(--accent-secondary,#FF2E44)] hover:underline">
                Full Audit →
              </Link>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto max-h-[380px]">
              {recentAttendance.map((att) => {
                const member = gymDb.getProfile(att.member_id);

                return (
                  <div
                    key={att.id}
                    className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs font-mono"
                  >
                    <div>
                      <div className="font-display font-bold uppercase text-white text-sm">
                        {member?.full_name || 'Member'}
                      </div>
                      <div className="text-[10px] text-white/40">
                        {att.gym_local_date} at {new Date(att.check_in_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-green-500/20 text-green-400 font-bold uppercase">
                      ✓ Allowed
                    </span>
                  </div>
                );
              })}

              {recentAttendance.length === 0 && (
                <div className="text-center py-8 text-white/40 font-mono text-xs">
                  No attendance records logged today yet.
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </>
  );
}
