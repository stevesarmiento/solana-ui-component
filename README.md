# Solana UI Kit: DataTable Component

## Introduction/Overview

The `DataTable` component is a reusable, accessible, and highly customizable
solution for displaying tabular data within web3 React applications.

**Key Benefits:**

- **Reusable:** Designed for easy integration into various projects.
- **Accessible:** Built with accessibility in mind, incorporating ARIA
  attributes and considerations for keyboard navigation.
- **Customizable:** Offers extensive customization options through props and
  Tailwind CSS.
- **Themable:** Includes a powerful theming system with pre-built themes.
- **Composable:** Modular architecture with separate components for rows,
  headers, toolbars, and more.
- **Modern Stack:** Leverages TanStack Table for headless UI and functionality,
  React for declarative UI, TypeScript for type safety, and Tailwind CSS for
  styling.

## Features List

- **Client-side Pagination:**
  - Page size selection
  - "Go to page" input
  - First/Last/Next/Previous page controls with intuitive chevron icons
- **Client-side Sorting:** Single-column sorting (ascending/descending) with
  visual indicators.
- **Global Text Filtering:** Search across all visible columns with a clean
  search input.
- **Column Visibility Toggle:** Allow users to show or hide individual columns
  via dropdown.
- **Row Actions:** Configurable dropdown menu for common row actions (view,
  edit, delete).
- **Customizable Cell and Header Rendering:** Full control over how cells and
  headers are rendered, thanks to TanStack Table's `ColumnDef`.
- **Loading and Empty States:** Clear visual feedback with skeleton loading
  states.
- **Type-Safe:** Built with TypeScript, ensuring robust and maintainable code.
- **Styled with Tailwind CSS:** Easily customize the appearance using utility
  classes or by extending your project's Tailwind configuration.
- **Theming System:** Switch between pre-built themes or create your own custom
  themes.
- **Accessibility:**
  - Uses appropriate ARIA attributes (`aria-live`, `aria-busy`, `aria-label`,
    `role="status"`, etc.).
  - Focus management for interactive elements.

## Component Architecture

The DataTable is built with a modular, composable architecture for maximum
flexibility:

- `data-table.tsx`: The main component that orchestrates all the subcomponents.
- `data-table-header.tsx` Handles the table header rendering with sort
  indicators.
- `data-table-row.tsx` Provides customizable row rendering.
- `data-table-toolbar.tsx` Container for search and column visibility controls.
- `data-table-pagination.tsx` Manages pagination UI and interactions.
- `data-table-row-actions.tsx` Dropdown menu for row-level actions.
- `data-table-skeleton.tsx` Loading placeholder with animated elements.
- `use-data-table.ts` Custom hook that encapsulates table state management.
- `themes.ts` Central theme definition and management.

This architecture allows developers to use the entire table as a unit or to
compose their own tables using the individual pieces.

## Installation

**Prerequisites:**

- Node.js (LTS version recommended)
- npm, yarn, or pnpm

**Steps:**

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/stevesarmiento/solana-ui-component.git]
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

## Basic Usage Example

Here's a minimal example of how to use the `<DataTable />` component:

```tsx
import React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./components/DataTable/data-table";
import { DataTableRowActions } from "./components/DataTable/data-table-row-actions";

// Define your data type
interface MyDataType {
  id: string;
  name: string;
  age: number;
  email: string;
}

// Sample data
const myData: MyDataType[] = [
  { id: "1", name: "Anatoly", age: 30, email: "toly@solana.com" },
  { id: "2", name: "Raj", age: 45, email: "ikillyou@solana.com" },
];

// Define your columns
const myColumns: ColumnDef<MyDataType, unknown>[] = [
  {
    accessorKey: "name",
    header: "Full Name",
    meta: { columnLabel: "Participant Name" }, // Optional: for column toggle display
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "email",
    header: "Email Address",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        onView={(data) => alert(`Viewing: ${data.name}`)}
        onEdit={(data) => alert(`Editing: ${data.name}`)}
        onDelete={(data) => {
          if (confirm(`Delete ${data.name}?`)) {
            alert("Deleted!");
          }
        }}
      />
    ),
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
        theme="default" // Optional: 'default' or 'windows95'
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
| `isLoading`         | `boolean`                     | `false`                 | Indicates if the table is currently loading data. Shows skeleton UI when true.                                     |
| `emptyStateMessage` | `React.ReactNode`             | `"No data available."`  | Custom message or React node to display when `data` is empty and not loading.                                      |
| `pageCount`         | `number`                      | `undefined`             | The total number of pages available. Providing this enables manual/server-side pagination.                         |
| `pageIndex`         | `number`                      | `undefined`             | The current page index (0-based). Used for controlled pagination.                                                  |
| `pageSize`          | `number`                      | `undefined`             | The number of rows to display per page. Used for controlled pagination.                                            |
| `onPageIndexChange` | `(pageIndex: number) => void` | `undefined`             | Callback function invoked when the page index changes. Used for controlled pagination.                             |
| `onPageSizeChange`  | `(pageSize: number) => void`  | `undefined`             | Callback function invoked when the page size changes. Used for controlled pagination.                              |
| `pageSizeOptions`   | `number[]`                    | `[10, 20, 30, 50, 100]` | Array of page size options for the user to select in the pagination controls.                                      |
| `className`         | `string`                      | `''`                    | Custom CSS class name to apply to the main wrapper div of the DataTable.                                           |
| `tableId`           | `string`                      | `undefined`             | A unique ID for the table element. Useful for accessibility (e.g., `aria-labelledby`) or for targeting with tests. |
| `renderRow`         | `Function`                    | `undefined`             | Optional custom row renderer function for complete control over row rendering.                                     |
| `renderHeader`      | `Function`                    | `undefined`             | Optional custom header renderer function for complete control over header rendering.                               |
| `theme`             | `'default' \| 'windows95'`    | `'default'`             | Visual theme to apply to the entire table. Currently supports 'default' and 'windows95'.                           |

_(Where `TData` is a generic type extending `{ id: string }`)_

## Theming System

The DataTable component includes a robust theming system that allows for
consistent styling across all parts of the table.

### Available Themes

The component currently ships with two built-in themes:

1. **Default Theme**: A modern, clean interface with subtle shadows, rounded
   corners, and a professional color scheme.

2. **Windows 95 Theme**: A nostalgic theme inspired by the classic Windows 95
   UI, featuring:
   - Gray backgrounds with sharp edges
   - Classic 3D-style borders (light on top/left, dark on bottom/right)
   - Chunky buttons and controls
   - Pixel-perfect styling reminiscent of retro interfaces

### Using Themes

To apply a theme, simply pass the `theme` prop to the DataTable component:

```tsx
// Modern theme (default)
<DataTable 
  data={myData} 
  columns={myColumns}
  theme="default" 
