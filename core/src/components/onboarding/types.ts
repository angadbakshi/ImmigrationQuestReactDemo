export interface OnboardingFormData {
  // Basic Info
  fullName: string;
  email: string;
  password: string;
  
  // Personal Details
  dateOfBirth: string;
  nationality: string;
  currentCountry: string;
  inCanada: boolean;
  
  // Family Status
  maritalStatus: string;
  spouseCanadian: boolean;
  children: number;
  
  // Education
  educationLevel: string;
  studiedInCanada: boolean;
  canadianInstitution: string;
  studyDuration: string;
  
  // Work Experience
  yearsExperience: string;
  currentlyEmployed: boolean;
  jobTitle: string;
  nocCode: string;
  hasJobOffer: boolean;

  // Language
  languageTest: string;
  testType: string;
  scores: {
    listening: string;
    speaking: string;
    reading: string;
    writing: string;
  };
  
  // Goals
  primaryGoal: string;
  timeline: string;
}

export interface StepProps {
  data: OnboardingFormData;
  onUpdate: (data: Partial<OnboardingFormData>) => void;
  onNext: () => void;
  onBack: () => void;
  isSubmitting?: boolean;
  onComplete?: () => void;
}