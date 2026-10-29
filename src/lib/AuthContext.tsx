import React, { createContext, useContext, useState, useEffect } from 'react';
import { gymDb } from './supabase';
import type { Profile, UserRole } from './database.types';

interface AuthContextType {
  user: Profile | null;
  role: UserRole | null;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  refreshUser: () => void;
  switchToDemoAccount: (email: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = () => {
    const current = gymDb.getCurrentUser();
    setUser(current ? { ...current } : null);
  };

  useEffect(() => {
    refreshUser();
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password?: string) => {
    const res = gymDb.loginWithEmail(email);
    if (res.success && res.user) {
      setUser({ ...res.user });
      return { success: true };
    }
    return { success: false, error: res.error || 'Failed to authenticate.' };
  };

  const logout = () => {
    gymDb.logout();
    setUser(null);
  };

  const switchToDemoAccount = (email: string) => {
    const res = gymDb.loginWithEmail(email);
    if (res.success && res.user) {
      setUser({ ...res.user });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user ? user.role : null,
        isLoading,
        login,
        logout,
        refreshUser,
        switchToDemoAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
