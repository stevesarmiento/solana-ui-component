import { type HeaderGroup, flexRender } from "@tanstack/react-table";

export interface DataTableHeaderProps<TData extends { id: string }> {
  /**
   * Array of header groups from TanStack Table
   */
  headerGroups: HeaderGroup<TData>[];
  
  /**
   * Optional custom class name for the header row
   */
  className?: string;
}

/**
 * A composable header component for the data table.
 * Allows for custom styling and behavior of the table headers.
 */
export function DataTableHeader<TData extends { id: string }>({
  headerGroups,
  className = "",
}: DataTableHeaderProps<TData>) {
  return (
    <thead className={`bg-gray-50 ${className}`}>
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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