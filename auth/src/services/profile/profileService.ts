import {supabase} from "core";
import {AdminProfile} from "../../../../admin/src/types/admin";

export const profileService = {
  async upsertProfile(userId: string, data: Partial<AdminProfile>): Promise<AdminProfile> {
    const { data: profile, error } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        ...data
      }, {
        onConflict: 'id',
        ignoreDuplicates: false
      })
      .select('*')
      .single();

    if (error) {
      console.error('Profile upsert error:', error);
      throw error;
    }

    return profile;
  },

  async getProfile(userId: string): Promise<AdminProfile | null> {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('full_name, *')
      .eq('id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw error;
    }

    return profile;
  }
};