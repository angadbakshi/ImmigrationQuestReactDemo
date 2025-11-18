import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader, AlertCircle } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
  error?: string | null;
  timeout?: number;
}

export function LoadingScreen({
                                message = 'Loading Immigration Quest...',
                                error = null,
                                timeout = 10000
                              }: LoadingScreenProps) {
  const [showTimeout, setShowTimeout] = useState(false);
  const [retryAttempts, setRetryAttempts] = useState(0);
  const navigate = useNavigate();
  const MAX_RETRIES = 3;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTimeout(true);
    }, timeout);

    return () => clearTimeout(timer);
  }, [timeout]);

  const handleRetry = () => {
    if (retryAttempts < MAX_RETRIES) {
      setRetryAttempts(prev => prev + 1);
      setShowTimeout(false);
      window.location.reload();
    } else {
      navigate('/login', { replace: true });
    }
  };

  const handleRedirect = () => {
    navigate('/login', { replace: true });
  };

  // Show error state
  if (error) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
            <div className="flex justify-center mb-4">
              <AlertCircle className="h-12 w-12 text-red-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Error Loading Application
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="flex flex-col gap-3">
              {retryAttempts < MAX_RETRIES && (
                  <button
                      onClick={handleRetry}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Try Again ({MAX_RETRIES - retryAttempts} attempts remaining)
                  </button>
              )}
              <button
                  onClick={handleRedirect}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
    );
  }

  // Show timeout state
  if (showTimeout) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Taking longer than expected...
            </h2>
            <p className="text-gray-600 mb-6">
              We're having trouble loading your information. Please try again or sign in.
            </p>
            <div className="flex flex-col gap-3">
              {retryAttempts < MAX_RETRIES && (
                  <button
                      onClick={handleRetry}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Try Again ({MAX_RETRIES - retryAttempts} attempts remaining)
                  </button>
              )}
              <button
                  onClick={handleRedirect}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
    );
  }

  // Show loading state
  return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="flex items-center gap-3 mb-4">
          <Loader className="h-8 w-8 text-blue-600 animate-spin" />
          <p className="text-gray-600 text-lg font-medium">{message}</p>
        </div>
        {retryAttempts > 0 && (
            <p className="text-sm text-gray-500">
              Retry attempt {retryAttempts} of {MAX_RETRIES}
            </p>
        )}
      </div>
  );
}