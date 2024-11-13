export const DataGridSubscription = `
  subscription GetDataGrids {
    DataGrid {
      id
      name
    }
  }
`

export const SingleDataGridSubscription = `
  subscription GetDataGridById($id: uuid!) {
    DataGrid_by_pk(id: $id) {
      id
      name
      Rows(order_by: { id: asc }) { 
        id
        title
      }
      GridColumns(order_by: { id: asc }) { 
        id
        title
      }
      Cells {
        row_id
        id
        grid_id
        content
        comment
        column_id
      }
    }
  }
`
