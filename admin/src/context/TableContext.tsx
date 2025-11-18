import React, { createContext, useContext, useState, useCallback } from 'react';
import type { TableColumn } from '../types/table';

interface TableContextValue {
    selectedRows: string[];
    setSelectedRows: (rows: string[]) => void;
    toggleRowSelection: (rowId: string) => void;
    editingCell: { rowId: string; columnKey: string } | null;
    setEditingCell: (cell: { rowId: string; columnKey: string } | null) => void;
    columns: TableColumn[];
    setColumns: (columns: TableColumn[]) => void;
}

const TableContext = createContext<TableContextValue | undefined>(undefined);

export function TableProvider({ children }: { children: React.ReactNode }) {
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [editingCell, setEditingCell] = useState<{ rowId: string; columnKey: string } | null>(null);
    const [columns, setColumns] = useState<TableColumn[]>([]);

    const toggleRowSelection = useCallback((rowId: string) => {
        setSelectedRows(current =>
            current.includes(rowId)
                ? current.filter(id => id !== rowId)
                : [...current, rowId]
        );
    }, []);

    const value = {
        selectedRows,
        setSelectedRows,
        toggleRowSelection,
        editingCell,
        setEditingCell,
        columns,
        setColumns
    };

    return (
        <TableContext.Provider value={value}>
            {children}
        </TableContext.Provider>
    );
}

export function useTable() {
    const context = useContext(TableContext);
    if (!context) {
        throw new Error('useTable must be used within a TableProvider');
    }
    return context;
}