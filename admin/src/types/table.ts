// Path: ./admin/src/types/table.ts

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
    key: string;
    direction: SortDirection;
}

export interface FilterConfig {
    key: string;
    value: string | number | boolean;
}

export interface PaginationConfig {
    page: number;
    pageSize: number;
    total: number;
}

export interface TableColumn {
    key: string;
    label: string;
    type: 'text' | 'email' | 'select' | 'date' | 'boolean';
    editable?: boolean;
    sortable?: boolean;
    filterable?: boolean;
    options?: { value: string; label: string }[];
    width?: string;
    render?: (value: any, row: any) => React.ReactNode;
}

export interface TableConfig {
    columns: TableColumn[];
    sortConfig: SortConfig;
    filterConfig: FilterConfig[];
    paginationConfig: PaginationConfig;
}