import React from 'react'
import Typography from '@material-ui/core/Typography'
import Layout from '../templates/Layout'
import { User } from '../../entities/user'

type Props = {
  firebaseUser: firebase.User
  user: User
}

const NotFoundPage = ({ firebaseUser }: Props) => {
  return (
    <Layout firebaseUser={firebaseUser}>
      <Typography>404 | Not Found</Typography>
    </Layout>
  )
}

export default NotFoundPage
