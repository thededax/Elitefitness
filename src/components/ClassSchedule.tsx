import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { selectProgramAndScroll } from '../lib/funnelState';

interface ClassItem {
  time: string;
  name: string;
  trainer: string;
  modality: 'Strength' | 'Cardio' | 'HIIT' | 'Recovery' | 'All';
  intensity: 'High' | 'Moderate' | 'Low';
  spots: number;
}

interface DaySchedule {
  day: string;
  short: string;
  classes: ClassItem[];
}

const scheduleData: DaySchedule[] = [
  {
    day: 'Monday',
    short: 'Mon',
    classes: [
      { time: '06:00 AM', name: 'Elite Barbell & Powerlifting', trainer: 'Vikram Singh', modality: 'Strength', intensity: 'High', spots: 4 },
      { time: '07:30 AM', name: 'Morning Cardio Shred', trainer: 'Arjun Das', modality: 'HIIT', intensity: 'High', spots: 8 },
      { time: '09:00 AM', name: 'Zumba Energy Party', trainer: 'Neha Sharma', modality: 'Cardio', intensity: 'Moderate', spots: 12 },
      { time: '05:00 PM', name: 'Metabolic HIIT Burn', trainer: 'Robert Wilson', modality: 'HIIT', intensity: 'High', spots: 2 },
      { time: '06:30 PM', name: 'Hypertrophy Upper Body', trainer: 'Vikram Singh', modality: 'Strength', intensity: 'High', spots: 6 },
      { time: '08:00 PM', name: 'Decompression & Yoga Flow', trainer: 'Pooja Patel', modality: 'Recovery', intensity: 'Low', spots: 10 }
    ]
  },
  {
    day: 'Tuesday',
    short: 'Tue',
    classes: [
      { time: '06:00 AM', name: 'Functional Core & Kinetic Chains', trainer: 'Arjun Das', modality: 'Strength', intensity: 'Moderate', spots: 6 },
      { time: '08:00 AM', name: 'Zumba Toning & Glutes', trainer: 'Neha Sharma', modality: 'Cardio', intensity: 'Moderate', spots: 15 },
      { time: '05:00 PM', name: 'Olympic Weightlifting Basics', trainer: 'Vikram Singh', modality: 'Strength', intensity: 'High', spots: 5 },
      { time: '06:30 PM', name: 'Assault Bike & Kettlebell Sprint', trainer: 'Arjun Das', modality: 'HIIT', intensity: 'High', spots: 4 },
      { time: '08:00 PM', name: 'Deep Fascial Mobility', trainer: 'Pooja Patel', modality: 'Recovery', intensity: 'Low', spots: 8 }
    ]
  },
  {
    day: 'Wednesday',
    short: 'Wed',
    classes: [
      { time: '06:00 AM', name: 'Elite Barbell & Powerlifting', trainer: 'Vikram Singh', modality: 'Strength', intensity: 'High', spots: 2 },
      { time: '08:00 AM', name: 'Zumba Latin Fever', trainer: 'Neha Sharma', modality: 'Cardio', intensity: 'Moderate', spots: 8 },
      { time: '05:00 PM', name: 'Metabolic HIIT Burn', trainer: 'Robert Wilson', modality: 'HIIT', intensity: 'High', spots: 0 },
      { time: '06:30 PM', name: 'Deadlift & Squat Mechanics', trainer: 'Vikram Singh', modality: 'Strength', intensity: 'High', spots: 5 },
      { time: '08:00 PM', name: 'Restorative Vinyasa', trainer: 'Pooja Patel', modality: 'Recovery', intensity: 'Low', spots: 12 }
    ]
  },
  {
    day: 'Thursday',
    short: 'Thu',
    classes: [
      { time: '06:00 AM', name: 'Mobility & Prep Drills', trainer: 'Arjun Das', modality: 'Recovery', intensity: 'Low', spots: 12 },
      { time: '08:00 AM', name: 'Zumba Cardio Explosion', trainer: 'Neha Sharma', modality: 'Cardio', intensity: 'Moderate', spots: 18 },
      { time: '05:00 PM', name: 'Posterior Chain Hypertrophy', trainer: 'Vikram Singh', modality: 'Strength', intensity: 'High', spots: 4 },
      { time: '06:30 PM', name: 'Barbell Conditioning Club', trainer: 'Vikram Singh', modality: 'Strength', intensity: 'High', spots: 3 },
      { time: '08:00 PM', name: 'Hip & Lower Back Release', trainer: 'Pooja Patel', modality: 'Recovery', intensity: 'Low', spots: 10 }
    ]
  },
  {
    day: 'Friday',
    short: 'Fri',
    classes: [
      { time: '06:00 AM', name: 'Elite Barbell & Powerlifting', trainer: 'Vikram Singh', modality: 'Strength', intensity: 'High', spots: 1 },
      { time: '08:00 AM', name: 'Friday Zumba Dance Club', trainer: 'Neha Sharma', modality: 'Cardio', intensity: 'Moderate', spots: 22 },
      { time: '05:00 PM', name: 'Endurance Circuit Battle', trainer: 'Robert Wilson', modality: 'HIIT', intensity: 'High', spots: 5 },
      { time: '06:30 PM', name: 'Arm & Shoulder Armour', trainer: 'Vikram Singh', modality: 'Strength', intensity: 'Moderate', spots: 7 }
    ]
  },
  {
    day: 'Saturday',
    short: 'Sat',
    classes: [
      { time: '07:00 AM', name: 'Weekend Warrior Strongman', trainer: 'Arjun Das', modality: 'Strength', intensity: 'High', spots: 8 },
      { time: '09:00 AM', name: 'Zumba Mega Masterclass (90m)', trainer: 'Neha Sharma', modality: 'Cardio', intensity: 'High', spots: 25 },
      { time: '11:00 AM', name: 'Full Body Circuit & Core', trainer: 'Vikram Singh', modality: 'HIIT', intensity: 'High', spots: 12 },
      { time: '05:00 PM', name: 'Open Lifting & Mentorship', trainer: 'Team Elite', modality: 'All', intensity: 'Moderate', spots: 30 }
    ]
  },
  {
    day: 'Sunday',
    short: 'Sun',
    classes: [
      { time: '08:00 AM', name: 'Spinal Decompression & Yoga', trainer: 'Pooja Patel', modality: 'Recovery', intensity: 'Low', spots: 14 },
      { time: '10:00 AM', name: 'Open Community Gym Access', trainer: 'Floor Coach', modality: 'All', intensity: 'Moderate', spots: 45 }
    ]
  }
];

