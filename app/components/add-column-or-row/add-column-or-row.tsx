import { Modal } from "~/components/modal/modal"
import { FormEvent, useState } from "react"

export const AddColumnOrRow = ({
  buttonText,
  mutation,
}: {
  buttonText: string
  mutation: (title: string) => Promise<{ error?: { message: string } | undefined }>
}) => {
  const [showModal, setShowModal] = useState(false)
  const [title, setTitle] = useState("")
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!title.trim()) return

    const { error } = await mutation(title)
    if (!error) {
      setShowModal(false)
      setTitle("")
    } else {
      console.error("Error mutating:", error.message)
    }
  }
  return (
    <>
      <button className="app-button" onClick={() => setShowModal(true)}>
        {buttonText}
      </button>
      {showModal && (
        <Modal>
          <form className="pl-2 flex items-center self-start text-sm" onSubmit={handleSubmit}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="column name"
              className="p-1 border border-gray-300 rounded-l focus:outline-none"
            />
            <div className="ml-auto flex gap-2">
              <button
                type="submit"
                className="app-button-submit disabled:app-button-disabled disabled:cursor-not-allowed"
                disabled={title.length === 0}
              >
                submit
              </button>
              <button type="button" onClick={() => setShowModal(false)} className="app-button-warn">
                cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  )
}
