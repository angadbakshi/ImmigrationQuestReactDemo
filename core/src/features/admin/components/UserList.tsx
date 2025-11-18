import React, { useState, useEffect } from 'react';
import { User, ArrowRight } from 'lucide-react';
import { Badge } from './../../../components/ui/Badge';
import { AdminProfile } from "../../../../../admin/src/types/admin";

interface UserListProps {
    users: AdminProfile[];
    onSelect: (user: AdminProfile) => void;
    filters?: { program: string; status: string; createdAt?: string };
    searchQuery?: string;
    pagination?: { currentPage: number; pageSize: number; totalUsers: number };
    onPageChange: (page: number) => void;
}

// Function to map Supabase properties to AdminProfile interface
const mapSupabaseUserToAdminProfile = (user: any): AdminProfile => {
    return {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        phone: user.phone || undefined, // Use undefined instead of null
        photoUrl: user.photo_url || undefined, // Use undefined instead of null
        status: user.status || 'inactive',
        applicationId: user.application_id || undefined, // Use undefined instead of null
        immigrationProgram: user.selected_program_id ? {
            id: user.selected_program_id,
            name: user.selected_program?.name || 'Not assigned',
            type: user.selected_program?.type || 'Not assigned',
            description: user.selected_program?.description || '',
            requirements: user.selected_program?.requirements || [],
            estimatedTimeframe: user.selected_program?.estimatedTimeframe || '',
            difficulty: user.selected_program?.difficulty || 1,
            steps: user.selected_program?.steps || [],
            eligibilityPoints: user.selected_program?.eligibilityPoints || 0,
            processingTime: user.selected_program?.processingTime || '',
            fees: {
                application: user.selected_program?.fees?.application || 0,
                processing: user.selected_program?.fees?.processing || 0,
                other: user.selected_program?.fees?.other || 0,
            },
            benefits: user.selected_program?.benefits || [],
        } : undefined,
        currentStage: user.current_stage || undefined, // Use undefined instead of null
        progress: user.progress || 0,
        documents: user.documents || [],
        tasks: user.tasks || [],
        createdAt: user.created_at,
        lastActive: user.last_active || new Date().toISOString(),
        nationality: user.nationality || undefined, // Use undefined instead of null
        destination_country: user.destination_country || undefined, // Use undefined instead of null
        goals: user.goals || [],
        // photo_url: user.photo_url || undefined, // Use undefined instead of null
        selected_program_id: user.selected_program_id || undefined, // Use undefined instead of null
        onboarding_completed: user.onboarding_completed || false,
        created_at: user.created_at,
        updated_at: user.updated_at,
        role: user.role || 'user',
        canadian_institution: user.canadian_institution || undefined, // Use undefined instead of null
        children_count: user.children_count || 0,
        currently_employed: user.currently_employed || false,
        date_of_birth: user.date_of_birth || undefined, // Use undefined instead of null
        education_level: user.education_level || undefined, // Use undefined instead of null
        has_job_offer: user.has_job_offer || undefined, // Use undefined instead of null
        in_canada: user.in_canada || false,
        job_title: user.job_title || undefined, // Use undefined instead of null
        language_scores: user.language_scores || undefined, // Use undefined instead of null
        language_test: user.language_test || undefined, // Use undefined instead of null
        marital_status: user.marital_status || undefined, // Use undefined instead of null
        noc_code: user.noc_code || undefined, // Use undefined instead of null
        primary_goal: user.primary_goal || undefined, // Use undefined instead of null
        spouse_canadian: user.spouse_canadian || false,
        studied_in_canada: user.studied_in_canada || false,
        study_duration: user.study_duration || undefined, // Use undefined instead of null
        test_type: user.test_type || undefined, // Use undefined instead of null
        timeline: user.timeline || undefined, // Use undefined instead of null
        years_experience: user.years_experience || undefined, // Use undefined instead of null
    };
};

export function UserList({ users, onSelect, filters, searchQuery, pagination, onPageChange }: UserListProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'success';
            case 'pending': return 'warning';
            case 'inactive': return 'default';
            default: return 'default';
        }
    };

    if (!users.length) {
        return (
            <div className="text-center py-8 text-gray-500">No users found</div>
        );
    }

    return (
        <div>
            <div className="divide-y divide-gray-100">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => onSelect(user)}
                    >
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                {user.photoUrl ? (
                                    <img
                                        src={user.photoUrl}
                                        alt={user.fullName}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <User className="w-5 h-5 text-gray-400" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-medium text-gray-900 truncate">
                                            {user.fullName || 'No Name'}
                                        </h3>
                                        <p className="text-sm text-gray-500 truncate">
                                            {user.email || 'No Email'}
                                        </p>
                                    </div>
                                    <Badge variant={getStatusColor(user.status || 'default')}>
                                        {user.status || 'Unknown'}
                                    </Badge>
                                </div>
                                {user.immigrationProgram && (
                                    <p className="mt-1 text-sm text-gray-600">
                                        Program: {user.immigrationProgram.name}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {pagination && (
                <div className="flex justify-between items-center mt-4">
                    <button
                        disabled={pagination.currentPage === 1}
                        onClick={() => onPageChange(pagination.currentPage - 1)}
                        className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span>
                        Page {pagination.currentPage} of {Math.ceil(pagination.totalUsers / pagination.pageSize)}
                    </span>
                    <button
                        disabled={pagination.currentPage === Math.ceil(pagination.totalUsers / pagination.pageSize)}
                        onClick={() => onPageChange(pagination.currentPage + 1)}
                        className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
