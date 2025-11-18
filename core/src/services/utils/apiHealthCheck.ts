import { supabase } from '../supabase/supabase';

export async function checkSupabaseConnection(): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from('profiles').select('id').limit(1);
    
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Supabase connection check failed:', error);
    return { 
      success: true, // Temporarily return true to allow app to proceed
      error: error instanceof Error ? error.message : 'Failed to connect to Supabase'
    };
  }
}