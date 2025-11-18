import { supabase } from '../../services/supabase/supabase';

export async function createAdminUser(email: string, password: string, fullName: string) {
  try {
    // Create auth user
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: 'admin'
        }
      }
    });

    if (signUpError) throw signUpError;
    if (!authData.user) throw new Error('Failed to create admin user');

    // Create admin profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        full_name: fullName,
        role: 'admin'
      });

    if (profileError) throw profileError;

    return {
      success: true,
      user: authData.user
    };
  } catch (error) {
    console.error('Error creating admin user:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create admin user'
    };
  }
}