import { DropdownMenu, DropdownMenuItem, DropdownMenuDivider } from './dropdown-menu';

export interface DataTableRowActionsProps<TData> {
  /**
   * The row data, containing id and the original data object
   */
  row: { id: string; original: TData };
  
  /**
   * Optional callback for the view action
   */
  onView?: (row: TData) => void;
  
  /**
   * Optional callback for the edit action
   */
  onEdit?: (row: TData) => void;
  
  /**
   * Optional callback for the delete action
   */
  onDelete?: (row: TData) => void;
  
  /**
   * Optional flag to disable all actions
   */
  disabled?: boolean;
}

/**
 * A dropdown menu component for row actions in a data table.
 * Provides a clean interface for common actions like view, edit, and delete.
 */
export function DataTableRowActions<TData>({
  row,
  onView,
  onEdit,
  onDelete,
  disabled = false,
}: DataTableRowActionsProps<TData>) {
  const ellipsisIcon = (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="18" 
      height="18" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"  
      strokeLinejoin="round"
      className="text-gray-500" 
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="1"/>
      <circle cx="19" cy="12" r="1"/>
      <circle cx="5" cy="12" r="1"/>
    </svg>
  );

  return (
    <DropdownMenu 
      buttonLabel={ellipsisIcon} 
      showCaret={false} 
      align="left"
      buttonClassName="rounded-md p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
    >
      {onView && (
        <DropdownMenuItem 
          onClick={() => onView(row.original)} 
          disabled={disabled}
        >
          View
        </DropdownMenuItem>
      )}
      
      {onEdit && (
        <DropdownMenuItem 
          onClick={() => onEdit(row.original)} 
          disabled={disabled}
        >
          Edit
        </DropdownMenuItem>
      )}
      
      {onView && onDelete && <DropdownMenuDivider />}
      
      {onDelete && (
        <DropdownMenuItem 
          onClick={() => onDelete(row.original)} 
          disabled={disabled}
          variant="destructive"
        >
          Delete
        </DropdownMenuItem>
      )}
    </DropdownMenu>
  );
}