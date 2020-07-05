import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Layout } from '../templates/Layout'

type Props = {
  firebaseUser: firebase.User | null
  loading: boolean
}

export const HomePage = ({ firebaseUser, loading }: Props) => {
  return (
    <Layout firebaseUser={firebaseUser} loading={loading}>
      <Typography>ホーム</Typography>
    </Layout>
  )
}
