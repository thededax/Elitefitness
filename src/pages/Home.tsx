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
          SECTION 1: CINEMATIC LEFT-ANCHORED ATHLETE HERO (PRECISION EDITORIAL UI)
          ========================================================================= */}
      <section
        ref={heroRef}
        className="relative min-h-[95vh] lg:min-h-screen flex items-center pt-32 pb-24 lg:py-0 bg-[var(--bg-canvas,#080808)] overflow-hidden"
      >
        {/* Full-Bleed Cinematic Background Image with Parallax & Directional Lighting */}
        <motion.div
          style={{ y: yParallax }}
          className="absolute inset-0 -top-[10%] -bottom-[10%] pointer-events-none select-none"
        >
          <img
            src="/images/hero-deadlift.png"
            alt="Elite Fitness Athlete Deadlifting"
            className="w-full h-full object-cover object-right md:object-center lg:object-right gym-photo-grade"
          />
          {/* Directional gradient: Pure dark obsidian on the left 0–45% for crisp text legibility, fading out rightward */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-canvas,#080808)] via-[var(--bg-canvas,#080808)]/95 via-35% md:via-48% to-[var(--bg-canvas,#080808)]/30 lg:to-transparent" />
          {/* Top and bottom gradients for seamless header and section blending */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-canvas,#080808)] via-transparent to-[var(--bg-canvas,#080808)]/70" />
        </motion.div>

        {/* Subtle Ambient Crimson Atmosphere Glow */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-[var(--accent-primary,#D70015)]/15 blur-[150px] pointer-events-none" />

        {/* True Left-Oriented Content Container (Fibonacci Spacing & Editorial Grid) */}
        <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24 relative z-10">
          <div className="w-full lg:max-w-[620px] xl:max-w-[720px] flex flex-col items-start text-left">
            
            {/* Editorial Kicker */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3.5 mb-6"
            >
              <span className="w-10 h-[2px] bg-[var(--accent-primary,#D70015)] shadow-[0_0_10px_rgba(215,0,21,0.8)]" />
              <span className="text-xs font-mono font-bold uppercase tracking-[0.28em] text-[var(--accent-secondary,#FF2E44)]">
                BHAGALPUR'S PREMIER SANCTUARY
              </span>
            </motion.div>

            {/* Bold Condensed Display H1 Headline with Fibonacci Rhythm */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-extrabold uppercase text-white tracking-[-0.03em] leading-[0.88] mb-8 text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.25rem]"
            >
              <span className="block text-white">ENGINEER</span>
              <span className="block text-white">YOUR STRONGEST</span>
              <span className="block text-[var(--accent-primary,#D70015)] italic drop-shadow-[0_0_40px_rgba(215,0,21,0.5)]">
                SELF.
              </span>
            </motion.h1>

            {/* Sub-headline with Psychological Framing & Vertical Accent Border */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="border-l-2 border-[var(--accent-primary,#D70015)] pl-5 sm:pl-6 mb-10 max-w-[46ch]"
            >
              <p className="text-base sm:text-lg lg:text-xl text-[var(--text-secondary,#D0D0D0)] font-normal leading-[1.65]">
                5,000 sq.ft of Olympic barbell platforms, high-voltage Zumba, and certified coaching mentorship.
              </p>
              <p className="text-xs sm:text-sm font-mono text-[var(--text-muted,#858585)] mt-2 uppercase tracking-wider font-semibold">
                Zero complex contracts • 100% Risk-Free 3-Day Guest Pass
              </p>
            </motion.div>

            {/* Dual Conversion CTA Cluster with Tactile Elevation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            >
              <button
                onClick={() => selectProgramAndScroll('3-Day Free Trial Pass')}
                className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-9 py-4 sm:py-4.5 rounded-xl text-xs sm:text-sm font-mono font-extrabold uppercase tracking-widest bg-[var(--accent-primary,#D70015)] text-white hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_35px_rgba(215,0,21,0.5)] active:scale-95 overflow-hidden"
              >
                <span className="relative z-10">Claim Free 3-Day Trial Pass</span>
                <span className="material-symbols-outlined text-base relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                  arrow_forward
                </span>
              </button>

              <a
                href="#schedule"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 sm:py-4.5 rounded-xl text-xs sm:text-sm font-mono font-bold uppercase tracking-wider bg-white/[0.04] hover:bg-white/[0.09] text-white border border-white/15 hover:border-[var(--accent-primary,#D70015)] hover:text-[var(--accent-secondary,#FF2E44)] backdrop-blur-md transition-all duration-300"
              >
                <span className="material-symbols-outlined text-base text-[var(--accent-secondary,#FF2E44)]">
                  calendar_month
                </span>
                <span>View Class Schedule</span>
              </a>
            </motion.div>

            {/* Editorial Micro-Proof Pillars */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-10 pt-6 border-t border-white/10 text-[11px] sm:text-xs font-mono text-[var(--text-secondary,#A0A0A0)]"
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary,#D70015)] shadow-[0_0_6px_rgba(215,0,21,0.8)]" />
                5,000 Sq.Ft Sanctuary
              </span>
              <span className="text-white/20 hidden sm:inline">•</span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary,#D70015)] shadow-[0_0_6px_rgba(215,0,21,0.8)]" />
                Certified CSCS & ZIN Leads
              </span>
              <span className="text-white/20 hidden sm:inline">•</span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary,#D70015)] shadow-[0_0_6px_rgba(215,0,21,0.8)]" />
                Kotwali Chowk, Bhagalpur
              </span>
            </motion.div>

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
                  src="/images/built-on-passion.jpg"
                  alt="Elite Fitness Barbell Strength Training and Biomechanics Coaching"
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
