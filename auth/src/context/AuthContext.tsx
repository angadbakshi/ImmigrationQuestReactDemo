import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from 'core/src/services/supabase/supabase';
import type { User } from '../types/auth';
import type { Session } from '@supabase/supabase-js';
import {useToast} from "../../../immigration-2/src/context/ToastContext";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  loginAsAdmin: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initializationAttempts, setInitializationAttempts] = useState(0);
  const { showToast } = useToast();
  const maxRetries = 3;

  async function handleSession(session: Session | null) {
    try {
      if (!session?.user) {
        setUser(null);
        return;
      }

      // Fetch user profile data
      const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('full_name, role, onboarding_completed')
          .eq('id', session.user.id)
          .single();

      if (profileError) throw profileError;

      setUser({
        id: session.user.id,
        email: session.user.email!,
        name: profile?.full_name || '',
        role: profile?.role || 'user',
        onboardingCompleted: profile?.onboarding_completed || false
      });
    } catch (err) {
      console.error('Error handling session:', err);
      setError(err instanceof Error ? err.message : 'Session handling failed');
      setUser(null);

      // Retry initialization if under max attempts
      if (initializationAttempts < maxRetries) {
        setInitializationAttempts(prev => prev + 1);
        setTimeout(() => handleSession(session), 1000 * (initializationAttempts + 1));
      }
    }
  }

  // Session initialization and auth state listener
  useEffect(() => {
    let mounted = true;

    async function initializeAuth() {
      try {
        setLoading(true);
        
        // TEMPORARY: Skip session check (DB not connected)
        // TODO: Remove this bypass once database is connected
        // Just set loading to false and return
        if (mounted) {
          setLoading(false);
        }
        return;

        // Original authentication code (commented out temporarily)
        /*
        // First check for existing session
        const { data: initialSession, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        if (mounted && initialSession.session) {
          await handleSession(initialSession.session);
        }

        // Then set up auth state change listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
              console.log('Auth state changed:', event);
              if (mounted) {
                await handleSession(session);
              }
            }
        );

        return () => {
          mounted = false;
          subscription.unsubscribe();
        };
        */
      } catch (err) {
        console.error('Auth initialization error:', err);
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to initialize auth');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      // TEMPORARY: Allow any credentials for testing (DB not connected)
      // TODO: Remove this bypass once database is connected
      setUser({
        id: `temp-user-${Date.now()}`,
        email: email,
        name: 'User',
        role: 'user',
        onboardingCompleted: true
      });

      // Original authentication code (commented out temporarily)
      /*
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) throw authError;
      if (!data.user) throw new Error('Login failed');

      // Session will be handled by the auth state change listener
      */

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      showToast(message, 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginAsAdmin = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      // TEMPORARY: Allow any credentials for testing (DB not connected)
      // TODO: Remove this bypass once database is connected
      setUser({
        id: 'temp-admin-id',
        email: email,
        name: 'Admin User',
        role: 'admin',
        onboardingCompleted: true
      });

      // Original authentication code (commented out temporarily)
      /*
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) throw authError;
      if (!data.user) throw new Error('Admin login failed');

      // Verify admin role
      const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

      if (profileError) throw profileError;
      if (profile?.role !== 'admin') {
        throw new Error('Unauthorized: Admin access required');
      }

      // Session will be handled by the auth state change listener
      */

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Admin login failed';
      setError(message);
      showToast(message, 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);

      // TEMPORARY: Just clear the user (DB not connected)
      // TODO: Remove this bypass once database is connected
      setUser(null);

      // Original authentication code (commented out temporarily)
      /*
      const { error: logoutError } = await supabase.auth.signOut();
      if (logoutError) throw logoutError;

      // Session change will be handled by the auth state change listener
      */

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Logout failed';
      setError(message);
      showToast(message, 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

// Inside the signup function in AuthContext:
  const signup = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      setError(null);

      // TEMPORARY: Allow any credentials for testing (DB not connected)
      // TODO: Remove this bypass once database is connected
      setUser({
        id: `temp-user-${Date.now()}`,
        email: email,
        name: name,
        role: 'user',
        onboardingCompleted: false
      });

      // Original authentication code (commented out temporarily)
      /*
      // Create auth user
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            role: 'user'
          }
        }
      });

      if (signUpError) throw signUpError;
      if (!data.user) throw new Error('Signup failed - no user data returned');

      // Create initial profile and progress in a transaction
      const { error: setupError } = await supabase.rpc('setup_new_user', {
        user_id: data.user.id,
        user_name: name
      });

      if (setupError) throw setupError;

      // Session will be handled by the auth state change listener
      */
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Signup failed';
      setError(message);
      showToast(message, 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
      <AuthContext.Provider value={{
        user,
        setUser,
        loading,
        error,
        login,
        loginAsAdmin,
        logout,
        signup
      }}>
        {children}
      </AuthContext.Provider>
  );
}