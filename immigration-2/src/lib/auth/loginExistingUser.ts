import { supabase } from 'core/src/services/supabase/supabase';
import type { User } from '../../../../auth/src/types/auth';

export async function loginExistingUser(email: string, password: string): Promise<{ 
  user: User | null; 
  error: string | null;
}> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    if (!data.user) {
      return { user: null, error: 'Login failed' };
    }

    // Get user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, onboardingCompleted')
      .eq('id', data.user.id)
      .single();

    return {
      user: {
        id: data.user.id,
        email: data.user.email!,
        name: profile?.full_name || '',
        role: 'user',
        onboardingCompleted: profile?.onboardingCompleted || false
      }
      error: null
    };
  } catch (error) {
    return {
      user: null,
      error: error instanceof Error ? error.message : 'Authentication failed'
    };
  }
}