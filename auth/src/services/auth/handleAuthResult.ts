import {User} from "../../types";
import {profileService} from "../profile/profileService";

export async function handleAuthResult(authData: any): Promise<{ user: User | null; error: string | null }> {
  try {
    if (!authData.user) {
      return { user: null, error: 'Authentication failed' };
    }

    // Try to get existing profile first
    let profile = await profileService.getProfile(authData.user.id);

    if (!profile) {
      // Create new profile if it doesn't exist
      profile = await profileService.upsertProfile(authData.user.id, {
        applicationId: "",
        createdAt: "",
        currentStage: "",
        documents: [],
        immigrationProgram: undefined,
        lastActive: "",
        phone: "",
        photoUrl: "",
        progress: 0,
        status: undefined,
        tasks: [],
        email: authData.email,
        id: authData.user.id,
        fullName: authData.user.user_metadata?.full_name || '',
        role: 'user',
        onboarding_completed: authData.onboardingCompleted || false
      });
    }

    return {
      user: {
        id: authData.user.id,
        email: authData.user.email!,
        name: profile.fullName,
        role: profile.role.toString() == 'User' ? 'user' : 'admin',
        onboardingCompleted: profile.onboarding_completed || false // Add this line

      },
      error: null
    };
  } catch (error) {
    console.error('Auth result handling error:', error);
    return {
      user: null,
      error: error instanceof Error ? error.message : 'Failed to process authentication'
    };
  }
}