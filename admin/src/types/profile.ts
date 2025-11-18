// Path: ./admin/src/types/profile.ts
export interface ProfileUpdate {
    full_name?: string;
    nationality?: string;
    destination_country?: string;
    current_country?: string;
    in_canada?: boolean;
    marital_status?: string;
    spouse_canadian?: boolean;
    children_count?: number;
    education_level?: string;
    studied_in_canada?: boolean;
    canadian_institution?: string;
    study_duration?: string;
    years_experience?: string;
    currently_employed?: boolean;
    job_title?: string;
    noc_code?: string;
    has_job_offer?: boolean;
    language_test?: string;
    test_type?: string;
    language_scores?: Record<string, any>;
    primary_goal?: string;
    timeline?: string;
    status?: string;
    goals?: string[];
    onboarding_completed?: boolean;
}