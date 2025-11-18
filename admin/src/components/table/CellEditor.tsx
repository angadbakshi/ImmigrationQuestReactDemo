import React from 'react';
import type { TableColumn } from '../../types/table';

interface CellEditorProps {
    column: TableColumn;
    value: any;
    onChange: (value: any) => void;
    onBlur?: () => void;
    autoFocus?: boolean;
}

export default function CellEditor({
                                       column,
                                       value,
                                       onChange,
                                       onBlur,
                                       autoFocus = false
                                   }: CellEditorProps) {
    switch (column.type) {
        case 'select':
            return (
                <select
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={onBlur}
                    autoFocus={autoFocus}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                    <option value="">Select...</option>
                    {column.options?.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            );

        case 'boolean':
            return (
                <input
                    type="checkbox"
                    checked={value || false}
                    onChange={(e) => onChange(e.target.checked)}
                    onBlur={onBlur}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
            );

        case 'date':
            return (
                <input
                    type="date"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={onBlur}
                    autoFocus={autoFocus}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            );

        case 'email':
            return (
                <input
                    type="email"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={onBlur}
                    autoFocus={autoFocus}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            );

        default:
            return (
                <input
                    type="text"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={onBlur}
                    autoFocus={autoFocus}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            );
    }
}