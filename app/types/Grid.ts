import { Row } from "~/types/Row"
import { Column } from "~/types/Column"
import { Cell } from "~/types/Cell"

export type Grid = {
  id: string
  name: string
  Rows: Row[]
  GridColumns: Column[]
  Cells: Cell[]
}
