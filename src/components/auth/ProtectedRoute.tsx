import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';
import type { UserRole } from '../../lib/database.types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole?: UserRole;
}

export default function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
  const { user, role, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 bg-[var(--bg-canvas,#080808)] text-white">
        <div className="w-12 h-12 rounded-xl bg-[var(--accent-primary,#D70015)]/20 border border-[var(--accent-primary,#D70015)] flex items-center justify-center animate-pulse mb-4">
          <span className="material-symbols-outlined text-[var(--accent-primary,#D70015)] text-2xl animate-spin">
            progress_activity
          </span>
        </div>
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary,#A0A0A0)]">
          Authenticating Elite Session...
        </p>
      </div>
    );
  }

  // Not authenticated -> redirect to login with query param
  if (!user) {
    const returnUrl = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${returnUrl}`} replace />;
  }

  // Role check: If route requires owner but user is member
  if (allowedRole && role !== allowedRole) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4 bg-[var(--bg-canvas,#080808)]">
        <div className="max-w-md w-full bg-[var(--bg-surface,#121212)] border border-[var(--accent-primary,#D70015)]/40 rounded-2xl p-6 sm:p-8 text-center shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-[var(--accent-primary,#D70015)]/10 border border-[var(--accent-primary,#D70015)]/30 mx-auto flex items-center justify-center text-[var(--accent-primary,#D70015)] mb-5">
            <span className="material-symbols-outlined text-3xl">shield_lock</span>
          </div>
          <h2 className="text-2xl font-display font-extrabold uppercase text-white mb-2 tracking-wide">
            Access Restricted
          </h2>
          <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary,#A0A0A0)] mb-6 leading-relaxed">
            You are signed in as a <strong className="text-white uppercase">{role}</strong>. This administrative portal requires verified Owner credentials.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/member"
              className="flex-1 py-3 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-[var(--accent-primary,#D70015)] text-white hover:bg-white hover:text-black transition-all text-center"
            >
              Go to Member Portal
            </Link>
            <Link
              to="/login"
              className="py-3 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all text-center"
            >
              Switch Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
