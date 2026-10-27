import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import BentoPrograms from '../components/BentoPrograms';
import ClassSchedule from '../components/ClassSchedule';
import BmiCalculator from '../components/BmiCalculator';
import Pricing from '../components/Pricing';
import TrainerRoster from '../components/TrainerRoster';
import TrialBookingHub from '../components/TrialBookingHub';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import Marquee from '../components/Marquee';
import { selectProgramAndScroll } from '../lib/funnelState';

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <>
      <Helmet>
        <title>The Elite Fitness & Zumba Studio | Bhagalpur's Premier Gym</title>
        <meta
          name="description"
          content="The Elite Fitness: Bhagalpur's premier strength, conditioning, and Zumba destination. 5,000 sq.ft facility, certified coaches, 4.9★ rating. Claim your Free 3-Day Trial Pass."
        />
      </Helmet>

      {/* =========================================================================
          SECTION 1: 7/5 ASYMMETRICAL PERFORMANCE SPLIT HERO (VICTORY CRIMSON RED)
          ========================================================================= */}
      <section
        ref={heroRef}
        className="relative min-h-[92vh] lg:min-h-screen flex items-center pt-24 sm:pt-28 pb-16 lg:py-0 bg-[var(--bg-canvas,#080808)] overflow-hidden"
      >
        {/* Subtle Background Grid & Crimson Glow Overlay */}
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[var(--accent-primary,#D70015)]/12 blur-[130px] pointer-events-none" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-[var(--accent-primary,#D70015)]/8 blur-[150px] pointer-events-none" />

        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left 7 Columns: Core Value Proposition & Primary Conversion Cluster */}
            <div className="lg:col-span-7 flex flex-col items-start">
              
              {/* Eyebrow Badge: Verified Hours & Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border-accent,rgba(215,0,21,0.45))] bg-[var(--bg-surface,#121212)]/90 backdrop-blur-md mb-6 shadow-md max-w-full"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--accent-primary,#D70015)] animate-pulse shrink-0" />
                <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--accent-secondary,#FF2E44)] leading-tight">
                  OPEN DAILY 6:00 AM – 10:00 PM • KOTWALI CHOWK, BHAGALPUR
                </span>
              </motion.div>

              {/* Bold Condensed Display H1 Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-display font-extrabold uppercase text-[var(--text-primary,#FFFFFF)] leading-[0.92] tracking-tight mb-6"
              >
                ENGINEER YOUR <br />
                <span className="text-[var(--accent-primary,#D70015)] drop-shadow-[0_0_35px_rgba(215,0,21,0.4)]">STRONGEST SELF.</span>
              </motion.h1>

              {/* High-Clarity Anti-Fluff Subcopy */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-sm sm:text-lg text-[var(--text-secondary,#A0A0A0)] font-normal leading-relaxed max-w-[54ch] mb-8"
              >
                Bhagalpur's 5,000 sq.ft high-performance sanctuary. Olympic barbell platforms, high-energy Zumba, and certified coaching mentorship. No complex commitments — start with a zero-risk 3-day pass.
              </motion.p>

              {/* Dual Conversion CTA Cluster */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto mb-10"
              >
                <button
                  onClick={() => selectProgramAndScroll('3-Day Free Trial Pass')}
                  className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-mono font-extrabold uppercase tracking-wider bg-[var(--accent-primary,#D70015)] text-white hover:bg-white hover:text-black transition-all shadow-[0_0_30px_rgba(215,0,21,0.45)] flex items-center justify-center gap-2 active:scale-95"
                >
                  <span>Claim Free 3-Day Trial Pass</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>

                <a
                  href="#schedule"
                  className="px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-mono font-bold uppercase tracking-wider bg-[var(--bg-surface,#121212)] text-[var(--text-primary,#FFFFFF)] border border-white/15 hover:border-[var(--accent-primary,#D70015)] hover:text-[var(--accent-secondary,#FF2E44)] transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">calendar_month</span>
                  <span>View Class Schedule</span>
                </a>
              </motion.div>

              {/* 4-Metric Credibility & Proof Strip */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 pt-6 border-t border-[var(--border-subtle)] w-full"
              >
                <div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-mono font-bold text-[var(--text-primary)]">
                    500+
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mt-0.5">
                    Active Members
                  </div>
                </div>

                <div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-mono font-bold text-[var(--accent-primary,#D70015)]">
                    6+ Yrs
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mt-0.5">
                    Est. 2018 Bhagalpur
                  </div>
                </div>

                <div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-mono font-bold text-[var(--text-primary)] flex items-center gap-1">
                    4.9 <span className="material-symbols-outlined text-[var(--accent-primary,#D70015)] text-base sm:text-lg">star</span>
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mt-0.5">
                    Google Reviews
                  </div>
                </div>

                <div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-mono font-bold text-[var(--text-primary)]">
                    25+
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mt-0.5">
                    Weekly Classes
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Right 5 Columns: Framed 4:5 Visual with Floating Quick Goal Matcher */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface,#121212)] aspect-[4/5] magazine-shadow"
              >
                {/* Hero Athlete Image with Unified Athletic Filter */}
                <motion.div style={{ y: yParallax }} className="absolute inset-0 -top-[10%] -bottom-[10%]">
                  <img
                    src="/images/hero-1.png"
                    alt="Elite Fitness Athlete & Facility"
                    className="w-full h-full object-cover gym-photo-grade"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-canvas,#080808)] via-[var(--bg-canvas,#080808)]/30 to-transparent" />
                </motion.div>

                {/* Floating Glassmorphic Quick Goal Matcher Card */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 z-20 rounded-xl border border-[var(--border-accent,rgba(215,0,21,0.45))] bg-[var(--bg-surface,#121212)]/95 backdrop-blur-xl p-3.5 sm:p-5 shadow-2xl">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <span className="text-[10px] font-mono uppercase font-bold text-[var(--accent-secondary,#FF2E44)] tracking-wider">
                      🎯 Quick Goal Matcher
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono text-[var(--text-muted)]">
                      Instant Pathway
                    </span>
                  </div>
                  
                  <p className="text-[11px] sm:text-xs text-[var(--text-primary)] font-semibold mb-2 sm:mb-3">
                    What is your primary fitness focus?
                  </p>

                  <div className="grid grid-cols-1 gap-1.5 sm:gap-2">
                    <button
                      onClick={() => selectProgramAndScroll('Strength & Hypertrophy')}
                      className="px-3 py-1.5 sm:py-2 rounded-lg text-left text-[11px] sm:text-xs font-mono font-semibold bg-[var(--bg-surface-elevated,#181818)] hover:bg-[var(--accent-primary,#D70015)] hover:text-white border border-white/5 transition-all flex items-center justify-between group"
                    >
                      <span>🏋️ Strength & Hypertrophy</span>
                      <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[var(--text-muted)] group-hover:text-white">
                        Explore →
                      </span>
                    </button>
                    <button
                      onClick={() => selectProgramAndScroll('Zumba Energy & Dance Fitness')}
                      className="px-3 py-1.5 sm:py-2 rounded-lg text-left text-[11px] sm:text-xs font-mono font-semibold bg-[var(--bg-surface-elevated,#181818)] hover:bg-[var(--accent-primary,#D70015)] hover:text-white border border-white/5 transition-all flex items-center justify-between group"
                    >
                      <span>💃 Zumba Energy & Fat Loss</span>
                      <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[var(--text-muted)] group-hover:text-white">
                        Explore →
                      </span>
                    </button>
                    <button
                      onClick={() => selectProgramAndScroll('1-on-1 Elite Coaching')}
                      className="px-3 py-1.5 sm:py-2 rounded-lg text-left text-[11px] sm:text-xs font-mono font-semibold bg-[var(--bg-surface-elevated,#181818)] hover:bg-[var(--accent-primary,#D70015)] hover:text-white border border-white/5 transition-all flex items-center justify-between group"
                    >
                      <span>🎯 1-on-1 Private Mentorship</span>
                      <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[var(--text-muted)] group-hover:text-white">
                        Explore →
                      </span>
                    </button>
                  </div>
                </div>

              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: KINETIC BULLS & UFC VICTORY CRIMSON MARQUEE STRIP
          ========================================================================= */}
      <div className="w-full bg-[var(--accent-primary,#D70015)] py-3 overflow-hidden shadow-[0_0_40px_rgba(215,0,21,0.35)] select-none">
        <Marquee
          items={[
            "DEFY LIMITS",
            "5,000 SQ.FT SANCTUARY",
            "OLYMPIC BARBELL PLATFORMS",
            "HIGH-ENERGY ZUMBA",
            "CERTIFIED COACHING",
            "BHAGALPUR'S HIGHEST RATED",
            "PROGRESSIVE OVERLOAD"
          ]}
          className="text-white font-display font-extrabold text-lg sm:text-xl tracking-wider"
          speed={35}
        />
      </div>

      {/* =========================================================================
          SECTION 3: BRAND HERITAGE & FACILITY HIGHLIGHTS
          ========================================================================= */}
      <section className="py-16 md:py-28 bg-[var(--bg-canvas,#080808)] relative overflow-hidden" id="about">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Visual Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "0px 0px -80px 0px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 relative"
            >
              <div className="rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface,#121212)] aspect-video sm:aspect-square relative magazine-shadow">
                <img
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
                  alt="Elite Fitness Facility Interior"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover gym-photo-grade"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-canvas,#080808)] via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-mono uppercase text-[var(--accent-secondary,#FF2E44)] font-bold">5,000 Sq.Ft Floor</p>
                    <p className="text-xs text-[var(--text-secondary)]">Savitri Tower, Kotwali Chowk</p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-1 rounded bg-[var(--accent-primary,#D70015)] text-white font-bold uppercase">
                    Pristine Hygiene
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Content Narrative */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -80px 0px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--accent-secondary,#FF2E44)] text-xs font-mono font-semibold uppercase tracking-wider mb-4">
                <span>ESTABLISHED 2018</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-display font-extrabold uppercase text-[var(--text-primary)] leading-[0.95] tracking-tight mb-6">
                BUILT ON PASSION. <br />
                <span className="text-[var(--accent-primary,#D70015)]">BACKED BY SCIENCE.</span>
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-secondary,#A0A0A0)] leading-relaxed mb-6">
                Elite began in 2018 with a single objective: replace chaotic, unguided commercial gym culture in Bhagalpur with genuine athletic standards, clean biomechanics, and positive group community energy.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-xl border border-white/5 bg-[var(--bg-surface,#121212)]">
                  <span className="material-symbols-outlined text-[var(--accent-primary,#D70015)] text-2xl mb-1">fitness_center</span>
                  <h4 className="text-base font-display font-bold uppercase text-[var(--text-primary)]">Heavy Free-Weight Zone</h4>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">Dumbbells up to 50kg, calibrated Olympic bars & power racks.</p>
                </div>
                <div className="p-4 rounded-xl border border-white/5 bg-[var(--bg-surface,#121212)]">
                  <span className="material-symbols-outlined text-[var(--accent-primary,#D70015)] text-2xl mb-1">music_note</span>
                  <h4 className="text-base font-display font-bold uppercase text-[var(--text-primary)]">Acoustic Zumba Arena</h4>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">Immersive sound systems and certified Zumba instructors.</p>
                </div>
              </div>

              <button
                onClick={() => selectProgramAndScroll('3-Day Free Trial Pass')}
                className="px-6 py-3.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-[var(--accent-primary,#D70015)] text-white hover:bg-white hover:text-black transition-all shadow-md inline-flex items-center gap-2"
              >
                <span>Tour the Sanctuary in Person →</span>
              </button>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: 12-COLUMN ASYMMETRICAL BENTO PROGRAMS GRID
          ========================================================================= */}
      <BentoPrograms />

      {/* =========================================================================
          SECTION 5: INTERACTIVE FILTERABLE CLASS TIMETABLE
          ========================================================================= */}
      <section className="py-16 md:py-28 bg-[var(--bg-canvas,#080808)]" id="schedule">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <ClassSchedule />
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: INTERACTIVE BMI & FITNESS ASSESSMENT TOOL
          ========================================================================= */}
      <BmiCalculator />

      {/* =========================================================================
          SECTION 7: CERTIFIED TRAINER ROSTER
          ========================================================================= */}
      <TrainerRoster />

      {/* =========================================================================
          SECTION 8: MEMBERSHIP TIERS WITH CADENCE TOGGLE
          ========================================================================= */}
      <Pricing />

      {/* =========================================================================
          SECTION 9: MEMBER PROOF & BEFORE/AFTER WALL OF FAME
          ========================================================================= */}
      <section className="py-16 md:py-28 bg-[var(--bg-canvas,#080808)] border-t border-[var(--border-subtle)]" id="wall-of-fame">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--accent-secondary,#FF2E44)] text-xs font-mono font-semibold uppercase tracking-wider mb-3">
                <span>05 / VERIFIED PROOF</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-display font-extrabold uppercase text-[var(--text-primary)] leading-none">
                WALL OF <span className="text-[var(--accent-primary,#D70015)]">TRANSFORMATION</span>
              </h2>
            </div>
            <p className="max-w-md text-xs sm:text-sm text-[var(--text-secondary)]">
              Real members. Verified physical transformations. Over 500+ active members in Bhagalpur with an average 4.9★ rating.
            </p>
          </div>

          {/* Interactive Before & After Slider */}
          <div className="mb-14 rounded-2xl overflow-hidden border border-[var(--border-subtle)] magazine-shadow">
            <BeforeAfterSlider
              beforeImage="https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=2069&auto=format&fit=crop"
              afterImage="https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=2070&auto=format&fit=crop"
              title="Elite Member Progress: Fat Loss & Core Density"
              beforeLabel="Day 1 Baseline"
              afterLabel="Month 6 Consistent Training"
            />
          </div>

          {/* Member Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface,#121212)]">
              <div className="flex items-center gap-1 text-[var(--accent-primary,#D70015)] mb-4">
                {[1,2,3,4,5].map(i => <span key={i} className="material-symbols-outlined text-sm">star</span>)}
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] italic leading-relaxed mb-6 font-normal">
                "The atmosphere here is electric. Best barbell floor in Bihar and Vikram sir actually corrects your deadlift mechanics rather than ignoring you."
              </p>
              <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                <div className="w-9 h-9 rounded-full bg-[var(--accent-primary,#D70015)] text-white font-bold flex items-center justify-center font-mono text-xs">
                  RS
                </div>
                <div>
                  <h5 className="text-sm font-display font-bold uppercase text-[var(--text-primary)]">Rahul Sharma</h5>
                  <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase">Member for 2 Years • Barbell Club</p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface,#121212)]">
              <div className="flex items-center gap-1 text-[var(--accent-primary,#D70015)] mb-4">
                {[1,2,3,4,5].map(i => <span key={i} className="material-symbols-outlined text-sm">star</span>)}
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] italic leading-relaxed mb-6 font-normal">
                "Neha ma'am's Zumba sessions are the best part of my week. High-energy, completely safe female-friendly environment, and I burned 12kg in 5 months."
              </p>
              <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                <div className="w-9 h-9 rounded-full bg-[var(--accent-primary,#D70015)] text-white font-bold flex items-center justify-center font-mono text-xs">
                  PS
                </div>
                <div>
                  <h5 className="text-sm font-display font-bold uppercase text-[var(--text-primary)]">Priya Singh</h5>
                  <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase">Zumba Regular • Kotwali Chowk</p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface,#121212)]">
              <div className="flex items-center gap-1 text-[var(--accent-primary,#D70015)] mb-4">
                {[1,2,3,4,5].map(i => <span key={i} className="material-symbols-outlined text-sm">star</span>)}
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] italic leading-relaxed mb-6 font-normal">
                "No complicated gym contracts. Very transparent pricing, immaculate washrooms and locker facility, open by 6 AM every morning."
              </p>
              <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                <div className="w-9 h-9 rounded-full bg-[var(--accent-primary,#D70015)] text-white font-bold flex items-center justify-center font-mono text-xs">
                  AK
                </div>
                <div>
                  <h5 className="text-sm font-display font-bold uppercase text-[var(--text-primary)]">Amit Kumar</h5>
                  <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase">Quarterly Member • Strength Track</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 10: TRIAL PASS BOOKING & LOCATION HUB (#trial-booking)
          ========================================================================= */}
      <TrialBookingHub />
    </>
  );
}
