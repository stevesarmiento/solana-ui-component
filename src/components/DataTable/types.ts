import type {
    ColumnDef,
    RowData,
    Table,
    VisibilityState,
  } from '@tanstack/react-table';

/**
 * Declare an augmentation for the TanStack Table's ColumnMeta interface.
 * This allows you to add custom properties to the `meta` object
 * in your column definitions, which can be useful for things like
 * custom filter components, specific rendering hints, etc.
 */
declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    /**
     * Optional: A user-friendly label for the column, often used in UI elements
     * like column visibility toggles.
     */
    columnLabel?: string;
    // Example: custom filter type for a column
    // filterVariant?: 'text' | 'number' | 'select';
  }
}

// --- Example Data Row Type ---
/**
 * Represents the structure of a single row of data for a Solana transaction.
 * Customize this interface to match the actual transaction data you intend to display.
 */
export interface SolanaTransactionRow {
  /** Unique identifier for the row (e.g., transaction signature). */
  id: string;
  /** The transaction signature. */
  signature: string;
  /** Unix timestamp of when the block was confirmed. Null if not confirmed. */
  blockTime: number | null;
  /** The slot number in which the transaction was processed. */
  slot: number;
  /** Optional: The source or dApp that initiated the transaction. */
  source?: string;
  /** Transaction fee in lamports. */
  fee: number;
  /** Current status of the transaction. */
  status: 'success' | 'failed' | 'confirmed' | 'finalized' | 'processing';
}

// --- DataTable Main Props ---
/**
 * Props for the main DataTable component.
 * @template TData The type of the data for each row in the table. Must include an `id: string` property.
 */
export interface DataTableProps<TData extends { id: string }> {
  /**
   * Array of data objects to display in the table. Each object represents a row.
   * @required
   */
  data: TData[];
  /**
   * Array of column definitions that configure the table's columns.
   * Uses TanStack Table's `ColumnDef` type.
   * @required
   * @see https://tanstack.com/table/v8/docs/api/core/column-def
   */
  columns: ColumnDef<TData, unknown>[];
  /**
   * Optional: Indicates if the table is currently loading data.
   * If true, a loading indicator (customizable via `loadingMessage`) will be displayed.
   * @default false
   */
  isLoading?: boolean;
  /**
   * Optional: Custom message or React node to display when `isLoading` is true.
   * @default "Loading data..."
   */
  loadingMessage?: React.ReactNode;
  /**
   * Optional: Custom message or React node to display when `data` is empty and the table is not loading.
   * @default "No data available."
   */
  emptyStateMessage?: React.ReactNode;

  // --- PAGINATION PROPS ---
  /**
   * Optional: The total number of pages available.
   * Providing this enables manual/server-side pagination. If not provided, client-side pagination is used.
   */
  pageCount?: number;
  /**
   * Optional: The current page index (0-based).
   * Used for controlled pagination state.
   */
  pageIndex?: number;
  /**
   * Optional: The number of rows to display per page.
   * Used for controlled pagination state.
   */
  pageSize?: number;
  /**
   * Optional: Callback function invoked when the page index changes.
   * Used for implementing controlled pagination.
   * @param pageIndex The new page index (0-based).
   */
  onPageIndexChange?: (pageIndex: number) => void;
  /**
   * Optional: Callback function invoked when the page size changes.
   * Used for implementing controlled pagination.
   * @param pageSize The new page size.
   */
  onPageSizeChange?: (pageSize: number) => void;
  /**
   * Optional: Array of page size options for the user to select in the pagination controls.
   * @default [10, 20, 30, 50, 100]
   */
  pageSizeOptions?: number[];

  // --- STYLING & ACCESSIBILITY ---
  /**
   * Optional: Custom CSS class name to apply to the main wrapper div of the DataTable.
   * Useful for applying additional styling or layout adjustments.
   */
  className?: string;
  /**
   * Optional: A unique ID for the table element.
   * Useful for accessibility (e.g., `aria-labelledby`) or for targeting with tests.
   */
  tableId?: string;

  // --- Future props for controlled sorting/filtering could be added here ---
  // sorting?: SortingState;
  // onSortingChange?: OnChangeFn<SortingState>;
  // globalFilter?: string; // For controlled global filter
  // onGlobalFilterChange?: (filterValue: string) => void; // For controlled global filter
}

// --- Props for Sub-components ---

/**
 * Props for the DataTableToolbar component.
 * @template TData The type of the data for each row in the table.
 */
export interface DataTableToolbarProps<TData extends { id: string }> {
    /** The TanStack Table instance, providing access to table state and methods. */
    table: Table<TData>;
    /** The current global filter value, managed by the parent DataTable. */
    globalFilter: string;
    /** Callback function to update the global filter value in the parent DataTable. */
    setGlobalFilter: (value: string) => void;
  }
  
  /**
   * Props for the DataTablePaginationControls component.
   * @template TData The type of the data for each row in the table. Must include an `id: string` property.
   */
  // RENAME 'DataTablePaginationProps' to 'DataTablePaginationControlsProps'
  export interface DataTablePaginationControlsProps<TData extends { id: string }> {
    /** The TanStack Table instance. */
    table: Table<TData>;
    /** Optional: Array of page size options for the user to select.
     * @default [10, 20, 30, 50, 100]
     */
    pageSizeOptions?: number[];
  }
  
  // Re-export types for convenience
  export type { ColumnDef, RowData, Table, VisibilityState };
