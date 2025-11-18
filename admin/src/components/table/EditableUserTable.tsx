import React, { useState, useEffect, useMemo } from 'react';
import { Save, X, Edit2, Trash2, Search, Download } from 'lucide-react';
import { useToast } from '../../../../immigration-2/src/context/ToastContext';
import TableToolbar from '../table/TableToolbar.tsx';
import { useTableConfig } from '../../hooks/useTableConfig.ts';
import { useTable } from '../../../src/context/TableContext.tsx';
import { AdminProfile } from '../../../src/types/admin.ts';
import CellEditor from './CellEditor.tsx';
import TableHeader from './TableHeader.tsx';
import {FilterConfig, PaginationConfig, SortConfig, TableColumn} from '@/types/table.ts';
import {userService} from "../../services/users/users.service.ts";

interface EditableUserTableProps {
    users: AdminProfile[];
    onSave: (userId: string, updates: Partial<AdminProfile>) => Promise<void>;
    onDelete: (userId: string) => Promise<void>;
    onBulkDelete?: (userIds: string[]) => Promise<void>;
    sortConfig?: SortConfig | null;
    filterConfig?: FilterConfig[];
    paginationConfig?: PaginationConfig;
    onSort?: (key: string) => void;
    onFilter?: (key: string, value: string) => void;
    onPageChange?: (page: number) => void;
    onPageSizeChange?: (pageSize: number) => void;
    loading?: boolean;
}

