import React, { useState, useEffect } from 'react';
import { useAuth } from '../../lib/AuthContext';
import { gymDb, formatDateYMD } from '../../lib/supabase';
import type { Attendance } from '../../lib/database.types';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function MemberAttendance() {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [streak, setStreak] = useState(0);
  const [monthlyVisits, setMonthlyVisits] = useState(0);
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());

  useEffect(() => {
    if (user) {
      const history = gymDb.getAttendanceHistory(user.id);
      setAttendance(history);
      setStreak(gymDb.getAttendanceStreak(user.id));
      setMonthlyVisits(gymDb.getMonthlyVisits(user.id));
    }
  }, [user]);

  if (!user) return null;

  // Calendar generation for currentMonthDate
  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();
  const monthName = currentMonthDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const attendedDateSet = new Set(attendance.map((a) => a.gym_local_date));

  const changeMonth = (offset: number) => {
    setCurrentMonthDate(new Date(year, month + offset, 1));
  };

  return (
    <>
      <Helmet>
        <title>Attendance History & Streak | Elite Zumba & Fitness Studio</title>
      </Helmet>

      <div className="space-y-6 sm:space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[var(--accent-secondary,#FF2E44)] text-xs font-mono font-semibold uppercase tracking-wider mb-2">
              <span>Visit History & Metrics</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold uppercase text-white tracking-wide">
              ATTENDANCE LOG
            </h1>
            <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary,#A0A0A0)]">
              Verified daily turnstile check-ins and workout frequency.
            </p>
          </div>

          <Link
            to="/check-in"
            className="py-3 px-5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-[var(--accent-primary,#D70015)] text-white hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(215,0,21,0.4)] self-start sm:self-auto flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">qr_code_scanner</span>
            <span>Check In Page</span>
          </Link>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="p-5 rounded-2xl bg-[var(--bg-surface,#121212)] border border-white/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center text-2xl">
              🔥
            </div>
            <div>
              <div className="text-2xl font-display font-bold uppercase text-white">
                {streak} Days
              </div>
              <div className="text-[11px] font-mono text-[var(--accent-secondary,#FF2E44)] uppercase">
                Active Workout Streak
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--bg-surface,#121212)] border border-white/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">event_available</span>
            </div>
            <div>
              <div className="text-2xl font-display font-bold uppercase text-white">
                {monthlyVisits} Visits
              </div>
              <div className="text-[11px] font-mono text-white/50 uppercase">
                This Month ({new Date().toLocaleString('default', { month: 'short' })})
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--bg-surface,#121212)] border border-white/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">verified</span>
            </div>
            <div>
              <div className="text-2xl font-display font-bold uppercase text-white">
                {attendance.length} Total
              </div>
              <div className="text-[11px] font-mono text-white/50 uppercase">
                Lifetime Verified Visits
              </div>
            </div>
          </div>
        </div>

        {/* Calendar & Recent History Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Calendar View (7 cols) */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-[var(--bg-surface,#121212)] border border-white/10">
            
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <h2 className="text-lg font-display font-bold uppercase text-white">
                {monthName}
              </h2>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => changeMonth(-1)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                  aria-label="Previous Month"
                >
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <button
                  onClick={() => setCurrentMonthDate(new Date())}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] font-mono uppercase text-white transition-colors"
                >
                  Today
                </button>
                <button
                  onClick={() => changeMonth(1)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                  aria-label="Next Month"
                >
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>

            {/* Weekday Labels */}
            <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-mono uppercase text-white/40 mb-3">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {/* Empty padding days */}
              {Array.from({ length: firstDayIndex }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}

              {/* Days of month */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const dateObj = new Date(year, month, dayNum);
                const dateStr = formatDateYMD(dateObj);
                const isAttended = attendedDateSet.has(dateStr);
                const isToday = dateStr === formatDateYMD(new Date());

                return (
                  <div
                    key={dateStr}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center p-1 relative border transition-all text-xs font-mono font-bold ${
                      isAttended
                        ? 'bg-[var(--accent-primary,#D70015)] border-[var(--accent-primary,#D70015)] text-white shadow-[0_0_15px_rgba(215,0,21,0.5)]'
                        : isToday
                        ? 'bg-white/10 border-white/30 text-white'
                        : 'bg-white/5 border-transparent text-white/50 hover:bg-white/10'
                    }`}
                  >
                    <span>{dayNum}</span>
                    {isAttended && (
                      <span className="material-symbols-outlined text-[10px] mt-0.5">check</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-6 text-xs font-mono text-white/60">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-[var(--accent-primary,#D70015)] shadow-sm" />
                <span>Attended Workout</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-white/10 border border-white/20" />
                <span>Rest Day / Off</span>
              </div>
            </div>

          </div>

          {/* Recent Check-In List (5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-[var(--bg-surface,#121212)] border border-white/10 flex flex-col">
            <h2 className="text-lg font-display font-bold uppercase text-white pb-4 mb-4 border-b border-white/10 flex items-center justify-between">
              <span>Recent Check-Ins</span>
              <span className="text-xs font-mono text-white/50 font-normal">{attendance.length} Total</span>
            </h2>

            <div className="space-y-3 flex-1 overflow-y-auto max-h-[460px]">
              {attendance.map((att) => (
                <div
                  key={att.id}
                  className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[var(--accent-primary,#D70015)]/20 text-[var(--accent-primary,#D70015)] flex items-center justify-center font-bold">
                      <span className="material-symbols-outlined text-lg">check_circle</span>
                    </div>
                    <div>
                      <div className="font-mono font-bold text-white">
                        {att.gym_local_date}
                      </div>
                      <div className="text-[10px] font-mono text-white/40">
                        {new Date(att.check_in_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Entrance Turnstile
                      </div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-green-500/20 text-green-400 border border-green-500/30">
                    Verified
                  </span>
                </div>
              ))}

              {attendance.length === 0 && (
                <div className="text-center py-12 text-white/40 font-mono text-xs">
                  No check-in history yet. Scan the entrance QR on your next visit!
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </>
  );
}
