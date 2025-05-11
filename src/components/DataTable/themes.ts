export type Theme = 'default' | 'windows95';

export interface ThemeStyles {
  // Table core
  container: string;
  tableWrapper: string;
  table: string;
  
  // Header styles
  headerWrapper: string;
  headerRow: string;
  headerCell: string;
  headerSortIcon: string;
  headerSortIconActive: string;
  headerSortIconHover: string;
  
  // Body styles
  bodyWrapper: string;
  row: string;
  cell: string;
  
  // Toolbar styles
  toolbar: string;
  toolbarInput: string;
  toolbarButton: string;
  toolbarSearchInput: string;
  toolbarDropdown: string;
  toolbarSection: string;
  
  // Pagination styles
  pagination: string;
  paginationButton: string;
  paginationButtonActive: string;
  paginationSelect: string;
  paginationText: string;
  paginationIconButton: string;
  paginationInput: string;
  
  // Row Actions styles
  rowActionsButton: string;
  rowActionsIcon: string;
}

// Define theme-specific styles
export const themes: Record<Theme, ThemeStyles> = {
  default: {
    // Table core
    container: 'w-full flex flex-col sm:rounded-lg shadow ring-1 ring-gray-200',
    tableWrapper: 'w-full relative',
    table: 'w-full caption-bottom text-sm divide-y divide-gray-200',
    
    // Header styles
    headerWrapper: 'bg-gray-50',
    headerRow: '',
    headerCell: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
    headerSortIcon: 'text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200',
    headerSortIconActive: 'text-gray-700',
    headerSortIconHover: '',
    
    // Body styles
    bodyWrapper: 'bg-white divide-y divide-gray-200',
    row: 'hover:bg-gray-50 transition-colors duration-150',
    cell: 'px-6 py-4 whitespace-nowrap text-sm text-gray-800',
    
    // Toolbar styles
    toolbar: 'flex items-center justify-between p-2 border-b border-gray-200 gap-x-4',
    toolbarSection: 'flex-grow',
    toolbarSearchInput: 'block w-full sm:w-auto md:min-w-[250px] lg:min-w-[300px] p-2 border border-gray-300 rounded-md shadow-sm focus:ring-4 focus:ring-indigo-50 focus:border-gray-300 sm:text-sm transition-all duration-150 ease-in-out',
    toolbarDropdown: 'ml-auto flex-shrink-0',
    toolbarButton: 'inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
    toolbarInput: 'shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md',
    
    // Pagination styles
    pagination: 'flex items-center justify-between py-3 px-2 border-t border-gray-200',
    paginationButton: 'relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
    paginationButtonActive: 'bg-indigo-50 border-indigo-500 text-indigo-600',
    paginationSelect: 'appearance-none w-auto pl-3 pr-8 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white',
    paginationText: 'text-sm text-gray-700',
    paginationIconButton: 'relative inline-flex items-center justify-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
    paginationInput: 'ml-1 w-16 p-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
    
    // Row Actions styles
    rowActionsButton: 'rounded-md p-2 hover:bg-gray-100 focus:outline-none',
    rowActionsIcon: 'text-gray-500',
  },
  
  windows95: {
    // Table core
    container: 'w-full flex flex-col',
    tableWrapper: 'w-full relative overflow-auto',
    table: 'w-full caption-bottom text-sm border-2 border-gray-400 shadow-[5px_5px_0px_0px_rgba(0,0,0,0.2)]',
    
    // Header styles
    headerWrapper: 'bg-[#c0c0c0] border-b-2 border-gray-400',
    headerRow: 'shadow-inner',
    headerCell: 'px-4 py-2 text-left text-xs font-bold text-gray-900 border-r-2 border-gray-400 uppercase',
    headerSortIcon: 'text-gray-900 opacity-0 group-hover:opacity-100',
    headerSortIconActive: 'text-gray-900',
    headerSortIconHover: '',
    
    // Body styles
    bodyWrapper: 'bg-white divide-y divide-gray-400',
    row: 'hover:bg-blue-100 border-b-2 border-gray-400 bg-gray-100',
    cell: 'px-4 py-2 text-sm font-mono text-gray-900 border-r-2 border-gray-400',
    
    // Toolbar styles
    toolbar: 'flex items-center justify-between p-2 bg-[#c0c0c0] border-2 border-b-0 border-gray-400 gap-x-4',
    toolbarSection: 'flex-grow',
    toolbarSearchInput: 'border-2 border-gray-400 bg-white px-2 py-1 focus:outline-none focus:ring-0 block w-full sm:w-auto md:min-w-[250px]',
    toolbarDropdown: 'ml-auto flex-shrink-0',
    toolbarInput: 'border-2 border-gray-400 bg-white px-2 py-1 focus:outline-none focus:ring-0 w-full',
    toolbarButton: 'bg-[#c0c0c0] px-4 py-1 border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 active:border-t-gray-800 active:border-l-gray-800 active:border-b-white active:border-r-white font-bold text-sm',
    
    // Pagination styles
    pagination: 'px-4 py-4 flex items-center justify-between bg-[#c0c0c0] border-2 border-t-0 border-gray-400',
    paginationButton: 'bg-[#c0c0c0] px-2 py-1 border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 active:border-t-gray-800 active:border-l-gray-800 active:border-b-white active:border-r-white font-bold text-sm',
    paginationButtonActive: 'bg-[#d0d0d0]',
    paginationSelect: 'border-2 border-gray-400 bg-white px-2 py-0.5 focus:outline-none focus:ring-0',
    paginationText: 'text-sm font-bold',
    paginationIconButton: 'bg-[#c0c0c0] px-2 py-1 border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 active:border-t-gray-800 active:border-l-gray-800 active:border-b-white active:border-r-white',
    paginationInput: 'border-2 border-gray-400 bg-white px-2 py-0.5 focus:outline-none focus:ring-0 ml-1 w-16',
    
    // Row Actions styles
    rowActionsButton: 'p-2 bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 hover:bg-[#d0d0d0] active:border-t-gray-800 active:border-l-gray-800 active:border-b-white active:border-r-white',
    rowActionsIcon: 'text-black',
  }
};

// Context could be implemented here for global theme management