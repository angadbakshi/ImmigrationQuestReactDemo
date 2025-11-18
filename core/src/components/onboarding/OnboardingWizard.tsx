import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDefaultFormData } from './utils/defaultData';
import { useOnboardingSteps } from './hooks/useOnboardingSteps';
import { ProgressBar } from './ProgressBar';
import type { OnboardingFormData } from './types';
import {useAuth} from "../../../../auth/src/context/AuthContext";
import {useToast} from "../../../../immigration-2/src/context/ToastContext";
import {signupOrLogin} from "../../../../auth/src";

const TOTAL_STEPS = 9;

export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingFormData>(getDefaultFormData());
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { showToast } = useToast();

  const { renderCurrentStep } = useOnboardingSteps({
    currentStep,
    formData,
    onUpdateData: handleUpdateData,
    onNext: handleNext,
    onBack: handleBack,
    onComplete: handleComplete,
    isSubmitting
  });

  function handleNext() {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  }

  function handleBack() {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }

  function handleUpdateData(data: Partial<OnboardingFormData>) {
    setFormData(prev => ({ ...prev, ...data }));
  }

  async function handleComplete() {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const { user, error } = await signupOrLogin(
        formData.email, 
        formData.password, 
        formData
      );
      
      if (error) {
        showToast(error, 'error');
        return;
      }

      if (user) {
        setUser(user);
        navigate('/dashboard', { replace: true });
        showToast('Welcome back! Your profile has been updated.', 'success');
      }
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : 'Authentication failed',
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto pt-12 px-4">
        <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        <div className="mt-8">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
}