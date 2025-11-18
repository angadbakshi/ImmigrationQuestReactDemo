import { useState } from 'react';

const TOTAL_STEPS = 9;

export function useOnboardingNavigation() {
  const [currentStep, setCurrentStep] = useState(1);

  const goToNextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return {
    currentStep,
    totalSteps: TOTAL_STEPS,
    goToNextStep,
    goToPreviousStep
  };
}