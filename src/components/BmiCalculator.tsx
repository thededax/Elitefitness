import { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { selectProgramAndScroll } from '../lib/funnelState';

type Sex = 'male' | 'female';
type UnitSystem = 'metric' | 'imperial';
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'intense';
type Goal = 'fat_loss' | 'muscle_gain' | 'conditioning' | 'mobility';
type OutputTab = 'nutrition' | 'blueprint' | 'composition';

export default function BmiCalculator() {
  // Unit System
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  
  // Biological Attributes
  const [sex, setSex] = useState<Sex>('male');
  const [heightCm, setHeightCm] = useState<number>(174);
  const [weightKg, setWeightKg] = useState<number>(72);
  const [age, setAge] = useState<number>(26);
  const [activity, setActivity] = useState<ActivityLevel>('moderate');
  const [goal, setGoal] = useState<Goal>('fat_loss');

  // Imperial helper states
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(9);
  const [weightLbs, setWeightLbs] = useState<number>(158);

  // Active Output Tab
  const [activeTab, setActiveTab] = useState<OutputTab>('nutrition');

  // Accessibility IDs
  const heightId = useId();
  const weightId = useId();
  const ageId = useId();
  const activityId = useId();
  const goalId = useId();

  // Unit synchronization helpers
  const handleMetricHeightChange = (val: number) => {
    setHeightCm(val);
    const totalInches = val / 2.54;
    setHeightFeet(Math.floor(totalInches / 12));
    setHeightInches(Math.round(totalInches % 12));
  };

  const handleImperialHeightChange = (feet: number, inches: number) => {
    setHeightFeet(feet);
    setHeightInches(inches);
    const cm = Math.round(feet * 30.48 + inches * 2.54);
    setHeightCm(cm);
  };

  const handleMetricWeightChange = (val: number) => {
    setWeightKg(val);
    setWeightLbs(Math.round(val * 2.20462));
  };

  const handleImperialWeightChange = (val: number) => {
    setWeightLbs(val);
    setWeightKg(Math.round(val / 2.20462));
  };

  // 1. BMI Calculation: weight (kg) / (height (m) ^ 2)
  const heightM = heightCm / 100;
  const bmiValue = heightM > 0 ? +(weightKg / (heightM * heightM)).toFixed(1) : 0;

  // 2. Ideal Body Weight Range (BMI 18.5 - 24.9)
  const minIdealWeightKg = Math.round(18.5 * heightM * heightM);
  const maxIdealWeightKg = Math.round(24.9 * heightM * heightM);

  // 3. BMI Gauge Percentage (normalized between BMI 15 and 35)
  const bmiPercentage = Math.max(0, Math.min(100, ((bmiValue - 15) / 20) * 100));

  // 4. Classification & Recommendations
  let category = 'Optimal Body Mass';
  let badgeColor = 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
  let categoryColor = '#10B981';
  let recommendedProgram = 'Strength & Hypertrophy';
  let recommendationSummary = 'Progressive resistance training with structured weekly volume to sculpt athletic mass.';

  if (bmiValue < 18.5) {
    category = 'Underweight / Lean';
    badgeColor = 'bg-sky-500/15 text-sky-400 border-sky-500/30';
    categoryColor = '#0ea5e9';
    recommendedProgram = 'Strength & Hypertrophy';
    recommendationSummary = 'Hypertrophy-focused resistance training paired with calorie surplus coaching to build functional muscle.';
  } else if (bmiValue >= 18.5 && bmiValue < 25) {
    category = 'Optimal Athletic Mass';
    badgeColor = 'bg-[var(--accent-primary,#D70015)]/20 text-[var(--accent-secondary,#FF2E44)] border-[var(--accent-primary,#D70015)]/40';
    categoryColor = '#D70015';
    if (goal === 'muscle_gain') {
      recommendedProgram = 'Strength & Hypertrophy';
      recommendationSummary = 'Progressive barbell overload & compound volume to pack on dense athletic muscle.';
    } else if (goal === 'conditioning') {
      recommendedProgram = 'Metabolic HIIT & Conditioning';
      recommendationSummary = 'High-octane anaerobic thresholds and functional stamina circuits.';
    } else if (goal === 'mobility') {
      recommendedProgram = 'Yoga, Mobility & Decompression';
      recommendationSummary = 'Spinal decompression and joint longevity alongside strength prep.';
    } else {
      recommendedProgram = 'Zumba Energy & Dance Fitness';
      recommendationSummary = 'High-energy cardiovascular conditioning with maximum caloric burn and rhythm.';
    }
  } else if (bmiValue >= 25 && bmiValue < 30) {
    category = 'Overweight / Muscular Bulk';
    badgeColor = 'bg-amber-500/15 text-amber-400 border-amber-500/30';
    categoryColor = '#f59e0b';
    recommendedProgram = goal === 'muscle_gain' ? 'Strength & Hypertrophy' : 'Metabolic HIIT & Conditioning';
    recommendationSummary = 'Metabolic resistance training combined with a calculated macro deficit to preserve strength while melting fat.';
  } else {
    category = 'High Adiposity / Needs Guidance';
    badgeColor = 'bg-[var(--accent-primary,#D70015)]/25 text-[var(--accent-secondary,#FF2E44)] border-[var(--accent-primary)]/50';
    categoryColor = '#EF4444';
    recommendedProgram = '1-on-1 Elite Coaching';
    recommendationSummary = 'Safe joint-sparing biomechanics, personal trainer supervision, and sustainable lifestyle habit coaching.';
  }

  // 5. Estimated Body Fat % (Deurenberg Formula)
  const sexFactor = sex === 'male' ? 1 : 0;
  const estimatedBodyFat = Math.max(
    5,
    Math.min(50, +(1.2 * bmiValue + 0.23 * age - 10.8 * sexFactor - 5.4).toFixed(1))
  );

  // 6. Basal Metabolic Rate (BMR via Mifflin-St Jeor)
  const bmrBase = 10 * weightKg + 6.25 * heightCm - 5 * age;
  const estBmr = Math.round(sex === 'male' ? bmrBase + 5 : bmrBase - 161);

  // 7. Activity Multipliers -> TDEE
  const activityMultipliers: Record<ActivityLevel, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    intense: 1.725
  };
  const tdee = Math.round(estBmr * activityMultipliers[activity]);

  // 8. Goal Calorie Target
  let targetCalories = tdee;
  let calorieAdjustmentText = 'Maintenance (Recomposition)';
  if (goal === 'fat_loss') {
    targetCalories = Math.max(sex === 'male' ? 1500 : 1200, tdee - 450);
    calorieAdjustmentText = '-450 kcal Deficit (Fat Loss)';
  } else if (goal === 'muscle_gain') {
    targetCalories = tdee + 350;
    calorieAdjustmentText = '+350 kcal Surplus (Lean Bulk)';
  } else if (goal === 'mobility') {
    targetCalories = Math.max(sex === 'male' ? 1500 : 1200, tdee - 150);
    calorieAdjustmentText = '-150 kcal Light Cut (Mobility)';
  }

  // 9. Macronutrient Targets
  // Protein (g/kg bodyweight)
  let proteinMultiplier = 1.8;
  if (goal === 'fat_loss') proteinMultiplier = 2.0;
  if (goal === 'muscle_gain') proteinMultiplier = 2.2;
  if (goal === 'mobility') proteinMultiplier = 1.6;

  const targetProteinG = Math.round(weightKg * proteinMultiplier);
  const proteinCalories = targetProteinG * 4;

  // Fats: 25% of target calories
  const fatCalories = targetCalories * 0.25;
  const targetFatsG = Math.round(fatCalories / 9);

  // Carbs: Remaining calories
  const carbCalories = Math.max(0, targetCalories - proteinCalories - fatCalories);
  const targetCarbsG = Math.round(carbCalories / 4);

  // Hydration guideline (Litres/day)
  const hydrationLiters = (weightKg * 0.035 + (activity === 'intense' || activity === 'moderate' ? 0.7 : 0.3)).toFixed(1);

  // 10. WhatsApp Handoff Message Generator
  const generateWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Hello Elite Fitness Team! I just completed the Performance Assessment on your website:\n\n` +
      `• Sex: ${sex.toUpperCase()}, Age: ${age}\n` +
      `• Height: ${heightCm} cm | Weight: ${weightKg} kg\n` +
      `• BMI: ${bmiValue} (${category})\n` +
      `• Est. Body Fat: ~${estimatedBodyFat}%\n` +
      `• Primary Goal: ${goal.replace('_', ' ').toUpperCase()}\n` +
      `• Daily Calorie Target: ${targetCalories} kcal (Protein: ${targetProteinG}g)\n` +
      `• Recommended Track: ${recommendedProgram}\n\n` +
      `I would like to book my 3-Day Free Trial and get a complete InBody machine scan with a coach!`
    );
    window.open(`https://wa.me/919065516492?text=${text}`, '_blank');
  };

  return (
    <section className="relative py-10 sm:py-16 md:py-24 bg-[var(--bg-canvas,#080808)] border-t border-[var(--border-subtle)]" id="bmi-calculator">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--accent-secondary,#FF2E44)] text-xs font-mono font-semibold uppercase tracking-wider mb-2.5 sm:mb-3">
            <span>03 / PERFORMANCE DIAGNOSTICS & NUTRITION ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-display font-extrabold uppercase text-[var(--text-primary,#FFFFFF)] leading-none">
            BMI & FITNESS <span className="text-[var(--accent-primary,#D70015)]">ASSESSMENT</span>
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary,#A0A0A0)] mt-2 sm:mt-3">
            Input your body metrics to calculate your BMI, daily energy expenditure (TDEE), target macros, and tailored Elite workout blueprint.
          </p>
        </div>

        {/* 2-Column Assessment Module */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column: Interactive Inputs */}
          <div className="lg:col-span-7 rounded-xl sm:rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface,#121212)] p-3.5 sm:p-6 md:p-8 flex flex-col justify-between">
            <div>
              {/* Top Controls: Unit Selector & Biological Sex */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-4 pb-4 sm:pb-6 border-b border-white/5 mb-4 sm:mb-6">
                <div>
                  <span className="text-[11px] sm:text-xs font-mono font-bold uppercase text-[var(--text-secondary)] block mb-1">
                    Unit System
                  </span>
                  <div className="inline-flex rounded-lg p-1 bg-[var(--bg-canvas,#080808)] border border-white/10">
                    <button
                      type="button"
                      onClick={() => setUnitSystem('metric')}
                      className={`px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-mono font-bold rounded-md transition-all ${
                        unitSystem === 'metric'
                          ? 'bg-[var(--accent-primary,#D70015)] text-white shadow-sm'
                          : 'text-[var(--text-secondary)] hover:text-white'
                      }`}
                    >
                      Metric (cm, kg)
                    </button>
                    <button
                      type="button"
                      onClick={() => setUnitSystem('imperial')}
                      className={`px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-mono font-bold rounded-md transition-all ${
                        unitSystem === 'imperial'
                          ? 'bg-[var(--accent-primary,#D70015)] text-white shadow-sm'
                          : 'text-[var(--text-secondary)] hover:text-white'
                      }`}
                    >
                      Imperial (ft/in, lbs)
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] sm:text-xs font-mono font-bold uppercase text-[var(--text-secondary)] block mb-1">
                    Biological Sex
                  </span>
                  <div className="inline-flex rounded-lg p-1 bg-[var(--bg-canvas,#080808)] border border-white/10">
                    <button
                      type="button"
                      onClick={() => setSex('male')}
                      className={`px-3 sm:px-3.5 py-1 text-[11px] sm:text-xs font-mono font-bold rounded-md transition-all flex items-center gap-1 ${
                        sex === 'male'
                          ? 'bg-[var(--accent-primary,#D70015)] text-white shadow-sm'
                          : 'text-[var(--text-secondary)] hover:text-white'
                      }`}
                    >
                      <span>Male</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSex('female')}
                      className={`px-3 sm:px-3.5 py-1 text-[11px] sm:text-xs font-mono font-bold rounded-md transition-all flex items-center gap-1 ${
                        sex === 'female'
                          ? 'bg-[var(--accent-primary,#D70015)] text-white shadow-sm'
                          : 'text-[var(--text-secondary)] hover:text-white'
                      }`}
                    >
                      <span>Female</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Sliders & Inputs */}
              <div className="space-y-4 sm:space-y-6">
                
                {/* Height Input */}
                <div>
                  <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                    <label htmlFor={heightId} className="text-[11px] sm:text-xs font-mono font-bold uppercase text-[var(--text-secondary)]">
                      Height {unitSystem === 'metric' ? '(Centimeters)' : '(Feet & Inches)'}
                    </label>
                    <span className="text-xs sm:text-sm font-mono font-bold text-[var(--accent-secondary,#FF2E44)]">
                      {unitSystem === 'metric' ? `${heightCm} cm` : `${heightFeet}' ${heightInches}"`}
                    </span>
                  </div>

                  {unitSystem === 'metric' ? (
                    <>
                      <input
                        id={heightId}
                        type="range"
                        min={130}
                        max={220}
                        value={heightCm}
                        onChange={(e) => handleMetricHeightChange(Number(e.target.value))}
                        className="w-full h-2 bg-[var(--bg-surface-elevated,#181818)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-primary,#D70015)]"
                      />
                      <div className="flex justify-between text-[9px] sm:text-[10px] font-mono text-[var(--text-muted)] mt-1">
                        <span>130 cm</span>
                        <span>175 cm</span>
                        <span>220 cm</span>
                      </div>
                    </>
                  ) : (
                    <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                      <div>
                        <span className="text-[9px] sm:text-[10px] font-mono text-[var(--text-muted)] block mb-1">Feet</span>
                        <select
                          value={heightFeet}
                          onChange={(e) => handleImperialHeightChange(Number(e.target.value), heightInches)}
                          className="w-full bg-[var(--bg-surface-elevated,#181818)] border border-white/10 rounded-lg p-2 sm:p-2.5 text-xs sm:text-sm font-mono text-white focus:border-[var(--accent-primary,#D70015)] focus:outline-none"
                        >
                          {[4, 5, 6, 7].map((f) => (
                            <option key={f} value={f}>{f} ft</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <span className="text-[9px] sm:text-[10px] font-mono text-[var(--text-muted)] block mb-1">Inches</span>
                        <select
                          value={heightInches}
                          onChange={(e) => handleImperialHeightChange(heightFeet, Number(e.target.value))}
                          className="w-full bg-[var(--bg-surface-elevated,#181818)] border border-white/10 rounded-lg p-2 sm:p-2.5 text-xs sm:text-sm font-mono text-white focus:border-[var(--accent-primary,#D70015)] focus:outline-none"
                        >
                          {Array.from({ length: 12 }, (_, i) => (
                            <option key={i} value={i}>{i} in</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                {/* Weight Input */}
                <div>
                  <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                    <label htmlFor={weightId} className="text-[11px] sm:text-xs font-mono font-bold uppercase text-[var(--text-secondary)]">
                      Body Weight {unitSystem === 'metric' ? '(Kilograms)' : '(Pounds)'}
                    </label>
                    <span className="text-xs sm:text-sm font-mono font-bold text-[var(--accent-secondary,#FF2E44)]">
                      {unitSystem === 'metric' ? `${weightKg} kg` : `${weightLbs} lbs`}
                    </span>
                  </div>

                  {unitSystem === 'metric' ? (
                    <>
                      <input
                        id={weightId}
                        type="range"
                        min={35}
                        max={160}
                        value={weightKg}
                        onChange={(e) => handleMetricWeightChange(Number(e.target.value))}
                        className="w-full h-2 bg-[var(--bg-surface-elevated,#181818)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-primary,#D70015)]"
                      />
                      <div className="flex justify-between text-[9px] sm:text-[10px] font-mono text-[var(--text-muted)] mt-1">
                        <span>35 kg</span>
                        <span>95 kg</span>
                        <span>160 kg</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <input
                        id={weightId}
                        type="range"
                        min={77}
                        max={350}
                        value={weightLbs}
                        onChange={(e) => handleImperialWeightChange(Number(e.target.value))}
                        className="w-full h-2 bg-[var(--bg-surface-elevated,#181818)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-primary,#D70015)]"
                      />
                      <div className="flex justify-between text-[9px] sm:text-[10px] font-mono text-[var(--text-muted)] mt-1">
                        <span>77 lbs</span>
                        <span>210 lbs</span>
                        <span>350 lbs</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Age & Activity Level */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label htmlFor={ageId} className="block text-[11px] sm:text-xs font-mono font-bold uppercase text-[var(--text-secondary)] mb-1">
                      Age (Years)
                    </label>
                    <input
                      id={ageId}
                      type="number"
                      inputMode="numeric"
                      min={14}
                      max={85}
                      value={age}
                      onChange={(e) => setAge(Math.max(14, Math.min(85, Number(e.target.value))))}
                      className="w-full bg-[var(--bg-surface-elevated,#181818)] border border-white/10 rounded-lg p-2.5 text-base md:text-sm font-mono text-[var(--text-primary)] focus:border-[var(--accent-primary,#D70015)] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor={activityId} className="block text-[11px] sm:text-xs font-mono font-bold uppercase text-[var(--text-secondary)] mb-1">
                      Activity Cadence
                    </label>
                    <select
                      id={activityId}
                      value={activity}
                      onChange={(e) => setActivity(e.target.value as ActivityLevel)}
                      className="w-full bg-[var(--bg-surface-elevated,#181818)] border border-white/10 rounded-lg p-2.5 text-base md:text-sm font-mono text-[var(--text-primary)] focus:border-[var(--accent-primary,#D70015)] focus:outline-none"
                    >
                      <option value="sedentary">Sedentary (Desk work)</option>
                      <option value="light">Light (1–2 days/wk)</option>
                      <option value="moderate">Moderate (3–4 days/wk)</option>
                      <option value="intense">Athlete (5–7 hard days/wk)</option>
                    </select>
                  </div>
                </div>

                {/* Primary Transformation Goal */}
                <div>
                  <label htmlFor={goalId} className="block text-[11px] sm:text-xs font-mono font-bold uppercase text-[var(--text-secondary)] mb-1">
                    Primary Fitness Target
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
                    {[
                      { id: 'fat_loss', label: 'Fat Loss', desc: '-450 kcal' },
                      { id: 'muscle_gain', label: 'Muscle Gain', desc: '+350 kcal' },
                      { id: 'conditioning', label: 'Athletic HIIT', desc: 'Maintain' },
                      { id: 'mobility', label: 'Mobility & Yoga', desc: 'Recovery' }
                    ].map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setGoal(g.id as Goal)}
                        className={`p-2 sm:p-2.5 rounded-lg border text-left transition-all ${
                          goal === g.id
                            ? 'border-[var(--accent-primary,#D70015)] bg-[var(--accent-primary,#D70015)]/15 text-white'
                            : 'border-white/5 bg-[var(--bg-surface-elevated,#181818)] text-[var(--text-secondary)] hover:border-white/20'
                        }`}
                      >
                        <span className="text-[11px] sm:text-xs font-mono font-bold block">{g.label}</span>
                        <span className="text-[9px] sm:text-[10px] font-mono text-[var(--text-muted)]">{g.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Disclaimer */}
            <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/5 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[var(--text-muted)]">
              <span>* Ideal Healthy Weight: <strong className="text-white">{minIdealWeightKg}–{maxIdealWeightKg} kg</strong> ({Math.round(minIdealWeightKg * 2.20462)}–{Math.round(maxIdealWeightKg * 2.20462)} lbs)</span>
              <span className="hidden sm:inline">Mifflin-St Jeor + Deurenberg Standard</span>
            </div>
          </div>

          {/* Right Column: Live Reactive Diagnostic Dashboard */}
          <div className="lg:col-span-5 rounded-xl sm:rounded-2xl border border-[var(--border-accent,rgba(215,0,21,0.45))] bg-gradient-to-b from-[var(--bg-surface-elevated,#181818)] to-[var(--bg-canvas,#080808)] p-3.5 sm:p-6 md:p-8 flex flex-col justify-between magazine-shadow">
            <div>
              {/* Category Pill & Live Assessment Title */}
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-primary,#D70015)] animate-pulse" />
                  Live Assessment
                </span>
                <span className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold border ${badgeColor}`}>
                  {category}
                </span>
              </div>

              {/* Big Tabular BMI & Est Body Fat */}
              <div className="flex items-baseline justify-between mb-2 sm:mb-3">
                <div>
                  <div className="text-4xl sm:text-5xl md:text-6xl font-mono font-bold tracking-tight text-[var(--accent-primary,#D70015)] drop-shadow-[0_0_25px_rgba(215,0,21,0.4)]">
                    {bmiValue}
                  </div>
                  <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mt-0.5 sm:mt-1">
                    Body Mass Index (kg/m²)
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-2xl sm:text-3xl font-mono font-bold text-white">
                    ~{estimatedBodyFat}%
                  </div>
                  <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mt-0.5 sm:mt-1">
                    Est. Body Fat
                  </p>
                </div>
              </div>

              {/* Dynamic Visual Gauge Spectrum */}
              <div className="my-3 sm:my-4">
                <div className="relative h-2 sm:h-2.5 rounded-full overflow-hidden bg-white/10 flex">
                  <div className="h-full bg-sky-500 w-[17.5%]" title="Underweight (< 18.5)" />
                  <div className="h-full bg-emerald-500 w-[32%]" title="Optimal (18.5 - 24.9)" />
                  <div className="h-full bg-amber-500 w-[25%]" title="Overweight (25 - 29.9)" />
                  <div className="h-full bg-[var(--accent-primary,#D70015)] flex-1" title="Obese (30+)" />
                </div>
                {/* Pointer Marker */}
                <div className="relative h-2.5 sm:h-3 w-full">
                  <div
                    className="absolute top-0 -ml-1.5 transition-all duration-300"
                    style={{ left: `${bmiPercentage}%` }}
                  >
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rotate-45 border-2 border-black shadow" />
                  </div>
                </div>
                <div className="flex justify-between text-[8px] sm:text-[9px] font-mono text-[var(--text-muted)] mt-0.5">
                  <span>15.0</span>
                  <span>18.5 (Optimal)</span>
                  <span>25.0</span>
                  <span>30.0+</span>
                </div>
              </div>

              {/* Tab Selector: Nutrition vs Workout vs Composition */}
              <div className="flex rounded-lg p-0.5 sm:p-1 bg-[var(--bg-canvas,#080808)] border border-white/10 mb-3 sm:mb-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('nutrition')}
                  className={`flex-1 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-mono font-bold rounded-md transition-all text-center ${
                    activeTab === 'nutrition'
                      ? 'bg-[var(--accent-primary,#D70015)] text-white shadow-sm'
                      : 'text-[var(--text-secondary)] hover:text-white'
                  }`}
                >
                  Nutrition
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('blueprint')}
                  className={`flex-1 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-mono font-bold rounded-md transition-all text-center ${
                    activeTab === 'blueprint'
                      ? 'bg-[var(--accent-primary,#D70015)] text-white shadow-sm'
                      : 'text-[var(--text-secondary)] hover:text-white'
                  }`}
                >
                  Weekly Split
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('composition')}
                  className={`flex-1 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-mono font-bold rounded-md transition-all text-center ${
                    activeTab === 'composition'
                      ? 'bg-[var(--accent-primary,#D70015)] text-white shadow-sm'
                      : 'text-[var(--text-secondary)] hover:text-white'
                  }`}
                >
                  Diagnostics
                </button>
              </div>

              {/* Dynamic Tab Body */}
              <AnimatePresence mode="wait">
                {activeTab === 'nutrition' && (
                  <motion.div
                    key="nutrition"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2.5 sm:space-y-3"
                  >
                    {/* Caloric Headline Bar */}
                    <div className="bg-[var(--bg-canvas,#080808)] p-2.5 sm:p-3.5 rounded-xl border border-white/5 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] sm:text-[10px] font-mono uppercase text-[var(--accent-secondary,#FF2E44)] font-bold block">
                          Target Daily Calories
                        </span>
                        <div className="text-xl sm:text-2xl font-mono font-bold text-white">
                          {targetCalories} <span className="text-[10px] sm:text-xs text-[var(--text-muted)] font-normal">kcal/day</span>
                        </div>
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-mono px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-white/10 text-[var(--text-secondary)] border border-white/5">
                        {calorieAdjustmentText}
                      </span>
                    </div>

                    {/* 4-Box Macro Grid */}
                    <div className="grid grid-cols-4 gap-1.5 sm:gap-2 text-center">
                      <div className="bg-[var(--bg-canvas,#080808)] p-2 sm:p-2.5 rounded-lg border border-white/5">
                        <span className="text-[8px] sm:text-[9px] font-mono uppercase text-[var(--accent-secondary,#FF2E44)] font-bold block">Protein</span>
                        <span className="text-sm sm:text-base font-mono font-bold text-white">{targetProteinG}g</span>
                        <span className="text-[7px] sm:text-[8px] font-mono text-[var(--text-muted)] block mt-0.5">{proteinMultiplier}g/kg</span>
                      </div>
                      <div className="bg-[var(--bg-canvas,#080808)] p-2 sm:p-2.5 rounded-lg border border-white/5">
                        <span className="text-[8px] sm:text-[9px] font-mono uppercase text-sky-400 font-bold block">Carbs</span>
                        <span className="text-sm sm:text-base font-mono font-bold text-white">{targetCarbsG}g</span>
                        <span className="text-[7px] sm:text-[8px] font-mono text-[var(--text-muted)] block mt-0.5">Energy</span>
                      </div>
                      <div className="bg-[var(--bg-canvas,#080808)] p-2 sm:p-2.5 rounded-lg border border-white/5">
                        <span className="text-[8px] sm:text-[9px] font-mono uppercase text-amber-400 font-bold block">Fats</span>
                        <span className="text-sm sm:text-base font-mono font-bold text-white">{targetFatsG}g</span>
                        <span className="text-[7px] sm:text-[8px] font-mono text-[var(--text-muted)] block mt-0.5">25% Cal</span>
                      </div>
                      <div className="bg-[var(--bg-canvas,#080808)] p-2 sm:p-2.5 rounded-lg border border-white/5">
                        <span className="text-[8px] sm:text-[9px] font-mono uppercase text-emerald-400 font-bold block">Water</span>
                        <span className="text-sm sm:text-base font-mono font-bold text-white">{hydrationLiters}L</span>
                        <span className="text-[7px] sm:text-[8px] font-mono text-[var(--text-muted)] block mt-0.5">Hydrate</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'blueprint' && (
                  <motion.div
                    key="blueprint"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="bg-[var(--bg-canvas,#080808)] p-3 sm:p-3.5 rounded-xl border border-white/5 space-y-2 text-xs"
                  >
                    <div className="flex justify-between items-center pb-1.5 border-b border-white/10">
                      <span className="font-mono text-[9px] sm:text-[10px] uppercase text-[var(--accent-secondary,#FF2E44)] font-bold">
                        Prescribed Training Cadence
                      </span>
                      <span className="font-mono text-[10px] text-white">4–5 Days / Week</span>
                    </div>
                    <ul className="space-y-1.5 text-[10px] sm:text-[11px] text-[var(--text-secondary)]">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary,#D70015)] shrink-0" />
                        <span><strong>Mon/Wed/Fri:</strong> {recommendedProgram}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                        <span><strong>Tue/Thu:</strong> Cardio Conditioning & Zumba</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        <span><strong>Weekend:</strong> Active Mobility Flow</span>
                      </li>
                    </ul>
                  </motion.div>
                )}

                {activeTab === 'composition' && (
                  <motion.div
                    key="composition"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-2 gap-2 text-left"
                  >
                    <div className="bg-[var(--bg-canvas,#080808)] p-2.5 sm:p-3 rounded-lg border border-white/5">
                      <span className="text-[9px] sm:text-[10px] font-mono uppercase text-[var(--text-muted)] block">Basal BMR</span>
                      <span className="text-sm sm:text-base font-mono font-bold text-white">{estBmr} kcal</span>
                      <span className="text-[8px] sm:text-[9px] font-mono text-[var(--text-muted)] block mt-0.5">Resting Burn</span>
                    </div>
                    <div className="bg-[var(--bg-canvas,#080808)] p-2.5 sm:p-3 rounded-lg border border-white/5">
                      <span className="text-[9px] sm:text-[10px] font-mono uppercase text-[var(--text-muted)] block">TDEE (Daily)</span>
                      <span className="text-sm sm:text-base font-mono font-bold text-white">{tdee} kcal</span>
                      <span className="text-[8px] sm:text-[9px] font-mono text-[var(--text-muted)] block mt-0.5">With {activity}</span>
                    </div>
                    <div className="bg-[var(--bg-canvas,#080808)] p-2.5 sm:p-3 rounded-lg border border-white/5">
                      <span className="text-[9px] sm:text-[10px] font-mono uppercase text-[var(--text-muted)] block">Healthy Weight</span>
                      <span className="text-sm sm:text-base font-mono font-bold text-white">{minIdealWeightKg}–{maxIdealWeightKg} kg</span>
                      <span className="text-[8px] sm:text-[9px] font-mono text-[var(--text-muted)] block mt-0.5">18.5–24.9 span</span>
                    </div>
                    <div className="bg-[var(--bg-canvas,#080808)] p-2.5 sm:p-3 rounded-lg border border-white/5">
                      <span className="text-[9px] sm:text-[10px] font-mono uppercase text-[var(--text-muted)] block">Body Fat</span>
                      <span className="text-sm sm:text-base font-mono font-bold text-emerald-400">
                        {estimatedBodyFat < 20 ? 'Lean Athletic' : estimatedBodyFat < 28 ? 'Healthy' : 'Elevated'}
                      </span>
                      <span className="text-[8px] sm:text-[9px] font-mono text-[var(--text-muted)] block mt-0.5">Deurenberg</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Recommended Track Card */}
              <div className="bg-[var(--bg-canvas,#080808)]/90 border border-white/10 rounded-xl p-3 sm:p-4 my-3 sm:my-4">
                <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-wider text-[var(--accent-secondary,#FF2E44)] font-bold block mb-0.5">
                  ★ RECOMMENDED ELITE TRACK
                </span>
                <h4 className="text-sm sm:text-lg font-display font-bold uppercase text-[var(--text-primary)]">
                  {recommendedProgram}
                </h4>
                <p className="text-[10px] sm:text-[11px] text-[var(--text-secondary)] mt-0.5 leading-snug">
                  {recommendationSummary}
                </p>
              </div>
            </div>

            {/* Dual Action Conversion Group */}
            <div className="space-y-2 pt-1 sm:pt-2">
              <button
                type="button"
                onClick={() => selectProgramAndScroll(recommendedProgram, `BMI ${bmiValue} (${category}) • Target: ${targetCalories}kcal`)}
                className="w-full py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-widest bg-[var(--accent-primary,#D70015)] text-white hover:bg-white hover:text-black transition-all shadow-[0_0_25px_rgba(215,0,21,0.35)] flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Claim Free Trial & Body Scan</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>

              <button
                type="button"
                onClick={generateWhatsAppShare}
                className="w-full py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider bg-transparent hover:bg-white/5 text-[var(--text-secondary)] hover:text-white border border-white/10 transition-all flex items-center justify-center gap-1.5 active:scale-95"
              >
                <span className="material-symbols-outlined text-emerald-400 text-sm">chat</span>
                <span>Send Assessment to Coach on WhatsApp</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
