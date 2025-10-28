import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import type { ComplaintItem } from '../data/schema'

type ComplaintDialogType = 'create' | 'update' | 'delete' | 'import'

type ComplaintContextType = {
  open: ComplaintDialogType | null
  setOpen: (str: ComplaintDialogType | null) => void
  currentRow: ComplaintItem | null
  setCurrentRow: React.Dispatch<React.SetStateAction<ComplaintItem | null>>
}

const ComplaintContext = React.createContext<ComplaintContextType | null>(null)

export function ComplaintProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<ComplaintDialogType>(null)
  const [currentRow, setCurrentRow] = useState<ComplaintItem | null>(null)

  return (
    <ComplaintContext.Provider
      value={{ open, setOpen, currentRow, setCurrentRow }}
    >
      {children}
    </ComplaintContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useComplaint = () => {
  const ctx = React.useContext(ComplaintContext)

  if (!ctx) {
    throw new Error('useComplaint has to be used within <ComplaintProvider>')
  }

  return ctx
}
