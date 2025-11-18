import React, { useState } from 'react';
import { Badge, Card, Tabs } from '@core/components';
import { DocumentList } from '@core/features/documents';
import { TaskList } from '@core/features/tasks';
import { AdminProfile, UserStatus, BadgeVariant } from '../../types/admin';
import { ProgramSelector } from './ProgramSelector';
import { NotificationForm } from './NotificationForm';

interface UserDetailsProps {
    user: AdminProfile;
    onUpdate: (userId: string, updates: Partial<AdminProfile>) => Promise<void>;
    onAssignProgram: (userId: string, programId: string) => Promise<void>;
    onSendNotification: (userId: string, message: string) => Promise<void>;
}

interface EditForm {
    full_name: string;
    email: string;
    phone: string;
    status: UserStatus;
}

export function UserDetails({
                                user,
                                onUpdate,
                                onAssignProgram,
                                onSendNotification
                            }: UserDetailsProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState<EditForm>({
        full_name: user.fullName || '',
        email: user.email || '',
        phone: user.phone || '',
        status: user.status
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            // Map the form fields to the correct database column names
            const updates = {
                full_name: editForm.full_name,
                phone: editForm.phone,
                status: editForm.status,
                // Map any other fields that need to be updated
            };

            await onUpdate(user.id, updates);
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update user:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getStatusBadgeVariant = (status: UserStatus) => {
        switch (status) {
            case 'active':
                return 'success';
            case 'pending':
                return 'warning';
            case 'inactive':
                return 'default';
            default:
                return 'default';
        }
    };

    return (
        <div className="p-6">
            <Card className="mb-6">
                {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                value={editForm.full_name}
                                onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={editForm.email}
                                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                type="tel"
                                value={editForm.phone}
                                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Status</label>
                            <select
                                value={editForm.status}
                                onChange={(e) => setEditForm({ ...editForm, status: e.target.value as UserStatus })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="active">Active</option>
                                <option value="pending">Pending</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">{user.fullName}</h2>
                                <p className="text-gray-600">{user.email}</p>
                                {user.phone && <p className="text-gray-600">{user.phone}</p>}
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge variant={getStatusBadgeVariant(user.status)}>
                                    {user.status}
                                </Badge>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <p className="text-sm text-gray-500">Member Since</p>
                                <p className="font-medium">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Last Active</p>
                                <p className="font-medium">
                                    {user.lastActive ? new Date(user.lastActive).toLocaleDateString() : 'Never'}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Current Program</p>
                                <p className="font-medium">
                                    {user.immigrationProgram?.name || 'Not assigned'}
                                </p>
                            </div>
                            {typeof user.progress === 'number' && (
                                <div>
                                    <p className="text-sm text-gray-500">Progress</p>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                        <div
                                            className="bg-blue-600 h-2.5 rounded-full"
                                            style={{ width: `${user.progress}%` }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Card>

            <Tabs
                tabs={[
                    {
                        id: 'program',
                        label: 'Program',
                        content: (
                            <ProgramSelector
                                currentProgram={user.immigrationProgram}
                                onAssign={(programId) => onAssignProgram(user.id, programId)}
                            />
                        )
                    },
                    {
                        id: 'documents',
                        label: 'Documents',
                        content: (
                            <DocumentList
                                documents={user.documents || []}
                                onSelect={() => {}}
                            />
                        )
                    },
                    {
                        id: 'tasks',
                        label: 'Tasks',
                        content: (
                            <TaskList
                                tasks={user.tasks || []}
                                onSelect={() => {}}
                            />
                        )
                    },
                    {
                        id: 'notification',
                        label: 'Send Notification',
                        content: (
                            <NotificationForm
                                onSubmit={(message) => onSendNotification(user.id, message)}
                            />
                        )
                    }
                ]}
            />
        </div>
    );
}