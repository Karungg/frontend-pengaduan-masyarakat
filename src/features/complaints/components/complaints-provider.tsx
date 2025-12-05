import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type Complaint } from '../data/schema'

type ComplaintsDialogType = 'create' | 'update' | 'delete' | 'import'

type ComplaintsContextType = {
  open: ComplaintsDialogType | null
  setOpen: (str: ComplaintsDialogType | null) => void
  currentRow: Complaint | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Complaint | null>>
}

const ComplaintsContext = React.createContext<ComplaintsContextType | null>(
  null
)

export function ComplaintsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useDialogState<ComplaintsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Complaint | null>(null)

  return (
    <ComplaintsContext.Provider
      value={{ open, setOpen, currentRow, setCurrentRow }}
    >
      {children}
    </ComplaintsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useComplaints = () => {
  const complaintsContext = React.useContext(ComplaintsContext)

  if (!complaintsContext) {
    throw new Error('useComplaints has to be used within <ComplaintsContext>')
  }

  return complaintsContext
}
