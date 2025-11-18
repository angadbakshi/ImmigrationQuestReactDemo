import { supabase } from 'core/src/services/supabase/supabase';
import { checkUserExists } from './userExists';
import type { User } from '../../types/auth';

export const authMethods = {
  async logout(): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Logout failed'
      };
    }
  },

  async signup(email: string, password: string, name: string): Promise<{ user: User | null; error: string | null }> {
    try {
      // Check if user exists without attempting login
      const exists = await checkUserExists(email);
      
      if (exists) {
        return {
          user: null,
          error: 'existing_user'
        };
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name
          }
        }
      });

      if (error) throw error;

      if (!data.user) {
        return { user: null, error: 'signup_failed' };
      }

      return {
        user: {
          id: data.user.id,
          email: data.user.email!,
          name,
          role: 'user'
        },
        error: null
      };
    } catch (error) {
      return {
        user: null,
        error: error instanceof Error ? error.message : 'signup_failed'
      };
    }
  }
};