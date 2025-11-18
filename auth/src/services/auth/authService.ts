import {supabase} from "core";
import {User} from "../../types/auth";

export const authService = {
  async signIn(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      if (!data.user) {
        return { user: null, error: 'No user data returned' };
      }

      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
          .select('id, full_name, role, onboardingCompleted')
        .eq('id', data.user.id)
        .single();

      if (profileError) throw profileError;

      return {
        user: {
          id: data.user.id,
          email: data.user.email!,
          name: profile.full_name,
          role: profile.role || 'user',
          onboardingCompleted: profile.onboardingCompleted || false // Add this line
        },
        error: null
      };
    } catch (error) {
      console.error('Sign in error:', error);
      return {
        user: null,
        error: error instanceof Error ? error.message : 'Authentication failed'
      };
    }
  }
};