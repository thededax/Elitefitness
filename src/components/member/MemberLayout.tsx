import React, { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';
import { gymDb } from '../../lib/supabase';

export default function MemberLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const notifications = user ? gymDb.getNotifications(user.id) : [];
  const unreadCount = notifications.filter((n) => !n.read_at).length;

  const navItems = [
    { label: 'Overview', path: '/member', icon: 'dashboard', end: true },
    { label: 'Attendance', path: '/member/attendance', icon: 'calendar_month' },
    { label: 'Fitness Progress', path: '/member/progress', icon: 'monitoring' },
    { label: 'Workout Plan', path: '/member/workouts', icon: 'fitness_center' },
    { label: 'My Membership', path: '/member/membership', icon: 'card_membership' },
    {
      label: 'Notifications',
      path: '/member/notifications',
      icon: 'notifications',
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    { label: 'Profile & Settings', path: '/member/profile', icon: 'person' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-canvas,#080808)] text-white flex flex-col md:flex-row">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-[var(--bg-surface,#121212)] border-r border-white/10 shrink-0 min-h-screen sticky top-0 h-screen overflow-y-auto">
        
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent-primary,#D70015)] flex items-center justify-center text-white shadow-[0_0_15px_rgba(215,0,21,0.5)]">
              <span className="material-symbols-outlined text-xl font-bold">fitness_center</span>
            </div>
            <div>
              <span className="text-xl font-display font-extrabold uppercase text-white tracking-widest leading-none block">
                ELITE
              </span>
              <span className="text-[7px] font-mono uppercase tracking-[0.2em] text-[var(--accent-secondary,#FF2E44)] font-bold block">
                MEMBER PORTAL
              </span>
            </div>
          </Link>
        </div>

        {/* User Compact Card */}
        {user && (
          <div className="p-4 mx-4 my-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
            <img
              src={user.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}
              alt={user.full_name}
              className="w-10 h-10 rounded-lg object-cover border border-white/20"
            />
            <div className="overflow-hidden">
              <div className="text-xs font-display font-bold uppercase text-white truncate">
                {user.full_name}
              </div>
              <div className="text-[10px] font-mono text-[var(--accent-secondary,#FF2E44)]">
                Active Member
              </div>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-2 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                  isActive
                    ? 'bg-[var(--accent-primary,#D70015)] text-white shadow-[0_0_20px_rgba(215,0,21,0.35)]'
                    : 'text-[var(--text-secondary,#A0A0A0)] hover:text-white hover:bg-white/5'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-1.5 py-0.5 rounded-full text-[9px] font-mono bg-white text-black font-extrabold">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Quick Entrance Check-In CTA */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            to="/check-in"
            className="w-full py-2.5 px-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-white/10 hover:bg-white text-white hover:text-black transition-all flex items-center justify-center gap-2 border border-white/10"
          >
            <span className="material-symbols-outlined text-sm">qr_code_scanner</span>
            <span>QR Check-In Page</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full py-2 px-3 rounded-xl text-xs font-mono text-[var(--text-muted)] hover:text-red-400 hover:bg-red-500/10 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="md:hidden sticky top-0 z-40 bg-[var(--bg-surface,#121212)]/95 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[var(--accent-primary,#D70015)] flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-lg">fitness_center</span>
          </div>
          <span className="font-display font-extrabold uppercase text-white tracking-wider text-lg">
            ELITE MEMBER
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to="/member/notifications"
            className="relative p-2 rounded-lg bg-white/5 border border-white/10 text-white"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined text-xl">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[var(--accent-primary,#D70015)]" />
            )}
          </Link>

          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-white"
            aria-label="Toggle Navigation"
          >
            <span className="material-symbols-outlined text-xl">
              {mobileNavOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileNavOpen && (
        <div className="md:hidden bg-[var(--bg-surface,#121212)] border-b border-white/10 px-4 py-4 space-y-1 z-30">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={() => setMobileNavOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                  isActive
                    ? 'bg-[var(--accent-primary,#D70015)] text-white'
                    : 'text-[var(--text-secondary,#A0A0A0)] hover:text-white'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-1.5 py-0.5 rounded-full text-[9px] font-mono bg-white text-black font-extrabold">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
          <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
            <Link
              to="/check-in"
              onClick={() => setMobileNavOpen(false)}
              className="py-2.5 px-3 rounded-lg text-xs font-mono font-bold uppercase text-center bg-white/10 text-white"
            >
              QR Check-In
            </Link>
            <button
              onClick={() => {
                setMobileNavOpen(false);
                handleLogout();
              }}
              className="py-2.5 px-3 rounded-lg text-xs font-mono font-bold uppercase text-center bg-red-500/20 text-red-400"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
        <Outlet />
      </main>

    </div>
  );
}
