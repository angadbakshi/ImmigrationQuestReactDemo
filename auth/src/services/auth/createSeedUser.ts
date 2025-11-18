import {retryWithBackoff, supabase} from "core";


export async function createSeedUser() {
  if (!import.meta.env.VITE_SUPABASE_SEED_EMAIL || !import.meta.env.VITE_SUPABASE_SEED_PASSWORD) {
    throw new Error('Missing seeding credentials in environment variables');
  }

  try {
    // Check if seed user exists
    const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({
      email: import.meta.env.VITE_SUPABASE_SEED_EMAIL,
      password: import.meta.env.VITE_SUPABASE_SEED_PASSWORD
    });

    if (!signInError && user) {
      return { success: true };
    }

    // Create seed user if doesn't exist
    const { error: signUpError } = await retryWithBackoff(async () => {
      return await supabase.auth.signUp({
        email: import.meta.env.VITE_SUPABASE_SEED_EMAIL,
        password: import.meta.env.VITE_SUPABASE_SEED_PASSWORD,
        options: {
          data: {
            role: 'seeder'
          }
        }
      });
    });

    if (signUpError) throw signUpError;

    return { success: true };
  } catch (error) {
    console.error('Error creating seed user:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error creating seed user'
    };
  }
}