import { supabase } from 'core/src/services/supabase/supabase';
import { config } from '../config/environment';
import type { OnboardingFormData } from '../components/onboarding/types';

export const api = {
  auth: {
    login: async (email: string, password: string) => {
      if (config.useMockData) {
        const mockUser = config.mockUsers.find(u => u.email === email);
        if (mockUser && password === mockUser.password) {
          return { user: mockUser, error: null };
        }
        throw new Error('Invalid credentials');
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      return data;
    },

    signup: async (email: string, password: string, userData: OnboardingFormData) => {
      if (config.useMockData) {
        return { user: { ...userData, id: 'mock_user_id' }, error: null };
      }

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.fullName
          }
        }
      });

      if (authError) throw authError;

      // Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{
          id: authData.user!.id,
          ...userData
        }]);

      if (profileError) throw profileError;

      return authData;
    }
  },

  profiles: {
    get: async (userId: string) => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data;
    },

    update: async (userId: string, updates: Partial<OnboardingFormData>) => {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  }
};