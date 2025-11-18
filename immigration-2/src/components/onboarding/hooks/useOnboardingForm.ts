import { useState } from 'react';
import type { OnboardingFormData } from '../types';

const initialFormData: OnboardingFormData = {
  fullName: '',
  email: '',
  password: '',
  dateOfBirth: '',
  nationality: '',
  currentCountry: '',
  inCanada: false,
  maritalStatus: '',
  spouseCanadian: false,
  children: 0,
  educationLevel: '',
  studiedInCanada: false,
  canadianInstitution: '',
  studyDuration: '',
  yearsExperience: '',
  currentlyEmployed: false,
  jobTitle: '',
  nocCode: '',
  hasJobOffer: false,
  languageTest: '',
  testType: '',
  scores: {
    listening: '',
    speaking: '',
    reading: '',
    writing: ''
  },
  primaryGoal: '',
  timeline: ''
};

export function useOnboardingForm() {
  const [formData, setFormData] = useState<OnboardingFormData>(initialFormData);

  const updateFormData = (data: Partial<OnboardingFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  return {
    formData,
    updateFormData
  };
}