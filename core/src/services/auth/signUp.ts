import { supabase } from '../supabase/supabase';
import type { OnboardingFormData } from '../../../../immigration-2/src/components/onboarding/types';

export async function signUp(email: string, password: string, userData: OnboardingFormData) {
  // First create the auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: userData.fullName
      }
    }
  });

  if (authError) throw authError;
  if (!authData.user) throw new Error('User creation failed');

  // Then create the profile
  const { error: profileError } = await supabase
    .from('profiles')
    .insert([{
      id: authData.user.id,
      full_name: userData.fullName,
      date_of_birth: userData.dateOfBirth,
      nationality: userData.nationality,
      current_country: userData.currentCountry,
      in_canada: userData.inCanada,
      marital_status: userData.maritalStatus,
      spouse_canadian: userData.spouseCanadian,
      children_count: userData.children,
      education_level: userData.educationLevel,
      studied_in_canada: userData.studiedInCanada,
      canadian_institution: userData.canadianInstitution,
      study_duration: userData.studyDuration,
      years_experience: userData.yearsExperience,
      currently_employed: userData.currentlyEmployed,
      job_title: userData.jobTitle,
      noc_code: userData.nocCode,
      has_job_offer: userData.hasJobOffer,
      language_test: userData.languageTest,
      test_type: userData.testType,
      language_scores: userData.scores,
      primary_goal: userData.primaryGoal,
      timeline: userData.timeline,
      onboarding_completed: true
    }]);

  if (profileError) throw profileError;

  return authData;
}