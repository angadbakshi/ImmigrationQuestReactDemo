import { supabase } from '../supabase/supabase';
import { programSeedData } from '../../utils/seedData';
import { ensureAuthenticated } from '../../utils/auth/ensureAuth';
import { retryWithBackoff } from './retryWithBackoff';

export async function seedDatabase() {
  try {
    // Ensure we're authenticated
    await ensureAuthenticated();

    // Check existing data with retry
    const { count: programCount } = await retryWithBackoff(async () => {
      const response = await supabase
        .from('immigration_programs')
        .select('*', { count: 'exact', head: true });
      
      if (response.error) throw response.error;
      return response;
    });

    if (programCount === 0) {
      // Prepare program data
      const programsToInsert = programSeedData.map(program => ({
        id: program.id,
        name: program.name,
        type: program.type,
        description: program.description,
        requirements: program.requirements,
        estimated_timeframe: program.estimatedTimeframe,
        difficulty: program.difficulty,
        processing_time: program.processingTime,
        fees: program.fees,
        benefits: program.benefits
      }));

      // Seed programs with retry
      await retryWithBackoff(async () => {
        const { error } = await supabase
          .from('immigration_programs')
          .insert(programsToInsert);
        
        if (error) throw error;
      });
    }

    return { success: true };
  } catch (error) {
    console.error('Error seeding database:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error during seeding' 
    };
  }
}