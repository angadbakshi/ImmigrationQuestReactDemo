import { useEffect, useState } from 'react';
import type { SessionState } from './types';
import {sessionManager} from "../../../../auth/src";

export function useSession(): SessionState {
  const [state, setState] = useState<SessionState>({
    user: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    let mounted = true;

    async function initSession() {
      try {
        const session = await sessionManager.getCurrentSession();
        const user = await sessionManager.getUserWithProfile(session);
        
        if (mounted) {
          setState({
            user,
            loading: false,
            error: null
          });
        }
      } catch (error) {
        if (mounted) {
          setState({
            user: null,
            loading: false,
            error: error instanceof Error ? error.message : 'Session initialization failed'
          });
        }
      }
    }

    // Initialize session
    initSession();

    // Listen for auth changes
    const { data: { subscription } } = sessionManager.onAuthStateChange((user: any) => {
      if (mounted) {
        setState({
          user,
          loading: false,
          error: null
        });
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return state;
}