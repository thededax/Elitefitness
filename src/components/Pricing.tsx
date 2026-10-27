import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { selectProgramAndScroll } from '../lib/funnelState';

type BillingCadence = 'monthly' | 'quarterly' | 'annual';

interface PlanTier {
  id: string;
  name: string;
  badge?: string;
  desc: string;
  monthlyPrice: number;
  quarterlyPrice: number;
  annualPrice: number;
  features: string[];
  highlighted: boolean;
  ctaText: string;
}

const plans: PlanTier[] = [
  {
    id: 'starter',
    name: 'Starter Track',
    desc: 'Structured entry into strength & conditioning with essential facility access.',
    monthlyPrice: 999,
    quarterlyPrice: 2550, // ~15% off
    annualPrice: 8990,    // ~25% off
    features: [
      'Full Gym Floor Access (Off-Peak Hours)',
      '1 Group Zumba / HIIT Class Per Week',
      'Initial Biomechanical Assessment',
      'Locker & Shower Amenities Access',
      'Elite Community App Access'
    ],
    highlighted: false,
    ctaText: 'Select Starter Plan'
  },
  {
    id: 'elite',
    name: 'Elite Transformation',
    badge: 'MOST POPULAR',
    desc: 'Unrestricted all-access pass for committed athletes and continuous progress.',
    monthlyPrice: 1999,
    quarterlyPrice: 5099, // ~15% off
    annualPrice: 17990,   // ~25% off
    features: [
      'Full 24/7 Unlimited Gym Floor Access',
      'Unlimited Group Zumba & HIIT Classes',
      '1 Free 1-on-1 Personal Training Session/Mo',
      'Recovery Zone & Foam Rolling Station',
      'Bi-Weekly In-Body Composition Scans',
      'Complimentary Guest Pass (1 per month)'
    ],
    highlighted: true,
    ctaText: 'Claim Elite Membership'
  },
  {
    id: 'vip',
    name: 'VIP Private Coaching',
    desc: 'The complete high-performance transformation protocol with direct mentorship.',
    monthlyPrice: 3999,
    quarterlyPrice: 10199, // ~15% off
    annualPrice: 35990,    // ~25% off
    features: [
      'Everything Included in Elite Tier',
      'Weekly 1-on-1 Dedicated Coach Mentorship',
      'Customized Metabolic Nutrition & Macro Plan',
      'Priority Class Reservation Privileges',
      'Direct WhatsApp Coach Check-in Support',
      'Free Elite Gym Performance Apparel Pack'
    ],
    highlighted: false,
    ctaText: 'Apply for VIP Coaching'
  }
];

