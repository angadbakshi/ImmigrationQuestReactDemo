import { useEffect, useRef } from 'react';
import { useToast } from '../context/ToastContext';
import { checkSupabaseConnection } from 'core/src/services/utils/apiHealthCheck';

export function useApiHealth() {
  const { showToast } = useToast();
  const checkPerformed = useRef(false);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Only check once
        if (checkPerformed.current) return;
        checkPerformed.current = true;

        const { success, error } = await checkSupabaseConnection();
        
        if (!success) {
          showToast(
            `Database connection error: ${error}`, 
            'error'
          );
          return;
        }

        showToast('Connected to database successfully', 'success');
      } catch (err) {
        showToast(
          'Failed to check database connection', 
          'error'
        );
      }
    };

    // Small delay to ensure toast is ready
    setTimeout(checkConnection, 1000);
  }, [showToast]);
}