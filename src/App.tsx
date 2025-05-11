import { DataTable, type SolanaTransactionRow } from './components/DataTable/data-table';
import { type ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from './components/DataTable/data-table-row-actions';
import './App.css';

const IconApi = () => <span className="text-xl">🧩</span>;
const IconTheme = () => <span className="text-xl">🎨</span>;
const IconAccessibility = () => <span className="text-xl">♿</span>;
const IconTypeScript = () => <span className="text-xl">🔷</span>;
const IconCode = () => <span className="text-xl">💻</span>;
const IconProps = () => <span className="text-xl">🔧</span>;
const IconColumns = () => <span className="text-xl">📊</span>;
const IconQuickStart = () => <span className="text-xl">🔍</span>;
const IconStructure = () => <span className="text-xl">🏗️</span>;
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

  const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-xs my-4 text-left">
      <code>{children}</code>
    </pre>
  );

function App() {

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 border border-gray-100 rounded-3xl relative overflow-hidden">
          <svg className="absolute inset-0 h-full w-full opacity-20">
            <defs>
              <pattern id="pattern-squares" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="3" height="3" className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pattern-squares)" />
          </svg>
      <header className="mb-8 w-full sm:max-w-xl mx-auto relative z-0">
        <div className="flex items-center justify-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 p-1 border shadow-sm border-gray-100 bg-white rounded-xl">
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
            Data Table Starter
          </span>
        </div>
        <p className="text-gray-600 mt-6">
          A flexible, robust, and accessible data table component for visualizing on-chain transactions. Features include sorting, filtering, pagination, and responsive design. All built with modern React, Tanstack Table, and Tailwind CSS.
        </p>


        <section className="my-16 max-w-3xl mx-auto relative z-0">
        <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
          <div className="bg-indigo-100 px-4 py-2 relative overflow-hidden">
            <svg className="absolute inset-0 h-full w-full opacity-20">
              <defs>
                <pattern
                  id="threshold-stripe"
                  patternUnits="userSpaceOnUse"
                  width="20"
                  height="20"
                  patternTransform="rotate(45)"
                >
                  <rect width="10" height="20" fill="rgb(255 255 255)" />
                  <rect x="10" width="10" height="20" fill="transparent" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#threshold-stripe)" />
            </svg>
            <h3 className="text-sm font-semibold text-indigo-800 font-mono">Component Design Principles</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 text-sm">
            {[
                { title: 'Modular API', description: 'Modular architecture with composable components that can be used independently or together.', icon: <IconApi /> },
                { title: 'Themable', description: 'Centralized theme system with built-in themes and support for custom theme extension.', icon: <IconTheme /> },
                { title: 'Accessible', description: 'ARIA attributes, keyboard navigation, and semantic HTML for inclusive user experience.', icon: <IconAccessibility /> },
                { title: 'Type-Safe', description: 'Built with TypeScript for robust code quality and enhanced developer experience.', icon: <IconTypeScript /> },
            ].map((item) => (
              <div key={item.title} className="p-5 border-b md:border-b-0 md:border-r border-gray-200 last:border-b-0 last:md:border-r-0">
                <div className="flex items-center mb-2">
                  {item.icon}
                  <h4 className="ml-2 font-semibold text-indigo-700">{item.title}</h4>
                </div>
                  <p className="text-gray-600 text-left">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </header>

      <section className="relative z-10">
          <DataTable
            columns={sampleColumns}
          data={sampleData}
          isLoading={false}
          tableId="transactions-table"
        />
      </section>

      <section className="my-12 max-w-xl mx-auto relative z-0 text-left">
        <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
          <div className="bg-indigo-100 px-4 py-2 relative overflow-hidden text-center">
            <svg className="absolute inset-0 h-full w-full opacity-20">
              <defs>
                <pattern
                  id="threshold-stripe"
                  patternUnits="userSpaceOnUse"
                  width="20"
                  height="20"
                  patternTransform="rotate(45)"
                >
                  <rect width="10" height="20" fill="rgb(255 255 255)" />
                  <rect x="10" width="10" height="20" fill="transparent" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#threshold-stripe)" />
            </svg>
            <h3 className="text-sm font-semibold text-indigo-800 font-mono">Quick Docs</h3>
          </div>
          <div className="px-6 py-4 relative overflow-hidden space-y-4">
            <h4 className="text-lg font-semibold text-indigo-700 mb-4 flex items-center">
              <IconStructure /> <span className="ml-2">Component Structure</span>
            </h4>
              <div className="bg-white p-3 rounded border border-indigo-100 text-xs">
                <p className="mb-2">DataTable is composed of several sub components:</p>
                <ul className="list-disc ml-5 space-y-1">
                  <li><code className="bg-gray-100 px-1 rounded">data-table.tsx</code> - Main container with theme & state management</li>
                  <li><code className="bg-gray-100 px-1 rounded">data-table-toolbar.tsx</code> - Utility toolbar with search, filter, and export options</li>
                  <li><code className="bg-gray-100 px-1 rounded">data-table-header.tsx</code> - Table header with sorting controls</li>
                  <li><code className="bg-gray-100 px-1 rounded">data-table-row.tsx</code> - Renders individual data rows</li>
                  <li><code className="bg-gray-100 px-1 rounded">data-table-row-actions.tsx</code> - Actions for each row</li>
                  <li><code className="bg-gray-100 px-1 rounded">data-table-pagination.tsx</code> - Pagination controls</li>
                </ul>
                <p className="mt-2">All components use shared theme settings defined in <code className="bg-gray-100 px-1 rounded">themes.ts</code> for fully customizable styling and are built using the <code className="bg-gray-100 px-1 rounded">table.tsx</code> and <code className="bg-gray-100 px-1 rounded">dropdown-menu.tsx</code> components.</p>
              </div>
              
            <h4 className="text-lg font-semibold text-indigo-700 mb-4 flex items-center">
              <IconQuickStart /> <span className="ml-2">Overview</span>
            </h4>
              <ol className="list-decimal ml-5 space-y-2 text-sm text-gray-800">
                <li>
                  <strong>Import the main component:</strong>
                  <code className="bg-indigo-100 px-1 rounded text-xs block mt-1">
                    import {'{'} DataTable {'}'} from 'path to your data-table.tsx file'
                  </code>
                </li>
                <li>
                  <strong>Define your data type:</strong>
                  <code className="bg-indigo-100 px-1 rounded text-xs block mt-1">
                    interface UserData {'{'} <span className="text-red-600">id: string;</span> name: string; email: string; {'}'}
                  </code>
                  <span className="text-xs italic block mt-1 ml-2 text-gray-600">Every data object must have a unique 'id' property</span>
                </li>
                <li>
                  <strong>Create column definitions:</strong>
                  <code className="bg-indigo-100 px-1 rounded text-xs block mt-1">
                    const columns: ColumnDef&lt;UserData, unknown&gt;[] = [<br />
                    &nbsp;&nbsp;{'{'} accessorKey: 'name', header: 'Name' {'}'},<br />
                    &nbsp;&nbsp;{'{'} accessorKey: 'email', header: 'Email' {'}'}<br />
                    ]
                  </code>
                </li>
                <li>
                  <strong>Prepare your data array:</strong>
                  <code className="bg-indigo-100 px-1 rounded text-xs block mt-1">
                    const users: UserData[] = [{'{'} id: '1', name: 'Jane', email: 'jane@example.com' {'}'}]
                  </code>
                </li>
                <li>
                  <strong>Render the component:</strong>
                  <code className="bg-indigo-100 px-1 rounded text-xs block mt-1">
                    &lt;DataTable columns={'{columns}'} data={'{users}'} /&gt;
                  </code>
                </li>
              </ol>

              <div className="w-full h-px bg-indigo-100 my-8 scale-125"></div>

            {/* Getting Started */}
            <h4 className="text-lg font-semibold text-indigo-700 mb-4 flex items-center">
              <IconCode /> <span className="ml-2">Building a Basic Data Table</span>
            </h4>
            <div className="mb-8">
              <CodeBlock>{`
// Basic example
import { DataTable } from './components/DataTable/data-table';
import { type ColumnDef } from '@tanstack/react-table';

// Step 1: Define your data type (must include an 'id' field)
interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Step 2: Define your columns
const columns: ColumnDef<UserData, unknown>[] = [
  { 
    accessorKey: 'name',
    header: 'Name' 
  },
  { 
    accessorKey: 'email',
    header: 'Email' 
  },
  {
    accessorKey: 'role',
    header: 'Role',
    // Optional: custom cell rendering
    cell: (info) => {
      const role = info.getValue() as string;
      return <span className="font-medium">{role}</span>;
    }
  }
];

// Step 3: Create your data array
const users: UserData[] = [
  { id: '1', name: 'Jane Smith', email: 'jane@example.com', role: 'Admin' },
  { id: '2', name: 'John Doe', email: 'john@example.com', role: 'User' }
];

// Step 4: Render the component
function UserTable() {
  return (
    <DataTable
      columns={columns}
      data={users}
      tableId="users-table"
    />
  );
}`}</CodeBlock>
            </div>

            {/* Core Props */}
            <h4 className="text-lg font-semibold text-indigo-700 mb-4 flex items-center">
              <IconProps /> <span className="ml-2">Core Props</span>
            </h4>
            <div className="mb-8">
              <dl className="space-y-4">
                <div>
                  <dt className="font-medium text-gray-800 flex items-center">
                    <code className="bg-gray-100 text-indigo-600 px-1 rounded text-sm">data</code>
                    <span className="text-red-500 ml-1">*</span>
                    <span className="text-xs text-gray-500 ml-2">(required)</span>
                  </dt>
                  <dd className="text-gray-600 ml-5">
                    Array of data objects, each representing a row.
                    <br />
                    <span className="text-xs italic">Each object must have a unique <code>id</code> property.</span>
                  </dd>
                </div>
                
                <div>
                  <dt className="font-medium text-gray-800 flex items-center">
                    <code className="bg-gray-100 text-indigo-600 px-1 rounded text-sm">columns</code>
                    <span className="text-red-500 ml-1">*</span>
                    <span className="text-xs text-gray-500 ml-2">(required)</span>
                  </dt>
                  <dd className="text-gray-600 ml-5">
                    Array of column definitions that describe how to display and interact with your data.
                    <br />
                    <span className="text-xs italic">Uses TanStack Table's <code>ColumnDef</code> type.</span>
                  </dd>
                </div>
                
                <div>
                  <dt className="font-medium text-gray-800">
                    <code className="bg-gray-100 text-indigo-600 px-1 rounded text-sm">isLoading</code>
                  </dt>
                  <dd className="text-gray-600 ml-5">
                    Boolean that controls whether to show a loading skeleton.
                    <br />
                    <span className="text-xs italic">Default: <code>false</code></span>
                  </dd>
                </div>
                
                <div>
                  <dt className="font-medium text-gray-800">
                    <code className="bg-gray-100 text-indigo-600 px-1 rounded text-sm">loadingMessage</code>
                  </dt>
                  <dd className="text-gray-600 ml-5">
                    Custom message to display during loading state.
                    <br />
                    <span className="text-xs italic">Default: <code>'Loading data...'</code></span>
                  </dd>
                </div>
                
                <div>
                  <dt className="font-medium text-gray-800">
                    <code className="bg-gray-100 text-indigo-600 px-1 rounded text-sm">emptyStateMessage</code>
                  </dt>
                  <dd className="text-gray-600 ml-5">
                    Message to display when there is no data.
                    <br />
                    <span className="text-xs italic">Default: <code>'No data available.'</code></span>
                  </dd>
                </div>
                
                <div>
                  <dt className="font-medium text-gray-800">
                    <code className="bg-gray-100 text-indigo-600 px-1 rounded text-sm">theme</code>
                  </dt>
                  <dd className="text-gray-600 ml-5">
                    The visual theme to apply to the table.
                    <br />
                    <span className="text-xs italic">Default: <code>'default'</code>. Options: <code>'default', 'windows95'</code></span>
                  </dd>
                </div>
                
                <div>
                  <dt className="font-medium text-gray-800">
                    <code className="bg-gray-100 text-indigo-600 px-1 rounded text-sm">tableId</code>
                  </dt>
                  <dd className="text-gray-600 ml-5">
                    Unique identifier for the table element.
                    <br />
                    <span className="text-xs italic">Useful for accessibility and testing.</span>
                  </dd>
                </div>
                
                <div>
                  <dt className="font-medium text-gray-800">
                    <code className="bg-gray-100 text-indigo-600 px-1 rounded text-sm">className</code>
                  </dt>
                  <dd className="text-gray-600 ml-5">
                    Additional CSS classes to apply to the table container.
                    <br />
                    <span className="text-xs italic">Can be used to override specific styles.</span>
                  </dd>
                </div>
                
                <div>
                  <dt className="font-medium text-gray-800">
                    <code className="bg-gray-100 text-indigo-600 px-1 rounded text-sm">pagination props</code>
                  </dt>
                  <dd className="text-gray-600 ml-5">
                    <code>pageCount</code>, <code>pageIndex</code>, <code>pageSize</code>, <code>onPageIndexChange</code>, <code>onPageSizeChange</code>, <code>pageSizeOptions</code>
                    <br />
                    <span className="text-xs italic">Used for controlled pagination (server-side).</span>
                  </dd>
                </div>
                
                <div>
                  <dt className="font-medium text-gray-800">
                    <code className="bg-gray-100 text-indigo-600 px-1 rounded text-sm">renderRow/renderHeader</code>
                  </dt>
                  <dd className="text-gray-600 ml-5">
                    Custom render functions for complete control over row and header rendering.
                    <br />
                    <span className="text-xs italic">Useful for advanced customization needs.</span>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="w-full h-px bg-indigo-100 my-8 scale-125"></div>

            {/* Theme Customization */}
            <h4 className="text-lg font-semibold text-indigo-700 mb-4 flex items-center">
              <IconTheme /> <span className="ml-2">Advanced Theme Customization</span>
            </h4>
            <div className="mb-8">
              <ol className="list-decimal list-inside text-gray-600 pl-2 space-y-2">
                <li>
                  <span className="font-medium">Using built-in themes:</span><br />
                  <code className="bg-gray-100 text-indigo-600 px-1 rounded text-sm ml-5">&lt;DataTable theme="windows95" /&gt;</code>
                </li>
                <li>
                  <span className="font-medium">Creating custom themes:</span><br />
                  <CodeBlock>{`// In your custom-themes.ts file
import { type Theme, themes } from './components/DataTable/themes';

// Add your custom theme
themes.darkMode = {
  container: 'bg-gray-900 text-white',
  table: 'min-w-full divide-y divide-gray-700',
  headerWrapper: 'bg-gray-800',
  headerCell: 'px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase',
  row: 'hover:bg-gray-800 transition-colors',
  cell: 'px-6 py-4 whitespace-nowrap text-sm text-gray-200',
  // ...other theme properties
};

// Then use it
<DataTable theme="darkMode" />`}</CodeBlock>
                </li>
                <li>
                  <span className="font-medium">Override specific styles with className:</span><br />
                  <code className="bg-gray-100 text-indigo-600 px-1 rounded text-sm ml-5">&lt;DataTable className="rounded-xl border-4 border-purple-500" /&gt;</code>
                </li>
              </ol>
              <div className="bg-indigo-50 p-3 mt-4 rounded-md">
                <p className="text-indigo-800 text-sm flex items-center">
                The theming system controls every visual aspect of the table from headers to pagination controls,
                allowing for complete customization while maintaining functionality.                </p>
              </div>
          </div>

            <div className="w-full h-px bg-indigo-100 my-8 scale-125"></div>

            {/* Column Definition */}
            <h4 className="text-lg font-semibold text-indigo-700 mb-4 flex items-center">
              <IconColumns /> <span className="ml-2">Advanced Table Capabilities</span>
            </h4>
            <div className="mb-8">
              <p className="text-gray-600 mb-3">Columns support powerful customization, including complex interactive elements and visualizations:</p>
              
              <CodeBlock>{`// Example: Column with interactive components and data visualization
{
  accessorKey: 'performance',
  header: 'Performance Metrics',
  
  cell: (info) => {
    const data = info.row.original;
    const value = info.getValue() as number;
    
    // Interactive sparkline chart example
    return (
      <div className="flex items-center justify-between gap-3">
        {/* Mini sparkline chart visualization */}
        <div className="h-6 w-24 bg-gray-100 rounded overflow-hidden">
          <div 
            className={\`h-full \${value > 0 ? 'bg-green-500' : 'bg-red-500'}\`} 
            style={{ width: \`\${Math.min(Math.abs(value * 5), 100)}%\` }}
          />
        </div>
        
        {/* Value with formatting */}
        <span className={\`font-medium \${value > 0 ? 'text-green-600' : 'text-red-600'}\`}>
          {value.toFixed(2)}%
        </span>
        
        {/* Interactive component */}
        <button 
          onClick={() => alert(\`Detailed view for \${data.id}\`)}
          className="px-2 py-1 text-xs bg-indigo-50 hover:bg-indigo-100 
                    text-indigo-700 rounded"
        >
          Details
        </button>
      </div>
    );
  }
},

// Example: Column with conditional rendering based on permissions
{
  id: 'actions',
  header: 'Actions',
  cell: ({ row }) => {
    const user = row.original;
    const userPermissions = useUserPermissions(); // Custom hook example
    
    // Different actions for different user types
    return (
      <div className="flex space-x-2">
        {userPermissions.canView && (
          <button onClick={() => viewUser(user.id)}>View</button>
        )}
        
        {userPermissions.canEdit && (
          <button onClick={() => editUser(user.id)}>Edit</button>
        )}
        
        {userPermissions.canDelete && user.role !== 'admin' && (
          <button onClick={() => deleteUser(user.id)}>Delete</button>
        )}
      </div>
    );
  }
}`}</CodeBlock>

              <div className="bg-white p-3 rounded-md border border-indigo-100 text-sm mt-4">
                <p className="mb-2 font-medium text-indigo-800">What makes columns powerful:</p>
                <ul className="list-disc ml-5 space-y-1 text-gray-600">
                  <li>
                    <strong>Interactive elements</strong> - Embed buttons, links, tooltips, or any React component
                  </li>
                  <li>
                    <strong>Data visualizations</strong> - Create in-cell charts, progress bars, or color-coded indicators
                  </li>
                  <li>
                    <strong>Context-aware rendering</strong> - Access the full row data via <code className="bg-gray-100 px-1 rounded text-xs">row.original</code>
                  </li>
                  <li>
                    <strong>Dynamic permissions</strong> - Show different actions based on user roles or permissions
                  </li>
                  <li>
                    <strong>Asynchronous operations</strong> - Trigger API calls or state updates from within cells
                  </li>
                </ul>
              </div>
              
              <div className="bg-indigo-50 p-3 mt-4 rounded-md">
                <p className="text-indigo-800 text-sm flex items-center">
                  The cell renderer has full access to React hooks and can include any component you'd use elsewhere in your application.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
