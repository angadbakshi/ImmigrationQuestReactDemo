import { OnboardingFormData } from '../types';

export const validateBasicInfo = (data: Partial<OnboardingFormData>) => {
  const errors: Record<string, string> = {};

  if (!data.fullName?.trim()) {
    errors.fullName = 'Full name is required';
  }

  if (!data.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Invalid email format';
  }

  if (!data.password?.trim()) {
    errors.password = 'Password is required';
  } else if (data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  return errors;
};

export const validatePersonalDetails = (data: Partial<OnboardingFormData>) => {
  const errors: Record<string, string> = {};

  if (!data.dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required';
  }

  if (!data.nationality) {
    errors.nationality = 'Nationality is required';
  }

  if (!data.currentCountry) {
    errors.currentCountry = 'Current country is required';
  }

  return errors;
};

export const validateEducation = (data: Partial<OnboardingFormData>) => {
  const errors: Record<string, string> = {};

  if (!data.educationLevel) {
    errors.educationLevel = 'Education level is required';
  }

  if (data.studiedInCanada && !data.canadianInstitution) {
    errors.canadianInstitution = 'Institution name is required';
  }

  return errors;
};

export const validateWorkExperience = (data: Partial<OnboardingFormData>) => {
  const errors: Record<string, string> = {};

  if (!data.yearsExperience) {
    errors.yearsOfExperience = 'Years of experience is required';
  }

  if (data.currentlyEmployed && !data.jobTitle) {
    errors.jobTitle = 'Job title is required';
  }

  return errors;
};

export const validateLanguage = (data: Partial<OnboardingFormData>) => {
  const errors: Record<string, string> = {};

  if (!data.languageTest) {
    errors.languageTest = 'Language test is required';
  }

  if (data.languageTest) {
    const scores = data.scores || {};
    ['listening', 'speaking', 'reading', 'writing'].forEach(skill => {
      if (!scores[skill as keyof typeof scores]) {
        errors[`scores.${skill}`] = `${skill.charAt(0).toUpperCase() + skill.slice(1)} score is required`;
      }
    });
  }

  return errors;
};

export const validateGoals = (data: Partial<OnboardingFormData>) => {
  const errors: Record<string, string> = {};

  if (!data.primaryGoal) {
    errors.primaryGoal = 'Primary goal is required';
  }

  if (!data.timeline) {
    errors.timeline = 'Timeline is required';
  }

  return errors;
};