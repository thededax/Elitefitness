import { motion } from 'framer-motion';
import { selectProgramAndScroll } from '../lib/funnelState';

interface ProgramItem {
  id: string;
  name: string;
  category: string;
  headline: string;
  description: string;
  intensity: 1 | 2 | 3;
  duration: string;
  highlights: string[];
  image: string;
  isFlagship?: boolean;
  colSpanDesktop: string;
}

const programs: ProgramItem[] = [
  {
    id: 'strength',
    name: 'Strength & Hypertrophy',
    category: 'Flagship Barbell',
    headline: 'Build Lean Muscle & Functional Power',
    description: 'Periodized progressive overload using Olympic barbells, calibrated plates, dumbbell arrays up to 50kg, and ergonomic cable towers.',
    intensity: 3,
    duration: '60 min',
    highlights: ['Olympic Platforms & Racks', 'Form & Biomechanics Analysis', 'Periodized Power Blocks'],
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop',
    isFlagship: true,
    colSpanDesktop: 'lg:col-span-6'
  },
  {
    id: 'zumba',
    name: 'Zumba Energy & Dance Fitness',
    category: 'High-Energy Party',
    headline: 'Burn 600+ Calories in Pure Rhythm',
    description: "Bhagalpur's most electric group studio workout. Fuses Latin rhythms, hip-hop intervals, and cardio conditioning in a high-voltage, female-friendly party environment.",
    intensity: 2,
    duration: '50 min',
    highlights: ['Certified Zumba Leads', 'Immersive Sound & Lights', 'Beginner to Advanced'],
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop',
    isFlagship: true,
    colSpanDesktop: 'lg:col-span-6'
  },
  {
    id: 'personal',
    name: '1-on-1 Elite Coaching',
    category: 'Private Mentorship',
    headline: 'Accelerated Transformation & Total Accountability',
    description: 'Dedicated mentorship customized to your exact body composition, metabolic rate, posture needs, and work schedule.',
    intensity: 3,
    duration: '60 min',
    highlights: ['Tailored Movement Protocol', 'Weekly Body Stat Scans', 'Direct WhatsApp Access'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop',
    colSpanDesktop: 'lg:col-span-4'
  },
  {
    id: 'hiit',
    name: 'Metabolic HIIT & Conditioning',
    category: 'Fat Loss & Stamina',
    headline: 'High-Octane Anaerobic Thresholds',
    description: 'Short rest intervals, kettlebell complexes, battle ropes, and assault bikes designed to keep your metabolic rate burning calories long after the workout ends.',
    intensity: 3,
    duration: '45 min',
    highlights: ['EPOC Afterburn Effect', 'Heart-Rate Tracked Blocks', 'Functional Circuit Stations'],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
    colSpanDesktop: 'lg:col-span-4'
  },
  {
    id: 'recovery',
    name: 'Yoga, Mobility & Decompression',
    category: 'Longevity & Health',
    headline: 'Joint Longevity & Deep Fascial Release',
    description: 'Decompress spinal loads, loosen tight hip flexors from desk work, and balance nervous system strain with restorative breath and flow.',
    intensity: 1,
    duration: '50 min',
    highlights: ['Spinal & Hip Mobility', 'Post-Lifting Recovery', 'Guided Breathwork'],
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop',
    colSpanDesktop: 'lg:col-span-4'
  }
];

export default function BentoPrograms() {
  return (
    <section className="relative py-16 md:py-28 bg-[var(--bg-canvas,#080808)]" id="programs-bento">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--accent-secondary,#FF2E44)] text-xs font-mono font-semibold uppercase tracking-wider mb-4">
              <span>01 / CORE DISCIPLINES</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-display font-extrabold uppercase text-[var(--text-primary,#FFFFFF)] leading-[0.95] tracking-tight">
              PRECISION TRAINING <br />
              <span className="text-[var(--accent-primary,#D70015)]">PROGRAMS</span>
            </h2>
          </motion.div>

          <p className="max-w-md text-sm md:text-base text-[var(--text-secondary,#A0A0A0)] leading-relaxed">
            Every track is architected around verified biomechanics, progressive loading, and coaching accountability. Choose your pathway or test any session during your 3-day guest pass.
          </p>
        </div>

        {/* Asymmetrical 12-Column Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {programs.map((program, idx) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface,#121212)] flex flex-col justify-between transition-all duration-300 hover:border-[var(--border-accent,rgba(215,0,21,0.45))] ${program.colSpanDesktop}`}
            >
              {/* Image & Visual Atmosphere */}
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <img
                  src={program.image}
                  alt={program.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover gym-photo-grade transform group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface,#121212)] via-[var(--bg-surface,#121212)]/40 to-transparent"></div>
                
                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 flex-wrap gap-2">
                  <span className="px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase bg-[var(--bg-canvas,#080808)]/90 text-white border border-white/10 backdrop-blur-md">
                    {program.category}
                  </span>
                  
                  {/* Intensity Indicator */}
                  <div className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-full bg-[var(--bg-canvas,#080808)]/90 border border-white/10 backdrop-blur-md">
                    <span className="text-[9px] sm:text-[10px] font-mono uppercase text-[var(--text-secondary)]">Intensity:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3].map((level) => (
                        <span
                          key={level}
                          className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full ${
                            level <= program.intensity
                              ? 'bg-[var(--accent-primary,#D70015)] shadow-[0_0_8px_rgba(215,0,21,0.6)]'
                              : 'bg-white/20'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Duration Tag */}
                <div className="absolute bottom-4 left-4 z-10">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-black/75 text-[var(--accent-secondary,#FF2E44)] border border-[var(--accent-primary,#D70015)]/40">
                    ⏱ {program.duration} Session
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 sm:p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold uppercase text-[var(--text-primary,#FFFFFF)] tracking-tight mb-2">
                    {program.name}
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-secondary,#FF2E44)] mb-3">
                    {program.headline}
                  </p>
                  <p className="text-sm text-[var(--text-secondary,#A0A0A0)] leading-relaxed mb-6 font-normal">
                    {program.description}
                  </p>

                  {/* Highlights Pill List */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {program.highlights.map((item, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono px-2.5 py-1 rounded-md bg-[var(--bg-surface-elevated,#181818)] text-[var(--text-secondary)] border border-white/5"
                      >
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Action */}
                <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                  <button
                    onClick={() => selectProgramAndScroll(program.name)}
                    className="group/btn inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--accent-secondary,#FF2E44)] hover:text-white transition-colors"
                  >
                    <span>Book Trial for {program.name.split(' ')[0]}</span>
                    <span className="material-symbols-outlined text-sm transform group-hover/btn:translate-x-1.5 transition-transform">
                      arrow_forward
                    </span>
                  </button>
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
                    3-Day Pass Valid
                  </span>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Full-width 12-Col Facility & Nutrition Support Strip */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-12 rounded-2xl border border-[var(--border-accent,rgba(215,0,21,0.35))] bg-gradient-to-r from-[var(--bg-surface-elevated,#181818)] via-[var(--bg-surface,#121212)] to-[var(--bg-surface-elevated,#181818)] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--accent-primary,#D70015)] flex items-center justify-center text-white shrink-0 font-bold shadow-[0_0_20px_rgba(215,0,21,0.4)]">
                <span className="material-symbols-outlined text-2xl">restaurant</span>
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-display font-bold uppercase text-[var(--text-primary,#FFFFFF)]">
                  Personalized Nutrition & Body Composition Mentorship
                </h4>
                <p className="text-xs sm:text-sm text-[var(--text-secondary,#A0A0A0)]">
                  Every active member receives complimentary macro guidance, hydration coaching, and bi-weekly body fat scans.
                </p>
              </div>
            </div>

            <button
              onClick={() => selectProgramAndScroll('Nutrition & Body Composition')}
              className="w-full md:w-auto px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest bg-transparent border border-[var(--accent-primary,#D70015)] text-white hover:bg-[var(--accent-primary,#D70015)] transition-all shrink-0"
            >
              Add Nutrition Track →
            </button>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
