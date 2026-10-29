import React, { useState, useEffect } from 'react';
import { gymDb } from '../../lib/supabase';
import type { MembershipPlan } from '../../lib/database.types';
import { Helmet } from 'react-helmet-async';

export default function OwnerPlans() {
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [duration, setDuration] = useState('30');
  const [price, setPrice] = useState('999');
  const [featuresStr, setFeaturesStr] = useState('');

  const refreshPlans = () => {
    setPlans(gymDb.getAllPlans());
  };

  useEffect(() => {
    refreshPlans();
  }, []);

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    gymDb.createPlan({
      name: name.trim(),
      description: desc.trim() || null,
      duration_days: parseInt(duration, 10) || 30,
      price: parseFloat(price) || 0,
      currency: 'INR',
      is_active: true,
      features: featuresStr
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean),
    });

    refreshPlans();
    setShowAddModal(false);
    setName('');
    setDesc('');
    setDuration('30');
    setPrice('999');
    setFeaturesStr('');
  };

  const handleToggleActive = (plan: MembershipPlan) => {
    gymDb.updatePlan(plan.id, { is_active: !plan.is_active });
    refreshPlans();
  };

  return (
    <>
      <Helmet>
        <title>Membership Plans & Pricing Management | Elite Zumba & Fitness Studio</title>
      </Helmet>

      <div className="space-y-6 sm:space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[var(--accent-secondary,#FF2E44)] text-xs font-mono font-semibold uppercase tracking-wider mb-2">
              <span>Catalog & Revenue Tiers</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold uppercase text-white tracking-wide">
              MEMBERSHIP PLANS
            </h1>
            <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary,#A0A0A0)]">
              Define pricing tiers, access durations, and inclusive studio benefits.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="py-3 px-5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-[var(--accent-primary,#D70015)] text-white hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(215,0,21,0.4)] active:scale-95 self-start sm:self-auto flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span>Create New Plan Tier</span>
          </button>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                plan.is_active
                  ? 'bg-[var(--bg-surface,#121212)] border-white/10 hover:border-white/25 shadow-xl'
                  : 'bg-white/[0.02] border-white/5 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                    plan.is_active
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-white/10 text-white/50'
                  }`}>
                    {plan.is_active ? 'Active Tier' : 'Deactivated'}
                  </span>
                  <span className="text-xs font-mono text-white/40">{plan.duration_days} Days</span>
                </div>

                <h3 className="text-xl font-display font-bold uppercase text-white">
                  {plan.name}
                </h3>
                <p className="text-xs font-sans text-[var(--text-secondary,#A0A0A0)] mt-1 line-clamp-2">
                  {plan.description}
                </p>

                <div className="my-5 pb-5 border-b border-white/10">
                  <div className="text-3xl font-display font-extrabold text-white">
                    ₹{plan.price.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] font-mono text-white/40 mt-0.5">
                    For {plan.duration_days} days full access
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {plan.features?.map((f, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs font-mono text-white/80">
                      <span className="material-symbols-outlined text-sm text-[var(--accent-primary,#D70015)] shrink-0 mt-0.5">
                        check
                      </span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => handleToggleActive(plan)}
                  className={`py-2 px-4 rounded-xl text-xs font-mono font-bold uppercase transition-all w-full text-center ${
                    plan.is_active
                      ? 'bg-white/10 hover:bg-red-500/20 text-white hover:text-red-400'
                      : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                  }`}
                >
                  {plan.is_active ? 'Deactivate Tier' : 'Reactivate Tier'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Create Plan */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="max-w-md w-full bg-[var(--bg-surface,#121212)] border border-white/15 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <h3 className="text-lg font-display font-bold uppercase text-white">Create Membership Plan</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-lg hover:bg-white/10 text-white/60 hover:text-white"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <form onSubmit={handleCreatePlan} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-white/60 mb-1 uppercase font-bold">Plan Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Student Athletic Pass"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 focus:border-[var(--accent-primary,#D70015)] rounded-xl py-2 px-3 text-white outline-none font-sans"
                  />
                </div>

                <div>
                  <label className="block text-white/60 mb-1 uppercase font-bold">Description</label>
                  <textarea
                    rows={2}
                    placeholder="Access description..."
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 focus:border-[var(--accent-primary,#D70015)] rounded-xl py-2 px-3 text-white outline-none font-sans"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/60 mb-1 uppercase font-bold">Duration (Days) *</label>
                    <input
                      type="number"
                      required
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 focus:border-[var(--accent-primary,#D70015)] rounded-xl py-2 px-3 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-white/60 mb-1 uppercase font-bold">Price (₹ INR) *</label>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 focus:border-[var(--accent-primary,#D70015)] rounded-xl py-2 px-3 text-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/60 mb-1 uppercase font-bold">Included Features (One per line)</label>
                  <textarea
                    rows={3}
                    placeholder="Full gym floor access&#10;Zumba classes included&#10;Locker access"
                    value={featuresStr}
                    onChange={(e) => setFeaturesStr(e.target.value)}
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
                    Create Tier
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
