import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { Helmet } from 'react-helmet-async';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const { login, switchToDemoAccount } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTarget = searchParams.get('redirect') || '';

  const handleSuccessfulAuth = (targetEmail: string) => {
    if (redirectTarget) {
      navigate(redirectTarget, { replace: true });
    } else if (targetEmail.includes('owner')) {
      navigate('/owner', { replace: true });
    } else {
      navigate('/member', { replace: true });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim()) {
      setError('Please provide an email address.');
      return;
    }

    setIsLoading(true);
    const res = await login(email, password);
    setIsLoading(false);

    if (res.success) {
      handleSuccessfulAuth(email);
    } else {
      setError(res.error || 'Authentication failed. Please verify your credentials.');
    }
  };

  const handleDemoLogin = (demoEmail: string, demoPassword?: string) => {
    setEmail(demoEmail);
    if (demoPassword) setPassword(demoPassword);
    switchToDemoAccount(demoEmail);
    handleSuccessfulAuth(demoEmail);
  };

  return (
    <>
      <Helmet>
        <title>Account Sign In | Elite Zumba & Fitness Studio</title>
        <meta name="description" content="Sign in to your Elite Fitness member portal or gym owner dashboard." />
      </Helmet>

      <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[var(--bg-canvas,#080808)] relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--accent-primary,#D70015)]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md w-full relative z-10">
          {/* Card Container */}
          <div className="bg-[var(--bg-surface,#121212)] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
            
            {/* Header Brand */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--accent-primary,#D70015)] text-white shadow-[0_0_25px_rgba(215,0,21,0.5)] mb-3">
                <span className="material-symbols-outlined text-2xl font-bold">fitness_center</span>
              </div>
              <h1 className="text-3xl font-display font-extrabold uppercase text-white tracking-wider leading-none">
                ELITE PORTAL
              </h1>
              <p className="mt-2 text-xs font-mono uppercase tracking-[0.2em] text-[var(--text-secondary,#A0A0A0)]">
                Member Access & Owner Dashboard
              </p>
            </div>

            {/* Error Notification */}
            {error && (
              <div className="mb-5 p-3.5 rounded-xl bg-[var(--accent-primary,#D70015)]/15 border border-[var(--accent-primary,#D70015)]/40 flex items-start gap-2.5 text-xs text-[var(--accent-secondary,#FF2E44)]">
                <span className="material-symbols-outlined text-base shrink-0 mt-0.5">error</span>
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary,#A0A0A0)] mb-1.5 font-semibold">
                  Email Address
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 text-lg">
                    mail
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    required
                    className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 focus:border-[var(--accent-primary,#D70015)] focus:ring-1 focus:ring-[var(--accent-primary,#D70015)] rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-white/30 outline-none transition-all font-sans"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary,#A0A0A0)] font-semibold">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-[11px] font-mono text-[var(--accent-secondary,#FF2E44)] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 text-lg">
                    lock
                  </span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 focus:border-[var(--accent-primary,#D70015)] focus:ring-1 focus:ring-[var(--accent-primary,#D70015)] rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-white/30 outline-none transition-all font-sans"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-xl text-xs font-mono font-extrabold uppercase tracking-widest bg-[var(--accent-primary,#D70015)] text-white hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(215,0,21,0.4)] active:scale-[0.98] disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>
                    <span>Verifying Session...</span>
                  </>
                ) : (
                  <>
                    <span>Authenticate</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Credentials Bar */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--accent-secondary,#FF2E44)] font-bold">
                  Quick Demo Access
                </span>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">Instant 1-Click</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-left">
                <button
                  type="button"
                  onClick={() => handleDemoLogin('owner@elitegym.com', 'EliteOwner@2026')}
                  className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[var(--accent-primary,#D70015)] text-left transition-all group"
                >
                  <div className="text-[11px] font-display font-bold uppercase text-white group-hover:text-[var(--accent-secondary,#FF2E44)] flex items-center gap-1">
                    <span>👑 Owner / Admin</span>
                  </div>
                  <div className="text-[10px] font-mono text-[var(--text-secondary,#A0A0A0)] truncate">
                    owner@elitegym.com
                  </div>
                  <div className="text-[9px] font-mono text-white/30 truncate mt-0.5">
                    Pw: EliteOwner@2026
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoLogin('rahul@elitegym.com', 'Rahul@2026')}
                  className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[var(--accent-primary,#D70015)] text-left transition-all group"
                >
                  <div className="text-[11px] font-display font-bold uppercase text-white group-hover:text-[var(--accent-secondary,#FF2E44)] flex items-center gap-1">
                    <span>⚡ Active Member</span>
                  </div>
                  <div className="text-[10px] font-mono text-[var(--text-secondary,#A0A0A0)] truncate">
                    rahul@elitegym.com
                  </div>
                  <div className="text-[9px] font-mono text-white/30 truncate mt-0.5">
                    Pw: Rahul@2026
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoLogin('priya@elitegym.com', 'Priya@2026')}
                  className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-yellow-500/50 text-left transition-all group"
                >
                  <div className="text-[11px] font-display font-bold uppercase text-white group-hover:text-yellow-400 flex items-center gap-1">
                    <span>⚠️ Expiring (4d)</span>
                  </div>
                  <div className="text-[10px] font-mono text-[var(--text-secondary,#A0A0A0)] truncate">
                    priya@elitegym.com
                  </div>
                  <div className="text-[9px] font-mono text-white/30 truncate mt-0.5">
                    Pw: Priya@2026
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoLogin('amit@elitegym.com', 'Amit@2026')}
                  className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/50 text-left transition-all group"
                >
                  <div className="text-[11px] font-display font-bold uppercase text-white group-hover:text-red-400 flex items-center gap-1">
                    <span>🛑 Expired Member</span>
                  </div>
                  <div className="text-[10px] font-mono text-[var(--text-secondary,#A0A0A0)] truncate">
                    amit@elitegym.com
                  </div>
                  <div className="text-[9px] font-mono text-white/30 truncate mt-0.5">
                    Pw: Amit@2026
                  </div>
                </button>
              </div>
            </div>

            {/* Back to Home Link */}
            <div className="mt-6 text-center">
              <Link
                to="/"
                className="text-xs font-mono text-[var(--text-secondary,#A0A0A0)] hover:text-white transition-colors flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">west</span>
                <span>Return to Public Website</span>
              </Link>
            </div>

          </div>
        </div>

        {/* Forgot Password Modal */}
        {showForgotModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="max-w-md w-full bg-[var(--bg-surface,#121212)] border border-white/15 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-display font-bold uppercase text-white">Password Recovery</h3>
                <button
                  onClick={() => {
                    setShowForgotModal(false);
                    setResetSent(false);
                  }}
                  className="p-1 rounded-lg hover:bg-white/10 text-white/60 hover:text-white"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {resetSent ? (
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-sans leading-relaxed">
                  ✓ Password recovery instructions have been dispatched to your email address. Please follow the instructions to set a new password.
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-xs text-[var(--text-secondary,#A0A0A0)] leading-relaxed">
                    Enter your registered email address. We will verify your account and trigger a secure password reset link.
                  </p>
                  <input
                    type="email"
                    placeholder="name@domain.com"
                    className="w-full bg-[var(--bg-canvas,#080808)] border border-white/15 rounded-xl py-2.5 px-3 text-sm text-white outline-none focus:border-[var(--accent-primary,#D70015)]"
                  />
                  <button
                    type="button"
                    onClick={() => setResetSent(true)}
                    className="w-full py-2.5 rounded-xl text-xs font-mono font-bold uppercase bg-[var(--accent-primary,#D70015)] text-white hover:bg-white hover:text-black transition-all"
                  >
                    Send Reset Link
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
