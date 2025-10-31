import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type Agency } from '../data/schema'

type AgencyDialogType = 'invite' | 'add' | 'edit' | 'delete'

type AgencyContextType = {
  open: AgencyDialogType | null
  setOpen: (str: AgencyDialogType | null) => void
  currentRow: Agency | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Agency | null>>
}

const AgencyContext = React.createContext<AgencyContextType | null>(null)

export function AgencyProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<AgencyDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Agency | null>(null)

  return (
    <AgencyContext.Provider value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </AgencyContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAgency = () => {
  const agencyContext = React.useContext(AgencyContext)

  if (!agencyContext) {
    throw new Error('useAgency has to be used within <AgencyProvider>')
  }

  return agencyContext
}