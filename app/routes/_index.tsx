import { useMutation, useSubscription } from "urql"
import { json } from "@remix-run/node"
import { DataGridSubscription } from "~/graphql/subscriptions/subscriptions"
import { Grid } from "~/types/Grid"
import { getUrqlClient } from "~/utils/urqlClient"
import { DataGridQuery } from "~/graphql/queries/queries"
import { Link, useLoaderData } from "@remix-run/react"
import React, { useState } from "react"
import { AddDataGridMutation } from "~/graphql/mutations/mutations"

export const loader = async () => {
  const client = getUrqlClient()
  const response = await client.query(DataGridQuery, {}).toPromise()

  if (response.error) throw new Error("Failed to load data")
  return json({ initialData: response.data })
}

export default function Index() {
  const { initialData }: { initialData: Grid[] } = useLoaderData()
  const [{ data: subscriptionData, fetching, error }] = useSubscription({
    query: DataGridSubscription,
  })
  const [gridName, setGridName] = useState("")
  const [, addGrid] = useMutation(AddDataGridMutation)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!gridName.trim()) return

    const { error } = await addGrid({ name: gridName })
    if (!error) setGridName("")
  }

  const data = subscriptionData || initialData

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Data Grids</h1>

      {fetching && !data && <p data-testid="loading">Loading...</p>}
      {error && <p data-testid="error">Error: {error.message}</p>}

      {data?.DataGrid && (
        <>
          <ul data-testid="grid-list" className="flex flex-col gap-2 mb-4">
            {data?.DataGrid.map((grid: { id: string; name: string }) => (
              <li key={grid.id}>
                <Link
                  to={`/grid/${grid.id}`}
                  className="block cursor-pointer font-bold p-2 rounded border w-full hover:bg-gray-200 hover:text-black text-left"
                >
                  {grid.name}
                </Link>
              </li>
            ))}
          </ul>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="text"
              value={gridName}
              onChange={(e) => setGridName(e.target.value)}
              placeholder="Enter grid name"
              className="border rounded p-2 mb-2"
              data-testid="grid-input"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
              data-testid="add-button"
            >
              Add Data Grid
            </button>
          </form>
        </>
      )}
    </div>
  )
}
