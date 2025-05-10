import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from '../../components/DataTable/data-table'; 
import type { SolanaTransactionRow } from '../../components/DataTable/data-table';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from '../../components/DataTable/data-table-row-actions';
import { type Theme } from '../../components/DataTable/themes';

// --- Storybook Setup ---
const meta: Meta<typeof DataTable<SolanaTransactionRow>> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    data: { control: { type: 'object' }, description: 'Array of SolanaTransactionRow objects.' },
    columns: { control: { type: 'object' }, description: 'Array of column definitions for SolanaTransactionRow.' },
    isLoading: { control: 'boolean' },
    loadingMessage: { control: 'text' },
    emptyStateMessage: { control: 'text' },
    className: { control: 'text' },
    tableId: { control: 'text' },
    pageCount: { control: { type: 'number', step: 1 } },
    pageIndex: { control: { type: 'number', step: 1 } },
    pageSize: { control: { type: 'number', step: 1 } },
    pageSizeOptions: { control: { type: 'object' } },
    theme: { 
      control: 'select', 
      options: ['default', 'windows95'],
      description: 'Visual theme for the data table'
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// --- Sample Solana Transaction Data & Columns (similar to App.tsx) ---
const transactionColumns: ColumnDef<SolanaTransactionRow, unknown>[] = [
  {
    accessorKey: 'signature',
    header: 'Signature',
    cell: (info) => {
      const signature = info.getValue() as string;
      return (
        <span title={signature} className="font-mono text-xs">
          {signature.substring(0, 8)}...{signature.substring(signature.length - 8)}
        </span>
      );
    },
    meta: { columnLabel: 'Tx Signature' },
  },
  {
    accessorKey: 'blockTime',
    header: 'Timestamp',
    cell: (info) => {
      const timestamp = info.getValue() as number | null;
      return timestamp ? new Date(timestamp * 1000).toLocaleString() : 'N/A';
    },
  },
  {
    accessorKey: 'slot',
    header: 'Slot',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (info) => {
      const status = info.getValue() as string;
      let bgColor = 'bg-gray-100 text-gray-800';
      
      if (status === 'success' || status === 'finalized' || status === 'confirmed') {
        bgColor = 'bg-green-100 text-green-800';
      } else if (status === 'failed') {
        bgColor = 'bg-red-100 text-red-800';
      } else if (status === 'processing') {
        bgColor = 'bg-yellow-100 text-yellow-800';
      }
      
      return (
        <span className={`px-2 inline-flex items-center gap-1.5 text-xs leading-5 font-semibold rounded-full ${bgColor}`}>
          {status === 'processing' && (
            <svg
              className="h-3.5 w-3.5 animate-spin text-yellow-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: 'fee',
    header: 'Fee (SOL)',
    cell: (info) => {
      const feeInLamports = info.getValue() as number;
      return (feeInLamports / 1_000_000_000).toFixed(6);
    },
  },
  {
    accessorKey: 'source',
    header: 'Source',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        onView={(data) => {
          alert(`Viewing details for signature: ${data.signature}`);
        }}
        onEdit={(data) => {
          alert(`Editing transaction: ${data.signature}`);
        }}
        onDelete={(data) => {
          if (window.confirm(`Are you sure you want to delete transaction with signature ${data.signature}?`)) {
            alert('Transaction would be deleted in a real app');
          }
        }}
      />
    ),
    enableSorting: false,
  },
];

const transactionSampleData: SolanaTransactionRow[] = [
  { id: 'sig1', signature: '5hFHkLdytPkyQd1gmjXvHHfsvwt2aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789A', blockTime: 1672531200, slot: 123456, status: 'finalized', fee: 5000, source: 'Raydium' },
  { id: 'sig2', signature: '2zXqR8bN3yP7kF9wT1vG6jH4sL2aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789B', blockTime: 1672534800, slot: 123457, status: 'failed', fee: 5000, source: 'Phantom' },
  { id: 'sig3', signature: '3aBcDeFgHiJkLmNoPqRsTuVwXyZaBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789C', blockTime: 1672538400, slot: 123458, status: 'processing', fee: 10000, source: 'Jupiter' },
  { id: 'sig4', signature: '4bCdEfGhIjKlMnOpQrStUvWxYzaBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789D', blockTime: null, slot: 123459, status: 'confirmed', fee: 5000, source: 'MetaDAO' },
  { id: 'sig5', signature: '5cDeFgHiJkLmNoPqRsTuVwXyZaBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789E', blockTime: 1672542000, slot: 123460, status: 'success', fee: 7500, source: 'Raydium' },
  { id: 'sig6', signature: '6dEfGhIjKlMnOpQrStUvWxYzaBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789F', blockTime: 1672545600, slot: 123461, status: 'finalized', fee: 5000, source: 'Phantom' },
  { id: 'sig7', signature: '7fGhIjKlMnOpQrStUvWxYzaBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789G', blockTime: 1672549200, slot: 123462, status: 'failed', fee: 6000, source: 'Jupiter' },
  { id: 'sig8', signature: '8gHiJkLmNoPqRsTuVwXyZaBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789H', blockTime: 1672552800, slot: 123463, status: 'processing', fee: 5000, source: 'MetaDAO' },
  { id: 'sig9', signature: '9hIjKlMnOpQrStUvWxYzaBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789I', blockTime: 1672556400, slot: 123464, status: 'success', fee: 8000, source: 'Raydium' },
  { id: 'sig10', signature: '10jKlMnOpQrStUvWxYzaBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789J', blockTime: 1672560000, slot: 123465, status: 'finalized', fee: 5000, source: 'Phantom' },
  { id: 'sig11', signature: '11kLmNoPqRsTuVwXyZaBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789K', blockTime: 1672563600, slot: 123466, status: 'failed', fee: 5500, source: 'Jupiter' },
];

// --- Core stories ---

export const Default: Story = {
  args: {
    columns: transactionColumns,
    data: transactionSampleData,
    tableId: 'basic-transaction-table',
    theme: 'default',
  },
};

export const Loading: Story = {
  args: {
    columns: transactionColumns,
    data: [],
    isLoading: true,
    loadingMessage: 'Fetching latest transactions...',
    tableId: 'loading-transaction-table',
    theme: 'default',
  },
};

export const Empty: Story = {
  args: {
    columns: transactionColumns,
    data: [],
    emptyStateMessage: 'No transactions found.',
    tableId: 'empty-transaction-table',
    theme: 'default',
  },
};

// Theme Switcher - using useState instead of useArgs
export const ThemeSwitcher: Story = {
  render: function Render() {
    // Use React's useState directly instead of relying on Storybook's useArgs
    const [currentTheme, setCurrentTheme] = useState<Theme>('default');
    
    // Handle the theme change
    const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setCurrentTheme(event.target.value as Theme);
    };
    
    return (
      <div className="p-2">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-medium text-sm">Theme:</span>
            <div className="relative">
              <select
                value={currentTheme}
                onChange={handleThemeChange}
                className={currentTheme === 'windows95' 
                  ? "w-40 border-2 border-gray-400 bg-[#c0c0c0] py-1.5 px-3 focus:outline-none cursor-pointer"
                  : "w-40 appearance-none rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 cursor-pointer"
                }
              >
                <option value="default">Modern Theme</option>
                <option value="windows95">Windows 95 Theme</option>
              </select>
              {currentTheme === 'default' && (
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            
            {/* Current theme indicator */}
            <div className={`ml-4 ${currentTheme === 'windows95' 
              ? "font-bold text-sm bg-[#c0c0c0] px-3 py-1 border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800"
              : "text-sm bg-indigo-50 text-indigo-600 font-medium px-3 py-1 rounded-md"
            }`}>
              Active: {currentTheme === 'windows95' ? 'Windows 95' : 'Modern'} Theme
            </div>
          </div>
        
        <DataTable 
          columns={transactionColumns}
          data={transactionSampleData}
          tableId="theme-switcher-table"
          theme={currentTheme}
          emptyStateMessage="No transactions found."
          pageSizeOptions={[5, 10, 20, 50]}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'The DataTable component with theme switching capability. Use the dropdown to switch between themes and see how the component adapts while maintaining functionality.',
      },
    },
  },
};
