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
              <div className="flex items-center">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                {{
                  asc: <span className="ml-1 text-gray-700">🔼</span>,
                  desc: <span className="ml-1 text-gray-700">🔽</span>,
                }[header.column.getIsSorted() as string] ?? null}
              </div>
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}