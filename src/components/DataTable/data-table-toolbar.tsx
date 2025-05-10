import React from 'react';
import { type Table } from '@tanstack/react-table';
import { 
  DropdownMenu, 
  DropdownMenuCheckboxItem,
  DropdownMenuLabel 
} from './dropdown-menu';
import { type Theme, themes } from './themes';

// Create exportable components for the default toolbar items
// These can be used directly as children or combined with custom elements

export interface DataTableGlobalFilterProps {
  /**
   * Current global filter value
   */
  globalFilter: string;
  
  /**
   * Callback to set global filter value
   */
  setGlobalFilter: (value: string) => void;
  
  /**
   * Optional theme
   */
  theme?: Theme;
}

export function DataTableGlobalFilter({
  globalFilter, 
  setGlobalFilter,
  theme = 'default',
}: DataTableGlobalFilterProps) {
  const themeStyles = themes[theme] || themes.default;
  
  return (
    <div className={themeStyles.toolbarSection}>
      <input
        type="text"
        value={globalFilter ?? ''}
        onChange={(e) => setGlobalFilter(String(e.target.value))}
        className={themeStyles.toolbarSearchInput}
        placeholder="Search all columns..."
        aria-label="Search all columns"
      />
    </div>
  );
}

export interface DataTableColumnToggleProps<TData extends { id: string }> {
  /**
   * The table instance
   */
  table: Table<TData>;
  
  /**
   * Optional theme
   */
  theme?: Theme;
}

export function DataTableColumnToggle<TData extends { id: string }>({
  table,
  theme = 'default',
}: DataTableColumnToggleProps<TData>) {
  const themeStyles = themes[theme] || themes.default;
  
  // Define the SVG icon for the dropdown button
  const columnFilterIcon = (
    <span className="flex items-center">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className=""
        aria-hidden="true"
      >
        <path d="M3 6h18"/>
        <path d="M7 12h10"/>
        <path d="M10 18h4"/>
      </svg>
      <span className="ml-2 sr-only">Columns</span>
    </span>
  );

  return (
    <div className={themeStyles.toolbarDropdown}>
      <DropdownMenu buttonLabel={columnFilterIcon} showCaret={false} theme={theme}>
        <DropdownMenuLabel theme={theme}>Toggle columns</DropdownMenuLabel>
        
        {table
          .getAllLeafColumns()
          .filter(
            (column) =>
              typeof column.getCanHide === 'function' ? column.getCanHide() : true
          )
          .map((column) => {
            const columnDisplayName =
              column.columnDef.meta?.columnLabel ||
              (typeof column.columnDef.header === 'string'
                ? column.columnDef.header
                : column.id);

            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={column.getIsVisible()}
                onChange={(checked) => {
                  column.toggleVisibility(!!checked);
                }}
                id={`column-toggle-${column.id}`}
                theme={theme}
              >
                {columnDisplayName}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenu>
    </div>
  );
}

export interface DataTableToolbarProps {
  /**
   * Content to render inside the toolbar
   */
  children: React.ReactNode;
  
  /**
   * Optional theme
   */
  theme?: Theme;
}

// Main DataTableToolbar becomes just a layout container
export function DataTableToolbar({
  children,
  theme = 'default',
}: DataTableToolbarProps) {
  const themeStyles = themes[theme] || themes.default;
  
  return (
    <div className={themeStyles.toolbar}>
      {children}
    </div>
  );
}
