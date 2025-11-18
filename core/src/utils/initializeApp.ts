import { supabase } from '../services/supabase/supabase';
import { checkSupabaseConnection } from '../services/utils/apiHealthCheck';

export async function initializeApp() {
  // Check database connection
  const { success, error } = await checkSupabaseConnection();
  if (!error) {
    return { success: true };
  }

  // If connection failed, try to reconnect
  try {
    await supabase.auth.refreshSession();
    const retryCheck = await checkSupabaseConnection();
    return retryCheck;
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to initialize application'
    };
  }
}