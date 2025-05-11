import { type Row, flexRender } from '@tanstack/react-table';
import { type Theme, themes } from './themes';
import { TableRow, TableCell } from './table';

export interface DataTableRowProps<TData extends { id: string }> {
  /**
   * The table row from TanStack Table
   */
  row: Row<TData>;
  
  /**
   * Optional custom class name for the row
   */
  className?: string;
  
  /**
   * Optional additional content to render at the end of the row
   */
  children?: React.ReactNode;
  
  /**
   * Optional theme for the row
   */
  theme?: Theme;
}

/**
 * A composable row component for the data table.
 * Allows for custom styling and behavior on a per-row basis.
 */
export function DataTableRow<TData extends { id: string }>({
  row,
  className = '',
  children,
  theme = 'default',
}: DataTableRowProps<TData>) {
  const themeStyles = themes[theme] || themes.default;
  
  return (
    <TableRow
      key={row.id}
      className={`${themeStyles.row} ${className}`}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell
          key={cell.id}
          className={themeStyles.cell}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
      {children}
    </TableRow>
  );
}