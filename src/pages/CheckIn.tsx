import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { gymDb, formatDateYMD } from '../lib/supabase';
import type { Membership, CheckInResult } from '../lib/database.types';
import { Helmet } from 'react-helmet-async';

export default function CheckIn() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  const [membership, setMembership] = useState<Membership | null>(null);
  const [checkInResult, setCheckInResult] = useState<CheckInResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [todayCheckedIn, setTodayCheckedIn] = useState(false);
  const [streak, setStreak] = useState(0);

  const todayStr = formatDateYMD(new Date());

  useEffect(() => {
    if (user) {
      const current = gymDb.getMemberCurrentMembership(user.id);
      setMembership(current);

      const attendanceList = gymDb.getAttendanceHistory(user.id);
      const checkedToday = attendanceList.some((a) => a.gym_local_date === todayStr);
      setTodayCheckedIn(checkedToday);

      const currentStreak = gymDb.getAttendanceStreak(user.id);
      setStreak(currentStreak);
    }
  }, [user, todayStr]);

  const handleCheckIn = () => {
    if (!user) {
      navigate('/login?redirect=/check-in');
      return;
    }

    setIsSubmitting(true);
    // Execute atomic server-validated check-in operation
    const result = gymDb.checkInMember(user.id);
    setIsSubmitting(false);
    setCheckInResult(result);

    if (result.success) {
      setTodayCheckedIn(true);
      setStreak(gymDb.getAttendanceStreak(user.id));
    }
  };

  return (
    <>
      <Helmet>
        <title>Gym Entrance Check-In | Elite Zumba & Fitness Studio</title>
        <meta name="description" content="Official static QR attendance checkpoint for Elite Zumba & Fitness Studio members." />
      </Helmet>

      <div className="min-h-[85vh] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-[var(--bg-canvas,#080808)] flex items-center justify-center relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[var(--accent-primary,#D70015)]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-lg w-full relative z-10">
          
          {/* Main Card */}
          <div className="bg-[var(--bg-surface,#121212)] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl text-center">
            
            {/* Facility Header */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[var(--accent-secondary,#FF2E44)] text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-primary,#D70015)] animate-ping" />
              <span>Entrance Turnstile Portal</span>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-[var(--accent-primary,#D70015)] mx-auto flex items-center justify-center text-white shadow-[0_0_30px_rgba(215,0,21,0.5)] mb-4">
              <span className="material-symbols-outlined text-3xl font-bold">qr_code_scanner</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-display font-extrabold uppercase text-white tracking-wider leading-none">
              ELITE CHECK-IN
            </h1>
            <p className="mt-1.5 text-xs font-mono text-[var(--text-secondary,#A0A0A0)]">
              5th Floor, Savitri Tower • Bhagalpur
            </p>

            {/* Divider */}
            <div className="my-6 border-t border-white/10" />

            {/* Loading state */}
            {isLoading && (
              <div className="py-10 text-center">
                <span className="material-symbols-outlined text-3xl text-[var(--accent-primary,#D70015)] animate-spin">
                  progress_activity
                </span>
                <p className="mt-2 text-xs font-mono text-white/50 uppercase tracking-widest">
                  Validating Membership Session...
                </p>
              </div>
            )}

            {/* Unauthenticated View */}
            {!isLoading && !user && (
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[var(--accent-secondary,#FF2E44)] mb-2">
                    <span className="material-symbols-outlined text-base">info</span>
                    <span>Entrance Instructions</span>
                  </div>
                  <ol className="text-xs text-[var(--text-secondary,#A0A0A0)] space-y-1.5 list-decimal list-inside font-sans leading-relaxed">
                    <li>Scan this permanent entrance QR code with your smartphone.</li>
                    <li>Sign in once using your registered email and password.</li>
                    <li>Your session remains persistent for instant check-in on all future visits.</li>
                  </ol>
                </div>

                <Link
                  to="/login?redirect=/check-in"
                  className="w-full py-4 px-6 rounded-2xl text-xs font-mono font-extrabold uppercase tracking-widest bg-[var(--accent-primary,#D70015)] text-white hover:bg-white hover:text-black transition-all shadow-[0_0_25px_rgba(215,0,21,0.45)] active:scale-95 flex items-center justify-center gap-2 block"
                >
                  <span className="material-symbols-outlined text-base">login</span>
                  <span>Sign In to Check In</span>
                </Link>

                <p className="text-[11px] font-mono text-[var(--text-muted)]">
                  Not a member yet? Ask our reception desk for a 3-Day Free Trial Pass.
                </p>
              </div>
            )}

            {/* Authenticated Member View */}
            {!isLoading && user && (
              <div className="space-y-6">
                
                {/* Member Profile Badge */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-left">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}
                      alt={user.full_name}
                      className="w-12 h-12 rounded-xl object-cover border border-white/20"
                    />
                    <div>
                      <div className="text-sm font-display font-bold uppercase text-white tracking-wide">
                        {user.full_name}
                      </div>
                      <div className="text-[11px] font-mono text-[var(--text-secondary,#A0A0A0)]">
                        {membership ? membership.plan_name_snapshot : 'No Membership Plan'}
                      </div>
                    </div>
                  </div>

                  {/* Status Tag */}
                  <div>
                    {membership?.status === 'active' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-green-500/20 text-green-400 border border-green-500/30">
                        Active
                      </span>
                    )}
                    {membership?.status === 'expiring_soon' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                        Expiring
                      </span>
                    )}
                    {membership?.status === 'expired' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-red-500/20 text-red-400 border border-red-500/30">
                        Expired
                      </span>
                    )}
                    {membership?.status === 'suspended' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-orange-500/20 text-orange-400 border border-orange-500/30">
                        Suspended
                      </span>
                    )}
                  </div>
                </div>

                {/* Outcome Display */}
                {checkInResult && (
                  <div
                    className={`p-4 rounded-2xl border text-left flex items-start gap-3 ${
                      checkInResult.success
                        ? 'bg-green-500/15 border-green-500/40 text-green-400'
                        : checkInResult.code === 'ALREADY_CHECKED_IN'
                        ? 'bg-yellow-500/15 border-yellow-500/40 text-yellow-400'
                        : 'bg-red-500/15 border-red-500/40 text-red-400'
                    }`}
                  >
                    <span className="material-symbols-outlined text-2xl shrink-0 mt-0.5">
                      {checkInResult.success ? 'verified' : 'info'}
                    </span>
                    <div>
                      <div className="font-mono text-xs font-bold uppercase tracking-wider">
                        {checkInResult.code.replace(/_/g, ' ')}
                      </div>
                      <div className="text-xs font-sans mt-0.5 leading-relaxed text-white">
                        {checkInResult.message}
                      </div>
                    </div>
                  </div>
                )}

                {/* Already Checked In State */}
                {todayCheckedIn && !checkInResult && (
                  <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/30 text-green-400 text-left flex items-center gap-3">
                    <span className="material-symbols-outlined text-2xl shrink-0">check_circle</span>
                    <div className="text-xs">
                      <div className="font-mono font-bold uppercase tracking-wider">Checked In For Today</div>
                      <div className="text-[11px] text-white/80">You have already recorded your workout for {todayStr}.</div>
                    </div>
                  </div>
                )}

                {/* Main Action Check-in Button */}
                {!todayCheckedIn ? (
                  <button
                    onClick={handleCheckIn}
                    disabled={isSubmitting || membership?.status === 'expired' || membership?.status === 'suspended'}
                    className="w-full py-4 px-6 rounded-2xl text-xs font-mono font-extrabold uppercase tracking-widest bg-[var(--accent-primary,#D70015)] text-white hover:bg-white hover:text-black transition-all shadow-[0_0_30px_rgba(215,0,21,0.5)] active:scale-95 disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>
                        <span>Confirming Entrance...</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-lg">how_to_reg</span>
                        <span>Confirm Entrance Check-In</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <Link
                      to="/member"
                      className="py-3 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white transition-all text-center flex items-center justify-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-base">dashboard</span>
                      <span>My Portal</span>
                    </Link>
                    <Link
                      to="/member/workouts"
                      className="py-3 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-[var(--accent-primary,#D70015)] text-white hover:bg-white hover:text-black transition-all text-center flex items-center justify-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-base">fitness_center</span>
                      <span>Today's Routine</span>
                    </Link>
                  </div>
                )}

                {/* Attendance Streak Banner */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-base">🔥</span>
                    <span>Current Streak:</span>
                  </div>
                  <div className="text-[var(--accent-secondary,#FF2E44)] font-bold text-sm">
                    {streak} Consecutive Workouts
                  </div>
                </div>

                {/* Quick Switch / Sign Out */}
                <div className="pt-2 flex justify-between items-center text-[11px] font-mono text-[var(--text-muted)]">
                  <span>Logged in as {user.email}</span>
                  <Link to="/member" className="text-[var(--accent-secondary,#FF2E44)] hover:underline">
                    Go to Portal →
                  </Link>
                </div>
              </div>
            )}

            {/* Static QR Security Limitation Note */}
            <div className="mt-8 pt-5 border-t border-white/10 text-left">
              <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold mb-1">
                <span className="material-symbols-outlined text-xs">verified_user</span>
                <span>Security Notice & Policy</span>
              </div>
              <p className="text-[10px] font-mono text-[var(--text-muted)] leading-relaxed">
                This permanent static QR code is placed at the gym turnstile for high-speed touchless check-ins. Daily duplicate protection and real-time membership validation are strictly enforced on the server.
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
