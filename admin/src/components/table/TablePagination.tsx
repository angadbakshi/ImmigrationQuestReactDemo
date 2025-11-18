import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { PaginationConfig } from '@/types/table';

interface TablePaginationProps {
    config: PaginationConfig;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
}

export default function TablePagination({
                                            config,
                                            onPageChange,
                                            onPageSizeChange
                                        }: TablePaginationProps) {
    const totalPages = Math.ceil(config.total / config.pageSize);
    const pageSizeOptions = [10, 25, 50, 100];

    const getPageNumbers = () => {
        const pages = [];
        const maxPages = 5;
        const halfMax = Math.floor(maxPages / 2);

        let start = Math.max(1, config.page - halfMax);
        let end = Math.min(totalPages, start + maxPages - 1);

        if (end - start + 1 < maxPages) {
            start = Math.max(1, end - maxPages + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    return (
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t">
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">Rows per page:</span>
                <select
                    value={config.pageSize}
                    onChange={(e) => onPageSizeChange(Number(e.target.value))}
                    className="rounded border-gray-300 text-sm"
                >
                    {pageSizeOptions.map(size => (
                        <option key={size} value={size}>{size}</option>
                    ))}
                </select>
                <span className="text-sm text-gray-700">
          Showing {((config.page - 1) * config.pageSize) + 1} to {Math.min(config.page * config.pageSize, config.total)} of {config.total} entries
        </span>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => onPageChange(config.page - 1)}
                    disabled={config.page === 1}
                    className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                {getPageNumbers().map(pageNum => (
                    <button
                        key={pageNum}
                        onClick={() => onPageChange(pageNum)}
                        className={`px-3 py-1 rounded ${
                            pageNum === config.page
                                ? 'bg-blue-600 text-white'
                                : 'hover:bg-gray-100'
                        }`}
                    >
                        {pageNum}
                    </button>
                ))}

                <button
                    onClick={() => onPageChange(config.page + 1)}
                    disabled={config.page === totalPages}
                    className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}