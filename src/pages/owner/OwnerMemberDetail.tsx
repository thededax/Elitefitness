import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gymDb } from '../../lib/supabase';
import type { Profile, Membership, Attendance, ProgressLog, MembershipPlan } from '../../lib/database.types';
import { Helmet } from 'react-helmet-async';

export default function OwnerMemberDetail() {
  const { id } = useParams<{ id: string }>();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [membership, setMembership] = useState<Membership | null>(null);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [progress, setProgress] = useState<ProgressLog[]>([]);
  const [plans, setPlans] = useState<MembershipPlan[]>([]);

  // Modals & Messaging
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageTitle, setMessageTitle] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  // Renew / Assign Plan Modal
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState('');

  const refreshData = () => {
    if (!id) return;
    setProfile(gymDb.getProfile(id));
    setMembership(gymDb.getMemberCurrentMembership(id));
    setAttendance(gymDb.getAttendanceHistory(id));
    setProgress(gymDb.getProgressLogs(id));
    const allPlans = gymDb.getPlans();
    setPlans(allPlans);
    if (allPlans.length > 0 && !selectedPlanId) {
      setSelectedPlanId(allPlans[0].id);
    }
  };

  useEffect(() => {
    refreshData();
  }, [id]);

  if (!profile) {
    return (
      <div className="p-8 text-center text-white/50 font-mono text-xs">
        Member not found.{' '}
        <Link to="/owner/members" className="text-[var(--accent-secondary,#FF2E44)] hover:underline">
          Return to Member Directory
        </Link>
      </div>
    );
  }

  const streak = id ? gymDb.getAttendanceStreak(id) : 0;
  const monthlyVisits = id ? gymDb.getMonthlyVisits(id) : 0;

  let remainingDays = 0;
  if (membership) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const exp = new Date(membership.expiry_date);
    exp.setHours(0, 0, 0, 0);
    remainingDays = Math.ceil((exp.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageTitle || !messageBody) return;

    gymDb.addNotification({
      recipient_id: profile.id,
      title: messageTitle.trim(),
      body: messageBody.trim(),
      type: 'owner_message',
    });

    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      setShowMessageModal(false);
      setMessageTitle('');
      setMessageBody('');
    }, 2000);
  };

  const handleAssignPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlanId) return;

    gymDb.assignMembership(profile.id, selectedPlanId, undefined, 'cash');
    refreshData();
    setShowPlanModal(false);
  };

  const handleToggleSuspend = () => {
    if (!membership) return;
    const isSuspended = membership.status === 'suspended';
    if (confirm(`${isSuspended ? 'Reactivate' : 'Suspend'} this member's pass?`)) {
      gymDb.setMembershipStatus(membership.id, isSuspended ? 'active' : 'suspended');
      refreshData();
    }
  };

  return (
    <>
      <Helmet>
        <title>{profile.full_name} | Member Dossier</title>
      </Helmet>

      <div className="space-y-6 sm:space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-white/40">
          <Link to="/owner/members" className="hover:text-white transition-colors">
            Member Directory
          </Link>
          <span>/</span>
          <span className="text-white font-bold">{profile.full_name}</span>
        </div>

        {/* Member Profile Hero Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface,#121212)] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={profile.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}
              alt={profile.full_name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/15"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-display font-bold uppercase text-white">
                  {profile.full_name}
                </h1>
                {membership?.status === 'active' && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-green-500/20 text-green-400 border border-green-500/30">
                    Active
                  </span>
                )}
                {membership?.status === 'expiring_soon' && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                    Expiring
                  </span>
                )}
                {membership?.status === 'expired' && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-red-500/20 text-red-400 border border-red-500/30">
                    Expired
                  </span>
                )}
                {membership?.status === 'suspended' && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    Suspended
                  </span>
                )}
              </div>
              <div className="text-xs font-mono text-white/50 mt-1">
                {profile.email} • {profile.phone || 'No phone recorded'}
              </div>
              {profile.emergency_contact && (
                <div className="text-[11px] font-mono text-[var(--accent-secondary,#FF2E44)] mt-0.5">
                  Emergency: {profile.emergency_contact}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 self-start md:self-auto">
            <button
              onClick={() => setShowMessageModal(true)}
              className="py-2.5 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-white/10 hover:bg-white text-white hover:text-black transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">mail</span>
              <span>Send Message</span>
            </button>

            <button
              onClick={() => setShowPlanModal(true)}
              className="py-2.5 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-[var(--accent-primary,#D70015)] text-white hover:bg-white hover:text-black transition-all shadow-md flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">card_membership</span>
              <span>Renew / Change Plan</span>
            </button>

            {membership && (
              <button
                onClick={handleToggleSuspend}
                className="py-2.5 px-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-white/5 hover:bg-white/10 text-white/80"
              >
                {membership.status === 'suspended' ? 'Reactivate' : 'Suspend'}
              </button>
            )}
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="p-5 rounded-2xl bg-[var(--bg-surface,#121212)] border border-white/10">
            <div className="text-[10px] font-mono uppercase text-white/50">Plan Tier</div>
            <div className="text-xl font-display font-bold text-white mt-1">
              {membership ? membership.plan_name_snapshot : 'None'}
            </div>
            <div className="text-xs font-mono text-white/40 mt-1">
              {remainingDays > 0 ? `${remainingDays} Days Remaining` : 'Expired'}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--bg-surface,#121212)] border border-white/10">
            <div className="text-[10px] font-mono uppercase text-white/50">Attendance Streak</div>
            <div className="text-xl font-display font-bold text-white mt-1 flex items-center gap-1">
              <span>🔥 {streak} Days</span>
            </div>
            <div className="text-xs font-mono text-white/40 mt-1">
              {monthlyVisits} Visits logged this month
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--bg-surface,#121212)] border border-white/10">
            <div className="text-[10px] font-mono uppercase text-white/50">Latest Body Weight</div>
            <div className="text-xl font-display font-bold text-white mt-1">
              {progress[0]?.weight_kg ? `${progress[0].weight_kg} kg` : '—'}
            </div>
            <div className="text-xs font-mono text-white/40 mt-1">
              {progress.length} Progress Assessments
            </div>
          </div>
        </div>

        {/* Attendance History for this member */}
        <div className="p-6 rounded-3xl bg-[var(--bg-surface,#121212)] border border-white/10">
          <h2 className="text-lg font-display font-bold uppercase text-white mb-4 flex items-center justify-between">
            <span>Turnstile Check-In History</span>
            <span className="text-xs font-mono text-white/40 font-normal">{attendance.length} Total Visits</span>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="border-b border-white/10 text-white/50 uppercase text-[10px]">
                <tr>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Time</th>
                  <th className="pb-3">Source</th>
                  <th className="pb-3 text-right">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {attendance.map((a) => (
                  <tr key={a.id} className="hover:bg-white/5">
                    <td className="py-3 text-white font-bold">{a.gym_local_date}</td>
                    <td className="py-3 text-white/70">
                      {new Date(a.check_in_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-3 text-white/50">{a.source}</td>
                    <td className="py-3 text-right">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-green-500/20 text-green-400 font-bold uppercase">
                        ✓ Verified
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {attendance.length === 0 && (
              <div className="text-center py-8 text-white/40 font-mono text-xs">
                No check-ins recorded for this member.
              </div>
            )}
          </div>
        </div>

        {/* Modal: Send Direct Message */}
        {showMessageModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="max-w-md w-full bg-[var(--bg-surface,#121212)] border border-white/15 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <h3 className="text-lg font-display font-bold uppercase text-white">Send Message to Member</h3>
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="p-1 rounded-lg hover:bg-white/10 text-white/60 hover:text-white"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {messageSent ? (
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-mono">
                  ✓ Message sent! It will appear instantly in the member's dashboard.
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="space-y-4 text-xs font-mono">
                  <div>
                    <label className="block text-white/60 mb-1 uppercase font-bold">Subject / Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Schedule Update or Renewal Notice"
                      value={messageTitle}
                      onChange={(e) => setMessageTitle(e.target.value)}
                      className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 focus:border-[var(--accent-primary,#D70015)] rounded-xl py-2 px-3 text-white outline-none font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-white/60 mb-1 uppercase font-bold">Message Content *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Type your direct message to the member..."
                      value={messageBody}
                      onChange={(e) => setMessageBody(e.target.value)}
                      className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 focus:border-[var(--accent-primary,#D70015)] rounded-xl py-2 px-3 text-white outline-none font-sans"
                    />
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowMessageModal(false)}
                      className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold uppercase"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-[var(--accent-primary,#D70015)] hover:bg-white hover:text-black text-white font-bold uppercase shadow-md"
                    >
                      Dispatch Message
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Modal: Renew / Assign Plan */}
        {showPlanModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="max-w-md w-full bg-[var(--bg-surface,#121212)] border border-white/15 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <h3 className="text-lg font-display font-bold uppercase text-white">Assign Membership Plan</h3>
                <button
                  onClick={() => setShowPlanModal(false)}
                  className="p-1 rounded-lg hover:bg-white/10 text-white/60 hover:text-white"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <form onSubmit={handleAssignPlan} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-white/60 mb-1 uppercase font-bold">Select Plan</label>
                  <select
                    value={selectedPlanId}
                    onChange={(e) => setSelectedPlanId(e.target.value)}
                    className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 focus:border-[var(--accent-primary,#D70015)] rounded-xl py-2 px-3 text-white outline-none"
                  >
                    {plans.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} — ₹{p.price} ({p.duration_days} days)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowPlanModal(false)}
                    className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-[var(--accent-primary,#D70015)] hover:bg-white hover:text-black text-white font-bold uppercase shadow-md"
                  >
                    Confirm Plan Assignment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
