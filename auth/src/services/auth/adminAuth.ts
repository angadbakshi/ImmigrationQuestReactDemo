import {User} from "../../types/auth";
import {supabase} from "core";

export const adminAuth = {
  async signInAsAdmin(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      if (!data.user) {
        return { user: null, error: 'No user data returned' };
      }

      // Verify admin role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id, full_name, role, onboardingCompleted')
        .eq('id', data.user.id)
        .single();

      if (profileError) throw profileError;

      if (profile?.role !== 'admin') {
        throw new Error('Unauthorized: Admin access required');
      }

      return {
        user: {
          id: data.user.id,
          email: data.user.email!,
          name: profile.full_name,
          role: 'admin',
          onboardingCompleted: profile.onboardingCompleted || false // Add this line
        },
        error: null
      };
    } catch (error) {
      console.error('Admin sign in error:', error);
      return {
        user: null,
        error: error instanceof Error ? error.message : 'Admin authentication failed'
      };
    }
  }
};