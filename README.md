# Grid UI task

###

**Objective**: Build a UI for a Dynamic Data Grid Editor that interacts with the provided GraphQL backend to manage a set of **Data Grids**, including adding, updating and managing rows and columns. The goal is to demonstrate your skills in frontend development, focusing on UI/UX, React, and efficient GraphQL integration.

### Problem Statement:

You are tasked with building an interface for a **Data Grid Management System**. The system consists of multiple grids, each containing dynamically generated rows and columns. Your UI should allow users to:

1. **Create and Select Data Grids**:
   - Display a list of all available grids.
   - Allow the creation of new grids.
   - Enable switching between different grids.
2. **Manage Rows and Columns in Each Grid**:
   - Users can add new rows to a grid. Each row should have a unique title (e.g., `Row Title 1`, `Product A`).
   - Users can add new columns to a grid. Each column should have a unique title (e.g., `Column Title 1`, `Description`, `Price`).
   - Users can edit the titles of existing columns or rows in-place.
3. **Display Cells**:
   - Each cell is created and filled automatically by the API whenever a new row or column are added. A cell lives at the intersection of a row and a column.
   - Cells contain two fields:
     - `content`: The main value of the cell.
     - `comment`: An additional notes field.
   - If time permits, make cells editable to update the `content` and `comment` directly in the UI.
4. **Real-Time Updates**:
   - Ensure that the UI reflects any changes made to the grid, such as when rows or columns are added or edited.
   - Optionally, Use GraphQL subscriptions to handle these real-time updates.

### Provided Backend:

We have set up a GraphQL backend using Hasura with the following schema:

- **DataGrid**: Represents a grid.
  - `id` (UUID): Unique identifier for the grid.
  - `name` (String): Name of the grid.
- **Row**: Represents a row in a specific grid.
  - `id` (UUID): Unique identifier for the row.
  - `grid_id` (UUID): Reference to the `DataGrid`.
  - `title` (String): Title of the row.
- **GridColumn**: Represents a column in a specific grid.
  - `id` (UUID): Unique identifier for the column.
  - `grid_id` (UUID): Reference to the `DataGrid`.
  - `title` (String): Title of the column.
- **Cell**: Represents a cell in the grid at the intersection of a row and a column.
  - `id` (UUID): Unique identifier for the cell.
  - `grid_id` (UUID): Reference to the `DataGrid`.
  - `row_id` (UUID): Reference to the `Row`.
  - `column_id` (UUID): Reference to the `GridColumn`.
  - `content` (String): Main content of the cell.
  - `comment` (String): Optional comment or description.

**GraphQL Playground URL**:

[Public GraphiQL Playground](https://cloud.hasura.io/public/graphiql?endpoint=https%3A%2F%2Fnext-werewolf-59.hasura.app%2Fv1%2Fgraphql)

### GraphQL API Operations:

You can use the following operations, Feel free to use any other operations needed for improving the UX:

1. **Queries**:
   - Fetch the list of grids.
   - Fetch the rows and columns of a selected grid.
   - Fetch cells for a given grid, row, or column.
2. **Mutations**:
   - Add a new grid.
   - Add a new row.
   - Add a new column.
   - Update cell values (`content` and `comment`) if implementing the bonus cell editing feature.
3. **Subscriptions**:
   - Subscribe to changes in the grid, including new rows, columns, or cell updates.

### Task Requirements:

1. **Frontend**:
   - Use **React** and **TypeScript**.
   - Use **GraphQL** for data fetching (using any GraphQL client like `urql` or `Apollo`).
   - Feel free to use **TailwindCSS** for styling.
   - Optionally, Implement state management using **React Context**, **Redux**, or any other suitable state library.
2. **UI Functionality**:
   - Implement a UI that allows the creation of new grids and dynamically manages the addition of rows and columns.
   - Build a data table that displays rows and columns for the selected grid.
   - Make the table cells editable, with a clear visual distinction for `content` and `comment` fields (if implementing the bonus).
3. **Real-Time Updates**:
   - Use GraphQL subscriptions to handle real-time updates whenever rows, columns, or cells are added or modified.

### **Important Notes**:

- **Cutting corners** is perfectly fine! This task is designed to assess **how you approach problems** and **build solutions** rather than focusing on perfect implementation.
- **Prioritize the core functionality** (grid creation, adding rows and columns) first. If you have extra time, move on to the bonus features.
- Use any library or tools that you are comfortable with for building the frontend.

### Bonus Points:

- Implementing the **cell editing** functionality for updating `content` and `comment` fields.
- Using **React Remix** for routing and data loading.
- Implementing additional features like **drag-and-drop** reordering of columns and rows.
- Adding **inline validation** for cell values.
- Building a well-structured and reusable component architecture.
- Making the design **responsive** for both desktop and mobile views.

### Evaluation Criteria:

- **Code Quality**: Clean, well-tested code with clear separation of concerns.
- **UI/UX**: User-friendly and visually appealing interface.
- **Functionality**: Full implementation of the required features.
- **Use of GraphQL**: Efficient querying, mutation, and subscription usage.
- **Time Management**: Please don’t spend longer than 4 hours on this task. Prioritize the core features first and hand in whatever you managed to complete within this time period..

### How to use this Repo

- 📖 [Remix docs](https://remix.run/docs)

## How to setup

- Fork the repo
- Clone your fork locally
- Install dependencies

```shellscript
npm install
```

- Push your changes to your fork

## Development

Run the dev server:

```shellscript
npm run dev
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
