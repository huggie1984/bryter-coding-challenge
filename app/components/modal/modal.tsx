import { ReactNode } from "react"

export const Modal = ({ children }: { children: ReactNode }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-6">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-[550px]">{children}</div>
  </div>
)
