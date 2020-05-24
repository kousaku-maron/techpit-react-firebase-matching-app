import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { StoreProvider } from './store/StoreProvider'
import { MainPage } from './components/pages/MainPage'

const App = () => {
  return (
    <StoreProvider>
      <CssBaseline />
      <MainPage />
    </StoreProvider>
  )
}

export default App
