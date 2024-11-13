import { Link, useLoaderData, useParams } from "@remix-run/react"
import { useMutation, useSubscription } from "urql"
import { Fragment, useState } from "react"
import {
  AddColumnToGridMutation,
  AddRowToGridMutation,
  UpdateCellCommentMutation,
  UpdateCellContentMutation,
  UpdateColumnTitleMutation,
  UpdateRowTitleMutation,
} from "~/graphql/mutations/mutations"
import { SingleDataGridSubscription } from "~/graphql/subscriptions/subscriptions"
import { Column } from "~/types/Column"
import { Row } from "~/types/Row"
import { Cell } from "~/types/Cell"
import { EditGridField } from "~/components/edit-grid-field/edit-grid-field"
import { AddColumnOrRow } from "~/components/add-column-or-row/add-column-or-row"
import { getUrqlClient } from "~/utils/urqlClient"
import { SingleDataGridQuery } from "~/graphql/queries/queries"
import { json } from "@remix-run/node"

// Reflection: look more into how we could optimise data fetching server side and subscribe on client side!
// loader while we wait for loader to fetch on the server!
// No time for tests, some good RTL test candidates here!
// Fix existing _index.spec.tsx, type check is also failing on this file!

export const loader = async ({ params }: { params: { gridId: string } }) => {
  const client = getUrqlClient()
  const gridId = params.gridId // Or however you obtain the grid ID

  const response = await client.query(SingleDataGridQuery, { id: gridId }).toPromise()

  if (response.error) throw new Error("Failed to load data")
  return json({ initialData: response.data })
}

export default function Index() {
  const {
    initialData,
  }: {
    initialData: {
      DataGrid_by_pk: { name: string; GridColumns: Column[]; Rows: Row[]; Cells: Cell[] }
    }
  } = useLoaderData()
  const { gridId } = useParams()
  const [editMode, setEditMode] = useState(false)
  const [, addRow] = useMutation(AddRowToGridMutation)
  const [, addColumn] = useMutation(AddColumnToGridMutation)
  const [, updateColumn] = useMutation(UpdateColumnTitleMutation)
  const [, updateRow] = useMutation(UpdateRowTitleMutation)
  const [, updateCellContent] = useMutation(UpdateCellContentMutation)
  const [, updateCellComment] = useMutation(UpdateCellCommentMutation)

  const [{ data: subscriptionData, fetching, error }] = useSubscription<{
    DataGrid_by_pk: { name: string; GridColumns: Column[]; Rows: Row[]; Cells: Cell[] }
  }>({
    query: SingleDataGridSubscription,
    variables: { id: gridId },
  })

  const data = subscriptionData || initialData

  return (
    <main className="w-full flex justify-center">
      <div className="container m-4 flex flex-col gap-4">
        <header className="flex flex-wrap gap-4 w-full p-2 bg-amber-200">
          <Link to="/" className="app-button flex gap-2">
            <img src="/home.svg" alt="home" width={20} height={20} /> <span>Home</span>
          </Link>
          <h1 className="text-3xl font-bold">
            Grid Name:{" "}
            <span className="font-semibold">
              {fetching && !data && "...loading"}
              {data?.DataGrid_by_pk && data.DataGrid_by_pk.name}
            </span>
          </h1>
          <div className="flex gap-4 ml-auto">
            <button className="app-button whitespace-nowrap" onClick={() => setEditMode(!editMode)}>
              Edit mode: {!editMode ? "Off" : "On"}
            </button>
            <AddColumnOrRow
              buttonText="+ Col"
              mutation={(title: string) => addColumn({ gridId, title })}
            />
            <AddColumnOrRow
              buttonText="+ Row"
              mutation={(title: string) => addRow({ gridId, title })}
            />
          </div>
        </header>
        {error && <p data-testid="error">Error: {error.message}</p>}
        {data?.DataGrid_by_pk && (
          <div className="flex flex-col">
            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns: `1fr repeat(${data.DataGrid_by_pk.GridColumns.length}, 1fr)`, // Adds an extra column for row titles
              }}
            >
              <div style={{ fontWeight: "bold", padding: "8px", backgroundColor: "#f0f0f0" }}></div>

              {data.DataGrid_by_pk.GridColumns.map((col) => (
                <EditGridField
                  editMode={editMode}
                  buttonStyles="p-2 flex w-full h-full gap-2 justify-between bg-gray-200 hover:bg-gray-300"
                  key={col.id}
                  mutation={(newContent: string) =>
                    updateColumn({ columnId: col.id, title: newContent })
                  }
                >
                  <h3 className="text-left">{col.title}</h3>
                </EditGridField>
              ))}

              {data.DataGrid_by_pk.Rows.map((row) => (
                <Fragment key={row.id}>
                  <EditGridField
                    editMode={editMode}
                    buttonStyles="p-2 flex w-full h-full gap-2 justify-between bg-gray-200 hover:bg-gray-300"
                    key={row.id}
                    mutation={(newContent: string) =>
                      updateRow({ rowId: row.id, title: newContent })
                    }
                  >
                    <h3 className="text-left">{row.title}</h3>
                  </EditGridField>
                  {data.DataGrid_by_pk.GridColumns.map((column) => {
                    const cell = data.DataGrid_by_pk.Cells.find(
                      (cell) => cell.row_id === row.id && cell.column_id === column.id,
                    )
                    return (
                      <div
                        key={cell!.id}
                        className="p-2 border border-gray-500 flex flex-col gap-2"
                      >
                        <EditGridField
                          editMode={editMode}
                          buttonStyles="p-2 flex w-full gap-2 justify-between hover:bg-gray-100 text-left"
                          mutation={(newContent: string) =>
                            updateCellContent({ cellId: cell!.id, content: newContent })
                          }
                        >
                          <p>{cell!.content}</p>
                        </EditGridField>
                        <EditGridField
                          editMode={editMode}
                          buttonStyles="p-2 flex w-full gap-2 justify-between hover:bg-gray-100 text-left"
                          mutation={(newContent: string) =>
                            updateCellComment({ cellId: cell!.id, comment: newContent })
                          }
                        >
                          <p>{cell!.comment}</p>
                        </EditGridField>
                      </div>
                    )
                  })}
                </Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
