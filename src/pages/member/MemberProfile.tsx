import React, { useState } from 'react';
import { useAuth } from '../../lib/AuthContext';
import { gymDb, supabase, isRealSupabaseConfigured } from '../../lib/supabase';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

export default function MemberProfile() {
  const { user, refreshUser, logout } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(user?.full_name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [emergencyContact, setEmergencyContact] = useState(user?.emergency_contact || '');
  const [fitnessGoals, setFitnessGoals] = useState(user?.fitness_goals || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url || '');

  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState<string | null>(null);

  if (!user) return null;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const updates = {
      full_name: fullName.trim(),
      phone: phone.trim() || null,
      emergency_contact: emergencyContact.trim() || null,
      fitness_goals: fitnessGoals.trim() || null,
      avatar_url: avatarUrl.trim() || null,
    };

    gymDb.updateProfile(user.id, updates);

    if (isRealSupabaseConfigured && user.id) {
      try {
        await supabase
          .from('profiles')
          .update({
            ...updates,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id);
      } catch (err) {
        console.warn('Supabase profile update warning:', err);
      }
    }

    refreshUser();
    setIsSaving(false);
    setSuccessMsg('Profile details successfully updated.');
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setPasswordMsg('Password must contain at least 6 characters.');
      return;
    }

    if (isRealSupabaseConfigured) {
      try {
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        if (error) {
          setPasswordMsg(`Update failed: ${error.message}`);
          return;
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Password update failed';
        setPasswordMsg(`Update failed: ${msg}`);
        return;
      }
    }

    setPasswordMsg('Password updated successfully.');
    setCurrentPassword('');
    setNewPassword('');
    setTimeout(() => setPasswordMsg(null), 4000);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <Helmet>
        <title>Profile & Settings | Elite Zumba & Fitness Studio</title>
      </Helmet>

      <div className="space-y-6 sm:space-y-8 max-w-4xl">
        
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[var(--accent-secondary,#FF2E44)] text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <span>Account Administration</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold uppercase text-white tracking-wide">
            PROFILE SETTINGS
          </h1>
          <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary,#A0A0A0)]">
            Manage your athlete identity, contact emergency protocols, and authentication.
          </p>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="p-4 rounded-2xl bg-green-500/15 border border-green-500/40 text-green-400 text-xs font-mono flex items-center gap-2">
            <span className="material-symbols-outlined text-base">check_circle</span>
            <span>{successMsg}</span>
          </div>
        )}

        {/* Member Profile Form */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface,#121212)] border border-white/10">
          <h2 className="text-lg font-display font-bold uppercase text-white mb-6 pb-4 border-b border-white/10 flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--accent-primary,#D70015)]">badge</span>
            <span>Permitted Athlete Information</span>
          </h2>

          <form onSubmit={handleSaveProfile} className="space-y-6">
            
            {/* Avatar & Email Badge */}
            <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/5">
              <img
                src={avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}
                alt={user.full_name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-[var(--accent-primary,#D70015)] shadow-lg"
              />
              <div className="flex-1 w-full space-y-1 text-center sm:text-left">
                <div className="text-lg font-display font-bold uppercase text-white">
                  {user.full_name}
                </div>
                <div className="text-xs font-mono text-[var(--accent-secondary,#FF2E44)]">
                  Registered Email: {user.email} (Verified)
                </div>
                <div className="text-[10px] font-mono text-white/40">
                  Role: <strong className="uppercase text-white">{user.role}</strong> • Status: <strong className="text-green-400">Active</strong>
                </div>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <label className="block text-white/60 uppercase mb-1.5 font-bold">Full Legal Name *</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 focus:border-[var(--accent-primary,#D70015)] rounded-xl py-2.5 px-3.5 text-white outline-none font-sans"
                />
              </div>

              <div>
                <label className="block text-white/60 uppercase mb-1.5 font-bold">Contact Phone *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 90000 00000"
                  className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 focus:border-[var(--accent-primary,#D70015)] rounded-xl py-2.5 px-3.5 text-white outline-none font-sans"
                />
              </div>

              <div>
                <label className="block text-white/60 uppercase mb-1.5 font-bold">Emergency Contact (Name & Phone)</label>
                <input
                  type="text"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  placeholder="e.g. Relation (+91 98765 43210)"
                  className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 focus:border-[var(--accent-primary,#D70015)] rounded-xl py-2.5 px-3.5 text-white outline-none font-sans"
                />
              </div>

              <div>
                <label className="block text-white/60 uppercase mb-1.5 font-bold">Avatar Image URL</label>
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 focus:border-[var(--accent-primary,#D70015)] rounded-xl py-2.5 px-3.5 text-white outline-none font-sans"
                />
              </div>
            </div>

            <div className="text-xs font-mono">
              <label className="block text-white/60 uppercase mb-1.5 font-bold">Personal Fitness Goals</label>
              <textarea
                rows={3}
                value={fitnessGoals}
                onChange={(e) => setFitnessGoals(e.target.value)}
                placeholder="Target deadlift 180kg, lose 5kg body fat, improve stamina for Zumba..."
                className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 focus:border-[var(--accent-primary,#D70015)] rounded-xl py-2.5 px-3.5 text-white outline-none font-sans"
              />
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="py-3 px-6 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-[var(--accent-primary,#D70015)] text-white hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(215,0,21,0.4)] disabled:opacity-50"
            >
              {isSaving ? 'Saving Changes...' : 'Save Profile Changes'}
            </button>
          </form>
        </div>

        {/* Security & Password Reset Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface,#121212)] border border-white/10">
          <h2 className="text-lg font-display font-bold uppercase text-white mb-6 pb-4 border-b border-white/10 flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--accent-secondary,#FF2E44)]">lock</span>
            <span>Security & Authentication</span>
          </h2>

          {passwordMsg && (
            <div className="mb-4 p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-mono">
              {passwordMsg}
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4 max-w-md text-xs font-mono">
            <div>
              <label className="block text-white/60 uppercase mb-1 font-bold">Current Password</label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 focus:border-[var(--accent-primary,#D70015)] rounded-xl py-2 px-3 text-white outline-none font-sans"
              />
            </div>

            <div>
              <label className="block text-white/60 uppercase mb-1 font-bold">New Password (Min 6 Characters)</label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 focus:border-[var(--accent-primary,#D70015)] rounded-xl py-2 px-3 text-white outline-none font-sans"
              />
            </div>

            <button
              type="submit"
              className="py-2.5 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-white/10 hover:bg-white text-white hover:text-black transition-all"
            >
              Update Password
            </button>
          </form>
        </div>

        {/* Sign Out Card */}
        <div className="p-6 rounded-3xl bg-red-500/5 border border-red-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-display font-bold uppercase text-white">
              End Active Athlete Session
            </h3>
            <p className="text-xs text-[var(--text-secondary,#A0A0A0)] mt-0.5">
              Securely logs you out of this browser. You can log back in at any time with your email.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="py-2.5 px-5 rounded-xl text-xs font-mono font-bold uppercase bg-red-600 hover:bg-red-500 text-white transition-all shrink-0"
          >
            Log Out Now
          </button>
        </div>

      </div>
    </>
  );
}
