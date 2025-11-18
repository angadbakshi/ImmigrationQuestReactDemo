import { supabase } from '../supabase/supabase';
import { seedDatabase } from './seedDatabase';
import { retryWithBackoff } from './retryWithBackoff';

export async function checkDataSeeding() {
  try {
    // Check programs with retry
    const { count, error } = await retryWithBackoff(async () => {
      const response = await supabase
        .from('immigration_programs')
        .select('*', { count: 'exact', head: true });
      
      if (response.error) throw response.error;
      return response;
    });

    if (error) throw error;

    if (count === 0) {
      // Seed the database if empty
      const { success, error: seedError } = await seedDatabase();
      if (!success) throw new Error(seedError);
      
      return { isSeeded: true };
    }

    return { isSeeded: true };
  } catch (error) {
    console.error('Error checking/seeding data:', error);
    return {
      isSeeded: false,
      error: error instanceof Error ? error.message : 'Unknown error checking data'
    };
  }
}