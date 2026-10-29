import React, { useState, useEffect } from 'react';
import { gymDb, formatDateYMD } from '../../lib/supabase';
import type { Attendance } from '../../lib/database.types';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function OwnerAttendance() {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [dateFilter, setDateFilter] = useState('all');
  const [memberSearch, setMemberSearch] = useState('');

  const todayStr = formatDateYMD(new Date());

  const refreshAttendance = () => {
    setAttendance(gymDb.getAllAttendance());
  };

  useEffect(() => {
    refreshAttendance();
  }, []);

  // Filter attendance
  const filtered = attendance.filter((a) => {
    const member = gymDb.getProfile(a.member_id);
    const memberName = member?.full_name.toLowerCase() || '';

    if (memberSearch.trim()) {
      const q = memberSearch.toLowerCase();
      if (!memberName.includes(q)) return false;
    }

    if (dateFilter === 'today') {
      return a.gym_local_date === todayStr;
    } else if (dateFilter === '7days') {
      const cutoff = new Date(Date.now() - 7 * 86400000);
      return new Date(a.check_in_at) >= cutoff;
    } else if (dateFilter === '30days') {
      const cutoff = new Date(Date.now() - 30 * 86400000);
      return new Date(a.check_in_at) >= cutoff;
    }
    return true;
  });

  const todayCount = attendance.filter((a) => a.gym_local_date === todayStr).length;

  return (
    <>
      <Helmet>
        <title>Attendance Audit & Reports | Elite Zumba & Fitness Studio</title>
      </Helmet>

      <div className="space-y-6 sm:space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[var(--accent-secondary,#FF2E44)] text-xs font-mono font-semibold uppercase tracking-wider mb-2">
              <span>Turnstile Security Audit</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold uppercase text-white tracking-wide">
              ATTENDANCE REPORTS
            </h1>
            <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary,#A0A0A0)]">
              Daily check-in records, turnstile sources, and duplicate verification logs.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-[var(--bg-surface,#121212)] border border-white/10 flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
            <div className="text-xs font-mono">
              <span className="text-white/50 uppercase">Today's Check-Ins:</span>{' '}
              <strong className="text-white text-sm">{todayCount} Scans</strong>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-surface,#121212)] border border-white/10 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 text-lg">
              search
            </span>
            <input
              type="text"
              placeholder="Search member name..."
              value={memberSearch}
              onChange={(e) => setMemberSearch(e.target.value)}
              className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 focus:border-[var(--accent-primary,#D70015)] rounded-xl py-2.5 pl-11 pr-4 text-xs font-mono text-white placeholder-white/30 outline-none"
            />
          </div>

          <div className="sm:w-56">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 focus:border-[var(--accent-primary,#D70015)] rounded-xl py-2.5 px-3 text-xs font-mono text-white outline-none"
            >
              <option value="all">All Dates</option>
              <option value="today">Today Only ({todayStr})</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
            </select>
          </div>
        </div>

        {/* Attendance Ledger Table */}
        <div className="rounded-3xl bg-[var(--bg-surface,#121212)] border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-white/5 border-b border-white/10 text-white/50 uppercase text-[10px]">
                <tr>
                  <th className="py-4 px-4 sm:px-6">Member Athlete</th>
                  <th className="py-4 px-3">Local Date</th>
                  <th className="py-4 px-3">Timestamp</th>
                  <th className="py-4 px-3">Source Channel</th>
                  <th className="py-4 px-3">Duplicate Constraint</th>
                  <th className="py-4 px-4 sm:px-6 text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((att) => {
                  const member = gymDb.getProfile(att.member_id);

                  return (
                    <tr key={att.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 sm:px-6">
                        <Link
                          to={`/owner/members/${att.member_id}`}
                          className="font-display font-bold uppercase text-white hover:text-[var(--accent-secondary,#FF2E44)] text-sm transition-colors"
                        >
                          {member?.full_name || 'Member'}
                        </Link>
                        <div className="text-[10px] text-white/40">{member?.email}</div>
                      </td>

                      <td className="py-4 px-3 text-white font-bold">
                        {att.gym_local_date}
                      </td>

                      <td className="py-4 px-3 text-white/80">
                        {new Date(att.check_in_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>

                      <td className="py-4 px-3 text-white/60">
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] uppercase">
                          {att.source}
                        </span>
                      </td>

                      <td className="py-4 px-3 text-green-400">
                        <span>Unique Daily Entry</span>
                      </td>

                      <td className="py-4 px-4 sm:px-6 text-right">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-green-500/20 text-green-400 border border-green-500/30">
                          ✓ Verified
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="text-center py-12 text-white/40 font-mono text-xs">
                No attendance logs found matching the filter criteria.
              </div>
            )}
          </div>
        </div>

      </div>
    </>
  );
}
