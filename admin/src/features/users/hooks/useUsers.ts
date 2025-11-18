import { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import type { AdminProfile } from '../../../types/admin';
import { useToast } from '../../../../../immigration-2/src/context/ToastContext';

export function useUsers() {
    const [users, setUsers] = useState<AdminProfile[]>([]);
    const [selectedUser, setSelectedUser] = useState<AdminProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { showToast } = useToast();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await userService.getUsers();
            setUsers(data);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to fetch users';
            setError(message);
            showToast(message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const updateUser = async (userId: string, updates: Partial<AdminProfile>) => {
        try {
            const updated = await userService.updateUser(userId, updates);
            setUsers(users.map(user => user.id === userId ? { ...user, ...updated } : user));
            showToast('User updated successfully', 'success');
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to update user';
            setError(message);
            showToast(message, 'error');
            throw err;
        }
    };

    const deleteUser = async (userId: string) => {
        try {
            await userService.deleteUser(userId);
            setUsers(users.filter(user => user.id !== userId));
            showToast('User deleted successfully', 'success');
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to delete user';
            setError(message);
            showToast(message, 'error');
            throw err;
        }
    };

    const assignProgram = async (userId: string, programId: string) => {
        try {
            const updated = await userService.assignProgram(userId, programId);
            setUsers(users.map(user => user.id === userId ? { ...user, ...updated } : user));
            showToast('Program assigned successfully', 'success');
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to assign program';
            setError(message);
            showToast(message, 'error');
            throw err;
        }
    };

    return {
        users,
        selectedUser,
        loading,
        error,
        setSelectedUser,
        updateUser,
        deleteUser,
        assignProgram,
        refreshUsers: fetchUsers
    };
}