import { type Theme, themes } from './themes';

interface DataTableSkeletonProps {
  rowCount?: number;
  columnCount?: number;
  showToolbar?: boolean;
  showPagination?: boolean;
  theme?: Theme;
}

export function DataTableSkeleton({
  rowCount = 5,
  columnCount = 4,
  showToolbar = true,
  showPagination = true,
  theme = 'default',
}: DataTableSkeletonProps) {
  const themeStyles = themes[theme] || themes.default;
  
  const skeletonCell = (
    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
  );
  const skeletonHeaderCell = (
    <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
  )

  return (
    <div className={`shadow border-b border-gray-200 sm:rounded-lg animate-pulse ${theme === 'windows95' ? 'border-2 border-gray-400' : ''}`}>
      {/* Skeleton Toolbar */}
      {showToolbar && (
        <div className={themeStyles.toolbar}>
          <div className="h-8 bg-gray-300 rounded w-1/3"></div>
          <div className="h-8 bg-gray-300 rounded w-24"></div>
        </div>
      )}

      {/* Skeleton Table */}
      <table className={themeStyles.table}>
        <thead className={themeStyles.headerWrapper}>
          <tr className={themeStyles.headerRow}>
            {Array.from({ length: columnCount }).map((_, index) => (
              <th
                key={index}
                scope="col"
                className={themeStyles.headerCell}
              >
                {skeletonHeaderCell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={themeStyles.bodyWrapper}>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <tr key={rowIndex} className={themeStyles.row}>
              {Array.from({ length: columnCount }).map((_, cellIndex) => (
                <td key={cellIndex} className={themeStyles.cell}>
                  {skeletonCell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Skeleton Pagination */}
      {showPagination && (
        <div className={themeStyles.pagination}>
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