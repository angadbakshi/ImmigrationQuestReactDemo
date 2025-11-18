// ./src/types/profile.ts

export interface UserProfile {
    id: string;
    full_name: string;
    nationality: string | null;
    destination_country: string | null;
    goals: string[];
    photo_url?: string;
    selected_program_id?: string;
    onboarding_completed: boolean;
    created_at: string;
    updated_at: string;
}

export interface ExtendedProfile extends Omit<UserProfile, 'selected_program_id'> {
    selected_program: {
        id: string;
        name: string;
        type: string;
    } | null;
}