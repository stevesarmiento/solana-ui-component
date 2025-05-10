import { DropdownMenu, DropdownMenuItem, DropdownMenuDivider } from './dropdown-menu';
import { type Theme, themes } from './themes';

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
  
  /**
   * Optional theme
   */
  theme?: Theme;
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
  theme = 'default',
}: DataTableRowActionsProps<TData>) {
  const themeStyles = themes[theme] || themes.default;
  
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
      className={themeStyles.rowActionsIcon}
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
      buttonClassName={themeStyles.rowActionsButton}
      theme={theme}
    >
      {onView && (
        <DropdownMenuItem 
          onClick={() => onView(row.original)} 
          disabled={disabled}
          theme={theme}
        >
          View
        </DropdownMenuItem>
      )}
      
      {onEdit && (
        <DropdownMenuItem 
          onClick={() => onEdit(row.original)} 
          disabled={disabled}
          theme={theme}
        >
          Edit
        </DropdownMenuItem>
      )}
      
      {onView && onDelete && <DropdownMenuDivider theme={theme} />}
      
      {onDelete && (
        <DropdownMenuItem 
          onClick={() => onDelete(row.original)} 
          disabled={disabled}
          variant="destructive"
          theme={theme}
        >
          Delete
        </DropdownMenuItem>
      )}
    </DropdownMenu>
  );
}