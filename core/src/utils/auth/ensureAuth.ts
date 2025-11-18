import {retryWithBackoff, supabase} from "../../services";
import {createSeedUser} from "../../../../auth/src/services/auth/createSeedUser";


export async function ensureAuthenticated() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (!error && session) return;

    // Create seed user if needed
    const { success, error: createError } = await createSeedUser();
    if (!success) throw new Error(createError);

    // Sign in with seed user
    await retryWithBackoff(async () => {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: import.meta.env.VITE_SUPABASE_SEED_EMAIL,
        password: import.meta.env.VITE_SUPABASE_SEED_PASSWORD
      });

      if (signInError) throw signInError;
    });
  } catch (error) {
    throw new Error(
      `Authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}