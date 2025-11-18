export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          email: string | null; // Added email column
          phone: string | null; // Added phone column
          photo_url: string | null; // Changed from photoUrl to photo_url
          role: string; // Added role column
          status: string; // Added status column
          date_of_birth: string | null;
          nationality: string | null;
          current_country: string | null;
          in_canada: boolean;
          marital_status: string | null;
          spouse_canadian: boolean;
          children_count: number;
          education_level: string | null;
          studied_in_canada: boolean;
          canadian_institution: string | null;
          study_duration: string | null;
          years_experience: string | null;
          currently_employed: boolean;
          job_title: string | null;
          noc_code: string | null;
          has_job_offer: boolean;
          language_test: string | null;
          test_type: string | null;
          language_scores: Json | null;
          primary_goal: string | null;
          timeline: string | null;
          created_at: string;
          updated_at: string;
          last_active: string | null; // Added last_active column
          onboarding_completed: boolean; // Changed to onboarding_completed
        };
        Insert: {
          id: string;
          full_name: string;
          email?: string | null; // Added email column
          phone?: string | null; // Added phone column
          photo_url?: string | null; // Changed from photoUrl to photo_url
          role?: string; // Added role column
          status?: string; // Added status column
          date_of_birth?: string | null;
          nationality?: string | null;
          current_country?: string | null;
          in_canada?: boolean;
          marital_status?: string | null;
          spouse_canadian?: boolean;
          children_count?: number;
          education_level?: string | null;
          studied_in_canada?: boolean;
          canadian_institution?: string | null;
          study_duration?: string | null;
          years_experience?: string | null;
          currently_employed?: boolean;
          job_title?: string | null;
          noc_code?: string | null;
          has_job_offer?: boolean;
          language_test?: string | null;
          test_type?: string | null;
          language_scores?: Json | null;
          primary_goal?: string | null;
          timeline?: string | null;
          created_at?: string;
          updated_at?: string;
          last_active?: string | null; // Added last_active column
          onboarding_completed?: boolean; // Changed to onboarding_completed
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string | null; // Added email column
          phone?: string | null; // Added phone column
          photo_url?: string | null; // Changed from photoUrl to photo_url
          role?: string; // Added role column
          status?: string; // Added status column
          date_of_birth?: string | null;
          nationality?: string | null;
          current_country?: string | null;
          in_canada?: boolean;
          marital_status?: string | null;
          spouse_canadian?: boolean;
          children_count?: number;
          education_level?: string | null;
          studied_in_canada?: boolean;
          canadian_institution?: string | null;
          study_duration?: string | null;
          years_experience?: string | null;
          currently_employed?: boolean;
          job_title?: string | null;
          noc_code?: string | null;
          has_job_offer?: boolean;
          language_test?: string | null;
          test_type?: string | null;
          language_scores?: Json | null;
          primary_goal?: string | null;
          timeline?: string | null;
          created_at?: string;
          updated_at?: string;
          last_active?: string | null; // Added last_active column
          onboarding_completed?: boolean; // Changed to onboarding_completed
        };
      };
      // Add other table types here...
    };
  };
}