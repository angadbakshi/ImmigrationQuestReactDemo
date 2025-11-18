import type { OnboardingFormData } from '../../../../immigration-2/src/components/onboarding/types';
import {User} from "../../types";
import {supabase} from "core";

export async function signupOrLogin(
    email: string,
    password: string,
    userData: OnboardingFormData
): Promise<{ user: User | null; error: string | null }> {
    try {
        // TEMPORARY: Allow any credentials for testing (DB not connected)
        // TODO: Remove this bypass once database is connected
        return {
            user: {
                id: `temp-user-${Date.now()}`,
                email: email,
                name: userData.fullName,
                role: 'user',
                onboardingCompleted: true
            },
            error: null
        };

        // Original authentication code (commented out temporarily)
        /*
        // First check if user exists and try to sign in
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (!signInError && signInData.user) {
            // User exists, update profile
            const { error: updateError } = await supabase
                .from('profiles')
                .upsert({
                    id: signInData.user.id,
                    full_name: userData.fullName,
                    nationality: userData.nationality,
                    current_country: userData.currentCountry,
                    marital_status: userData.maritalStatus,
                    education_level: userData.educationLevel,
                    primary_goal: userData.primaryGoal,
                    role: 'user',
                    onboarding_completed: true
                }, {
                    onConflict: 'id'
                });

            if (updateError) throw updateError;

            return {
                user: {
                    id: signInData.user.id,
                    email: signInData.user.email!,
                    name: userData.fullName,
                    role: 'user',
                    onboardingCompleted: true
                },
                error: null
            };
        }

        // If user doesn't exist, create new account
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: userData.fullName,
                    role: 'user'
                }
            }
        });

        if (signUpError) throw signUpError;
        if (!signUpData.user) throw new Error('Failed to create user account');

        // Create initial profile
        const { error: profileError } = await supabase
            .from('profiles')
            .insert([{
                id: signUpData.user.id,
                full_name: userData.fullName,
                nationality: userData.nationality,
                current_country: userData.currentCountry,
                marital_status: userData.maritalStatus,
                education_level: userData.educationLevel,
                primary_goal: userData.primaryGoal,
                role: 'user',
                onboarding_completed: true
            }]);

        if (profileError) {
            console.error('Profile creation error:', profileError);
            await supabase.auth.signOut();
            throw new Error('Failed to create user profile');
        }

        return {
            user: {
                id: signUpData.user.id,
                email: signUpData.user.email!,
                name: userData.fullName,
                role: 'user',
                onboardingCompleted: true
            },
            error: null
        };
        */

    } catch (error) {
        console.error('Auth error:', error);
        return {
            user: null,
            error: error instanceof Error ? error.message : 'Authentication failed'
        };
    }
}