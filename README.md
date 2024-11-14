# Grid UI task

To start the application please run 
- `npm i`
- `npm run dev`
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
