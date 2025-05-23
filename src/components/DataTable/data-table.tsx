import { 
  type ColumnDef, 
  type HeaderGroup, 
  type Row, 
  type RowData, 
  type Table as TanstackTable
} from '@tanstack/react-table';
import { DataTableToolbar, DataTableGlobalFilter, DataTableColumnToggle } from './data-table-toolbar';
import { DataTablePaginationControls } from './data-table-pagination';
import { DataTableSkeleton } from './data-table-skeleton';
import { DataTableHeader } from './data-table-header';
import { DataTableRow } from './data-table-row';
import { useDataTable } from './use-data-table';
import { type Theme, themes } from './themes';
import {
  Table,
  TableBody,
  TableRow,
  TableCell
} from './table';

// Column Meta augmentation
declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    columnLabel?: string; 
    _dataType?: TData;
    _valueType?: TValue;
  }
}

// Example data type
export interface SolanaTransactionRow {
  id: string;
  signature: string;
  blockTime: number | null;
  slot: number;
  source?: string;
  fee: number;
  status: 'success' | 'failed' | 'confirmed' | 'finalized' | 'processing';
}

// Main props interface
export interface DataTableProps<TData extends { id: string }> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  isLoading?: boolean;
  loadingMessage?: React.ReactNode;
  emptyStateMessage?: React.ReactNode;
  pageCount?: number;
  pageIndex?: number;
  pageSize?: number;
  onPageIndexChange?: (pageIndex: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];
  className?: string;
  tableId?: string;
  renderRow?: (props: { row: Row<TData>; table: TanstackTable<TData> }) => React.ReactNode;
  renderHeader?: (props: { headerGroups: HeaderGroup<TData>[] }) => React.ReactNode;
  theme?: Theme;
}

export function DataTable<TData extends { id: string }>({
  data,
  columns,
  isLoading = false,
  emptyStateMessage = 'No data available.',
  className = '',
  tableId,
  pageCount: controlledPageCount,
  pageIndex: initialPageIndex,
  pageSize: initialPageSize,
  onPageIndexChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 30, 50, 100],
  renderRow,
  renderHeader,
  theme = 'default',
}: DataTableProps<TData>) {

  const { table, globalFilter, setGlobalFilter } = useDataTable<TData>({
    data,
    columns,
    pageCount: controlledPageCount,
    initialPageIndex,
    initialPageSize,
    onPageIndexChange,
    onPageSizeChange,
  });

  const themeStyles = themes[theme] || themes.default;

  if (isLoading) {
    return (
      <div className={className}>
        <DataTableSkeleton
          columnCount={columns.length}
          rowCount={table.getState().pagination.pageSize || initialPageSize || pageSizeOptions?.[0] || 10}
          showToolbar
          showPagination
          theme={theme}
        />
      </div>
    );
  }

  return (
    <div className={`${themeStyles.container} ${className}`}>
      <DataTableToolbar theme={theme}>
        <DataTableGlobalFilter
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          theme={theme}
        />
        <DataTableColumnToggle table={table} theme={theme} />
      </DataTableToolbar>

      <Table 
        className={themeStyles.table}
        id={tableId}
      >
        {renderHeader ? (
          renderHeader({ headerGroups: table.getHeaderGroups() })
        ) : (
          <DataTableHeader
            headerGroups={table.getHeaderGroups()}
            theme={theme}
          />
        )}
        
        <TableBody className={themeStyles.bodyWrapper}>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              renderRow ? (
                renderRow({ row, table })
              ) : (
                <DataTableRow
                  key={row.id}
                  row={row}
                  theme={theme}
                />
              )
            ))
          ) : (
            // Empty state row
            <TableRow>
              <TableCell
                colSpan={table.getVisibleLeafColumns().length || columns.length}
                className={`${themeStyles.cell} py-10 text-center`}
                role="status"
                aria-live="polite"
              >
                {emptyStateMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {(table.getPageCount() > 0 || controlledPageCount) && (
         <DataTablePaginationControls 
           table={table} 
           pageSizeOptions={pageSizeOptions} 
           theme={theme}
         />
      )}
    </div>
  );
}
