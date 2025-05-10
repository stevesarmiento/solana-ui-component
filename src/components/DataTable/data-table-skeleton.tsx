interface DataTableSkeletonProps {
  rowCount?: number;
  columnCount?: number;
  showToolbar?: boolean;
  showPagination?: boolean;
}

export function DataTableSkeleton({
  rowCount = 5,
  columnCount = 4,
  showToolbar = true,
  showPagination = true,
}: DataTableSkeletonProps) {
  const skeletonCell = (
    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
  );
  const skeletonHeaderCell = (
    <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
  )

  return (
    <div className="shadow border-b border-gray-200 sm:rounded-lg animate-pulse">
      {/* Skeleton Toolbar */}
      {showToolbar && (
        <div className="flex items-center justify-between py-4 px-2 sm:px-4 border-b border-gray-200">
          <div className="h-8 bg-gray-300 rounded w-1/3"></div>
          <div className="h-8 bg-gray-300 rounded w-24"></div>
        </div>
      )}

      {/* Skeleton Table */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {Array.from({ length: columnCount }).map((_, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {skeletonHeaderCell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columnCount }).map((_, cellIndex) => (
                <td key={cellIndex} className="px-6 py-4 whitespace-nowrap">
                  {skeletonCell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Skeleton Pagination */}
      {showPagination && (
        <div className="flex items-center justify-between py-3 px-2 border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <div className="h-8 bg-gray-300 rounded w-20"></div>
            <div className="h-8 bg-gray-300 rounded w-20 ml-3"></div>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div className="flex items-center gap-x-2">
              <div className="h-5 bg-gray-300 rounded w-24"></div>
              <div className="h-5 bg-gray-300 rounded w-28"></div>
            </div>
            <div className="flex items-center gap-x-px">
                <div className="h-8 bg-gray-300 rounded-l-md w-10"></div>
                <div className="h-8 bg-gray-300 w-10"></div>
                <div className="h-8 bg-gray-300 w-10"></div>
                <div className="h-8 bg-gray-300 rounded-r-md w-10"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}