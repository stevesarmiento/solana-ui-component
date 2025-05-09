import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table';

import { type DataTableProps } from './types';
import { DataTableToolbar } from './data-table-toolbar';
import { DataTablePaginationControls } from './data-table-pagination';

// --- Main DataTable Component ---
export function DataTable<TData extends { id: string }>({
  data,
  columns,
  isLoading = false,
  loadingMessage = 'Loading data...',
  emptyStateMessage = 'No data available.',
  className = '',
  tableId,
  pageCount: controlledPageCount,
  pageIndex: controlledPageIndex,
  pageSize: controlledPageSize,
  onPageIndexChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 30, 50, 100],
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      columnVisibility,
      ...(controlledPageIndex !== undefined && controlledPageSize !== undefined && {
        pagination: {
          pageIndex: controlledPageIndex,
          pageSize: controlledPageSize,
        },
      }),
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    ...(controlledPageCount !== undefined && { pageCount: controlledPageCount }),
    manualPagination: !!controlledPageCount,
    onPaginationChange: (updater) => {
        if (typeof updater === 'function') {
            const newPaginationState = updater(table.getState().pagination);
            onPageIndexChange?.(newPaginationState.pageIndex);
            onPageSizeChange?.(newPaginationState.pageSize);
        } else {
            onPageIndexChange?.(updater.pageIndex);
            onPageSizeChange?.(updater.pageSize);
        }
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
  });

  if (isLoading) {
    return (
      <div
        role="status"
        aria-live="polite"
        aria-busy="true"
        className={`p-6 text-center text-gray-500 ${className}`}
      >
        {loadingMessage}
      </div>
    );
  }

  if (!table.getRowModel().rows.length && !isLoading) {
    return (
      <div
        role="status"
        aria-live="polite"
        className={`p-6 text-center text-gray-500 ${className}`}
      >
        {emptyStateMessage}
      </div>
    );
  }

  return (
    <div className={`shadow border-b border-gray-200 sm:rounded-lg ${className}`}>
      <DataTableToolbar
        table={table}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />

      <table
        id={tableId}
        className="min-w-full divide-y divide-gray-200"
        aria-label={tableId || 'Data table'}
      >
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{
                    cursor: header.column.getCanSort() ? 'pointer' : 'default',
                  }}
                  onClick={header.column.getToggleSortingHandler()}
                  title={
                    header.column.getCanSort()
                      ? header.column.getNextSortingOrder() === 'asc'
                        ? 'Sort ascending'
                        : header.column.getNextSortingOrder() === 'desc'
                        ? 'Sort descending'
                        : 'Clear sort'
                      : undefined
                  }
                >
                  <div className="flex items-center">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {{
                      asc: <span className="ml-1 text-gray-700">🔼</span>,
                      desc: <span className="ml-1 text-gray-700">🔽</span>,
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {(table.getPageCount() > 1 || controlledPageCount) && (
         <DataTablePaginationControls table={table} pageSizeOptions={pageSizeOptions} />
      )}
    </div>
  );
}
