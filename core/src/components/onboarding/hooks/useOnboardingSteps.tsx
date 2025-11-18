import { WelcomeStep } from '../steps/WelcomeStep';
import { BasicInfoStep } from '../steps/BasicInfoStep';
import { PersonalDetailsStep } from '../steps/PersonalDetailsStep';
import { FamilyStatusStep } from '../steps/FamilyStatusStep';
import { EducationStep } from '../steps/EducationStep';
import { WorkExperienceStep } from '../steps/WorkExperienceStep';
import { LanguageStep } from '../steps/LanguageStep';
import { GoalsStep } from '../steps/GoalsStep';
import { ResultsStep } from '../steps/ResultsStep';
import type {OnboardingFormData, StepProps} from '../types';

interface UseOnboardingStepsProps {
  currentStep: number;
  formData: OnboardingFormData;
  onUpdateData: (data: Partial<OnboardingFormData>) => void;
  onNext: () => void;
  onBack: () => void;
  onComplete: () => void;
  isSubmitting: boolean; // Added isSubmitting prop
}

export function useOnboardingSteps({
                                     currentStep,
                                     formData,
                                     onUpdateData,
                                     onNext,
                                     onBack,
                                     onComplete,
                                     isSubmitting
                                   }: UseOnboardingStepsProps) {

    // Common props shared between all steps
    const commonProps: Omit<StepProps, 'onComplete'> = {
        data: formData,
        onUpdate: onUpdateData,
        onNext,
        onBack,
        isSubmitting
    };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <WelcomeStep onNext={onNext} />;
      case 2:
          return <BasicInfoStep {...commonProps} />;
        case 3:
            return <PersonalDetailsStep {...commonProps} />;
        case 4:
            return <FamilyStatusStep {...commonProps} />;
        case 5:
            return <EducationStep {...commonProps} />;
        case 6:
            return <WorkExperienceStep {...commonProps} />;
        case 7:
            return <LanguageStep {...commonProps} />;
        case 8:
            return <GoalsStep {...commonProps} />;
        case 9:
            return (
                <ResultsStep
                    data={formData}
                    onBack={onBack}
                    onComplete={onComplete}
                    isSubmitting={isSubmitting}
                />
            );
        default:
            return null;
    }
  };

    return { renderCurrentStep };
}