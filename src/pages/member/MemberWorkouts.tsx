import React, { useState, useEffect } from 'react';
import { useAuth } from '../../lib/AuthContext';
import { gymDb } from '../../lib/supabase';
import type { WorkoutPlan } from '../../lib/database.types';
import { Helmet } from 'react-helmet-async';

export default function MemberWorkouts() {
  const { user } = useAuth();
  const [workout, setWorkout] = useState<WorkoutPlan | null>(null);
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (user) {
      const plan = gymDb.getWorkoutPlan(user.id);
      setWorkout(plan);
    }
  }, [user]);

  if (!user) return null;

  const toggleExercise = (name: string) => {
    setCompletedExercises((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const totalExercises = workout?.exercises.length || 0;
  const completedCount = Object.values(completedExercises).filter(Boolean).length;
  const progressPercent = totalExercises > 0 ? Math.round((completedCount / totalExercises) * 100) : 0;

  return (
    <>
      <Helmet>
        <title>Workout Routine & Exercises | Elite Zumba & Fitness Studio</title>
      </Helmet>

      <div className="space-y-6 sm:space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[var(--accent-secondary,#FF2E44)] text-xs font-mono font-semibold uppercase tracking-wider mb-2">
              <span>Coaching Programming</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold uppercase text-white tracking-wide">
              WORKOUT ROUTINE
            </h1>
            <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary,#A0A0A0)]">
              Periodized splits, sets, repetition targets, and biomechanical guidance.
            </p>
          </div>

          {workout && (
            <div className="p-3 rounded-2xl bg-[var(--bg-surface,#121212)] border border-white/10 text-right">
              <div className="text-[10px] font-mono uppercase text-white/50">Today's Progress</div>
              <div className="text-xl font-display font-bold text-white">
                {completedCount} / {totalExercises} Exercises
              </div>
            </div>
          )}
        </div>

        {workout ? (
          <div className="space-y-6">
            
            {/* Plan Header Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[var(--bg-surface,#121212)] to-[var(--bg-surface-elevated,#181818)] border border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-white/10">
                <div>
                  <div className="text-2xl font-display font-bold uppercase text-white">
                    {workout.name}
                  </div>
                  <p className="text-xs font-sans text-[var(--text-secondary,#A0A0A0)] mt-1">
                    {workout.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-[var(--accent-primary,#D70015)]/20 text-[var(--accent-secondary,#FF2E44)] border border-[var(--accent-primary,#D70015)]/30">
                    {workout.difficulty}
                  </span>
                </div>
              </div>

              {/* Training Days */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono uppercase text-white/40 mr-1">Training Days:</span>
                {workout.schedule_days.map((day) => (
                  <span
                    key={day}
                    className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono font-bold text-white"
                  >
                    {day}
                  </span>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs font-mono text-white/60 mb-2">
                  <span>Session Completion</span>
                  <span className="text-white font-bold">{progressPercent}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[var(--accent-primary,#D70015)] transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Exercise List */}
            <div className="space-y-3">
              <h2 className="text-lg font-display font-bold uppercase text-white">
                Exercise Protocols
              </h2>

              <div className="grid grid-cols-1 gap-3">
                {workout.exercises.map((ex, idx) => {
                  const isDone = Boolean(completedExercises[ex.name]);

                  return (
                    <div
                      key={ex.name}
                      onClick={() => toggleExercise(ex.name)}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer select-none flex items-center justify-between gap-4 ${
                        isDone
                          ? 'bg-green-500/10 border-green-500/40 text-green-300'
                          : 'bg-[var(--bg-surface,#121212)] border-white/10 hover:border-white/20 text-white'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Checkbox Icon */}
                        <div
                          className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 transition-colors ${
                            isDone
                              ? 'bg-green-500 text-black border-green-500 font-bold'
                              : 'border-white/20 bg-white/5 text-transparent'
                          }`}
                        >
                          <span className="material-symbols-outlined text-base">check</span>
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-white/40">#{idx + 1}</span>
                            <span className={`text-base font-display font-bold uppercase tracking-wide ${isDone ? 'line-through text-white/60' : 'text-white'}`}>
                              {ex.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs font-mono text-white/60 mt-1">
                            <span className="text-[var(--accent-secondary,#FF2E44)] font-bold">
                              {ex.sets} Sets × {ex.reps} Reps
                            </span>
                            <span>•</span>
                            <span className="text-white/80">{ex.target_muscle}</span>
                          </div>
                          {ex.notes && (
                            <div className="text-[11px] font-sans text-white/50 mt-1 italic">
                              "{ex.notes}"
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="hidden sm:block text-right text-xs font-mono text-white/40">
                        {isDone ? 'COMPLETED' : 'PENDING'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        ) : (
          <div className="p-12 rounded-3xl bg-[var(--bg-surface,#121212)] border border-white/10 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/5 mx-auto flex items-center justify-center text-white/40 mb-4">
              <span className="material-symbols-outlined text-3xl">fitness_center</span>
            </div>
            <h2 className="text-xl font-display font-bold uppercase text-white mb-2">
              No Custom Plan Assigned Yet
            </h2>
            <p className="text-xs text-[var(--text-secondary,#A0A0A0)] max-w-md mx-auto leading-relaxed">
              Consult with Head Coach Vikram Singh or our certified training staff on the 5th floor to get your personalized strength & Zumba split assigned.
            </p>
          </div>
        )}

      </div>
    </>
  );
}
