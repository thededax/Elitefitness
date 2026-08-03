import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const scheduleData = [
  { day: 'Monday', classes: [
    { time: '06:00 AM', name: 'Elite Powerlifting', trainer: 'Vikram Singh', type: 'Strength', spots: 4 },
    { time: '08:00 AM', name: 'Zumba Energy', trainer: 'Neha Sharma', type: 'Cardio', spots: 12 },
    { time: '05:00 PM', name: 'HIIT Burn', trainer: 'Robert Wilson', type: 'Cardio', spots: 2 },
    { time: '07:00 PM', name: 'Yoga & Mobility', trainer: 'Pooja Patel', type: 'Recovery', spots: 8 }
  ]},
  { day: 'Tuesday', classes: [
    { time: '06:00 AM', name: 'Functional Core', trainer: 'Arjun Das', type: 'Strength', spots: 6 },
    { time: '09:00 AM', name: 'Zumba Toning', trainer: 'Neha Sharma', type: 'Cardio', spots: 15 },
    { time: '06:00 PM', name: 'Strength Conditioning', trainer: 'Vikram Singh', type: 'Strength', spots: 5 }
  ]},
  { day: 'Wednesday', classes: [
    { time: '06:00 AM', name: 'Elite Powerlifting', trainer: 'Vikram Singh', type: 'Strength', spots: 2 },
    { time: '08:00 AM', name: 'Zumba Energy', trainer: 'Neha Sharma', type: 'Cardio', spots: 8 },
    { time: '05:00 PM', name: 'HIIT Burn', trainer: 'Robert Wilson', type: 'Cardio', spots: 0 },
    { time: '07:00 PM', name: 'Yoga Flow', trainer: 'Pooja Patel', type: 'Recovery', spots: 10 }
  ]},
  { day: 'Thursday', classes: [
    { time: '06:00 AM', name: 'Mobility & Prep', trainer: 'Arjun Das', type: 'Recovery', spots: 12 },
    { time: '09:00 AM', name: 'Zumba Latin', trainer: 'Neha Sharma', type: 'Cardio', spots: 20 },
    { time: '06:00 PM', name: 'Barbell Club', trainer: 'Vikram Singh', type: 'Strength', spots: 3 }
  ]},
  { day: 'Friday', classes: [
    { time: '06:00 AM', name: 'Elite Powerlifting', trainer: 'Vikram Singh', type: 'Strength', spots: 1 },
    { time: '08:00 AM', name: 'Zumba Party', trainer: 'Neha Sharma', type: 'Cardio', spots: 25 },
    { time: '05:00 PM', name: 'Endurance Circuit', trainer: 'Robert Wilson', type: 'Cardio', spots: 6 }
  ]},
  { day: 'Saturday', classes: [
    { time: '07:00 AM', name: 'Weekend Warrior', trainer: 'Arjun Das', type: 'Strength', spots: 8 },
    { time: '10:00 AM', name: 'Zumba Masterclass', trainer: 'Neha Sharma', type: 'Cardio', spots: 30 },
  ]},
  { day: 'Sunday', classes: [
    { time: '08:00 AM', name: 'Restorative Yoga', trainer: 'Pooja Patel', type: 'Recovery', spots: 15 },
    { time: '10:00 AM', name: 'Open Gym', trainer: 'Team', type: 'All', spots: 50 }
  ]}
];

export default function ClassSchedule() {
  const [activeDay, setActiveDay] = useState('Monday');
  const activeClasses = scheduleData.find(d => d.day === activeDay)?.classes || [];

  return (
    <div className="w-full bg-surface border border-white/10 p-6 md:p-10 magazine-shadow">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-headline text-white uppercase mb-2">Weekly<br/><span className="text-primary">Schedule</span></h2>
          <p className="text-slate-400 text-sm">Book your spot up to 7 days in advance.</p>
        </div>
        <div className="flex bg-background-dark p-1 border border-white/5 overflow-x-auto max-w-full w-full md:w-auto scrollbar-hide">
          {scheduleData.map((d) => (
            <button
              key={d.day}
              onClick={() => setActiveDay(d.day)}
              className={`px-4 md:px-6 py-2 md:py-3 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors whitespace-nowrap
                ${activeDay === d.day ? 'bg-primary text-white' : 'text-slate-500 hover:text-white'}
              `}
            >
              {d.day.substring(0, 3)}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[400px]">
        <div className="hidden md:grid grid-cols-12 gap-4 border-b border-white/10 pb-4 mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          <div className="col-span-2">Time</div>
          <div className="col-span-4">Class Name</div>
          <div className="col-span-3">Instructor</div>
          <div className="col-span-3 text-right">Availability</div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            {activeClasses.map((cls, idx) => (
              <div key={idx} className="group grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 bg-background-dark/50 hover:bg-white/5 border border-transparent hover:border-white/10 transition-all">
                <div className="col-span-12 md:col-span-2 flex items-center gap-4 md:block">
                  <span className="text-lg md:text-xl font-headline text-white">{cls.time}</span>
                  <span className="md:hidden text-[10px] uppercase font-bold text-primary px-2 py-1 bg-primary/10">{cls.type}</span>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <h4 className="text-base md:text-lg text-white font-headline uppercase tracking-wide">{cls.name}</h4>
                  <span className="hidden md:inline-block text-[9px] uppercase font-bold text-primary mt-1 tracking-widest">{cls.type}</span>
                </div>
                <div className="col-span-12 md:col-span-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-surface border border-white/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[15px] text-slate-400">person</span>
                  </div>
                  <span className="text-sm text-slate-300">{cls.trainer}</span>
                </div>
                <div className="col-span-12 md:col-span-3 flex items-center justify-between md:justify-end mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-none border-white/5">
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${cls.spots === 0 ? 'text-red-500' : cls.spots <= 5 ? 'text-orange-400' : 'text-slate-400'} md:mr-6`}>
                    {cls.spots === 0 ? 'Waitlist' : `${cls.spots} Spots Left`}
                  </span>
                  <button 
                    disabled={cls.spots === 0}
                    className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest-plus transition-all ${
                      cls.spots === 0 
                        ? 'bg-surface text-slate-600 cursor-not-allowed border border-white/5' 
                        : 'bg-primary text-white hover:bg-white hover:text-primary glow-red-hover'
                    }`}
                  >
                    {cls.spots === 0 ? 'Full' : 'Book'}
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
