import { OnboardingFormData } from '../types';

export const getDefaultFormData = (): OnboardingFormData => ({
  // Basic Info
  fullName: 'John Smith',
  email: 'john.smith@example.com',
  password: 'Password123!',
  
  // Personal Details
  dateOfBirth: '1990-01-01',
  nationality: 'IN',
  currentCountry: 'IN',
  inCanada: false,
  
  // Family Status
  maritalStatus: 'married',
  spouseCanadian: true,
  children: 0,
  
  // Education
  educationLevel: 'masters',
  studiedInCanada: false,
  canadianInstitution: '',
  studyDuration: '',
  
  // Work Experience
  yearsExperience: '3-5',
  currentlyEmployed: true,
  jobTitle: 'Software Engineer',
  nocCode: '21231',
  hasJobOffer: true,
  
  // Language
  languageTest: 'ielts',
  testType: 'general',
  scores: {
    listening: '8.0',
    speaking: '7.5',
    reading: '7.5',
    writing: '7.0'
  },
  
  // Goals
  primaryGoal: 'pr',
  timeline: '3-6'
});