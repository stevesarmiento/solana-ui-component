import React from 'react'; // Make sure React is imported
// import { type Table } from '@tanstack/react-table'; // Import Table type
import { type DataTableToolbarProps } from './types';

// A simple DropdownMenu component (can be extracted and improved)
// If you prefer, you can move this to a separate file like `DropdownMenu.tsx`
// and import it here. For now, it's co-located for simplicity.
function DropdownMenu({
  buttonLabel,
  children,
}: {
  buttonLabel: React.ReactNode;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuRef]);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          id="options-menu-button" // Added a more specific ID
          aria-haspopup="true"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          {buttonLabel}
          {/* Chevron down icon */}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 focus:outline-none" // Added focus:outline-none
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu-button" // Referenced the button ID
        >
          <div className="py-1" role="none">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}


export function DataTableToolbar<TData extends { id: string }>({
  table, // Now we use this!
  globalFilter,
  setGlobalFilter,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between py-4 px-2 sm:px-4 border-b border-gray-200">
      {/* Global Filter Input */}
      <div className="flex-1">
        <input
          type="text"
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(String(e.target.value))}
          className="block w-full sm:w-2/3 md:w-1/2 lg:w-1/3 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Search all columns..."
          aria-label="Search all columns"
        />
      </div>

      {/* Column Visibility Toggle */}
      <div className="ml-4">
        <DropdownMenu buttonLabel="Columns">
          <div className="px-1 py-1 text-xs text-gray-500">Toggle columns</div> {/* Optional header for dropdown */}
          {table
            .getAllLeafColumns()
            .filter(
              (column) =>
                // Allow hiding if explicitly enabled or not explicitly disabled
                // and if column.id is not a special internal ID like 'select' if you add row selection
                typeof column.getCanHide === 'function' ? column.getCanHide() : true
            )
            .map((column) => {
              // Try to get a display name from meta, then header, then id
              const columnDisplayName =
                column.columnDef.meta?.columnLabel || // Use columnLabel from meta if defined
                (typeof column.columnDef.header === 'string'
                  ? column.columnDef.header
                  : column.id);

              return (
                <label
                  key={column.id}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer capitalize" // Added capitalize
                  role="menuitemcheckbox"
                  aria-checked={column.getIsVisible()}
                  // onClick={(e) => e.preventDefault()} // Prevent dropdown from closing on label click if needed, but checkbox handles it
                >
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mr-3" // Increased margin
                    checked={column.getIsVisible()}
                    onChange={column.getToggleVisibilityHandler()}
                    aria-labelledby={`column-toggle-label-${column.id}`}
                  />
                  <span id={`column-toggle-label-${column.id}`}>{columnDisplayName}</span>
                </label>
              );
            })}
        </DropdownMenu>
      </div>
    </div>
  );
}

export default DataTableToolbar;
