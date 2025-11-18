// admin/src/features/users/services/userService.ts

import { supabase } from '../../../../../core/src/services/supabase/supabase';
import type { AdminProfile } from '../../../types/admin';

export const userService = {
    async getUsers() {
        const { data, error } = await supabase
            .from('profiles')
            .select(`
        *,
        selected_program:immigration_programs!selected_program_id (
          id,
          name,
          type
        ),
        documents (
          id,
          name,
          status
        ),
        tasks (
          id,
          title,
          status
        )
      `)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    async getUserById(userId: string) {
        const { data, error } = await supabase
            .from('profiles')
            .select(`
        *,
        selected_program:immigration_programs!selected_program_id (
          id,
          name,
          type
        ),
        documents (
          id,
          name,
          status
        ),
        tasks (
          id,
          title,
          status
        )
      `)
            .eq('id', userId)
            .single();

        if (error) throw error;
        return data;
    },

    async updateUser(userId: string, updates: Partial<AdminProfile>) {
        const { data, error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', userId)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async deleteUser(userId: string) {
        const { error } = await supabase
            .from('profiles')
            .delete()
            .eq('id', userId);

        if (error) throw error;
        return true;
    },

    async assignProgram(userId: string, programId: string) {
        const { data, error } = await supabase
            .from('profiles')
            .update({ selected_program_id: programId })
            .eq('id', userId)
            .select()
            .single();

        if (error) throw error;
        return data;
    }
};