import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, Filter } from 'lucide-react';
import type { TableColumn, SortConfig } from '@/types/table';

interface TableHeaderProps {
    column: TableColumn;
    sortConfig: SortConfig | null;
    onSort: (key: string) => void;
    onFilter: (key: string, value: string) => void;
}

export default function TableHeader({ column, sortConfig, onSort, onFilter }: TableHeaderProps) {
    const [showFilter, setShowFilter] = React.useState(false);

    const getSortIcon = () => {
        if (!sortConfig || sortConfig.key !== column.key) {
            return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
        }
        return sortConfig.direction === 'asc' ?
            <ArrowUp className="w-4 h-4 text-blue-600" /> :
            <ArrowDown className="w-4 h-4 text-blue-600" />;
    };

    return (
        <th className="px-6 py-3 bg-gray-50">
            <div className="flex items-center gap-2">
                <button
                    className={`flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider ${
                        column.sortable ? 'cursor-pointer hover:text-gray-900' : 'cursor-default'
                    }`}
                    onClick={() => column.sortable && onSort(column.key)}
                >
                    {column.label}
                    {column.sortable && getSortIcon()}
                </button>

                {column.filterable && (
                    <div className="relative">
                        <button
                            onClick={() => setShowFilter(!showFilter)}
                            className="p-1 hover:bg-gray-100 rounded"
                        >
                            <Filter className="w-4 h-4 text-gray-400" />
                        </button>

                        {showFilter && (
                            <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10">
                                <div className="p-2">
                                    {column.type === 'select' && column.options ? (
                                        <select
                                            className="w-full rounded border-gray-300"
                                            onChange={(e) => {
                                                onFilter(column.key, e.target.value);
                                                setShowFilter(false);
                                            }}
                                        >
                                            <option value="">All</option>
                                            {column.options.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type="text"
                                            placeholder="Filter..."
                                            className="w-full rounded border-gray-300"
                                            onChange={(e) => onFilter(column.key, e.target.value)}
                                        />
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </th>
    );
}