export default function EditableUserTable({
                                              users,
                                              onSave,
                                              onDelete,
                                              onBulkDelete,
                                              sortConfig = null, // Default to null
                                              filterConfig = [],
                                              paginationConfig,
                                              onSort,
                                              onFilter,
                                              onPageChange,
                                              onPageSizeChange,
                                              loading,
                                          }: EditableUserTableProps) {
    const [editMode, setEditMode] = useState<Record<string, boolean>>({});
    const [editedData, setEditedData] = useState<Record<string, Partial<AdminProfile>>>({});
    const [searchTerm, setSearchTerm] = useState('');
    const { showToast } = useToast();
    const { selectedRows, toggleRowSelection, setSelectedRows } = useTable();
    const [editableFields, setEditableFields] = useState<TableColumn[]>([
        { key: 'full_name', label: 'Full Name', type: 'text', editable: true },
        { key: 'email', label: 'Email', type: 'text', editable: true },
        { key: 'role', label: 'Role', type: 'text', editable: true },
        { key: 'status', label: 'Status', type: 'text', editable: true },
    ]);

    const {
        sortConfig: tableSortConfig,
        filterConfig: tableFilterConfig,
        paginationConfig: tablePaginationConfig,
        handleSort,
        handleFilter,
        handlePageChange,
        handlePageSizeChange,
        updateTotalRows,
    } = useTableConfig();

    // Processed users with search, filters, and sorting applied
    const processedUsers = useMemo(() => {
        let result = [...users];

        // Apply search filter
        if (searchTerm) {
            result = result.filter(
                (user) =>
                    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply column filters
        tableFilterConfig.forEach((filter) => {
            result = result.filter((user) =>
                String(user[filter.key]).toLowerCase().includes(String(filter.value).toLowerCase())
            );
        });

        // Apply sorting
        if (tableSortConfig) {
            result.sort((a, b) => {
                const aValue = a[tableSortConfig.key];
                const bValue = b[tableSortConfig.key];
                if (aValue < bValue) return tableSortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return tableSortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        updateTotalRows(result.length);

        // Apply pagination
        const start = (tablePaginationConfig.page - 1) * tablePaginationConfig.pageSize;
        const end = start + tablePaginationConfig.pageSize;
        return result.slice(start, end);
    }, [users, searchTerm, tableSortConfig, tableFilterConfig, tablePaginationConfig.page, tablePaginationConfig.pageSize]);

    // Handle edit mode for a user
    const handleEdit = (userId: string) => {
        setEditMode((prev) => ({ ...prev, [userId]: true }));
        setEditedData((prev) => ({ ...prev, [userId]: { ...users.find((u) => u.id === userId) } }));
    };

    // Handle cancel edit mode for a user
    const handleCancel = (userId: string) => {
        setEditMode((prev) => ({ ...prev, [userId]: false }));
        setEditedData((prev) => {
            const newData = { ...prev };
            delete newData[userId];
            return newData;
        });
    };

    // Handle saving changes for a user
    const handleSave = async (userId: string) => {
        try {
            const updatedUser = editedData[userId];
            if (!updatedUser) return;

            await onSave(userId, updatedUser);

            // Handle email update separately if needed
            const originalUser = users.find((u) => u.id === userId);
            if (originalUser?.email !== updatedUser.email && updatedUser.email) {
                await userService.updateUserEmail(userId, updatedUser.email);
            }

            setEditMode((prev) => ({ ...prev, [userId]: false }));
            setEditedData((prev) => {
                const newData = { ...prev };
                delete newData[userId];
                return newData;
            });
            showToast('Changes saved successfully', 'success');
        } catch (error) {
            console.error('Error saving changes:', error);
            showToast('Failed to save changes', 'error');
        }
    };

    // Handle exporting users to CSV
    const handleExport = () => {
        const csvContent = [
            editableFields.map((field) => field.label).join(','),
            ...processedUsers.map((user) =>
                editableFields.map((field) => `"${user[field.key] || ''}"`).join(',')
            ),
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'users-export.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    console.log('Users in EditableUserTable:', users); // Debugging log
    console.log('Editable Fields:', editableFields); // Debugging log

    return (
        <div className="space-y-4">
            <TableToolbar
                onSearch={setSearchTerm}
                onExport={handleExport}
                onClearFilters={() => handleFilter('', '')}
                activeFiltersCount={filterConfig?.length || 0}
            />

            <div className="overflow-x-auto rounded-lg border">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="w-8 px-6 py-3">
                            <input
                                type="checkbox"
                                checked={selectedRows.length === processedUsers.length}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedRows(processedUsers.map((u) => u.id));
                                    } else {
                                        setSelectedRows([]);
                                    }
                                }}
                                className="rounded border-gray-300"
                            />
                        </th>
                        {editableFields.map((field) => (
                            <TableHeader
                                key={field.key}
                                column={field}
                                sortConfig={sortConfig || null} // Ensure sortConfig is either SortConfig or null
                                onSort={handleSort}
                                onFilter={handleFilter}
                            />
                        ))}
                        <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {processedUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="w-8 px-6 py-4">
                                <input
                                    type="checkbox"
                                    checked={selectedRows.includes(user.id)}
                                    onChange={() => toggleRowSelection(user.id)}
                                    className="rounded border-gray-300"
                                />
                            </td>
                            {editableFields.map((field) => (
                                <td key={field.key} className="px-6 py-4 whitespace-nowrap">
                                    {editMode[user.id] && field.editable ? (
                                        <CellEditor
                                            column={field}
                                            value={editedData[user.id]?.[field.key]}
                                            onChange={(value) =>
                                                setEditedData((prev) => ({
                                                    ...prev,
                                                    [user.id]: { ...prev[user.id], [field.key]: value },
                                                }))
                                            }
                                        />
                                    ) : (
                                        <span className="text-sm text-gray-900">
                        {field.type === 'date'
                            ? new Date(user[field.key]).toLocaleDateString()
                            : user[field.key]}
                      </span>
                                    )}
                                </td>
                            ))}
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                {editMode[user.id] ? (
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => handleSave(user.id)}
                                            className="text-green-600 hover:text-green-900"
                                        >
                                            <Save className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleCancel(user.id)}
                                            className="text-gray-600 hover:text-gray-900"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => handleEdit(user.id)}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(user.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}