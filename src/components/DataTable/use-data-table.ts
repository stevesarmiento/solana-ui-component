import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type ColumnDef,
  type SortingState,
  type VisibilityState,
  type Table,
  type TableState,
  type PaginationState,
} from '@tanstack/react-table';

// Props for the useDataTable hook
export interface useDataTableProps<TData extends { id: string }> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  pageCount?: number; // For controlled pagination
  initialPageIndex?: number; // For controlled pagination initial state
  initialPageSize?: number; // For controlled pagination initial state
  onPageIndexChange?: (pageIndex: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  initialState?: Partial<TableState>; // For initial sorting, filtering, visibility etc.
  // Add any other options you might want to pass to useReactTable
}

export interface useDataTableReturn<TData extends { id: string }> {
  table: Table<TData>;
  globalFilter: string; // Still returning for DataTableToolbar for now
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
  // sorting and columnVisibility are managed by the table instance itself now.
}

export function useDataTable<TData extends { id: string }>({
  data,
  columns,
  pageCount: controlledPageCount,
  initialPageIndex = 0, // Default initial page index
  initialPageSize = 10, // Default initial page size
  onPageIndexChange,
  onPageSizeChange,
  initialState = {},
}: useDataTableProps<TData>): useDataTableReturn<TData> {
  const [sorting, setSorting] = React.useState<SortingState>(initialState.sorting ?? []);
  const [globalFilter, setGlobalFilter] = React.useState<string>(initialState.globalFilter ?? '');
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(initialState.columnVisibility ?? {});

  // Setup pagination state for useReactTable
  // This combines initial controlled state with the hook's internal management if not controlled
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: initialState.pagination?.pageIndex ?? initialPageIndex,
    pageSize: initialState.pagination?.pageSize ?? initialPageSize,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      columnVisibility,
      pagination, // Use the combined pagination state
      ...initialState, // Spread any other initial states
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: controlledPageCount !== undefined, // Enable manual pagination if pageCount is provided
    ...(controlledPageCount !== undefined && { pageCount: controlledPageCount }),
    onPaginationChange: (updater) => {
      // This updater can be a function or a new state object
      const newPaginationState = typeof updater === 'function' ? updater(pagination) : updater;
      setPagination(newPaginationState); // Update local pagination state

      // Call external handlers if provided (for controlled pagination)
      if (onPageIndexChange && newPaginationState.pageIndex !== pagination.pageIndex) {
        onPageIndexChange(newPaginationState.pageIndex);
      }
      if (onPageSizeChange && newPaginationState.pageSize !== pagination.pageSize) {
        onPageSizeChange(newPaginationState.pageSize);
      }
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    // debugTable: true, // Optional: for debugging
  });

  return {
    table,
    globalFilter,
    setGlobalFilter,
  };
}