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
  
  // Add keyboard event listener to the document for Command/Ctrl+K
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if Command/Ctrl+K is pressed
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault(); // Prevent browser default actions
        // Find and focus the search input
        const searchInput = document.querySelector('[data-search-input="true"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }
    };
    
    // Add event listener
    document.addEventListener('keydown', handleKeyDown);
    
    // Clean up
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  return (
    <div className={themeStyles.toolbarSection}>
      <div className="relative max-w-[300px]">
        <input
          type="text"
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(String(e.target.value))}
          className={`${themeStyles.toolbarSearchInput} pl-9`}
          placeholder="Search all columns..."
          aria-label="Search all columns"
          data-search-input="true"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor" 
            className="w-4 h-4 text-gray-400"
          >
            <path 
              fillRule="evenodd" 
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <kbd className="px-1.5 py-0.5 text-xs font-mono font-semibold text-gray-500 bg-gray-100 border border-gray-300 rounded-sm">
            {navigator.platform.indexOf('Mac') !== -1 ? '⌘ K' : 'Ctrl+K'}
          </kbd>
        </div>
      </div>
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

// DataTableToolbar layout container
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
