import { type HeaderGroup, flexRender } from "@tanstack/react-table";
import { type Theme, themes } from './themes';

export interface DataTableHeaderProps<TData extends { id: string }> {
  /**
   * Array of header groups from TanStack Table
   */
  headerGroups: HeaderGroup<TData>[];
  
  /**
   * Optional custom class name for the header row
   */
  className?: string;
  
  /**
   * Optional theme for the header
   */
  theme?: Theme;
}

/**
 * A composable header component for the data table.
 * Allows for custom styling and behavior of the table headers.
 */
export function DataTableHeader<TData extends { id: string }>({
  headerGroups,
  className = "",
  theme = 'default',
}: DataTableHeaderProps<TData>) {
  const themeStyles = themes[theme] || themes.default;

  return (
    <thead className={`${themeStyles.headerWrapper} ${className}`}>
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id} className={themeStyles.headerRow}>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              scope="col"
              className={themeStyles.headerCell}
              style={{
                cursor: header.column.getCanSort() ? "pointer" : "default",
              }}
              onClick={header.column.getToggleSortingHandler()}
              title={
                header.column.getCanSort()
                  ? header.column.getNextSortingOrder() === "asc"
                    ? "Sort ascending"
                    : header.column.getNextSortingOrder() === "desc"
                    ? "Sort descending"
                    : "Clear sort"
                  : undefined
              }
            >
              <div className="flex items-center group">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                
                {/* Sort indicator section */}
                {header.column.getCanSort() && (
                  <div className="ml-2 flex items-center">
                    {header.column.getIsSorted() === "asc" ? (
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="text-gray-700"
                      >
                        <path d="m18 15-6-6-6 6"/>
                      </svg>
                    ) : header.column.getIsSorted() === "desc" ? (
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="text-gray-700"
                      >
                        <path d="m6 9 6 6 6-6"/>
                      </svg>
                    ) : (
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <path d="m7 15 5 5 5-5"/>
                        <path d="m7 9 5-5 5 5"/>
                      </svg>
                    )}
                  </div>
                )}
              </div>
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}