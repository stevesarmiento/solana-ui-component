import type { Meta, StoryObj } from '@storybook/react';
import React from 'react'; // Import React for JSX
import { DataTable, type ColumnDef, type SolanaTransactionRow } from '../../components/DataTable'; // Adjusted import

// --- Storybook Setup ---
const meta: Meta<typeof DataTable<SolanaTransactionRow>> = { // Specify TData for DataTable
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
  },
};

export default meta;
type Story = StoryObj<typeof meta>; // This will infer TData as SolanaTransactionRow

// --- Sample Solana Transaction Data & Columns (similar to App.tsx) ---
const transactionColumns: ColumnDef<SolanaTransactionRow>[] = [
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
      const status = info.getValue() as SolanaTransactionRow['status'];
      let bgColor = 'bg-gray-100 text-gray-800';
      if (status === 'success' || status === 'finalized' || status === 'confirmed') {
        bgColor = 'bg-green-100 text-green-800';
      } else if (status === 'failed') {
        bgColor = 'bg-red-100 text-red-800';
      } else if (status === 'processing') {
        bgColor = 'bg-yellow-100 text-yellow-800';
      }
      return (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${bgColor}`}>
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
      <button
        onClick={() => alert(`Viewing details for signature: ${row.original.signature}`)}
        className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
      >
        View
      </button>
    ),
    enableSorting: false,
  },
];

const transactionSampleData: SolanaTransactionRow[] = [
  { id: 'sig1', signature: '5hFHkLdytPkyQd1gmjXvHHfsvwt2aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789A', blockTime: 1672531200, slot: 123456, status: 'finalized', fee: 5000, source: 'Raydium' },
  { id: 'sig2', signature: '2zXqR8bN3yP7kF9wT1vG6jH4sL2aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789B', blockTime: 1672534800, slot: 123457, status: 'failed', fee: 5000, source: 'Wallet' },
  { id: 'sig3', signature: '3aBcDeFgHiJkLmNoPqRsTuVwXyZaBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789C', blockTime: 1672538400, slot: 123458, status: 'processing', fee: 10000, source: 'Jupiter' },
  { id: 'sig4', signature: '4bCdEfGhIjKlMnOpQrStUvWxYzaBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789D', blockTime: null, slot: 123459, status: 'confirmed', fee: 5000, source: 'Serum' },
  { id: 'sig5', signature: '5cDeFgHiJkLmNoPqRsTuVwXyZaBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789E', blockTime: 1672542000, slot: 123460, status: 'success', fee: 7500, source: 'Raydium' },
  { id: 'sig6', signature: '6dEfGhIjKlMnOpQrStUvWxYzaBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789F', blockTime: 1672545600, slot: 123461, status: 'finalized', fee: 5000, source: 'Wallet' },
  { id: 'sig7', signature: '7fGhIjKlMnOpQrStUvWxYzaBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789G', blockTime: 1672549200, slot: 123462, status: 'failed', fee: 6000, source: 'Jupiter' },
  { id: 'sig8', signature: '8gHiJkLmNoPqRsTuVwXyZaBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789H', blockTime: 1672552800, slot: 123463, status: 'processing', fee: 5000, source: 'Serum' },
  { id: 'sig9', signature: '9hIjKlMnOpQrStUvWxYzaBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789I', blockTime: 1672556400, slot: 123464, status: 'success', fee: 8000, source: 'Raydium' },
  { id: 'sig10', signature: '10jKlMnOpQrStUvWxYzaBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789J', blockTime: 1672560000, slot: 123465, status: 'finalized', fee: 5000, source: 'Wallet' },
  { id: 'sig11', signature: '11kLmNoPqRsTuVwXyZaBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789K', blockTime: 1672563600, slot: 123466, status: 'failed', fee: 5500, source: 'Jupiter' },
];

// --- Stories ---

export const Basic: Story = {
  args: {
    columns: transactionColumns,
    data: transactionSampleData,
    tableId: 'basic-transaction-table',
  },
};

export const Loading: Story = {
  args: {
    columns: transactionColumns,
    data: [],
    isLoading: true,
    loadingMessage: 'Fetching latest Solana transactions...',
    tableId: 'loading-transaction-table',
  },
};

export const Empty: Story = {
  args: {
    columns: transactionColumns,
    data: [],
    emptyStateMessage: 'No Solana transactions found.',
    tableId: 'empty-transaction-table',
  },
};

export const FewerEntries: Story = {
  args: {
    columns: transactionColumns,
    data: transactionSampleData.slice(0, 3),
    tableId: 'few-transactions-table',
    pageSizeOptions: [5, 10, 15]
  },
};

export const WithCustomClassName: Story = {
  args: {
    ...Basic.args, // Reuses args from Basic story with Solana data
    className: 'border-4 border-purple-500 rounded-lg shadow-xl',
    tableId: 'custom-class-transaction-table',
  },
};

// export const ControlledPagination: Story = {
//   args: {
//     columns: transactionColumns,
//     data: transactionSampleData.slice(0, 5),
//     pageCount: Math.ceil(transactionSampleData.length / 5),
//     pageIndex: 0,
//     pageSize: 5,
//     tableId: 'controlled-pagination-transactions',
//   },
// };
