import { StepProps } from '../types';
import { StepLayout } from '../../../../../core/src/components/ui/StepLayout';
import { useAuth } from '../../../../../auth/src/context/AuthContext';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import {useToast} from "../../../../../immigration-2/src/context/ToastContext";
import {profileApi} from "../../../../../immigration-2/src/services/profile/profile.service";

export function BasicInfoStep({ data, onUpdate, onNext, onBack }: StepProps) {
  const { user } = useAuth();
  const { showToast } = useToast();
  const location = useLocation();
  const signupData = location.state?.signupData;

  useEffect(() => {
    if (signupData) {
      onUpdate({
        fullName: signupData.fullName,
        email: signupData.email,
        password: signupData.password
      });
    }
  }, [signupData, onUpdate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!data.fullName || !data.email) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    // Only attempt to update profile if user is authenticated
    if (user?.id) {
      try {
        await profileApi.updateProfile(user.id, {
          nationality: data.nationality,
          destination_country: 'Canada',
          goals: [
            'Obtain permanent residency',
            data.primaryGoal === 'work' ? 'Secure employment' : 'Complete studies',
            'Complete language certification'
          ]
        });
      } catch (error) {
        console.error('Error updating profile:', error);
        // Don't block progression for profile update errors
        showToast('Profile update failed, but you can continue', 'warning');
      }
    }

    // Always proceed to next step if form is valid
    onNext();
  };

  return (
      <StepLayout
          title="Basic Information"
          description="Let's start with some basic details about you."
          onBack={onBack}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
                type="text"
                value={data.fullName}
                onChange={(e) => onUpdate({ fullName: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
                readOnly={!!signupData}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
                type="email"
                value={data.email}
                onChange={(e) => onUpdate({ email: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
                readOnly={!!signupData}
            />
          </div>

          {/* Only show password field for signup users */}
          {signupData && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                    type="password"
                    value={data.password}
                    onChange={(e) => onUpdate({ password: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                    readOnly={!!signupData}
                />
              </div>
          )}

          <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Continue
          </button>
        </form>
      </StepLayout>
  );
}