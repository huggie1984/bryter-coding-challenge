export const AddRowToGridMutation = `
  mutation AddRowToGrid($gridId: uuid!, $title: String!) {
    insert_Row_one(object: { grid_id: $gridId, title: $title }) {
      id
      title
    }
  }
`

export const AddDataGridMutation = `
  mutation AddDataGrid($name: String!) {
    insert_DataGrid_one(object: { name: $name }) {
      name
    }
  }
`

export const AddColumnToGridMutation = `
  mutation AddColumnToGrid($gridId: uuid!, $title: String!) {
    insert_GridColumn_one(object: { grid_id: $gridId, title: $title }) {
      id
      title
    }
  }
`

export const UpdateColumnTitleMutation = `
  mutation UpdateColumnTitle($columnId: uuid!, $title: String!) {
    update_GridColumn_by_pk(pk_columns: { id: $columnId }, _set: { title: $title }) {
      id
      title
    }
  }
`

export const UpdateRowTitleMutation = `
  mutation UpdateRowTitle($rowId: uuid!, $title: String!) {
    update_Row_by_pk(pk_columns: { id: $rowId }, _set: { title: $title }) {
      id
      title
    }
  }
`

export const UpdateCellContentMutation = `
  mutation UpdateCellContent($cellId: uuid!, $content: String!) {
    update_Cell_by_pk(pk_columns: { id: $cellId }, _set: { content: $content }) {
      id
      content
    }
  }
`

export const UpdateCellCommentMutation = `
  mutation UpdateCellComment($cellId: uuid!, $comment: String!) {
    update_Cell_by_pk(pk_columns: { id: $cellId }, _set: { comment: $comment }) {
      id
      comment
    }
  }
`
