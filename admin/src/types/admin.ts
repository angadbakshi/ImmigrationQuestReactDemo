import type { Document } from '@core/types/documents.ts';
import type { Task } from '../../../immigration-2/src/types/tasks';
import type { ImmigrationProgram } from '../../../immigration-2/src/types/programs';

export type UserStatus = 'active' | 'pending' | 'inactive';
export type BadgeVariant = 'success' | 'warning' | 'default';

export type EducationLevel = 'highSchool' | 'diploma' | 'bachelors' | 'masters' | 'phd' | '';
export type MaritalStatus = 'single' | 'married' | 'commonLaw' | 'divorced' | 'widowed' | '';
export type LanguageTest = 'ielts' | 'celpip' | 'tef' | 'tcf' | '';
export type TestType = 'general' | 'academic' | '';
export type PrimaryGoal = 'study' | 'work' | 'pr' | 'visit' | '';
export type Timeline = 'immediate' | '3-6' | '6+' | '';

export interface LanguageScores {
    listening: number;
    speaking: number;
    reading: number;
    writing: number;
}

export interface AdminProfile {
    // Basic Information
    id: string;
    full_name: string;
    email: string;
    phone?: string;
    photoUrl?: string;
    role: 'user' | 'admin';
    status: UserStatus;

    // Timestamps and Status
    createdAt: string;
    created_at: string; // DB field name
    updated_at: string;
    lastActive: string;
    onboarding_completed: boolean;

    // Immigration Program
    immigrationProgram?: ImmigrationProgram | null;
    selected_program_id?: string;
    applicationId?: string;
    currentStage?: string;
    progress: number;

    // Documents and Tasks
    documents: Document[];
    tasks: Task[];

    // Personal Details
    nationality?: string;
    destination_country?: string;
    current_country?: string;
    date_of_birth?: string;
    in_canada: boolean;
    goals: string[];

    // Education
    education_level?: EducationLevel;
    studied_in_canada: boolean;
    canadian_institution?: string;
    study_duration?: string;

    // Work Experience
    currently_employed: boolean;
    job_title?: string;
    noc_code?: string;
    years_experience?: number;
    has_job_offer?: boolean;

    // Family Status
    marital_status?: MaritalStatus;
    spouse_canadian: boolean;
    children_count: number;

    // Language Proficiency
    language_test?: LanguageTest;
    test_type?: TestType;
    language_scores?: LanguageScores;

    // Immigration Goals
    primary_goal?: PrimaryGoal;
    timeline?: Timeline;
}

// Utility type for updates
export type AdminProfileUpdate = Partial<AdminProfile>;

// Form validation type
export interface AdminProfileValidation {
    isValid: boolean;
    errors: Partial<Record<keyof AdminProfile, string>>;
}


export interface AdminAction {
    adminId: string;
    action: 'view' | 'update' | 'delete' | 'notify' | 'assign_program';
    targetId: string;
    targetType: 'profile' | 'program' | 'document' | 'task';
    details?: Record<string, any>;
    timestamp: string;
}

export interface Notification {
    id: string;
    userId: string;
    message: string;
    type: 'info' | 'warning' | 'success' | 'error';
    read: boolean;
    createdAt: string;
}