// Path: ./admin/src/components/table/TableToolbar.tsx
import React from 'react';
import { Search, Download, Upload, Plus, Filter } from 'lucide-react';

interface TableToolbarProps {
    onSearch: (term: string) => void;
    onExport: () => void;
    onImport?: () => void;
    onAdd?: () => void;
    onClearFilters?: () => void;
    activeFiltersCount?: number;
}

export default function TableToolbar({
                                         onSearch,
                                         onExport,
                                         onImport,
                                         onAdd,
                                         onClearFilters,
                                         activeFiltersCount = 0
                                     }: TableToolbarProps) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div className="flex items-center gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        onChange={(e) => onSearch(e.target.value)}
                        className="pl-10 pr-4 py-2 w-64 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {activeFiltersCount > 0 && (
                    <button
                        onClick={onClearFilters}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
                    >
                        <Filter className="w-4 h-4" />
                        {activeFiltersCount} {activeFiltersCount === 1 ? 'filter' : 'filters'} active
                    </button>
                )}
            </div>

            <div className="flex items-center gap-2">
                {onImport && (
                    <button
                        onClick={onImport}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border rounded-lg hover:bg-gray-50"
                    >
                        <Upload className="w-4 h-4" />
                        Import
                    </button>
                )}

                <button
                    onClick={onExport}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border rounded-lg hover:bg-gray-50"
                >
                    <Download className="w-4 h-4" />
                    Export
                </button>

                {onAdd && (
                    <button
                        onClick={onAdd}
                        className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                        <Plus className="w-4 h-4" />
                        Add User
                    </button>
                )}
            </div>
        </div>
    );
}