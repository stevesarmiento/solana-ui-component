import { DataTable, type SolanaTransactionRow } from './components/DataTable/data-table';
import { type ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from './components/DataTable/data-table-row-actions';
import './App.css';

// Define sample columns (you can copy this from your DataTable.stories.tsx or define anew)
const sampleColumns: ColumnDef<SolanaTransactionRow, unknown>[] = [
  {
    accessorKey: 'signature',
    header: 'Signature',
    cell: (info) => {
      const signature = info.getValue() as string;
      // Basic example: truncate long signatures
      return (
        <span title={signature} className="font-mono text-xs">
          {signature.substring(0, 8)}...{signature.substring(signature.length - 8)}
        </span>
      );
    },
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
        return (
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${bgColor}`}>
            {status}
          </span>
        );
      } else if (status === 'failed') {
        bgColor = 'bg-red-100 text-red-800';
        return (
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${bgColor}`}>
            {status}
          </span>
        );
      } else if (status === 'processing') {
        bgColor = 'bg-yellow-100 text-yellow-800';
        return (
          <span className={`px-2 inline-flex items-center gap-1.5 text-xs leading-5 font-semibold rounded-full ${bgColor}`}>
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
            <span>
              Processing
            </span>
          </span>
        );
      } else {
        return (
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${bgColor}`}>
            {status}
          </span>
        );
      }
    },
  },
  {
    accessorKey: 'fee',
    header: 'Fee (SOL)',
    cell: (info) => {
      const feeInLamports = info.getValue() as number;
      // Convert lamports to SOL (1 SOL = 1,000,000,000 lamports)
      return (feeInLamports / 1_000_000_000).toFixed(6); // Show more precision for fees
    },
  },
  // Actions column with dropdown menu
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <DataTableRowActions
          row={row}
          onView={(data) => {
            // View action
            alert(`Viewing details for signature: ${data.signature}`);
          }}
          onEdit={(data) => {
            // Edit action 
            alert(`Editing transaction: ${data.signature}`);
          }}
          onDelete={(data) => {
            // Delete action
            if (window.confirm(`Are you sure you want to delete transaction with signature ${data.signature}?`)) {
              alert('Transaction would be deleted in a real app');
            }
          }}
        />
      );
    },
  },
];

// Define sample data (customize with more realistic Solana transaction data)
const sampleData: SolanaTransactionRow[] = [
  { 
    id: 'sig1',
    signature: '5hFHkLdytPkyQd1gmjXvHHfsvwt2aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789A',
    blockTime: 1672531200,
    slot: 123456,
    status: 'finalized',
    fee: 5000,
    source: 'Raydium'
  },
  { id: 'sig2', signature: '2zXqR8bN3yP7kF9wT1vG6jH4sL2aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789B', blockTime: 1672534800, slot: 123457, status: 'failed', fee: 5000, source: 'Phantom' },
  { id: 'sig3', signature: '3aBcDeFgHiJkLmNoPqRsTuVwXyZaBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789C', blockTime: 1672538400, slot: 123458, status: 'processing', fee: 10000, source: 'Jupiter' },
  { id: 'sig4', signature: '4bCdEfGhIjKlMnOpQrStUvWxYzaBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789D', blockTime: null, slot: 123459, status: 'confirmed', fee: 5000, source: 'MetaDAO' },
  { id: 'sig5', signature: '5cDeFgHiJkLmNoPqRsTuVwXyZaBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789E', blockTime: 1672542000, slot: 123460, status: 'success', fee: 7500, source: 'Raydium' },
  // Add more data to test pagination
  { id: 'sig6', signature: '6dEfGhIjKlMnOpQrStUvWxYzaBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789F', blockTime: 1672545600, slot: 123461, status: 'finalized', fee: 5000, source: 'Phantom' },
  { id: 'sig7', signature: '7fGhIjKlMnOpQrStUvWxYzaBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789G', blockTime: 1672549200, slot: 123462, status: 'failed', fee: 6000, source: 'Jupiter' },
  { id: 'sig8', signature: '8gHiJkLmNoPqRsTuVwXyZaBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789H', blockTime: 1672552800, slot: 123463, status: 'processing', fee: 5000, source: 'MetaDAO' },
  { id: 'sig9', signature: '9hIjKlMnOpQrStUvWxYzaBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789I', blockTime: 1672556400, slot: 123464, status: 'success', fee: 8000, source: 'Raydium' },
  { id: 'sig10', signature: '10jKlMnOpQrStUvWxYzaBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789J', blockTime: 1672560000, slot: 123465, status: 'finalized', fee: 5000, source: 'Phantom' },
  { id: 'sig11', signature: '11kLmNoPqRsTuVwXyZaBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789K', blockTime: 1672563600, slot: 123466, status: 'failed', fee: 5500, source: 'Jupiter' },
];


function App() {
  return (
    <div className="container bg-white mx-auto p-4 sm:p-6 lg:p-8">
      <header className="mb-8 max-w-xl mx-auto">
        <div className="flex items-center justify-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 p-1 border shadow-sm border-gray-300 rounded-xl">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="32" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-indigo-500 fill-indigo-500"
            >
              <rect width="7" height="7" x="14" y="3" rx="1"/>
              <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3"/>
            </svg>            
          </div>

          <span className="text-5xl font-bold text-gray-800 font-mono flex items-center tracking-tighter">
            Solana UIkit
          </span>
        </div>
        <p className="text-gray-600 mt-1">
          A flexible, robust, and accessible data table component for visualizing on-chain transactions. Features include sorting, filtering, pagination, and responsive design. All built with modern React, Tanstack Table, and Tailwind CSS.
        </p>
      </header>

      <section>
        <DataTable
          columns={sampleColumns}
          data={sampleData} // Use the sampleData defined above
          isLoading={false} // Set to true to see the loading state
          // You can also test empty state by passing an empty array to data:
          // data={[]}
          tableId="transactions-table"
          // Example of controlling page size options
          // pageSizeOptions={[5, 10, 15]}
        />
      </section>
    </div>
  );
}

export default App;
