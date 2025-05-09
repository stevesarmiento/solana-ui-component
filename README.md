# Solana UI Kit: DataTable Component

## Introduction/Overview

The `DataTable` component is a reusable, accessible, and highly customizable
solution for displaying tabular data within React applications. It's
particularly well-suited for projects in the Solana ecosystem but is generic
enough for a wide range of use cases.

**Key Benefits:**

- **Reusable:** Designed for easy integration into various projects.
- **Accessible:** Built with accessibility in mind, incorporating ARIA
  attributes and considerations for keyboard navigation.
- **Customizable:** Offers extensive customization options through props and
  Tailwind CSS.
- **Modern Stack:** Leverages TanStack Table (v8) for powerful headless UI
  logic, React for declarative UI, TypeScript for type safety, and Tailwind CSS
  for styling.

## Live Demo Link

[Link to Deployed Storybook Here - e.g., GitHub Pages, Chromatic]

## Features List

- **Client-side Pagination:**
  - Page size selection
  - "Go to page" input
  - First/Last/Next/Previous page controls
- **Client-side Sorting:** Single-column sorting (ascending/descending).
- **Global Text Filtering:** Search across all visible columns.
- **Column Visibility Toggle:** Allow users to show or hide individual columns.
- **Customizable Cell and Header Rendering:** Full control over how cells and
  headers are rendered, thanks to TanStack Table's `ColumnDef`.
- **Loading and Empty States:** Clear visual feedback for data loading and when
  no data is available.
- **Type-Safe:** Built with TypeScript, ensuring robust and maintainable code.
- **Styled with Tailwind CSS:** Easily customize the appearance using utility
  classes or by extending your project's Tailwind configuration.
- **Accessibility:**
  - Uses appropriate ARIA attributes (`aria-live`, `aria-busy`, `aria-label`,
    `role="status"`, etc.).
  - Focus management for interactive elements.

## Installation

**Prerequisites:**

- Node.js (LTS version recommended)
- npm, yarn, or pnpm

**Steps:**

1. **Clone the repository:**
   ```bash
   git clone [Your GitHub Repo URL]
   ```
2. **Navigate to the project directory:**
   ```bash
   cd <repository-name>
   ```
3. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

## Running Locally

- **Storybook (Recommended for component development & viewing):**
  ```bash
  npm run storybook
  ```
  This will usually open Storybook in your browser, where you can see the
  `DataTable` in isolation with various examples.

- **Example Application (if applicable):**
  ```bash
  npm run dev
  ```
  This command typically runs a development server for an example `App.tsx` or
  similar, showcasing the component in a minimal application context.

## Basic Usage Example

Here's a minimal example of how to use the `<DataTable />` component:

```tsx
// src/MyPage.tsx
import React from "react";
import { type ColumnDef, DataTable } from "./components/DataTable"; // Adjust path as needed

// Define your data type
interface MyDataType {
  id: string;
  name: string;
  age: number;
  email: string;
}

// Sample data
const myData: MyDataType[] = [
  { id: "1", name: "Alice Wonderland", age: 30, email: "alice@example.com" },
  { id: "2", name: "Bob The Builder", age: 45, email: "bob@example.com" },
  { id: "3", name: "Charlie Brown", age: 8, email: "charlie@example.com" },
];

// Define your columns
const myColumns: ColumnDef<MyDataType>[] = [
  {
    accessorKey: "name",
    header: "Full Name",
    // meta: { columnLabel: 'Participant Name' } // Optional: for column toggle display
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "email",
    header: "Email Address",
    // enableSorting: false, // Optional: disable sorting for this column
  },
];

function MyPage() {
  return (
    <div>
      <h1>My Awesome Data</h1>
      <DataTable<MyDataType>
        data={myData}
        columns={myColumns}
        tableId="my-data-table"
        emptyStateMessage="No users found."
      />
    </div>
  );
}

export default MyPage;
```

## Props API (`<DataTable />`)

The `DataTable` component accepts the following props:

