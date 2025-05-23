import { type Table } from '@tanstack/react-table';
import { type Theme, themes } from './themes';

export interface DataTablePaginationControlsProps<TData extends { id: string }> {
  /**
   * The table instance
   */
  table: Table<TData>;
  
  /**
   * Available page size options
   */
  pageSizeOptions?: number[];
  
  /**
   * Optional theme
   */
  theme?: Theme;
}

export function DataTablePaginationControls<TData extends { id: string }>({
  table,
  pageSizeOptions = [10, 20, 30, 50, 100],
  theme = 'default',
}: DataTablePaginationControlsProps<TData>) {
  const themeStyles = themes[theme] || themes.default;

  return (
    <div className={themeStyles.pagination}>
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className={themeStyles.paginationButton}
        >
          Previous
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className={themeStyles.paginationButton}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center gap-x-2">
          <span className={themeStyles.paginationText}>
            Page{' '}
            <span className="font-medium">
              {table.getState().pagination.pageIndex + 1}
            </span>{' '}
            of <span className="font-medium">{table.getPageCount()}</span>
          </span>
          <div className="relative">
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className={themeStyles.paginationSelect}
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  Show {size}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-x-2">
         <span className={themeStyles.paginationText}>
            Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className={themeStyles.paginationInput}
            />
          </span>
          <div className="w-[1px] h-4 bg-gray-300"></div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className={`${themeStyles.paginationIconButton} rounded-l-md`}
            >
              <span className="sr-only">First</span>
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
              >
                <path d="m11 17-5-5 5-5"/>
                <path d="m18 17-5-5 5-5"/>
              </svg>
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className={themeStyles.paginationIconButton}
            >
              <span className="sr-only">Previous</span>
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
              >
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className={themeStyles.paginationIconButton}
            >
              <span className="sr-only">Next</span>
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
              >
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className={`${themeStyles.paginationIconButton} rounded-r-md`}
            >
              <span className="sr-only">Last</span>
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
              >
                <path d="m6 17 5-5-5-5"/>
                <path d="m13 17 5-5-5-5"/>
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}