import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Layout } from '../templates/Layout'

type Props = {
  firebaseUser: firebase.User | null
  loading: boolean
}

export const NotFoundPage = ({ firebaseUser, loading }: Props) => {
  return (
    <Layout firebaseUser={firebaseUser} loading={loading}>
      <Typography>404 | Not Found</Typography>
    </Layout>
  )
}
