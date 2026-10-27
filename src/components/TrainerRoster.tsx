import { motion } from 'framer-motion';
import { selectProgramAndScroll } from '../lib/funnelState';

interface Trainer {
  name: string;
  role: string;
  certifications: string[];
  experience: string;
  specialty: string;
  achievements: string;
  image: string;
}

const trainers: Trainer[] = [
  {
    name: 'Vikram Singh',
    role: 'Head Strength & Conditioning',
    certifications: ['CSCS Certified', 'IPF Level 2 Coach'],
    experience: '8+ Years',
    specialty: 'Barbell Hypertrophy & Olympic Lifting',
    achievements: 'Coached 120+ body recomposition athletes in Bihar',
    image: '/images/trainers/vikram-singh.png'
  },
  {
    name: 'Arjun Das',
    role: 'Functional & HIIT Performance',
    certifications: ['ACE-CPT', 'CrossFit Level 1'],
    experience: '6+ Years',
    specialty: 'Metabolic Conditioning & Core Power',
    achievements: 'Specialist in athletic stamina and fast fat-loss circuits',
    image: '/images/trainers/arjun-das.png'
  },
  {
    name: 'Neha Sharma',
    role: 'Director of Dance & Zumba Fitness',
    certifications: ['ZIN Certified Lead', 'Aerobics Master'],
    experience: '7+ Years',
    specialty: 'High-Energy Cardio Dance & Toning',
    achievements: 'Led 1,500+ daily sessions with 99% 5-star member satisfaction',
    image: '/images/trainers/neha-sharma.png'
  },
  {
    name: 'Pooja Patel',
    role: 'Mobility & Restorative Yoga',
    certifications: ['RYT-500 Master', 'Biomechanics Dip'],
    experience: '5+ Years',
    specialty: 'Spinal Decompression & Posture Correction',
    achievements: 'Restored pain-free movement for 200+ sedentary professionals',
    image: '/images/trainers/pooja-patel.png'
  }
];

export default function TrainerRoster() {
  return (
    <section className="relative py-10 sm:py-16 md:py-24 bg-[var(--bg-canvas,#080808)] border-t border-[var(--border-subtle)]" id="trainers">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 md:mb-16 gap-4 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--accent-secondary,#FF2E44)] text-xs font-mono font-semibold uppercase tracking-wider mb-3 sm:mb-4">
              <span>05 / CERTIFIED COACHING AUTHORITY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-7xl font-display font-extrabold uppercase text-[var(--text-primary,#FFFFFF)] leading-[0.95] tracking-tight">
              WORLD-CLASS <br />
              <span className="text-[var(--accent-primary,#D70015)]">COACHING ROSTER</span>
            </h2>
          </motion.div>

          <p className="max-w-md text-xs sm:text-sm md:text-base text-[var(--text-secondary,#A0A0A0)] leading-relaxed">
            No bro-science or guesswork. Our coaching leads hold verified credentials in exercise physiology, dance conditioning, and functional biomechanics.
          </p>
        </div>

        {/* Compact Responsive Portrait Grid (2-Column Mobile, 4-Column Desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
          {trainers.map((coach, idx) => (
            <motion.div
              key={coach.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-xl sm:rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface,#121212)] aspect-[3/4] flex flex-col justify-end transition-all duration-300 hover:border-[var(--border-accent,rgba(215,0,21,0.45))] magazine-shadow"
            >
              {/* Photo Background */}
              <img
                src={coach.image}
                alt={coach.name}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-top sm:object-center gym-photo-grade transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-canvas,#080808)] via-[var(--bg-canvas,#080808)]/75 sm:via-[var(--bg-canvas,#080808)]/70 to-transparent"></div>

              {/* Top Experience Pill */}
              <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-10">
                <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase bg-black/85 text-[var(--accent-secondary,#FF2E44)] border border-[var(--accent-primary,#D70015)]/40 backdrop-blur-md">
                  {coach.experience}
                </span>
              </div>

              {/* Bottom Card Identity & Accessible Bio */}
              <div className="relative z-10 p-2.5 sm:p-5 md:p-6 flex flex-col justify-end">
                <div className="mb-1.5 sm:mb-2">
                  <span className="text-[8px] sm:text-[10px] font-mono uppercase tracking-wider text-[var(--accent-secondary,#FF2E44)] font-bold block truncate">
                    {coach.role}
                  </span>
                  <h3 className="text-base sm:text-2xl font-display font-bold uppercase text-[var(--text-primary)] leading-tight">
                    {coach.name}
                  </h3>
                </div>

                {/* Certifications Row (Compact on Mobile) */}
                <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
                  {coach.certifications.slice(0, 2).map((cert, cIdx) => (
                    <span
                      key={cIdx}
                      className="text-[8px] sm:text-[10px] font-mono px-1.5 sm:px-2 py-0.5 rounded bg-white/10 text-[var(--text-primary)] border border-white/5 truncate max-w-full"
                    >
                      {cert}
                    </span>
                  ))}
                </div>

                {/* Direct Action Link */}
                <div className="border-t border-white/10 pt-1.5 sm:pt-2">
                  <button
                    onClick={() => selectProgramAndScroll('1-on-1 Elite Coaching', `Trainer: ${coach.name}`)}
                    className="w-full inline-flex items-center justify-between text-[10px] sm:text-[11px] font-mono font-bold text-[var(--accent-secondary,#FF2E44)] uppercase hover:underline py-0.5 active:scale-95 transition-transform"
                  >
                    <span>Train with {coach.name.split(' ')[0]}</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
