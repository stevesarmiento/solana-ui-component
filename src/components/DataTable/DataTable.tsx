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

import { type DataTableProps, type DataTablePaginationControlsProps } from './types';
import { DataTableToolbar } from './DataTableToolbar';

// --- DataTablePaginationControls (remains the same, props imported) ---
function DataTablePaginationControls<TData extends { id: string }>({
  table,
  pageSizeOptions = [10, 20, 30, 50, 100],
}: DataTablePaginationControlsProps<TData>) {
  // ... (pagination controls code - no changes here)
  return (
    <div className="flex items-center justify-between py-3 px-2 border-t border-gray-200">
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center gap-x-2">
          <span className="text-sm text-gray-700">
            Page{' '}
            <span className="font-medium">
              {table.getState().pagination.pageIndex + 1}
            </span>{' '}
            of <span className="font-medium">{table.getPageCount()}</span>
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
          <span className="text-sm text-gray-700">
            | Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="ml-1 w-16 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm p-1"
            />
          </span>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">First</span>
              {'<<'}
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Previous</span>
              {'<'}
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Next</span>
              {'>'}
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Last</span>
              {'>>'}
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}


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
  const [columnVisibility, setColumnVisibility] = // <--- ADDED STATE for column visibility
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      columnVisibility, // <--- ADDED columnVisibility to table state
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
    onColumnVisibilityChange: setColumnVisibility, // <--- ADDED handler for column visibility
    // debugTable: true, // Uncomment for debugging table state
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
        table={table} // Pass the full table instance
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

export default DataTable;