| Prop                | Type                          | Default                 | Description                                                                                                        |
| :------------------ | :---------------------------- | :---------------------- | :----------------------------------------------------------------------------------------------------------------- |
| `data`              | `TData[]`                     | N/A (Required)          | Array of data objects to display in the table. Each object represents a row.                                       |
| `columns`           | `ColumnDef<TData, unknown>[]` | N/A (Required)          | Array of column definitions that configure the table's columns. Uses TanStack Table's `ColumnDef` type.            |
| `isLoading`         | `boolean`                     | `false`                 | Indicates if the table is currently loading data. If true, `loadingMessage` will be displayed.                     |
| `loadingMessage`    | `React.ReactNode`             | `"Loading data..."`     | Custom message or React node to display when `isLoading` is true.                                                  |
| `emptyStateMessage` | `React.ReactNode`             | `"No data available."`  | Custom message or React node to display when `data` is empty and not loading.                                      |
| `pageCount`         | `number`                      | `undefined`             | The total number of pages available. Providing this enables manual/server-side pagination.                         |
| `pageIndex`         | `number`                      | `undefined`             | The current page index (0-based). Used for controlled pagination.                                                  |
| `pageSize`          | `number`                      | `undefined`             | The number of rows to display per page. Used for controlled pagination.                                            |
| `onPageIndexChange` | `(pageIndex: number) => void` | `undefined`             | Callback function invoked when the page index changes. Used for controlled pagination.                             |
| `onPageSizeChange`  | `(pageSize: number) => void`  | `undefined`             | Callback function invoked when the page size changes. Used for controlled pagination.                              |
| `pageSizeOptions`   | `number[]`                    | `[10, 20, 30, 50, 100]` | Array of page size options for the user to select in the pagination controls.                                      |
| `className`         | `string`                      | `''`                    | Custom CSS class name to apply to the main wrapper div of the DataTable.                                           |
| `tableId`           | `string`                      | `undefined`             | A unique ID for the table element. Useful for accessibility (e.g., `aria-labelledby`) or for targeting with tests. |

_(Where `TData` is a generic type extending `{ id: string }`)_

## Column Definitions (`ColumnDef<TData, unknown>`)

Column definitions are the heart of configuring your table's structure and
behavior. They follow TanStack Table's `ColumnDef` API.

**Key Properties:**

- `accessorKey: string`: For simple data access, provide the key from your data
  object (e.g., `'firstName'`).
- `accessorFn: (originalRow: TData) => any`: For complex data derivation or
  formatting before display (e.g., `originalRow => \`\${originalRow.firstName}
  \${originalRow.lastName}\``).
- `header: string | ((props: HeaderContext<TData, unknown>) => React.ReactNode)`:
  Defines the content of the header cell. Can be a simple string or a custom
  React component.
- `cell: (props: CellContext<TData, unknown>) => React.ReactNode`: Defines the
  content of the body cells for this column. Allows for custom rendering,
  formatting, or interactive elements.
- `meta?: ColumnMeta<TData, unknown>`: An optional object for custom metadata.
  - `meta: { columnLabel: 'Your Custom Label' }`: Used by the "Toggle Columns"
    dropdown to provide a more user-friendly name for the column if the `header`
    is complex or a React node.
- `enableSorting?: boolean`: (Default: `true` if `accessorKey` or `accessorFn`
  is present and sorting is not globally disabled) Explicitly enable/disable
  sorting for this column.
- `enableHiding?: boolean`: (Default: `true`) Explicitly enable/disable the
  ability to hide this column via the "Toggle Columns" dropdown.

**Example `ColumnDef`:**

```tsx
const columns: ColumnDef<User>[] = [
  {
    accessorKey: "email",
    header: "Email Address",
  },
  {
    accessorKey: "profile.firstName", // Access nested data
    header: "First Name",
    meta: {
      columnLabel: "Given Name", // Custom label for column toggle
    },
  },
  {
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: "Full Name",
    id: "fullName", // Important to provide an id if accessorKey is not used
  },
  {
    id: "actions", // For a column not directly tied to data
    header: "Actions",
    cell: ({ row }) => (
      <button onClick={() => alert(`Editing user: ${row.original.id}`)}>
        Edit
      </button>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
```

