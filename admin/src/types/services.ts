// Path: ./admin/src/types/services.ts
import { AdminProfile } from '@/types/admin';
import { TableColumn } from '@/types/table';
import { Document } from '@core/types/documents';
import { Task } from '../../../immigration-2/src/types/tasks';
import { ImmigrationProgram } from '../../../immigration-2/src/types/programs';

export interface ProgramInfo {
    id: string;
    name: string;
    type: string;
}

export interface ApplicationInfo {
    id: string;
    status: string;
    program?: ProgramInfo;
}

// Extend AdminProfile for the database response
export interface ProfileResponse extends Omit<AdminProfile, 'documents' | 'tasks' | 'immigrationProgram'> {
    applications?: ApplicationInfo[];
    documents?: Document[];
    tasks?: Task[];
    immigration_program?: ImmigrationProgram;
}

export interface NotificationResponse {
    id: string;
    profile_id: string;
    message: string;
    type: string;
    created_at: string;
}

export interface ProgramAssignmentResponse {
    id: string;
    profile_id: string;
    program_id: string;
    status: string;
}

export interface IUserService {
    getUsers(): Promise<ProfileResponse[]>;
    getUserById(userId: string): Promise<ProfileResponse>;
    updateUser(userId: string, updates: Partial<AdminProfile>): Promise<ProfileResponse>;
    deleteUser(userId: string): Promise<boolean>;
    updateUserEmail(userId: string, newEmail: string): Promise<any>;
    sendNotification(userId: string, message: string, type: string): Promise<NotificationResponse>;
    // getUserEditableFields(): TableColumn[];
    assignProgram(userId: string, programId: string): Promise<ProgramAssignmentResponse>;

    bulkUpdateProfiles(param: { id: string; updates: Partial<AdminProfile> }[]): any;
    getUserEditableFields(): Promise<TableColumn[]>; // Add this line
    exportUserData(strings: string[]): any;
}