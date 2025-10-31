import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type Admin } from '../data/schema'

type AdminDialogType = 'invite' | 'add' | 'edit' | 'delete'

type AdminContextType = {
  open: AdminDialogType | null
  setOpen: (str: AdminDialogType | null) => void
  currentRow: Admin | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Admin | null>>
}

const AdminContext = React.createContext<AdminContextType | null>(null)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<AdminDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Admin | null>(null)

  return (
    <AdminContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </AdminContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAdmin = () => {
  const adminContext = React.useContext(AdminContext)

  if (!adminContext) {
    throw new Error('useAdmin has to be used within <AdminProvider>')
  }

  return adminContext
}