For a comprehensive list of all `ColumnDef` options and advanced configurations,
please refer to the
**[Official TanStack Table ColumnDef Documentation](https://tanstack.com/table/v8/docs/api/core/column-def)**.

## Customization Guide

### Styling

The `DataTable` component is styled using **Tailwind CSS**. This provides
several ways to customize its appearance:

1. **Wrapper Classes:** Apply Tailwind utility classes directly to elements that
   wrap the `<DataTable />` component in your application.
2. **`className` Prop:** Pass a `className` string to the `<DataTable />`
   component itself. This class will be applied to the main root `div` element
   of the table.
   ```tsx
   <DataTable data={...} columns={...} className="my-custom-styles border-2 border-blue-500 rounded-xl" />
   ```
3. **Tailwind Configuration:** For more global changes (like theming or custom
   variants), you can modify your project's `tailwind.config.js` file. The
   component uses standard Tailwind classes, so any overrides or extensions you
   define will naturally apply.

### Custom Cell/Header Rendering

TanStack Table's `ColumnDef` makes it easy to render custom content in cells and
headers.

**Example: Custom Cell Renderer for Status Badge**

```tsx
interface Transaction {
  id: string;
  status: "success" | "pending" | "failed";
  amount: number;
}

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "id",
    header: "Transaction ID",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ getValue }) => `$${(getValue() as number).toFixed(2)}`, // Format amount
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue() as Transaction["status"];
      let badgeColor = "bg-gray-200 text-gray-800";
      if (status === "success") badgeColor = "bg-green-100 text-green-800";
      if (status === "pending") badgeColor = "bg-yellow-100 text-yellow-800";
      if (status === "failed") badgeColor = "bg-red-100 text-red-800";

      return (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${badgeColor}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    },
  },
];
```

## Controlled vs. Client-Side Operations

- **Client-Side (Default):** By default, operations like pagination, sorting,
  and global filtering are performed client-side on the `data` array you
  provide. This is suitable for smaller to medium-sized datasets.
- **Controlled (Server-Side):** To handle larger datasets or to integrate with a
  backend API for these operations, you can switch to controlled mode.
  - **Pagination:** To enable controlled pagination, you **must** provide the
    following props:
    - `pageCount`: The total number of pages (from the server).
    - `pageIndex`: The current page index (you manage this state).
    - `pageSize`: The current page size (you manage this state).
    - `onPageIndexChange`: Callback when the user requests a page change.
    - `onPageSizeChange`: Callback when the user requests a page size change.
      The table will then rely on you to fetch and provide the data for the
      current page.

_(Note: The current implementation primarily focuses on client-side sorting and
filtering. Implementing fully controlled server-side sorting and filtering would
require additional props and logic for `onSortingChange`,
`onGlobalFilterChange`, etc., and for you to handle these state changes and data
fetching accordingly.)_

## Design Decisions

- **Why TanStack Table (v8)?**
  - **Headless:** Provides powerful, unopinionated logic, giving full control
    over rendering and styling.
  - **Feature-Rich:** Out-of-the-box support for pagination, sorting, filtering,
    column visibility, row selection (not yet implemented in this component but
    available in the library), and more.
  - **Performance:** Optimized for performance, especially with memoization and
    granular updates.
  - **Community Standard:** Widely adopted and well-maintained, making it a
    reliable choice.
  - **Separation of Concerns:** Clearly separates table logic from the UI
    presentation layer.

- **Why React & TypeScript?**
  - **Component-Based UI:** React's model is ideal for building reusable UI
    components like a data table.
  - **Type Safety:** TypeScript enhances developer productivity, reduces runtime
    errors, and improves code maintainability, especially for complex components
    with many props.
  - **Rich Ecosystem:** Leverages the vast React ecosystem for tooling and
    community support.

- **Why Tailwind CSS?**
  - **Utility-First:** Enables rapid UI development and easy customization
    without writing custom CSS for every small change.
  - **Maintainable:** Reduces the need for large, complex CSS files; styles are
    co-located with the markup.
  - **No Opinions (Mostly):** Unlike component libraries that come with heavy
    styling, Tailwind provides building blocks, allowing for a unique look and
    feel.

- **Modularity:**
  - The `DataTableToolbar` (for global search and column toggling) and
    `DataTablePaginationControls` are separate internal components. This
    enhances code clarity within `DataTable.tsx`. While not exported for direct
    external use in the current version, this internal modularity keeps the main
    component cleaner and could facilitate future enhancements or more granular
    customization if needed.

- **Accessibility Focus:**
  - A commitment was made to incorporate ARIA attributes (e.g., `aria-live`,
    `aria-label`, `role="status"`, `aria-checked`) and ensure interactive
    elements are keyboard navigable and focusable, aiming for WCAG compliance.

- **Inspiration:**
  - The design and feature set were inspired by reviewing best practices in
    existing data table solutions like those found in Dice UI and shadcn/ui's
    table component. However, the core UI rendering components in this
    `DataTable` are custom implementations built upon the headless foundation of
    TanStack Table, rather than direct adaptations of those libraries'
    pre-styled components.

## Future Improvements / Considerations

- **Per-Column Filtering:** Add UI and logic for filtering individual columns.
- **Row Selection:** Implement checkbox-based row selection (single and/or
  multi-select).
- **Server-Side Sorting & Filtering:** Extend controlled mode to support
  server-driven sorting and filtering.
- **Advanced Theming Options:** Explore more structured ways for users to theme
  the table beyond Tailwind utilities (e.g., CSS variables, theme provider).
- **Row Virtualization:** For very large datasets, integrate row virtualization
  (e.g., with `@tanstack/react-virtual`) to improve rendering performance.
- **Column Resizing & Reordering:** Add support for these interactive features.
- **Expandable Rows:** Allow rows to expand to show more detailed information.

## Contributing

Contributions are welcome! If you have suggestions, bug reports, or want to
contribute code, please feel free to:

1. Open an issue on the GitHub repository to discuss the change.
2. Fork the repository, make your changes, and submit a Pull Request.

Please ensure any contributions align with the project's coding style and
include relevant tests if applicable.

## License

MIT License
