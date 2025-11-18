import { useEffect, useState } from 'react';
import { supabase } from 'core/src/services/supabase/supabase';
import { useToast } from '../context/ToastContext';

interface InitializationState {
  initialized: boolean;
  error: string | null;
}

export function useAppInitialization(): InitializationState {
  const [state, setState] = useState<InitializationState>({
    initialized: false,
    error: null
  });
  const { showToast } = useToast();

  useEffect(() => {
    let mounted = true;
    let retryCount = 0;
    const maxRetries = 3;

    async function initializeApp() {
      try {
        // Check if we have an existing session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) throw sessionError;

        // If there's a session, verify database connection
        if (session) {
          const { error: dbError } = await supabase
              .from('profiles')
              .select('id')
              .limit(1)
              .single();

          // Only throw error if it's not a "no rows returned" error
          if (dbError && dbError.code !== 'PGRST116') {
            throw dbError;
          }
        }

        if (mounted) {
          setState({ initialized: true, error: null });
        }
      } catch (error) {
        console.error('Initialization error:', error);

        if (mounted) {
          if (retryCount < maxRetries) {
            retryCount++;
            console.log(`Retrying initialization (${retryCount}/${maxRetries})...`);
            setTimeout(initializeApp, 1000 * retryCount); // Exponential backoff
          } else {
            const message = error instanceof Error ? error.message : 'Failed to initialize app';
            setState({ initialized: false, error: message });
            showToast(message, 'error');
          }
        }
      }
    }

    initializeApp();

    return () => {
      mounted = false;
    };
  }, [showToast]);

  return state;
}