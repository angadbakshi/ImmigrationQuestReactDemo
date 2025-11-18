// Path: ./admin/src/services/users.service.ts
import {supabase} from "../../../../core";
import {AdminProfile} from "@/types/admin.ts";
import { TableColumn } from '@/types/table';
import {
    IUserService,
    ProfileResponse,
    NotificationResponse,
    ProgramAssignmentResponse
} from '@/types/services';
import {User} from "@auth/types";

export const userService: {
    getUserById(userId: string): Promise<ProfileResponse>;
    assignProgram(userId: string, programId: string): Promise<ProgramAssignmentResponse>;
    getUsers(): Promise<ProfileResponse[]>;
    deleteUser(userId: string): Promise<boolean>;
    updateUser(userId: string, updates: Partial<AdminProfile>): Promise<ProfileResponse>;
    sendNotification(userId: string, message: string, type: string): Promise<NotificationResponse>;
    getUserEditableFields(): Promise<TableColumn[]>;
    updateUserEmail(userId: string, newEmail: string): Promise<void>;
    bulkUpdateProfiles(updates: { id: string; updates: Partial<AdminProfile> }[]): Promise<void>;
    exportUserData(userIds: string[]): Promise<AdminProfile[]>;// Add this line
} = {
    async getUsers() {
        const { data, error } = await supabase
            .from('profiles')
            .select(`
                *,
                applications (
                    id,
                    status,
                    program:immigration_programs (
                        id,
                        name,
                        type
                    )
                ),
                documents (id, name, status),
                tasks (id, title, status)
            `);
        if (error) throw error;
        return data as ProfileResponse[];
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
        return data as ProfileResponse;
    },

    async updateUser(userId: string, updates: Partial<AdminProfile>) {
        const { data, error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', userId)
            .select()
            .single();
        if (error) throw error;
        return data as ProfileResponse;
    },

    async deleteUser(userId: string) {
        const { error } = await supabase
            .from('profiles')
            .delete()
            .eq('id', userId);

        if (error) throw error;
        return true;
    },

    // Add the updateUserEmail method
    async updateUserEmail(userId: string, newEmail: string): Promise<void> {
        // Update email in the auth system
        const { error: authError } = await supabase.auth.updateUser({ email: newEmail });
        if (authError) throw authError;

        // Update email in the profiles table
        const { error: profileError } = await supabase
            .from('profiles')
            .update({ email: newEmail })
            .eq('id', userId);
        if (profileError) throw profileError;
    },

    async sendNotification(userId: string, message: string, type: string) {
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
        return data as NotificationResponse;
    },

    async getUserEditableFields(): Promise<TableColumn[]> {
        return [
            {
                key: 'full_name',
                label: 'Full Name',
                type: 'text',
                editable: true,
            },
            {
                key: 'email',
                label: 'Email',
                type: 'email',
                editable: true,
            },
            {
                key: 'role',
                label: 'Role',
                type: 'select',
                editable: true,
                options: [
                    { value: 'user', label: 'User' },
                    { value: 'admin', label: 'Admin' },
                ],
            },
            {
                key: 'onboarding_completed',
                label: 'Onboarding Completed',
                type: 'boolean',
                editable: true,
            },
        ];
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
        return data as ProgramAssignmentResponse;
    },

    // Implement bulkUpdateProfiles
    async bulkUpdateProfiles(updates: { id: string; updates: Partial<AdminProfile> }[]): Promise<void> {
        const { error } = await supabase
            .from('profiles')
            .upsert(updates.map(({ id, updates }) => ({ id, ...updates })));
        if (error) throw error;
    },

    // Implement exportUserData
    async exportUserData(userIds: string[]): Promise<AdminProfile[]> {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .in('id', userIds);
        if (error) throw error;
        return data || [];
    },
};
