import React from 'react'
import { AuthProvider } from './auth/context'

export const StoreProvider: React.FC<{}> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>
}
