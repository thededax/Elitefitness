import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { gymDb } from '../../lib/supabase';
import type { MembershipPlan, Payment } from '../../lib/database.types';
import { Helmet } from 'react-helmet-async';

export default function OwnerMembers() {
  const [searchParams] = useSearchParams();
  const initialStatusFilter = searchParams.get('status') || 'all';

  const [members, setMembers] = useState<any[]>([]);
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState(initialStatusFilter);
  const [planFilter, setPlanFilter] = useState('all');

  // Add Member Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<Payment['payment_method']>('cash');
  const [addError, setAddError] = useState<string | null>(null);

  const refreshData = () => {
    setMembers(gymDb.getAllMembersWithDetails());
    setPlans(gymDb.getPlans());
  };

  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    if (plans.length > 0 && !selectedPlanId) {
      setSelectedPlanId(plans[0].id);
    }
  }, [plans, selectedPlanId]);

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    setAddError(null);

    if (!newName.trim() || !newEmail.trim()) {
      setAddError('Full name and email are required.');
      return;
    }

    try {
      gymDb.createMember({
        full_name: newName.trim(),
        email: newEmail.trim(),
        phone: newPhone.trim() || undefined,
        plan_id: selectedPlanId,
        payment_method: paymentMethod,
      });

      refreshData();
      setShowAddModal(false);
      setNewName('');
      setNewEmail('');
      setNewPhone('');
    } catch (err: any) {
      setAddError(err.message || 'Failed to create member.');
    }
  };

  const handleToggleSuspend = (memberId: string, currentStatus?: string) => {
    const isSuspended = currentStatus === 'suspended';
    const membership = gymDb.getMemberCurrentMembership(memberId);
    if (!membership) return;

    if (confirm(`${isSuspended ? 'Reactivate' : 'Suspend'} this member's pass?`)) {
      gymDb.setMembershipStatus(membership.id, isSuspended ? 'active' : 'suspended');
      refreshData();
    }
  };

  const handleQuickRenew = (memberId: string, planId?: string) => {
    if (!planId) return;
    if (confirm('Renew this membership now? This will extend their pass and log verified payment.')) {
      gymDb.renewMembership(memberId, planId, 'cash');
      refreshData();
    }
  };

  // Filtering
  const filteredMembers = members.filter((m) => {
    // Status filter
    if (statusFilter !== 'all') {
      if (m.membership?.status !== statusFilter) return false;
    }
    // Plan filter
    if (planFilter !== 'all') {
      if (m.membership?.plan_id !== planFilter) return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = m.profile.full_name.toLowerCase().includes(q);
      const matchEmail = m.profile.email.toLowerCase().includes(q);
      const matchPhone = m.profile.phone?.toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchPhone) return false;
    }
    return true;
  });

  return (
    <>
      <Helmet>
        <title>Member Directory & Management | Elite Zumba & Fitness Studio</title>
      </Helmet>

      <div className="space-y-6 sm:space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[var(--accent-secondary,#FF2E44)] text-xs font-mono font-semibold uppercase tracking-wider mb-2">
              <span>Roster & Access Management</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold uppercase text-white tracking-wide">
              MEMBER DIRECTORY
            </h1>
            <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary,#A0A0A0)]">
              Search, enroll, review attendance frequency, and process renewals.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="py-3 px-5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-[var(--accent-primary,#D70015)] text-white hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(215,0,21,0.4)] active:scale-95 self-start sm:self-auto flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">person_add</span>
            <span>Enroll New Member</span>
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-surface,#121212)] border border-white/10 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            
            {/* Search Input */}
            <div className="flex-1 relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 text-lg">
                search
              </span>
              <input
                type="text"
                placeholder="Search member by name, email, or phone number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 focus:border-[var(--accent-primary,#D70015)] rounded-xl py-2.5 pl-11 pr-4 text-xs font-mono text-white placeholder-white/30 outline-none"
              />
            </div>

            {/* Status Filter */}
            <div className="sm:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 focus:border-[var(--accent-primary,#D70015)] rounded-xl py-2.5 px-3 text-xs font-mono text-white outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active Passes</option>
                <option value="expiring_soon">Expiring Soon</option>
                <option value="expired">Expired</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>

            {/* Plan Filter */}
            <div className="sm:w-56">
              <select
                value={planFilter}
                onChange={(e) => setPlanFilter(e.target.value)}
                className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 focus:border-[var(--accent-primary,#D70015)] rounded-xl py-2.5 px-3 text-xs font-mono text-white outline-none"
              >
                <option value="all">All Plans</option>
                {plans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

          </div>

          <div className="text-[11px] font-mono text-white/50 flex items-center justify-between">
            <span>Showing {filteredMembers.length} of {members.length} Registered Members</span>
            {(searchQuery || statusFilter !== 'all' || planFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                  setPlanFilter('all');
                }}
                className="text-[var(--accent-secondary,#FF2E44)] hover:underline"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Member Table */}
        <div className="rounded-3xl bg-[var(--bg-surface,#121212)] border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-white/5 border-b border-white/10 text-white/50 uppercase text-[10px]">
                <tr>
                  <th className="py-4 px-4 sm:px-6">Member</th>
                  <th className="py-4 px-3">Plan & Tier</th>
                  <th className="py-4 px-3">Status</th>
                  <th className="py-4 px-3">Expiry Date</th>
                  <th className="py-4 px-3">Remaining</th>
                  <th className="py-4 px-3">Visits</th>
                  <th className="py-4 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredMembers.map((m) => (
                  <tr key={m.profile.id} className="hover:bg-white/5 transition-colors">
                    
                    {/* Member Column */}
                    <td className="py-4 px-4 sm:px-6">
                      <Link to={`/owner/members/${m.profile.id}`} className="flex items-center gap-3 group">
                        <img
                          src={m.profile.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}
                          alt={m.profile.full_name}
                          className="w-10 h-10 rounded-xl object-cover border border-white/10 group-hover:border-[var(--accent-primary,#D70015)] transition-colors"
                        />
                        <div>
                          <div className="font-display font-bold uppercase text-white group-hover:text-[var(--accent-secondary,#FF2E44)] text-sm transition-colors">
                            {m.profile.full_name}
                          </div>
                          <div className="text-[11px] text-white/40 font-mono">
                            {m.profile.email} {m.profile.phone && `• ${m.profile.phone}`}
                          </div>
                        </div>
                      </Link>
                    </td>

                    {/* Plan */}
                    <td className="py-4 px-3 text-white">
                      {m.membership ? (
                        <div>
                          <div className="font-bold">{m.membership.plan_name_snapshot}</div>
                          <div className="text-[10px] text-white/40">₹{m.membership.price_snapshot}</div>
                        </div>
                      ) : (
                        <span className="text-white/40">No active plan</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-3">
                      {m.membership?.status === 'active' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-green-500/20 text-green-400 border border-green-500/30">
                          Active
                        </span>
                      )}
                      {m.membership?.status === 'expiring_soon' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                          Expiring Soon
                        </span>
                      )}
                      {m.membership?.status === 'expired' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-red-500/20 text-red-400 border border-red-500/30">
                          Expired
                        </span>
                      )}
                      {m.membership?.status === 'suspended' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-orange-500/20 text-orange-400 border border-orange-500/30">
                          Suspended
                        </span>
                      )}
                    </td>

                    {/* Expiry */}
                    <td className="py-4 px-3 text-white/80">
                      {m.membership?.expiry_date || '—'}
                    </td>

                    {/* Remaining Days */}
                    <td className="py-4 px-3">
                      {m.membership ? (
                        m.remainingDays > 0 ? (
                          <span className={m.remainingDays <= 7 ? 'text-yellow-400 font-bold' : 'text-green-400'}>
                            {m.remainingDays} Days
                          </span>
                        ) : (
                          <span className="text-red-400 font-bold">0 Days</span>
                        )
                      ) : (
                        '—'
                      )}
                    </td>

                    {/* Visits */}
                    <td className="py-4 px-3 text-white/80">
                      <span className="font-bold text-white">{m.monthlyVisits}</span> / mo
                      {m.streak > 0 && <span className="ml-1 text-orange-400">🔥{m.streak}</span>}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/owner/members/${m.profile.id}`}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white"
                          title="View Profile Dossier"
                        >
                          <span className="material-symbols-outlined text-base">visibility</span>
                        </Link>

                        {m.membership && (
                          <button
                            onClick={() => handleQuickRenew(m.profile.id, m.membership.plan_id || plans[0]?.id)}
                            className="p-1.5 rounded-lg bg-yellow-500/15 hover:bg-yellow-500/30 text-yellow-400"
                            title="Quick Renew Pass"
                          >
                            <span className="material-symbols-outlined text-base">autorenew</span>
                          </button>
                        )}

                        <button
                          onClick={() => handleToggleSuspend(m.profile.id, m.membership?.status)}
                          className={`p-1.5 rounded-lg ${
                            m.membership?.status === 'suspended'
                              ? 'bg-green-500/15 text-green-400 hover:bg-green-500/30'
                              : 'bg-red-500/10 text-red-400 hover:bg-red-500/25'
                          }`}
                          title={m.membership?.status === 'suspended' ? 'Reactivate Pass' : 'Suspend Pass'}
                        >
                          <span className="material-symbols-outlined text-base">
                            {m.membership?.status === 'suspended' ? 'play_arrow' : 'pause'}
                          </span>
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>

            {filteredMembers.length === 0 && (
              <div className="text-center py-12 text-white/40 font-mono text-xs">
                No members found matching your search and filter criteria.
              </div>
            )}
          </div>
        </div>

        {/* Modal: Enroll New Member */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="max-w-md w-full bg-[var(--bg-surface,#121212)] border border-white/15 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <h3 className="text-lg font-display font-bold uppercase text-white">Enroll New Gym Member</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-lg hover:bg-white/10 text-white/60 hover:text-white"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {addError && (
                <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
                  {addError}
                </div>
              )}

              <form onSubmit={handleAddMember} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-white/60 mb-1 uppercase font-bold">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Manish Kumar"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 focus:border-[var(--accent-primary,#D70015)] rounded-xl py-2 px-3 text-white outline-none font-sans"
                  />
                </div>

                <div>
                  <label className="block text-white/60 mb-1 uppercase font-bold">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="member@domain.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 focus:border-[var(--accent-primary,#D70015)] rounded-xl py-2 px-3 text-white outline-none font-sans"
                  />
                </div>

                <div>
                  <label className="block text-white/60 mb-1 uppercase font-bold">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 90000 00000"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 focus:border-[var(--accent-primary,#D70015)] rounded-xl py-2 px-3 text-white outline-none font-sans"
                  />
                </div>

                <div>
                  <label className="block text-white/60 mb-1 uppercase font-bold">Initial Membership Plan</label>
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

                <div>
                  <label className="block text-white/60 mb-1 uppercase font-bold">Payment Method Received</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 focus:border-[var(--accent-primary,#D70015)] rounded-xl py-2 px-3 text-white outline-none"
                  >
                    <option value="cash">Cash at Front Desk</option>
                    <option value="upi">UPI / PhonePe / GPay</option>
                    <option value="card">Card POS</option>
                    <option value="bank_transfer">Bank NEFT/IMPS</option>
                  </select>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-[var(--accent-primary,#D70015)] hover:bg-white hover:text-black text-white font-bold uppercase shadow-[0_0_15px_rgba(215,0,21,0.4)]"
                  >
                    Confirm Enrollment
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