type ModalityFilter = 'All' | 'Strength' | 'Cardio' | 'HIIT' | 'Recovery';

export default function ClassSchedule() {
  const [activeDay, setActiveDay] = useState('Monday');
  const [activeFilter, setActiveFilter] = useState<ModalityFilter>('All');

  const currentDayData = scheduleData.find((d) => d.day === activeDay);
  const allClasses = currentDayData?.classes || [];

  const filteredClasses = allClasses.filter((c) => {
    if (activeFilter === 'All') return true;
    return c.modality === activeFilter;
  });

  return (
    <div className="w-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface,#121212)] p-4 sm:p-6 md:p-10 magazine-shadow">
      
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-6 sm:mb-8 md:mb-12 gap-4 sm:gap-6 pb-4 sm:pb-6 border-b border-[var(--border-subtle)]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-canvas,#080808)] text-[var(--accent-secondary,#FF2E44)] text-xs font-mono font-semibold uppercase tracking-wider mb-2.5 sm:mb-3">
            <span>02 / LIVE TIMETABLE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-6xl font-display font-extrabold uppercase text-[var(--text-primary,#FFFFFF)] leading-none">
            WEEKLY CLASS <span className="text-[var(--accent-primary,#D70015)]">SCHEDULE</span>
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary,#A0A0A0)] mt-1.5 sm:mt-2">
            6:00 AM to 10:00 PM daily. Book your trial pass or reserve a guest session up to 7 days in advance.
          </p>
        </div>

        {/* Modality Filter Pills */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2" role="tablist" aria-label="Modality Filter">
          {(['All', 'Strength', 'Cardio', 'HIIT', 'Recovery'] as ModalityFilter[]).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                activeFilter === filter
                  ? 'bg-[var(--accent-primary,#D70015)] text-white shadow-[0_0_15px_rgba(215,0,21,0.4)]'
                  : 'bg-[var(--bg-surface-elevated,#181818)] text-[var(--text-secondary)] hover:text-white border border-white/5'
              }`}
            >
              {filter === 'All' ? 'All Modalities' : filter}
            </button>
          ))}
        </div>
      </div>

      {/* Swipeable Day Selector */}
      <div className="flex bg-[var(--bg-canvas,#080808)] p-1 sm:p-1.5 rounded-xl border border-white/5 overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-1 mb-5 sm:mb-8" role="tablist" aria-label="Day of week selector">
        {scheduleData.map((d) => (
          <button
            key={d.day}
            onClick={() => setActiveDay(d.day)}
            role="tab"
            aria-selected={activeDay === d.day}
            className={`flex-1 min-w-[58px] sm:min-w-[90px] py-2 sm:py-2.5 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-display font-bold uppercase tracking-wider transition-all whitespace-nowrap snap-center text-center ${
              activeDay === d.day
                ? 'bg-[var(--accent-primary,#D70015)] text-white shadow-lg'
                : 'text-[var(--text-secondary,#A0A0A0)] hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="block sm:hidden">{d.short}</span>
            <span className="hidden sm:block">{d.day}</span>
          </button>
        ))}
      </div>

      {/* Schedule Table Container */}
      <div className="min-h-[340px]">
        {/* Desktop Table Headers */}
        <div className="hidden md:grid grid-cols-12 gap-4 pb-3 mb-3 text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted,#707070)] border-b border-white/5 px-4">
          <div className="col-span-2">Time (IST)</div>
          <div className="col-span-4">Session Name</div>
          <div className="col-span-3">Lead Coach</div>
          <div className="col-span-3 text-right">Pass Reservation</div>
        </div>

        {/* Rows */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeDay}-${activeFilter}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="flex flex-col gap-2.5 sm:gap-3"
          >
            {filteredClasses.length === 0 ? (
              <div className="py-12 sm:py-16 text-center text-xs sm:text-sm font-mono text-[var(--text-muted)] border border-dashed border-white/10 rounded-xl">
                No sessions match "{activeFilter}" on {activeDay}. Try selecting another modality or day.
              </div>
            ) : (
              filteredClasses.map((cls, idx) => (
                <div
                  key={idx}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-2.5 sm:gap-3 md:gap-4 items-center p-3 sm:p-4 rounded-xl bg-[var(--bg-canvas,#080808)]/85 hover:bg-[var(--bg-surface-elevated,#181818)] border border-white/5 hover:border-[var(--border-accent)] transition-all duration-200"
                >
                  {/* Time + Mobile Modality */}
                  <div className="col-span-12 md:col-span-2 flex items-center justify-between md:block">
                    <span className="text-sm sm:text-base md:text-lg font-mono font-bold text-white">
                      {cls.time}
                    </span>
                    <span className="md:hidden text-[9px] sm:text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/10 text-white">
                      {cls.modality}
                    </span>
                  </div>

                  {/* Class Name + Badges */}
                  <div className="col-span-12 md:col-span-4">
                    <h4 className="text-sm sm:text-base md:text-lg text-[var(--text-primary)] font-display font-bold uppercase tracking-wide group-hover:text-[var(--accent-secondary,#FF2E44)] transition-colors">
                      {cls.name}
                    </h4>
                    <div className="hidden md:flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[var(--bg-surface-elevated,#181818)] text-[var(--text-secondary)] border border-white/5">
                        {cls.modality}
                      </span>
                      <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                        cls.intensity === 'High'
                          ? 'bg-[var(--accent-primary,#D70015)]/20 text-[var(--accent-secondary,#FF2E44)] border border-[var(--accent-primary,#D70015)]/40'
                          : 'bg-white/10 text-white border border-white/10'
                      }`}>
                        {cls.intensity} Intensity
                      </span>
                    </div>
                  </div>

                  {/* Coach */}
                  <div className="col-span-12 md:col-span-3 flex items-center gap-2.5 sm:gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[var(--bg-surface-elevated,#181818)] border border-white/10 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[14px] sm:text-[16px] text-[var(--accent-secondary,#FF2E44)]">person</span>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-[var(--text-primary)]">{cls.trainer}</p>
                      <p className="text-[9px] sm:text-[10px] font-mono text-[var(--text-muted)] uppercase">Elite Coach</p>
                    </div>
                  </div>

                  {/* Spots & CTA */}
                  <div className="col-span-12 md:col-span-3 flex items-center justify-between md:justify-end gap-2.5 sm:gap-3 pt-2.5 sm:pt-3 md:pt-0 border-t md:border-none border-white/5">
                    <span
                      className={`text-[11px] sm:text-xs font-mono font-bold uppercase ${
                        cls.spots === 0
                          ? 'text-red-400'
                          : cls.spots <= 4
                          ? 'text-amber-300'
                          : 'text-[var(--text-secondary)]'
                      }`}
                    >
                      {cls.spots === 0 ? 'Waitlist Only' : `${cls.spots} Spots Left`}
                    </span>

                    <button
                      disabled={cls.spots === 0}
                      onClick={() => selectProgramAndScroll(cls.name, `${activeDay} at ${cls.time}`)}
                      className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                        cls.spots === 0
                          ? 'bg-white/5 text-[var(--text-muted)] cursor-not-allowed border border-white/5'
                          : 'bg-[var(--accent-primary,#D70015)] text-white hover:bg-white hover:text-black shadow-md'
                      }`}
                    >
                      {cls.spots === 0 ? 'Full' : 'Reserve Slot'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footnote */}
      <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-[var(--text-muted)] gap-2 sm:gap-3 font-mono">
        <span>* Non-members can book any single class with their free 3-Day Trial Pass.</span>
        <span>Studio opens at 6:00 AM • Kotwali Chowk, Bhagalpur</span>
      </div>
    </div>
  );
}