/>

// Windows 95 theme
<DataTable 
  data={myData} 
  columns={myColumns}
  theme="windows95" 
/>
```

### Theme Consistency

The theming system ensures consistent styling across all aspects of the table:

- Table headers and rows
- Toolbar controls (search, column visibility)
- Pagination controls
- Row action menus
- Loading skeletons
- Buttons and interactive elements

### Creating Custom Themes

The theming system is extensible. To create your own theme:

1. Modify the `Theme` type in `themes.ts` to include your new theme name
2. Add your theme's styles to the `themes` object in the same file
3. Apply your theme using the `theme` prop

Example of how to extend the theming system:

```tsx
// In themes.ts
export type Theme = "default" | "windows95" | "myCustomTheme";

// Add your theme to the themes object
export const themes: Record<Theme, ThemeStyles> = {
  default: {/* existing styles */},
  windows95: {/* existing styles */},
  myCustomTheme: {
    // Define your custom theme styles here
    table: "min-w-full border-2 border-purple-300 overflow-hidden",
    headerWrapper: "bg-purple-100",
    // ...other style properties
  },
};
```

## Advanced Usage

### Custom Row Rendering

The `renderRow` prop allows complete customization of how rows are rendered:

```tsx
<DataTable
  data={transactions}
  columns={columns}
  renderRow={({ row, table }) => (
    <tr key={row.id} className="bg-indigo-50 hover:bg-indigo-100">
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id} className="px-6 py-4 text-indigo-800">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  )}
/>;
```

### Custom Header Rendering

Similarly, use the `renderHeader` prop for custom header styling:

```tsx
<DataTable
  data={transactions}
  columns={columns}
  renderHeader={({ headerGroups }) => (
    <thead className="bg-indigo-700 text-white">
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th key={header.id} className="px-6 py-3 text-left">
              {flexRender(
                header.column.columnDef.header,
                header.getContext(),
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  )}
/>;
```

### Row Actions

The `DataTableRowActions` component provides a dropdown menu for common row
actions:

```tsx
<DataTableRowActions
  row={row}
  onView={(data) => navigate(`/users/${data.id}`)}
  onEdit={(data) => openEditModal(data)}
  onDelete={(data) => deleteUser(data.id)}
  disabled={!hasPermission("edit_users")}
  theme="default" // Match this with your DataTable theme
/>;
```

## Styling Guide

The `DataTable` component is styled using **Tailwind CSS**. This provides
several ways to customize its appearance:

1. **Wrapper Classes:** Apply Tailwind utility classes directly to elements that
   wrap the `<DataTable />` component in your application.

2. **`className` Prop:** Pass a `className` string to the `<DataTable />`
   component itself. This class will be applied to the main root `div` element
   of the table.
   ```tsx
   <DataTable 
     data={...} 
     columns={...} 
     className="my-custom-styles border-2 border-blue-500 rounded-xl" 
   />
   ```

3. **Theming System:** Use the built-in themes or create your own custom theme.
   ```tsx
   <DataTable 
     data={...} 
     columns={...} 
     theme="windows95" 
   />
   ```

4. **Custom Component Rendering:** Use the `renderRow`, `renderHeader`, or
   create custom cell renderers to completely control the appearance of table
   elements.

5. **Tailwind Configuration:** For more global changes (like theming or custom
   variants), you can modify your project's `index.css` file.

## Implementation Notes

### Component Structure

The DataTable follows a modular design pattern:

1. **Main Component (`data-table.tsx`)**: Orchestrates the entire table and
   manages subcomponents.

2. **Hook (`use-data-table.ts`)**: Encapsulates all table state logic and
   interactions with TanStack Table.

3. **Theming System (`themes.ts`)**: Centralized definition of theme styles for
   consistent appearance across all components.

4. **Specialized Subcomponents**:
   - `data-table-header.tsx`: Header rendering with sort indicators
   - `data-table-row.tsx`: Row rendering and customization
   - `data-table-toolbar.tsx`: Search and column visibility controls
   - `data-table-pagination.tsx`: Page navigation and size selection
   - `data-table-row-actions.tsx`: Dropdown menu for row operations
   - `data-table-skeleton.tsx`: Loading state placeholders

This structure enhances maintainability and allows for selective component
reuse.

### Accessibility Features

- Screen reader announcements for state changes (loading, empty)
- ARIA attributes throughout components (`aria-label`, `aria-live`, etc.)
- Keyboard navigation support for interactive elements
- Proper heading structure and semantic HTML elements
- Visual indicators for interactive states (hover, focus, disabled)

## Browser Support

The component is tested and compatible with:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Mobile responsiveness is built-in, with special considerations for smaller
screens.

## License

MIT License
