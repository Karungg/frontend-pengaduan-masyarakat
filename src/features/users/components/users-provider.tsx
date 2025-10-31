import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type User } from '../data/schema'

type UserDialogType = 'invite' | 'add' | 'edit' | 'delete'

type UserContextType = {
  open: UserDialogType | null
  setOpen: (str: UserDialogType | null) => void
  currentRow: User | null
  setCurrentRow: React.Dispatch<React.SetStateAction<User | null>>
}

const UserContext = React.createContext<UserContextType | null>(null)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<UserDialogType>(null)
  const [currentRow, setCurrentRow] = useState<User | null>(null)

  return (
    <UserContext.Provider value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </UserContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const userContext = React.useContext(UserContext)

  if (!userContext) {
    throw new Error('useUser has to be used within <UserProvider>')
  }

  return userContext
}
