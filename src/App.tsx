import { DataTable, type SolanaTransactionRow, type ColumnDef } from './components/DataTable'; // Make sure this path is correct
import './App.css'; // Keep your existing App.css if you have styles there
// import './index.css'; // Ensure Tailwind's CSS is imported, usually in main.tsx

// Define sample columns (you can copy this from your DataTable.stories.tsx or define anew)
const sampleColumns: ColumnDef<SolanaTransactionRow>[] = [
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
      // Convert lamports to SOL (1 SOL = 1,000,000,000 lamports)
      return (feeInLamports / 1_000_000_000).toFixed(6); // Show more precision for fees
    },
  },
  // Add a simple action column example
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      // const transaction = row.original; // Get the full transaction data
      return (
        <button
          onClick={() => alert(`Viewing details for signature: ${row.original.signature}`)}
          className="px-3 py-1 cursor-pointer text-sm font-medium rounded-md text-indigo-600 hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          View
        </button>
      );
    },
  },
];

// Define sample data (customize with more realistic Solana transaction data)
const sampleData: SolanaTransactionRow[] = [
  { id: 'sig1', signature: '5hFHkLdytPkyQd1gmjXvHHfsvwt2aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789A', blockTime: 1672531200, slot: 123456, status: 'finalized', fee: 5000, source: 'Raydium' },
  { id: 'sig2', signature: '2zXqR8bN3yP7kF9wT1vG6jH4sL2aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789B', blockTime: 1672534800, slot: 123457, status: 'failed', fee: 5000, source: 'Wallet' },
  { id: 'sig3', signature: '3aBcDeFgHiJkLmNoPqRsTuVwXyZaBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789C', blockTime: 1672538400, slot: 123458, status: 'processing', fee: 10000, source: 'Jupiter' },
  { id: 'sig4', signature: '4bCdEfGhIjKlMnOpQrStUvWxYzaBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789D', blockTime: null, slot: 123459, status: 'confirmed', fee: 5000, source: 'Serum' },
  { id: 'sig5', signature: '5cDeFgHiJkLmNoPqRsTuVwXyZaBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789E', blockTime: 1672542000, slot: 123460, status: 'success', fee: 7500, source: 'Raydium' },
  // Add more data to test pagination
  { id: 'sig6', signature: '6dEfGhIjKlMnOpQrStUvWxYzaBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789F', blockTime: 1672545600, slot: 123461, status: 'finalized', fee: 5000, source: 'Wallet' },
  { id: 'sig7', signature: '7fGhIjKlMnOpQrStUvWxYzaBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789G', blockTime: 1672549200, slot: 123462, status: 'failed', fee: 6000, source: 'Jupiter' },
  { id: 'sig8', signature: '8gHiJkLmNoPqRsTuVwXyZaBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789H', blockTime: 1672552800, slot: 123463, status: 'processing', fee: 5000, source: 'Serum' },
  { id: 'sig9', signature: '9hIjKlMnOpQrStUvWxYzaBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789I', blockTime: 1672556400, slot: 123464, status: 'success', fee: 8000, source: 'Raydium' },
  { id: 'sig10', signature: '10jKlMnOpQrStUvWxYzaBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789J', blockTime: 1672560000, slot: 123465, status: 'finalized', fee: 5000, source: 'Wallet' },
  { id: 'sig11', signature: '11kLmNoPqRsTuVwXyZaBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789K', blockTime: 1672563600, slot: 123466, status: 'failed', fee: 5500, source: 'Jupiter' },
];


function App() {
  // const [isLoading, setIsLoading] = useState(false); // Example for loading state
  // const [data, setData] = useState<SolanaTransactionRow[]>(sampleData); // Example for dynamic data

  return (
    <div className="container bg-white mx-auto p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Transaction Table
        </h1>
        <p className="text-gray-600 mt-1">
          Displaying on-chain transactions using a custom DataTable component.
        </p>
      </header>

      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Transaction History
        </h2>
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

      {/* You can remove the Vite default content if you want */}
      {/*
      <div className="mt-10 text-center">
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src="/vite.svg" className="logo inline-block h-16" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react inline-block h-16" alt="React logo" />
        </a>
        <p className="text-gray-500 mt-4">
          Click on the Vite and React logos to learn more.
        </p>
      </div>
      */}
    </div>
  );
}

export default App;
