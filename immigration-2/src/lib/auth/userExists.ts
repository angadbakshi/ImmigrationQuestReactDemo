import { supabase } from 'core/src/services/supabase/supabase';

export async function checkUserExists(email: string): Promise<boolean> {
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false
      }
    });

    if (error?.message.includes('Email not confirmed')) {
      return true;
    }

    return !!data.user;
  } catch (error) {
    return false;
  }
}