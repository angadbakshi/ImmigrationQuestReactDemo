import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../auth/src/context/AuthContext';
import { UserPlus, LogIn, ArrowRight } from 'lucide-react';
import React from 'react';

export function WelcomeScreen() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  // Redirect to dashboard if already logged in
  React.useEffect(() => {
    if (user && !loading) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleStartJourney = () => {
    navigate('/onboarding');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  // Show loading state
  if (loading) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-gray-600">Loading...</div>
        </div>
    );
  }

  // Only show welcome screen if not authenticated
  if (user) return null;

  return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Immigration Quest
            </h1>
            <p className="text-lg text-gray-600">
              Your journey to Canada starts here
            </p>
          </div>

          <div className="space-y-4">
            <button
                onClick={handleSignup}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <UserPlus className="w-5 h-5" />
              Create Account
            </button>

            <button
                onClick={handleLogin}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <LogIn className="w-5 h-5" />
              Login to Your Account
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">Or</span>
              </div>
            </div>

            <button
                onClick={handleStartJourney}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-900 transition-colors"
            >
              Continue as Guest
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <p className="text-sm text-gray-500">
            Sign up for a personalized immigration journey or continue as a guest to explore.
          </p>
        </div>
      </div>
  );
}