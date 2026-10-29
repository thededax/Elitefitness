import React, { useState, useEffect } from 'react';
import { gymDb } from '../../lib/supabase';
import type { Payment, Profile } from '../../lib/database.types';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function OwnerPayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [members, setMembers] = useState<Profile[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [amount, setAmount] = useState('1999');
  const [method, setMethod] = useState<Payment['payment_method']>('cash');
  const [txRef, setTxRef] = useState('');
  const [notes, setNotes] = useState('');

  const refreshPayments = () => {
    setPayments(gymDb.getPayments());
    setMembers(gymDb.getAllMembersWithDetails().map((m) => m.profile));
  };

  useEffect(() => {
    refreshPayments();
  }, []);

  useEffect(() => {
    if (members.length > 0 && !selectedMemberId) {
      setSelectedMemberId(members[0].id);
    }
  }, [members, selectedMemberId]);

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMemberId) return;

    gymDb.recordPayment({
      member_id: selectedMemberId,
      amount: parseFloat(amount) || 0,
      currency: 'INR',
      payment_method: method,
      status: 'completed',
      transaction_reference: txRef.trim() || `MANUAL-${Date.now().toString().slice(-6)}`,
      paid_at: new Date().toISOString(),
      notes: notes.trim() || 'Manual receipt recorded by owner',
    });

    refreshPayments();
    setShowAddModal(false);
    setAmount('1999');
    setTxRef('');
    setNotes('');
  };

  const totalCollected = payments
    .filter((p) => p.status === 'completed')
    .reduce((sum, p) => sum + Number(p.amount), 0);

  return (
    <>
      <Helmet>
        <title>Payments Ledger & Revenue | Elite Zumba & Fitness Studio</title>
      </Helmet>

      <div className="space-y-6 sm:space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[var(--accent-secondary,#FF2E44)] text-xs font-mono font-semibold uppercase tracking-wider mb-2">
              <span>Financial Receipts Ledger</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold uppercase text-white tracking-wide">
              PAYMENTS LEDGER
            </h1>
            <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary,#A0A0A0)]">
              Real-time audit of cash receipts, UPI transactions, and membership renewals.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[var(--bg-surface,#121212)] border border-white/10 text-right">
              <div className="text-[10px] font-mono uppercase text-white/50">Total Revenue Collected</div>
              <div className="text-xl font-display font-bold text-white">
                ₹{totalCollected.toLocaleString('en-IN')}
              </div>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="py-3 px-5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-[var(--accent-primary,#D70015)] text-white hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(215,0,21,0.4)] active:scale-95 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">add</span>
              <span>Record Payment</span>
            </button>
          </div>
        </div>

        {/* Payments Table */}
        <div className="rounded-3xl bg-[var(--bg-surface,#121212)] border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-white/5 border-b border-white/10 text-white/50 uppercase text-[10px]">
                <tr>
                  <th className="py-4 px-4 sm:px-6">Member</th>
                  <th className="py-4 px-3">Date Paid</th>
                  <th className="py-4 px-3">Amount</th>
                  <th className="py-4 px-3">Method</th>
                  <th className="py-4 px-3">Tx Reference</th>
                  <th className="py-4 px-3">Notes</th>
                  <th className="py-4 px-4 sm:px-6 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {payments.map((p) => {
                  const member = gymDb.getProfile(p.member_id);

                  return (
                    <tr key={p.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 sm:px-6">
                        <Link
                          to={`/owner/members/${p.member_id}`}
                          className="font-display font-bold uppercase text-white hover:text-[var(--accent-secondary,#FF2E44)] text-sm transition-colors"
                        >
                          {member?.full_name || 'Member'}
                        </Link>
                        <div className="text-[10px] text-white/40">{member?.email}</div>
                      </td>

                      <td className="py-4 px-3 text-white/80">
                        {new Date(p.paid_at).toLocaleDateString()}
                      </td>

                      <td className="py-4 px-3 text-white font-bold text-sm">
                        ₹{Number(p.amount).toLocaleString('en-IN')}
                      </td>

                      <td className="py-4 px-3 uppercase text-white/70">
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px]">
                          {p.payment_method}
                        </span>
                      </td>

                      <td className="py-4 px-3 text-white/50 font-mono text-[11px]">
                        {p.transaction_reference || '—'}
                      </td>

                      <td className="py-4 px-3 text-white/60 font-sans max-w-xs truncate">
                        {p.notes || '—'}
                      </td>

                      <td className="py-4 px-4 sm:px-6 text-right">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-green-500/20 text-green-400 border border-green-500/30">
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {payments.length === 0 && (
              <div className="text-center py-12 text-white/40 font-mono text-xs">
                No payments logged yet.
              </div>
            )}
          </div>
        </div>

        {/* Modal: Record Manual Payment */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="max-w-md w-full bg-[var(--bg-surface,#121212)] border border-white/15 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <h3 className="text-lg font-display font-bold uppercase text-white">Record Manual Payment</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-lg hover:bg-white/10 text-white/60 hover:text-white"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <form onSubmit={handleRecordPayment} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-white/60 mb-1 uppercase font-bold">Select Member *</label>
                  <select
                    value={selectedMemberId}
                    onChange={(e) => setSelectedMemberId(e.target.value)}
                    className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 focus:border-[var(--accent-primary,#D70015)] rounded-xl py-2 px-3 text-white outline-none"
                  >
                    {members.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.full_name} ({m.email})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/60 mb-1 uppercase font-bold">Amount (₹ INR) *</label>
                    <input
                      type="number"
                      required
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 focus:border-[var(--accent-primary,#D70015)] rounded-xl py-2 px-3 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-white/60 mb-1 uppercase font-bold">Method *</label>
                    <select
                      value={method}
                      onChange={(e) => setMethod(e.target.value as any)}
                      className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 focus:border-[var(--accent-primary,#D70015)] rounded-xl py-2 px-3 text-white outline-none"
                    >
                      <option value="cash">Cash (Front Desk)</option>
                      <option value="upi">UPI / QR Code</option>
                      <option value="card">Card POS</option>
                      <option value="bank_transfer">Bank Transfer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white/60 mb-1 uppercase font-bold">Transaction Reference / Receipt #</label>
                  <input
                    type="text"
                    placeholder="e.g. REC-2026-092 or UPI Txn ID"
                    value={txRef}
                    onChange={(e) => setTxRef(e.target.value)}
                    className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 focus:border-[var(--accent-primary,#D70015)] rounded-xl py-2 px-3 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white/60 mb-1 uppercase font-bold">Notes</label>
                  <input
                    type="text"
                    placeholder="e.g. Month 2 fee payment"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 focus:border-[var(--accent-primary,#D70015)] rounded-xl py-2 px-3 text-white outline-none font-sans"
                  />
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
                    className="flex-1 py-2.5 rounded-xl bg-[var(--accent-primary,#D70015)] hover:bg-white hover:text-black text-white font-bold uppercase shadow-md"
                  >
                    Log Verified Payment
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