export default function Pricing() {
  const [cadence, setCadence] = useState<BillingCadence>('quarterly');

  const getPrice = (plan: PlanTier) => {
    switch (cadence) {
      case 'quarterly':
        return plan.quarterlyPrice;
      case 'annual':
        return plan.annualPrice;
      default:
        return plan.monthlyPrice;
    }
  };

  const getPeriodLabel = () => {
    switch (cadence) {
      case 'quarterly':
        return '/ 3 months';
      case 'annual':
        return '/ year';
      default:
        return '/ month';
    }
  };

  const getMonthlyEquivalent = (plan: PlanTier) => {
    if (cadence === 'quarterly') {
      return `₹${Math.round(plan.quarterlyPrice / 3).toLocaleString('en-IN')}/mo billed quarterly`;
    }
    if (cadence === 'annual') {
      return `₹${Math.round(plan.annualPrice / 12).toLocaleString('en-IN')}/mo billed annually`;
    }
    return 'Billed monthly, cancel anytime';
  };

  return (
    <section className="relative py-16 md:py-28 bg-[var(--bg-canvas,#080808)]" id="pricing">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--accent-secondary,#FF2E44)] text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <span>04 / MEMBERSHIP TIERS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-display font-extrabold uppercase text-[var(--text-primary,#FFFFFF)] leading-none">
            TRANSPARENT <span className="text-[var(--accent-primary,#D70015)]">MEMBERSHIPS</span>
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary,#A0A0A0)] mt-3">
            No hidden maintenance charges or surprise fees. All plans include 3-Day risk-free trial compatibility.
          </p>

          {/* Interactive Cadence Toggle Switch */}
          <div className="mt-8 inline-flex items-center justify-center p-1 rounded-xl bg-[var(--bg-surface,#121212)] border border-white/10 max-w-full overflow-x-auto hide-scrollbar" role="tablist" aria-label="Billing cadence">
            <button
              onClick={() => setCadence('monthly')}
              role="tab"
              aria-selected={cadence === 'monthly'}
              className={`px-3 sm:px-5 py-2 rounded-lg text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-all shrink-0 ${
                cadence === 'monthly'
                  ? 'bg-[var(--accent-primary,#D70015)] text-white shadow-md'
                  : 'text-[var(--text-secondary)] hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setCadence('quarterly')}
              role="tab"
              aria-selected={cadence === 'quarterly'}
              className={`px-3 sm:px-5 py-2 rounded-lg text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0 ${
                cadence === 'quarterly'
                  ? 'bg-[var(--accent-primary,#D70015)] text-white shadow-md'
                  : 'text-[var(--text-secondary)] hover:text-white'
              }`}
            >
              <span>Quarterly</span>
              <span className="text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded bg-[var(--accent-deep,#9E0010)] text-white font-mono whitespace-nowrap">
                Save 15%
              </span>
            </button>
            <button
              onClick={() => setCadence('annual')}
              role="tab"
              aria-selected={cadence === 'annual'}
              className={`px-3 sm:px-5 py-2 rounded-lg text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0 ${
                cadence === 'annual'
                  ? 'bg-[var(--accent-primary,#D70015)] text-white shadow-md'
                  : 'text-[var(--text-secondary)] hover:text-white'
              }`}
            >
              <span>Annual</span>
              <span className="text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded bg-[var(--accent-deep,#9E0010)] text-white font-mono whitespace-nowrap">
                Save 25%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Comparison Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => {
            const price = getPrice(plan);
            const periodLabel = getPeriodLabel();
            const subLabel = getMonthlyEquivalent(plan);

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`relative rounded-2xl flex flex-col justify-between p-6 sm:p-8 md:p-10 transition-all duration-300 ${
                  plan.highlighted
                    ? 'border-2 border-[var(--accent-primary,#D70015)] bg-[var(--bg-surface-elevated,#181818)] shadow-[0_0_45px_rgba(215,0,21,0.25)] lg:-translate-y-2'
                    : 'border border-[var(--border-subtle)] bg-[var(--bg-surface,#121212)] hover:border-white/20'
                }`}
              >
                {/* Most Popular Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[var(--accent-primary,#D70015)] text-white text-[10px] font-mono font-extrabold uppercase tracking-widest shadow-lg">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold uppercase text-[var(--text-primary)] mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] min-h-[42px] leading-relaxed mb-6 font-normal">
                    {plan.desc}
                  </p>

                  {/* Price Block with Tabular Numeric Transition */}
                  <div className="mb-6 pb-6 border-b border-white/10">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-mono font-bold text-[var(--accent-secondary,#FF2E44)]">₹</span>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={`${plan.id}-${cadence}`}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.2 }}
                          className="text-4xl sm:text-5xl lg:text-6xl font-mono font-extrabold tracking-tight text-[var(--text-primary)]"
                        >
                          {price.toLocaleString('en-IN')}
                        </motion.span>
                      </AnimatePresence>
                      <span className="text-xs font-mono uppercase text-[var(--text-muted)]">
                        {periodLabel}
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-[var(--text-muted)] mt-1">
                      {subLabel}
                    </p>
                  </div>

                  {/* Features List */}
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-4">
                      Tier Privileges:
                    </h4>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-primary)]">
                          <span className={`material-symbols-outlined text-base shrink-0 mt-0.5 ${
                            plan.highlighted ? 'text-[var(--accent-secondary,#FF2E44)]' : 'text-emerald-400'
                          }`}>
                            check_circle
                          </span>
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Plan Selection CTA */}
                <div>
                  <button
                    onClick={() => selectProgramAndScroll(`${plan.name} (${cadence.toUpperCase()})`)}
                    className={`w-full py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                      plan.highlighted
                        ? 'bg-[var(--accent-primary,#D70015)] text-white hover:bg-white hover:text-black shadow-xl'
                        : 'bg-transparent border border-white/20 text-white hover:bg-white hover:text-black'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                  <p className="text-[10px] font-mono text-center text-[var(--text-muted)] mt-2">
                    Direct WhatsApp & Desk Onboarding
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
