import { supabase } from 'core/src/services/supabase/supabase';

interface ProfileUpdate {
    nationality?: string;
    destination_country?: string;
    goals?: string[];
    selected_program_id?: string;
}

export const profileApi = {
    async updateProfile(userId: string, updates: ProfileUpdate) {
        const { data, error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', userId)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async getProfile(userId: string) {
        const { data, error } = await supabase
            .from('profiles')
            .select(`
        *,
        selected_program:selected_program_id (
          id,
          name,
          type
        )
      `)
            .eq('id', userId)
            .single();

        if (error) throw error;
        return data;
    }
};