// Path: ./admin/src/hooks/useTableConfig.ts
import { useState, useCallback } from 'react';
import type { TableConfig, SortConfig, FilterConfig, PaginationConfig } from '../types/table';

export function useTableConfig(initialConfig?: Partial<TableConfig>) {
    const [sortConfig, setSortConfig] = useState<SortConfig | null>(initialConfig?.sortConfig || null);
    const [filterConfig, setFilterConfig] = useState<FilterConfig[]>(initialConfig?.filterConfig || []);
    const [paginationConfig, setPaginationConfig] = useState<PaginationConfig>({
        page: 1,
        pageSize: 10,
        total: 0,
        ...initialConfig?.paginationConfig
    });

    const handleSort = useCallback((key: string) => {
        setSortConfig(current => {
            if (current?.key === key) {
                return {
                    key,
                    direction: current.direction === 'asc' ? 'desc' : 'asc'
                };
            }
            return { key, direction: 'asc' };
        });
    }, []);

    const handleFilter = useCallback((key: string, value: string) => {
        setFilterConfig(current => {
            const newFilters = current.filter(f => f.key !== key);
            if (value) {
                newFilters.push({ key, value });
            }
            return newFilters;
        });
        setPaginationConfig(prev => ({ ...prev, page: 1 }));
    }, []);

    const handlePageChange = useCallback((page: number) => {
        setPaginationConfig(prev => ({ ...prev, page }));
    }, []);

    const handlePageSizeChange = useCallback((pageSize: number) => {
        setPaginationConfig(prev => ({ ...prev, pageSize, page: 1 }));
    }, []);

    const updateTotalRows = useCallback((total: number) => {
        setPaginationConfig(prev => ({ ...prev, total }));
    }, []);

    return {
        sortConfig,
        filterConfig,
        paginationConfig,
        handleSort,
        handleFilter,
        handlePageChange,
        handlePageSizeChange,
        updateTotalRows
    };
}