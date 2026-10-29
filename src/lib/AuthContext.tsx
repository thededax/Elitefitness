import React, { createContext, useContext, useState, useEffect } from 'react';
import { gymDb, supabase, isRealSupabaseConfigured } from './supabase';
import type { Profile, UserRole } from './database.types';

interface AuthContextType {
  user: Profile | null;
  role: UserRole | null;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (data: {
    full_name: string;
    email: string;
    password: string;
    phone?: string;
    fitness_goals?: string;
  }) => Promise<{ success: boolean; error?: string }>;
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
    let isMounted = true;

    async function initializeSession() {
      if (isRealSupabaseConfigured) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user && isMounted) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .maybeSingle();

            if (profile && isMounted) {
              const cloudProfile = profile as Profile;
              setUser(cloudProfile);
              gymDb.setCurrentUser(cloudProfile.id);
              setIsLoading(false);
              return;
            }
          }
        } catch (err) {
          console.warn('Supabase auth session lookup notice:', err);
        }
      }

      if (isMounted) {
        refreshUser();
        setIsLoading(false);
      }
    }

    initializeSession();

    // Listen for auth state transitions in real Supabase
    const { data: authListener } = isRealSupabaseConfigured
      ? supabase.auth.onAuthStateChange(async (_event, session) => {
          if (session?.user && isMounted) {
            try {
              const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .maybeSingle();
              if (profile && isMounted) {
                const cloudProfile = profile as Profile;
                setUser(cloudProfile);
                gymDb.setCurrentUser(cloudProfile.id);
              }
            } catch (err) {
              console.warn('Profile fetch after auth state change notice:', err);
            }
          }
        })
      : { data: { subscription: { unsubscribe: () => {} } } };

    return () => {
      isMounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const login = async (email: string, password?: string) => {
    const normalized = email.trim().toLowerCase();

    // 1. Attempt Supabase Auth when cloud credentials and a password are provided
    if (isRealSupabaseConfigured && password) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: normalized,
          password,
        });

        if (!error && data.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .maybeSingle();

          if (profile) {
            const cloudProfile = profile as Profile;
            setUser(cloudProfile);
            gymDb.setCurrentUser(cloudProfile.id);
            return { success: true };
          }
        }
      } catch (err) {
        console.warn('Supabase authentication error:', err);
      }
    }

    // 2. Seamless local/demo database authentication fallback
    const res = gymDb.loginWithEmail(normalized);
    if (res.success && res.user) {
      setUser({ ...res.user });
      return { success: true };
    }
    return { success: false, error: res.error || 'Failed to authenticate credentials.' };
  };

  const signUp = async (data: {
    full_name: string;
    email: string;
    password: string;
    phone?: string;
    fitness_goals?: string;
  }) => {
    const normalized = data.email.trim().toLowerCase();

    // 1. Attempt Supabase Cloud signup if credentials are configured
    if (isRealSupabaseConfigured) {
      try {
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: normalized,
          password: data.password,
          options: {
            data: {
              full_name: data.full_name.trim(),
              phone: data.phone?.trim() || null,
              fitness_goals: data.fitness_goals?.trim() || null,
              role: 'member',
            },
          },
        });

        if (authError) {
          if (authError.message.toLowerCase().includes('already registered')) {
            return { success: false, error: 'An account with this email address already exists. Please sign in.' };
          }
          console.warn('Supabase cloud signup notice:', authError.message);
        } else if (authData.user) {
          // Check for auto-created profile via PostgreSQL on_auth_user_created trigger
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authData.user.id)
            .maybeSingle();

          const resolvedProfile: Profile = (profile as Profile) || {
            id: authData.user.id,
            full_name: data.full_name.trim(),
            email: normalized,
            phone: data.phone?.trim() || null,
            role: 'member',
            is_active: true,
            fitness_goals: data.fitness_goals?.trim() || null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };

          gymDb.upsertProfile(resolvedProfile);
          gymDb.setCurrentUser(resolvedProfile.id);
          setUser(resolvedProfile);
          return { success: true };
        }
      } catch (err) {
        console.warn('Supabase signup error:', err);
      }
    }

    // 2. Seamless local/demo database fallback
    try {
      const localProfile = gymDb.createMember({
        full_name: data.full_name.trim(),
        email: normalized,
        phone: data.phone?.trim() || undefined,
        plan_id: 'plan-starter-30',
        payment_method: 'cash',
      });
      if (data.fitness_goals) {
        localProfile.fitness_goals = data.fitness_goals.trim();
        gymDb.updateProfile(localProfile.id, { fitness_goals: data.fitness_goals.trim() });
      }
      gymDb.setCurrentUser(localProfile.id);
      setUser(localProfile);
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registration failed.';
      return { success: false, error: msg };
    }
  };

  const logout = async () => {
    if (isRealSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Supabase signOut error:', err);
      }
    }
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
        signUp,
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
