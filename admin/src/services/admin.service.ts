import { supabase } from '../../../core/src/services/supabase/supabase';
import { AdminProfile } from '../types/admin';

export const adminApi = {
  // User Management
  async getUsers(options?: {
    limit?: number;
    page?: number;
    status?: string;
    program?: string;
    search?: string;
  }) {
    try {
      let query = supabase
          .from('profiles')
          .select(`
          *,
          applications (
            id,
            status,
            program:immigration_programs (
              id,
              name,
              type,
              description
            )
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
        `);

      // Apply filters
      if (options?.status && options.status !== 'all') {
        query = query.eq('status', options.status);
      }

      if (options?.program && options.program !== 'all') {
        query = query.eq('applications.program.type', options.program);
      }

      if (options?.search) {
        query = query.or(`
          full_name.ilike.%${options.search}%,
          email.ilike.%${options.search}%
        `);
      }

      // Apply pagination
      if (options?.limit) {
        const start = (options.page || 0) * options.limit;
        query = query
            .range(start, start + options.limit - 1)
            .order('created_at', { ascending: false });
      }

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        users: data || [],
        total: count || 0
      };
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  async getUserById(userId: string) {
    const { data, error } = await supabase
        .from('profiles')
        .select(`
        *,
        applications (
          id,
          status,
          program:immigration_programs (*)
        ),
        documents (*),
        tasks (*)
      `)
        .eq('id', userId)
        .single();

    if (error) throw error;
    return data;
  },

  async updateUserProfile(userId: string, updates: Partial<AdminProfile>) {
    // Filter out only the fields that exist in the profiles table
    const validProfileFields = {
      full_name: updates.full_name || updates.fullName,
      phone: updates.phone,
      destination_country: updates.destination_country,
      current_country: updates.current_country,
      in_canada: updates.in_canada,
      marital_status: updates.marital_status,
      spouse_canadian: updates.spouse_canadian,
      children_count: updates.children_count,
      education_level: updates.education_level,
      studied_in_canada: updates.studied_in_canada,
      canadian_institution: updates.canadian_institution,
      study_duration: updates.study_duration,
      years_experience: updates.years_experience,
      currently_employed: updates.currently_employed,
      job_title: updates.job_title,
      noc_code: updates.noc_code,
      has_job_offer: updates.has_job_offer,
      language_test: updates.language_test,
      test_type: updates.test_type,
      language_scores: updates.language_scores,
      primary_goal: updates.primary_goal,
      timeline: updates.timeline,
      status: updates.status,
      goals: updates.goals,
      onboarding_completed: updates.onboarding_completed
    };

    // Remove undefined values
    const cleanedUpdates = Object.entries(validProfileFields)
        .reduce((acc, [key, value]) => {
          if (value !== undefined) {
            acc[key] = value;
          }
          return acc;
        }, {} as Record<string, any>);

    // Only proceed with update if there are valid fields to update
    if (Object.keys(cleanedUpdates).length === 0) {
      return null;
    }

    const { data, error } = await supabase
        .from('profiles')
        .update(cleanedUpdates)
        .eq('id', userId)
        .select()
        .single();

    if (error) {
      console.error('Error updating profile:', error);
      throw error;
    }

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
        .from('applications')
        .insert({
          profile_id: userId,
          program_id: programId,
          status: 'assigned'
        })
        .select()
        .single();

    if (error) throw error;
    return data;
  },

  async sendNotification(userId: string, message: string, type: string = 'admin') {
    const { data, error } = await supabase
        .from('notifications')
        .insert({
          profile_id: userId,
          message,
          type
        })
        .select()
        .single();

    if (error) throw error;
    return data;
  },

  // Export user data
  async exportUserData(userIds: string[]) {
    const { data, error } = await supabase
        .from('profiles')
        .select(`
        full_name,
        email,
        status,
        created_at,
        applications (
          program:immigration_programs (
            name,
            type
          )
        )
      `)
        .in('id', userIds);

    if (error) throw error;
    return data;
  }
};