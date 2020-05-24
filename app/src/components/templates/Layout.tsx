import React from 'react'
import { Header } from '../organisms/Header'

export const Layout: React.FC<{}> = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      {children}
    </React.Fragment>
  )
}
