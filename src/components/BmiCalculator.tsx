import { useState, useId } from 'react';
import { motion } from 'framer-motion';
import { selectProgramAndScroll } from '../lib/funnelState';

type Goal = 'fat_loss' | 'muscle_gain' | 'conditioning' | 'mobility';

export default function BmiCalculator() {
  const [heightCm, setHeightCm] = useState<number>(172);
  const [weightKg, setWeightKg] = useState<number>(68);
  const [age, setAge] = useState<number>(26);
  const [goal, setGoal] = useState<Goal>('fat_loss');

  const heightId = useId();
  const weightId = useId();
  const ageId = useId();
  const goalId = useId();

  // BMI Calculation: weight (kg) / (height (m) ^ 2)
  const heightM = heightCm / 100;
  const bmiValue = heightM > 0 ? +(weightKg / (heightM * heightM)).toFixed(1) : 0;

  // Classification & Recommendations
  let category = 'Normal Weight';
  let badgeColor = 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
  let recommendedProgram = 'Strength & Hypertrophy';
  let recommendationSummary = 'Progressive resistance training with structured weekly volume.';

  if (bmiValue < 18.5) {
    category = 'Underweight / Lean';
    badgeColor = 'bg-sky-500/15 text-sky-400 border-sky-500/30';
    recommendedProgram = 'Strength & Hypertrophy';
    recommendationSummary = 'Hypertrophy-focused resistance training paired with calorie surplus coaching.';
  } else if (bmiValue >= 18.5 && bmiValue < 25) {
    category = 'Optimal Body Mass';
    badgeColor = 'bg-[var(--accent-primary,#D70015)]/20 text-[var(--accent-secondary,#FF2E44)] border-[var(--accent-primary,#D70015)]/40';
    if (goal === 'muscle_gain') {
      recommendedProgram = 'Strength & Hypertrophy';
      recommendationSummary = 'Targeted progressive overload to build lean athletic mass.';
    } else if (goal === 'conditioning') {
      recommendedProgram = 'Metabolic HIIT & Conditioning';
      recommendationSummary = 'High-octane anaerobic thresholds and functional stamina circuits.';
    } else if (goal === 'mobility') {
      recommendedProgram = 'Yoga, Mobility & Decompression';
      recommendationSummary = 'Spinal decompression and joint longevity alongside strength prep.';
    } else {
      recommendedProgram = 'Zumba Energy & Dance Fitness';
      recommendationSummary = 'High-energy cardiovascular conditioning with maximum caloric burn.';
    }
  } else if (bmiValue >= 25 && bmiValue < 30) {
    category = 'Overweight / Bulking';
    badgeColor = 'bg-amber-500/15 text-amber-400 border-amber-500/30';
    recommendedProgram = goal === 'muscle_gain' ? 'Strength & Hypertrophy' : 'Metabolic HIIT & Conditioning';
    recommendationSummary = 'Metabolic resistance training combined with macro deficit coaching.';
  } else {
    category = 'High Adiposity / Obese';
    badgeColor = 'bg-[var(--accent-primary,#D70015)]/25 text-[var(--accent-secondary,#FF2E44)] border-[var(--accent-primary)]/50';
    recommendedProgram = '1-on-1 Elite Coaching';
    recommendationSummary = 'Safe joint-sparing protocols, direct accountability, and lifestyle redesign.';
  }

  // Estimated daily protein intake guideline
  const estProtein = Math.round(weightKg * 1.8);
  // Estimated basal metabolic rate
  const estBmr = Math.round(10 * weightKg + 6.25 * heightCm - 5 * age + 5);

  return (
    <section className="relative py-16 md:py-28 bg-[var(--bg-canvas,#080808)] border-t border-[var(--border-subtle)]" id="bmi-calculator">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--accent-secondary,#FF2E44)] text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <span>03 / PERFORMANCE DIAGNOSTICS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-display font-extrabold uppercase text-[var(--text-primary,#FFFFFF)] leading-none">
            BMI & FITNESS <span className="text-[var(--accent-primary,#D70015)]">ASSESSMENT</span>
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary,#A0A0A0)] mt-3">
            Input your biological metrics to reveal your optimal training modality and recommended Elite Fitness roadmap.
          </p>
        </div>

        {/* 2-Column Assessment Module */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Inputs */}
          <div className="lg:col-span-7 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface,#121212)] p-6 sm:p-8 md:p-10 flex flex-col justify-between">
            <h3 className="text-xl sm:text-2xl font-display font-bold uppercase text-[var(--text-primary)] mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[var(--accent-primary,#D70015)] text-xl">tune</span>
              Your Body Metrics
            </h3>

            <div className="space-y-6">
              {/* Height Input */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor={heightId} className="text-xs font-mono font-bold uppercase text-[var(--text-secondary)]">
                    Height (cm)
                  </label>
                  <span className="text-sm font-mono font-bold text-[var(--accent-secondary,#FF2E44)]">
                    {heightCm} cm
                  </span>
                </div>
                <input
                  id={heightId}
                  type="range"
                  min={130}
                  max={220}
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full h-2 bg-[var(--bg-surface-elevated)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-primary,#D70015)]"
                />
                <div className="flex justify-between text-[10px] font-mono text-[var(--text-muted)] mt-1">
                  <span>130 cm</span>
                  <span>175 cm</span>
                  <span>220 cm</span>
                </div>
              </div>

              {/* Weight Input */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor={weightId} className="text-xs font-mono font-bold uppercase text-[var(--text-secondary)]">
                    Body Weight (kg)
                  </label>
                  <span className="text-sm font-mono font-bold text-[var(--accent-secondary,#FF2E44)]">
                    {weightKg} kg
                  </span>
                </div>
                <input
                  id={weightId}
                  type="range"
                  min={35}
                  max={160}
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full h-2 bg-[var(--bg-surface-elevated)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-primary,#D70015)]"
                />
                <div className="flex justify-between text-[10px] font-mono text-[var(--text-muted)] mt-1">
                  <span>35 kg</span>
                  <span>95 kg</span>
                  <span>160 kg</span>
                </div>
              </div>

              {/* Age and Primary Goal Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label htmlFor={ageId} className="block text-xs font-mono font-bold uppercase text-[var(--text-secondary)] mb-2">
                    Age (Years)
                  </label>
                  <input
                    id={ageId}
                    type="number"
                    min={14}
                    max={85}
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full bg-[var(--bg-surface-elevated,#181818)] border border-white/10 rounded-lg p-3 text-base md:text-sm font-mono text-[var(--text-primary)] focus:border-[var(--accent-primary,#D70015)] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor={goalId} className="block text-xs font-mono font-bold uppercase text-[var(--text-secondary)] mb-2">
                    Primary Goal
                  </label>
                  <select
                    id={goalId}
                    value={goal}
                    onChange={(e) => setGoal(e.target.value as Goal)}
                    className="w-full bg-[var(--bg-surface-elevated,#181818)] border border-white/10 rounded-lg p-3 text-base md:text-sm font-mono text-[var(--text-primary)] focus:border-[var(--accent-primary,#D70015)] focus:outline-none"
                  >
                    <option value="fat_loss">Fat Loss & Leanness</option>
                    <option value="muscle_gain">Muscle Hypertrophy & Power</option>
                    <option value="conditioning">HIIT & Athletic Endurance</option>
                    <option value="mobility">Posture, Mobility & Recovery</option>
                  </select>
                </div>
              </div>
            </div>

            <p className="mt-6 text-[11px] font-mono text-[var(--text-muted)] border-t border-white/5 pt-4">
              * Note: BMI does not differentiate between skeletal muscle and adipose tissue. Our coaches conduct detailed in-body fat caliber tests during your free trial.
            </p>
          </div>

          {/* Right Column: Live Reactive Diagnostic Output */}
          <div className="lg:col-span-5 rounded-2xl border border-[var(--border-accent,rgba(215,0,21,0.45))] bg-gradient-to-b from-[var(--bg-surface-elevated,#181818)] to-[var(--bg-surface,#121212)] p-6 sm:p-8 md:p-10 flex flex-col justify-between magazine-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                  Live Assessment
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${badgeColor}`}>
                  {category}
                </span>
              </div>

              {/* Big Tabular BMI Number */}
              <div className="my-4">
                <div className="text-6xl sm:text-7xl font-mono font-bold tracking-tight text-[var(--accent-primary,#D70015)] drop-shadow-[0_0_25px_rgba(215,0,21,0.4)]">
                  {bmiValue}
                </div>
                <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mt-1">
                  Body Mass Index (kg/m²)
                </p>
              </div>

              {/* Biological Guidelines Bar */}
              <div className="grid grid-cols-2 gap-3 my-6 py-4 border-y border-white/10 text-left">
                <div className="bg-[var(--bg-canvas,#080808)] p-3 rounded-lg border border-white/5">
                  <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] block">Est. Daily Protein</span>
                  <span className="text-lg font-mono font-bold text-white">~{estProtein}g</span>
                </div>
                <div className="bg-[var(--bg-canvas,#080808)] p-3 rounded-lg border border-white/5">
                  <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] block">Est. Basal BMR</span>
                  <span className="text-lg font-mono font-bold text-white">~{estBmr} kcal</span>
                </div>
              </div>

              {/* Recommended Program */}
              <div className="bg-[var(--bg-canvas,#080808)]/90 border border-white/10 rounded-xl p-4 sm:p-5 mb-6">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent-secondary,#FF2E44)] font-bold block mb-1">
                  ★ RECOMMENDED ELITE TRACK
                </span>
                <h4 className="text-lg sm:text-xl font-display font-bold uppercase text-[var(--text-primary)]">
                  {recommendedProgram}
                </h4>
                <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                  {recommendationSummary}
                </p>
              </div>
            </div>

            {/* Direct Conversion Action */}
            <button
              onClick={() => selectProgramAndScroll(recommendedProgram, `BMI ${bmiValue} (${category})`)}
              className="w-full py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-widest bg-[var(--accent-primary,#D70015)] text-white hover:bg-white hover:text-black transition-all shadow-[0_0_30px_rgba(215,0,21,0.35)] flex items-center justify-center gap-2"
            >
              <span>Start Recommended Track</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
