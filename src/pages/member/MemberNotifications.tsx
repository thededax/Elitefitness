import React, { useState, useEffect } from 'react';
import { useAuth } from '../../lib/AuthContext';
import { gymDb } from '../../lib/supabase';
import type { NotificationItem } from '../../lib/database.types';
import { Helmet } from 'react-helmet-async';

export default function MemberNotifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const refreshNotifs = () => {
    if (user) {
      setNotifications(gymDb.getNotifications(user.id));
    }
  };

  useEffect(() => {
    refreshNotifs();
  }, [user]);

  if (!user) return null;

  const handleMarkRead = (id: string) => {
    gymDb.markNotificationRead(id);
    refreshNotifs();
  };

  const handleMarkAllRead = () => {
    gymDb.markAllNotificationsRead(user.id);
    refreshNotifs();
  };

  const filtered = notifications.filter((n) => {
    if (filter === 'unread') return !n.read_at;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read_at).length;

  return (
    <>
      <Helmet>
        <title>Notifications & Announcements | Elite Zumba & Fitness Studio</title>
      </Helmet>

      <div className="space-y-6 sm:space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[var(--accent-secondary,#FF2E44)] text-xs font-mono font-semibold uppercase tracking-wider mb-2">
              <span>Direct Messaging</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold uppercase text-white tracking-wide">
              NOTIFICATIONS
            </h1>
            <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary,#A0A0A0)]">
              Gym broadcasts, renewal reminders, and verified attendance confirmations.
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="py-2.5 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-white/10 hover:bg-white text-white hover:text-black transition-all self-start sm:self-auto flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">done_all</span>
              <span>Mark All as Read</span>
            </button>
          )}
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4">
          <button
            onClick={() => setFilter('all')}
            className={`py-1.5 px-4 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
              filter === 'all'
                ? 'bg-[var(--accent-primary,#D70015)] text-white'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`py-1.5 px-4 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
              filter === 'unread'
                ? 'bg-[var(--accent-primary,#D70015)] text-white'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>

        {/* Notification Cards */}
        <div className="space-y-3">
          {filtered.map((notif) => {
            const isUnread = !notif.read_at;

            return (
              <div
                key={notif.id}
                onClick={() => isUnread && handleMarkRead(notif.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  isUnread
                    ? 'bg-[var(--accent-primary,#D70015)]/10 border-[var(--accent-primary,#D70015)]/35 shadow-lg'
                    : 'bg-[var(--bg-surface,#121212)] border-white/10'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                        notif.type === 'attendance_success'
                          ? 'bg-green-500/10 text-green-400'
                          : notif.type === 'membership_expiring'
                          ? 'bg-yellow-500/10 text-yellow-400'
                          : notif.type === 'membership_expired'
                          ? 'bg-red-500/10 text-red-400'
                          : 'bg-[var(--accent-primary,#D70015)]/10 text-[var(--accent-secondary,#FF2E44)]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-xl">
                        {notif.type === 'attendance_success'
                          ? 'verified'
                          : notif.type === 'membership_expiring'
                          ? 'warning'
                          : notif.type === 'membership_expired'
                          ? 'error'
                          : 'campaign'}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold uppercase text-white tracking-wide text-base">
                          {notif.title}
                        </span>
                        {isUnread && (
                          <span className="w-2 h-2 rounded-full bg-[var(--accent-primary,#D70015)]" />
                        )}
                      </div>
                      <p className="text-xs sm:text-sm font-sans text-white/80 mt-1 leading-relaxed">
                        {notif.body}
                      </p>
                      <div className="text-[10px] font-mono text-white/40 mt-2">
                        {new Date(notif.created_at).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {isUnread && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkRead(notif.id);
                      }}
                      className="p-1 rounded hover:bg-white/10 text-white/40 hover:text-white shrink-0"
                      title="Mark as read"
                    >
                      <span className="material-symbols-outlined text-base">check</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="p-12 rounded-3xl bg-[var(--bg-surface,#121212)] border border-white/10 text-center text-white/40 font-mono text-xs">
              No notifications matching current filter.
            </div>
          )}
        </div>

      </div>
    </>
  );
}
