import React, { useState, useEffect } from 'react';
import { useAuth } from '../../lib/AuthContext';
import { gymDb, formatDateYMD } from '../../lib/supabase';
import type { ProgressLog } from '../../lib/database.types';
import { Helmet } from 'react-helmet-async';

export default function MemberProgress() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<ProgressLog[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [weightKg, setWeightKg] = useState('');
  const [bodyFat, setBodyFat] = useState('');
  const [chestCm, setChestCm] = useState('');
  const [waistCm, setWaistCm] = useState('');
  const [armsCm, setArmsCm] = useState('');
  const [notes, setNotes] = useState('');
  const [recordDate, setRecordDate] = useState(formatDateYMD(new Date()));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setLogs(gymDb.getProgressLogs(user.id));
    }
  }, [user]);

  if (!user) return null;

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const w = parseFloat(weightKg);
    if (isNaN(w) || w <= 20 || w >= 300) {
      setError('Please provide a realistic body weight in kg (between 20kg and 300kg).');
      return;
    }

    const newLog = gymDb.addProgressLog({
      member_id: user.id,
      recorded_at: recordDate,
      weight_kg: w,
      body_fat_percentage: bodyFat ? parseFloat(bodyFat) : null,
      chest_cm: chestCm ? parseFloat(chestCm) : null,
      waist_cm: waistCm ? parseFloat(waistCm) : null,
      arms_cm: armsCm ? parseFloat(armsCm) : null,
      notes: notes.trim() || null,
    });

    setLogs(gymDb.getProgressLogs(user.id));
    setShowAddModal(false);

    // Reset Form
    setWeightKg('');
    setBodyFat('');
    setChestCm('');
    setWaistCm('');
    setArmsCm('');
    setNotes('');
  };

  const handleDeleteLog = (id: string) => {
    if (confirm('Delete this measurement entry?')) {
      gymDb.deleteProgressLog(id);
      setLogs(gymDb.getProgressLogs(user.id));
    }
  };

  // Compute weight delta from first log to latest log
  const latestLog = logs[0];
  const oldestLog = logs[logs.length - 1];
  const weightChange =
    latestLog?.weight_kg && oldestLog?.weight_kg
      ? (latestLog.weight_kg - oldestLog.weight_kg).toFixed(1)
      : null;

  return (
    <>
      <Helmet>
        <title>Fitness Progress & Metrics | Elite Zumba & Fitness Studio</title>
      </Helmet>

      <div className="space-y-6 sm:space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[var(--accent-secondary,#FF2E44)] text-xs font-mono font-semibold uppercase tracking-wider mb-2">
              <span>Biometric Logging</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold uppercase text-white tracking-wide">
              FITNESS PROGRESS
            </h1>
            <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary,#A0A0A0)]">
              Track body weight, circumference measurements, and physique milestones.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="py-3 px-5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-[var(--accent-primary,#D70015)] text-white hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(215,0,21,0.4)] active:scale-95 self-start sm:self-auto flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span>Record New Assessment</span>
          </button>
        </div>

        {/* Biometric Metric Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="p-5 rounded-2xl bg-[var(--bg-surface,#121212)] border border-white/10">
            <div className="text-[10px] font-mono uppercase text-white/50 mb-1">Current Weight</div>
            <div className="text-3xl font-display font-bold text-white">
              {latestLog?.weight_kg ? `${latestLog.weight_kg} kg` : '—'}
            </div>
            <div className="text-[11px] font-mono text-white/40 mt-1">
              Latest assessment
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--bg-surface,#121212)] border border-white/10">
            <div className="text-[10px] font-mono uppercase text-white/50 mb-1">Total Net Change</div>
            <div className="text-3xl font-display font-bold text-[var(--accent-secondary,#FF2E44)]">
              {weightChange !== null ? `${weightChange > '0' ? '+' : ''}${weightChange} kg` : '—'}
            </div>
            <div className="text-[11px] font-mono text-white/40 mt-1">
              Since enrollment
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--bg-surface,#121212)] border border-white/10">
            <div className="text-[10px] font-mono uppercase text-white/50 mb-1">Body Fat %</div>
            <div className="text-3xl font-display font-bold text-emerald-400">
              {latestLog?.body_fat_percentage ? `${latestLog.body_fat_percentage}%` : '—'}
            </div>
            <div className="text-[11px] font-mono text-white/40 mt-1">
              Estimated composition
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--bg-surface,#121212)] border border-white/10">
            <div className="text-[10px] font-mono uppercase text-white/50 mb-1">Waist Measurement</div>
            <div className="text-3xl font-display font-bold text-blue-400">
              {latestLog?.waist_cm ? `${latestLog.waist_cm} cm` : '—'}
            </div>
            <div className="text-[11px] font-mono text-white/40 mt-1">
              Circumference
            </div>
          </div>

        </div>

        {/* Member Goal Statement */}
        {user.fitness_goals && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 flex items-start gap-4">
            <span className="material-symbols-outlined text-[var(--accent-primary,#D70015)] text-2xl shrink-0 mt-0.5">
              flag
            </span>
            <div>
              <div className="text-xs font-mono font-bold uppercase text-white">Target Fitness Objective</div>
              <div className="text-xs sm:text-sm font-sans text-white/80 mt-1 leading-relaxed">
                "{user.fitness_goals}"
              </div>
            </div>
          </div>
        )}

        {/* Visual Progress Trajectory Card */}
        <div className="p-6 rounded-3xl bg-[var(--bg-surface,#121212)] border border-white/10">
          <h2 className="text-lg font-display font-bold uppercase text-white mb-4">
            Body Weight Trend
          </h2>

          <div className="space-y-4">
            {logs.map((log) => {
              const maxWeight = 100;
              const pct = log.weight_kg ? Math.min(100, Math.max(10, (log.weight_kg / maxWeight) * 100)) : 50;

              return (
                <div key={log.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white font-bold">{log.recorded_at}</span>
                    <span className="text-[var(--accent-secondary,#FF2E44)] font-bold">{log.weight_kg} kg</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[var(--accent-primary,#D70015)] to-[var(--accent-secondary,#FF2E44)] transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Assessment History Table */}
        <div className="p-6 rounded-3xl bg-[var(--bg-surface,#121212)] border border-white/10">
          <h2 className="text-lg font-display font-bold uppercase text-white mb-4">
            Assessment History Logs
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="border-b border-white/10 text-white/50 uppercase text-[10px]">
                <tr>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Weight</th>
                  <th className="pb-3">Body Fat</th>
                  <th className="pb-3">Chest</th>
                  <th className="pb-3">Waist</th>
                  <th className="pb-3">Arms</th>
                  <th className="pb-3">Coach / Athlete Notes</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 text-white font-bold">{log.recorded_at}</td>
                    <td className="py-3.5 text-[var(--accent-secondary,#FF2E44)] font-bold">
                      {log.weight_kg ? `${log.weight_kg} kg` : '—'}
                    </td>
                    <td className="py-3.5 text-white/80">
                      {log.body_fat_percentage ? `${log.body_fat_percentage}%` : '—'}
                    </td>
                    <td className="py-3.5 text-white/80">
                      {log.chest_cm ? `${log.chest_cm} cm` : '—'}
                    </td>
                    <td className="py-3.5 text-white/80">
                      {log.waist_cm ? `${log.waist_cm} cm` : '—'}
                    </td>
                    <td className="py-3.5 text-white/80">
                      {log.arms_cm ? `${log.arms_cm} cm` : '—'}
                    </td>
                    <td className="py-3.5 text-white/70 font-sans max-w-xs truncate">
                      {log.notes || '—'}
                    </td>
                    <td className="py-3.5 text-right">
                      <button
                        onClick={() => handleDeleteLog(log.id)}
                        className="text-white/40 hover:text-red-400 p-1"
                        title="Delete log"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {logs.length === 0 && (
              <div className="text-center py-10 text-white/40 font-mono text-xs">
                No progress entries logged yet. Click "Record New Assessment" above.
              </div>
            )}
          </div>
        </div>

        {/* Modal: Add Assessment Log */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="max-w-md w-full bg-[var(--bg-surface,#121212)] border border-white/15 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <h3 className="text-lg font-display font-bold uppercase text-white">Record Assessment</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-lg hover:bg-white/10 text-white/60 hover:text-white"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                  {error}
                </div>
              )}

              <form onSubmit={handleAddLog} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-white/60 mb-1 uppercase">Date</label>
                  <input
                    type="date"
                    value={recordDate}
                    onChange={(e) => setRecordDate(e.target.value)}
                    required
                    className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 rounded-xl py-2 px-3 text-white outline-none focus:border-[var(--accent-primary,#D70015)]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/60 mb-1 uppercase">Body Weight (kg) *</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="e.g. 78.5"
                      value={weightKg}
                      onChange={(e) => setWeightKg(e.target.value)}
                      required
                      className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 rounded-xl py-2 px-3 text-white outline-none focus:border-[var(--accent-primary,#D70015)]"
                    />
                  </div>

                  <div>
                    <label className="block text-white/60 mb-1 uppercase">Body Fat (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="e.g. 16.5"
                      value={bodyFat}
                      onChange={(e) => setBodyFat(e.target.value)}
                      className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 rounded-xl py-2 px-3 text-white outline-none focus:border-[var(--accent-primary,#D70015)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-white/60 mb-1 uppercase">Chest (cm)</label>
                    <input
                      type="number"
                      step="0.5"
                      placeholder="105"
                      value={chestCm}
                      onChange={(e) => setChestCm(e.target.value)}
                      className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 rounded-xl py-2 px-3 text-white outline-none focus:border-[var(--accent-primary,#D70015)]"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 mb-1 uppercase">Waist (cm)</label>
                    <input
                      type="number"
                      step="0.5"
                      placeholder="84"
                      value={waistCm}
                      onChange={(e) => setWaistCm(e.target.value)}
                      className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 rounded-xl py-2 px-3 text-white outline-none focus:border-[var(--accent-primary,#D70015)]"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 mb-1 uppercase">Arms (cm)</label>
                    <input
                      type="number"
                      step="0.5"
                      placeholder="38.5"
                      value={armsCm}
                      onChange={(e) => setArmsCm(e.target.value)}
                      className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 rounded-xl py-2 px-3 text-white outline-none focus:border-[var(--accent-primary,#D70015)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/60 mb-1 uppercase">Notes / Workout Reflection</label>
                  <textarea
                    rows={2}
                    placeholder="Energy levels, nutrition notes, PRs..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 rounded-xl py-2 px-3 text-white outline-none focus:border-[var(--accent-primary,#D70015)] font-sans"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold uppercase transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-[var(--accent-primary,#D70015)] hover:bg-white hover:text-black text-white font-bold uppercase transition-all shadow-[0_0_15px_rgba(215,0,21,0.4)]"
                  >
                    Save Log
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
