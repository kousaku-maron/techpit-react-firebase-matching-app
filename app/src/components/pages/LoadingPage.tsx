import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Layout } from '../templates/Layout'

export const LoadingPage = () => {
  return (
    <Layout>
      <CircularProgress />
    </Layout>
  )
}
