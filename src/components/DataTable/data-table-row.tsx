import { type Row, flexRender } from '@tanstack/react-table';

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
}

/**
 * A composable row component for the data table.
 * Allows for custom styling and behavior on a per-row basis.
 */
export function DataTableRow<TData extends { id: string }>({
  row,
  className = '',
  children,
}: DataTableRowProps<TData>) {
  return (
    <tr
      key={row.id}
      className={`hover:bg-gray-50 transition-colors duration-150 ${className}`}
    >
      {row.getVisibleCells().map((cell) => (
        <td
          key={cell.id}
          className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
      {children}
    </tr>
  );
}