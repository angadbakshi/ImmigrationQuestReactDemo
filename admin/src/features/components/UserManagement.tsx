import { useState, useEffect } from 'react';
import { Search, Download } from 'lucide-react';
import { UserDetails } from './UserDetails';
import { UserList } from './UserList';
import { useToast } from "../../../../immigration-2/src/context/ToastContext";
import { useAuth } from "../../../../auth/src/context";
import { supabase } from "../../../../core/src/services";
import { adminApi } from "../../services/admin.service";
import { Card } from "../../../../core/src/components";
import {AdminProfile} from "../../types/admin.ts";
import { TableProvider } from '../../../src/context/TableContext.tsx';
import TableToolbar from '../../components/table/TableToolbar';
import { useTableConfig } from '../..//hooks/useTableConfig';
import EditableUserTable from "../..//components/table/EditableUserTable.tsx";
import {userService} from "../../services";

export function UserManagement() {
  const [users, setUsers] = useState<AdminProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { showToast } = useToast();
  const {
    sortConfig,
    filterConfig,
    paginationConfig,
    handleSort,
    handleFilter,
    handlePageChange,
    handlePageSizeChange,
    updateTotalRows
  } = useTableConfig();

  useEffect(() => {
    console.log('Fetching users...'); // Debugging log
    fetchUsers();
  }, [sortConfig, filterConfig, paginationConfig.page, paginationConfig.pageSize]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      let query = supabase
          .from('profiles')
          .select('*', { count: 'exact' });

      // Apply search
      if (searchTerm) {
        query = query.or(`full_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`);
      }

      // Apply filters
      filterConfig.forEach(filter => {
        query = query.eq(filter.key, filter.value);
      });

      // Apply sorting
      if (sortConfig) {
        query = query.order(sortConfig.key, {
          ascending: sortConfig.direction === 'asc'
        });
      } else {
        query = query.order('created_at', { ascending: false });
      }

      // Apply pagination
      const from = (paginationConfig.page - 1) * paginationConfig.pageSize;
      const to = from + paginationConfig.pageSize - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;
      if (error) throw error;

      console.log('Fetched users:', data); // Debugging log
      setUsers(data || []);
      if (count !== null) updateTotalRows(count);
    } catch (error) {
      console.error('Error fetching users:', error);
      showToast('Error loading users', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (userId: string, updates: Partial<AdminProfile>) => {
    try {
      await userService.bulkUpdateProfiles([{ id: userId, updates }]);
      // If email is being updated, handle it separately
      if ('email' in updates) {
        await userService.updateUserEmail(userId, updates.email as string);
      }
      await fetchUsers();
      showToast('User updated successfully', 'success');
    } catch (error) {
      console.error('Error updating user:', error);
      showToast('Failed to update user', 'error');
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      const { error } = await supabase
          .from('profiles')
          .delete()
          .eq('id', userId);
      if (error) throw error;
      await fetchUsers();
      showToast('User deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting user:', error);
      showToast('Failed to delete user', 'error');
    }
  };

  const handleBulkDelete = async (userIds: string[]) => {
    try {
      const { error } = await supabase
          .from('profiles')
          .delete()
          .in('id', userIds);
      if (error) throw error;
      await fetchUsers();
      showToast(`Successfully deleted ${userIds.length} users`, 'success');
    } catch (error) {
      console.error('Error bulk deleting users:', error);
      showToast('Failed to delete users', 'error');
    }
  };

  const handleExport = async () => {
    try {
      const data = await userService.exportUserData(
          users.map(user => user.id)
      );
      // Convert to CSV and download
      const csvContent = [
        // Headers
        Object.keys(data[0]).join(','),
        // Data rows
        ...data.map(row => Object.values(row).join(','))
      ].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'users-export.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting users:', error);
      showToast('Failed to export users', 'error');
    }
  };

  const handleImport = async (file: File) => {
    // TODO: Implement CSV import functionality
    showToast('Import functionality coming soon', 'info');
  };

  if (loading && users.length === 0) {
    return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
    );
  }

  return (
      <TableProvider>
        <Card>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">User Management</h2>
            </div>
            <TableToolbar
                onSearch={setSearchTerm}
                onExport={handleExport}
                onImport={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = '.csv';
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) handleImport(file);
                  };
                  input.click();
                }}
                onAdd={() => {/* TODO: Implement add user */}}
                onClearFilters={() => handleFilter('', '')}
                activeFiltersCount={filterConfig.length}
            />
            <EditableUserTable
                users={users}
                onSave={handleSave}
                onDelete={handleDelete}
                onBulkDelete={handleBulkDelete}
                sortConfig={sortConfig}
                filterConfig={filterConfig}
                paginationConfig={paginationConfig}
                onSort={handleSort}
                onFilter={handleFilter}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                loading={loading}
            />
          </div>
        </Card>
      </TableProvider>
  );
}