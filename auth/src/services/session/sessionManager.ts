import { supabase } from 'core';
import {User} from "../../types";
import {profileService} from "../profile/profileService";

export const sessionManager = {
  async getCurrentSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  },

  async getUserWithProfile(session: any): Promise<User | null> {
    if (!session) return null;

    const profile = await profileService.getProfile(session.user.id);
    
    return {
      ...session.user,
      name: profile?.fullName,
      role: profile?.role,
      onboardingCompleted: profile?.onboarding_completed
    };
  },

  onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange(async (_, session) => {
      const user = session ? await this.getUserWithProfile(session) : null;
      callback(user);
    });
  }
};