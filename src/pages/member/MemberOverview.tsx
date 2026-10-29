import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';
import { gymDb, formatDateYMD } from '../../lib/supabase';
import type { Membership, ProgressLog, NotificationItem } from '../../lib/database.types';
import { Helmet } from 'react-helmet-async';

export default function MemberOverview() {
  const { user } = useAuth();

  const [membership, setMembership] = useState<Membership | null>(null);
  const [streak, setStreak] = useState(0);
  const [monthlyVisits, setMonthlyVisits] = useState(0);
  const [latestProgress, setLatestProgress] = useState<ProgressLog | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [checkedToday, setCheckedToday] = useState(false);

  const todayStr = formatDateYMD(new Date());

  useEffect(() => {
    if (user) {
      const m = gymDb.getMemberCurrentMembership(user.id);
      setMembership(m);

      const st = gymDb.getAttendanceStreak(user.id);
      setStreak(st);

      const mv = gymDb.getMonthlyVisits(user.id);
      setMonthlyVisits(mv);

      const prog = gymDb.getProgressLogs(user.id);
      setLatestProgress(prog[0] || null);

      const notifs = gymDb.getNotifications(user.id);
      setNotifications(notifs);

      const attList = gymDb.getAttendanceHistory(user.id);
      setCheckedToday(attList.some((a) => a.gym_local_date === todayStr));
    }
  }, [user, todayStr]);

  if (!user) return null;

  // Calculate days remaining
  let remainingDays = 0;
  if (membership) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const exp = new Date(membership.expiry_date);
    exp.setHours(0, 0, 0, 0);
    remainingDays = Math.ceil((exp.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  }

  const unreadCount = notifications.filter((n) => !n.read_at).length;

  return (
    <>
      <Helmet>
        <title>Member Dashboard | Elite Zumba & Fitness Studio</title>
      </Helmet>

      <div className="space-y-6 sm:space-y-8">
        
        {/* Hero Greeting & Action Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[var(--bg-surface,#121212)] to-[var(--bg-surface-elevated,#181818)] border border-white/10 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-[var(--accent-primary,#D70015)]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[var(--accent-secondary,#FF2E44)] text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-wider mb-2">
              <span>Athlete Portal</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-display font-extrabold uppercase text-white tracking-wide leading-tight">
              WELCOME BACK, <span className="text-[var(--accent-primary,#D70015)]">{user.full_name.split(' ')[0]}</span>
            </h1>
            <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary,#A0A0A0)] mt-1">
              Ready to crush today's session? Consistency builds champions.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-3">
            {!checkedToday ? (
              <Link
                to="/check-in"
                className="py-3 px-5 rounded-xl text-xs font-mono font-extrabold uppercase tracking-wider bg-[var(--accent-primary,#D70015)] text-white hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(215,0,21,0.4)] active:scale-95 flex items-center gap-2 shrink-0"
              >
                <span className="material-symbols-outlined text-base">qr_code_scanner</span>
                <span>Check In Now</span>
              </Link>
            ) : (
              <div className="py-2.5 px-4 rounded-xl text-xs font-mono font-bold uppercase bg-green-500/15 border border-green-500/40 text-green-400 flex items-center gap-2">
                <span className="material-symbols-outlined text-base">verified</span>
                <span>Checked In Today</span>
              </div>
            )}
          </div>
        </div>

        {/* Warning Alert if Expiring Soon or Expired */}
        {membership && (membership.status === 'expiring_soon' || remainingDays <= 7) && remainingDays >= 0 && (
          <div className="p-4 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-yellow-400">
              <span className="material-symbols-outlined text-2xl shrink-0">warning</span>
              <div className="text-xs">
                <strong className="font-mono uppercase font-bold">Membership Expiring Soon!</strong>
                <p className="text-white/80 mt-0.5">Your pass expires in {remainingDays} days ({membership.expiry_date}). Renew at the desk to prevent interruption.</p>
              </div>
            </div>
            <Link
              to="/member/membership"
              className="py-2 px-3.5 rounded-lg text-[11px] font-mono font-bold uppercase bg-yellow-500 text-black hover:bg-yellow-400 transition-all shrink-0"
            >
              Renew
            </Link>
          </div>
        )}

        {membership && (membership.status === 'expired' || remainingDays < 0) && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-red-400">
              <span className="material-symbols-outlined text-2xl shrink-0">error</span>
              <div className="text-xs">
                <strong className="font-mono uppercase font-bold">Membership Expired</strong>
                <p className="text-white/80 mt-0.5">Your gym pass expired on {membership.expiry_date}. Please renew your plan to continue workout sessions.</p>
              </div>
            </div>
            <Link
              to="/member/membership"
              className="py-2 px-3.5 rounded-lg text-[11px] font-mono font-bold uppercase bg-[var(--accent-primary,#D70015)] text-white hover:bg-white hover:text-black transition-all shrink-0"
            >
              Renew Now
            </Link>
          </div>
        )}

        {/* Core KPI Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* 1. Membership Status */}
          <div className="p-5 rounded-2xl bg-[var(--bg-surface,#121212)] border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between text-white/50 mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider">Plan Status</span>
              <span className="material-symbols-outlined text-lg text-[var(--accent-primary,#D70015)]">card_membership</span>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-display font-extrabold uppercase text-white truncate">
                {membership ? membership.plan_name_snapshot.split(' ')[0] : 'None'}
              </div>
              <div className="text-xs font-mono mt-1">
                {remainingDays > 0 ? (
                  <span className="text-green-400 font-bold">{remainingDays} Days Left</span>
                ) : (
                  <span className="text-red-400 font-bold">Expired</span>
                )}
              </div>
            </div>
          </div>

          {/* 2. Attendance Streak */}
          <div className="p-5 rounded-2xl bg-[var(--bg-surface,#121212)] border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between text-white/50 mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider">Attendance Streak</span>
              <span className="text-lg">🔥</span>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold uppercase text-white">
                {streak} <span className="text-xs font-mono text-white/50">DAYS</span>
              </div>
              <div className="text-xs font-mono text-[var(--accent-secondary,#FF2E44)] mt-1 font-semibold">
                Consecutive Workouts
              </div>
            </div>
          </div>

          {/* 3. Monthly Visits */}
          <div className="p-5 rounded-2xl bg-[var(--bg-surface,#121212)] border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between text-white/50 mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider">Visits This Month</span>
              <span className="material-symbols-outlined text-lg text-blue-400">event_available</span>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold uppercase text-white">
                {monthlyVisits} <span className="text-xs font-mono text-white/50">SESSIONS</span>
              </div>
              <div className="text-xs font-mono text-white/50 mt-1">
                {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
              </div>
            </div>
          </div>

          {/* 4. Latest Bodyweight */}
          <div className="p-5 rounded-2xl bg-[var(--bg-surface,#121212)] border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between text-white/50 mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider">Latest Weight</span>
              <span className="material-symbols-outlined text-lg text-emerald-400">scale</span>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold uppercase text-white">
                {latestProgress?.weight_kg ? `${latestProgress.weight_kg} kg` : '—'}
              </div>
              <div className="text-xs font-mono text-white/50 mt-1">
                {latestProgress ? `Logged on ${latestProgress.recorded_at}` : 'No log yet'}
              </div>
            </div>
          </div>

        </div>

        {/* Two-Column Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Left Column: Quick Plan & Facility Information (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Membership Overview Card */}
            <div className="p-6 rounded-3xl bg-[var(--bg-surface,#121212)] border border-white/10">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <h2 className="text-lg font-display font-bold uppercase text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-[var(--accent-primary,#D70015)]">badge</span>
                  <span>Active Membership Details</span>
                </h2>
                <Link to="/member/membership" className="text-xs font-mono text-[var(--accent-secondary,#FF2E44)] hover:underline">
                  Manage Plan →
                </Link>
              </div>

              {membership ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                      <div className="text-[10px] font-mono text-white/50 uppercase">Tier</div>
                      <div className="text-sm font-display font-bold text-white uppercase mt-0.5">{membership.plan_name_snapshot}</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                      <div className="text-[10px] font-mono text-white/50 uppercase">Start Date</div>
                      <div className="text-xs font-mono font-bold text-white mt-0.5">{membership.start_date}</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                      <div className="text-[10px] font-mono text-white/50 uppercase">Expiry Date</div>
                      <div className="text-xs font-mono font-bold text-white mt-0.5">{membership.expiry_date}</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[var(--bg-canvas,#080808)] border border-white/5 flex items-center justify-between">
                    <div className="text-xs font-mono text-[var(--text-secondary,#A0A0A0)]">
                      <span className="text-white font-bold">Facility Access:</span> Unlimited Gym Floor, Strength & Zumba Studios.
                    </div>
                    <Link
                      to="/member/workouts"
                      className="text-xs font-mono font-bold uppercase text-white hover:text-[var(--accent-secondary,#FF2E44)] transition-colors flex items-center gap-1 shrink-0"
                    >
                      <span>View Exercises</span>
                      <span className="material-symbols-outlined text-sm">east</span>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-white/40 font-mono text-xs">
                  No active membership record found. Contact reception to enroll.
                </div>
              )}
            </div>

            {/* Quick Action Navigation Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                to="/member/attendance"
                className="p-4 rounded-2xl bg-[var(--bg-surface,#121212)] border border-white/10 hover:border-white/20 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined">calendar_month</span>
                </div>
                <div className="text-sm font-display font-bold uppercase text-white group-hover:text-blue-400">
                  Attendance Calendar
                </div>
                <div className="text-xs text-[var(--text-secondary,#A0A0A0)] mt-1">
                  Review complete visit log & monthly frequency.
                </div>
              </Link>

              <Link
                to="/member/progress"
                className="p-4 rounded-2xl bg-[var(--bg-surface,#121212)] border border-white/10 hover:border-white/20 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined">monitoring</span>
                </div>
                <div className="text-sm font-display font-bold uppercase text-white group-hover:text-emerald-400">
                  Fitness Metrics
                </div>
                <div className="text-xs text-[var(--text-secondary,#A0A0A0)] mt-1">
                  Log body weight, waist, and composition stats.
                </div>
              </Link>

              <Link
                to="/member/workouts"
                className="p-4 rounded-2xl bg-[var(--bg-surface,#121212)] border border-white/10 hover:border-white/20 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-primary,#D70015)]/10 text-[var(--accent-primary,#D70015)] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined">fitness_center</span>
                </div>
                <div className="text-sm font-display font-bold uppercase text-white group-hover:text-[var(--accent-secondary,#FF2E44)]">
                  Assigned Routine
                </div>
                <div className="text-xs text-[var(--text-secondary,#A0A0A0)] mt-1">
                  Compound lifts, sets, reps & coaching cues.
                </div>
              </Link>
            </div>

          </div>

          {/* Right Column: In-App Notifications Feed (1 Col) */}
          <div className="p-6 rounded-3xl bg-[var(--bg-surface,#121212)] border border-white/10 flex flex-col">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <h2 className="text-lg font-display font-bold uppercase text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--accent-secondary,#FF2E44)]">notifications</span>
                <span>Notifications</span>
              </h2>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[var(--accent-primary,#D70015)] text-white font-bold">
                  {unreadCount} New
                </span>
              )}
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto max-h-[380px]">
              {notifications.slice(0, 4).map((notif) => (
                <div
                  key={notif.id}
                  className={`p-3.5 rounded-xl border text-xs transition-colors ${
                    notif.read_at
                      ? 'bg-white/5 border-white/5 text-[var(--text-secondary,#A0A0A0)]'
                      : 'bg-[var(--accent-primary,#D70015)]/10 border-[var(--accent-primary,#D70015)]/30 text-white'
                  }`}
                >
                  <div className="font-mono font-bold uppercase text-white mb-1 flex items-center justify-between">
                    <span>{notif.title}</span>
                    <span className="text-[9px] font-mono text-white/40">
                      {new Date(notif.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="leading-relaxed font-sans text-xs text-white/80">{notif.body}</p>
                </div>
              ))}

              {notifications.length === 0 && (
                <div className="text-center py-10 text-white/40 font-mono text-xs">
                  No notifications yet.
                </div>
              )}
            </div>

            <div className="pt-4 mt-auto border-t border-white/10 text-center">
              <Link
                to="/member/notifications"
                className="text-xs font-mono font-bold uppercase text-[var(--accent-secondary,#FF2E44)] hover:underline"
              >
                View Notification Center →
              </Link>
            </div>
          </div>

        </div>

      </div>
    </>
  );
}
