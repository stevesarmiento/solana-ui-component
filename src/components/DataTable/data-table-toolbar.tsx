import React from 'react';
import { type Table } from '@tanstack/react-table';
import { 
  DropdownMenu, 
  DropdownMenuCheckboxItem,
  DropdownMenuLabel 
} from './dropdown-menu';

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
}

export function DataTableGlobalFilter({
  globalFilter, 
  setGlobalFilter,
}: DataTableGlobalFilterProps) {
  return (
    <div className="flex-grow">
      <input
        type="text"
        value={globalFilter ?? ''}
        onChange={(e) => setGlobalFilter(String(e.target.value))}
        className="block w-full sm:w-auto md:min-w-[250px] lg:min-w-[300px] p-2 border border-gray-300 rounded-md shadow-sm focus:ring-4 focus:ring-indigo-50 focus:border-gray-300 sm:text-sm transition-all duration-150 ease-in-out"
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
}

export function DataTableColumnToggle<TData extends { id: string }>({
  table,
}: DataTableColumnToggleProps<TData>) {
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
    <div className="ml-auto flex-shrink-0">
      <DropdownMenu buttonLabel={columnFilterIcon} showCaret={false}>
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        
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
}

// Main DataTableToolbar becomes just a layout container
export function DataTableToolbar({
  children,
}: DataTableToolbarProps) {
  return (
    <div className="flex items-center justify-between p-2 border-b border-gray-200 gap-x-4">
      {children}
    </div>
  );
}
