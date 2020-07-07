import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Layout } from '../templates/Layout'
import { User } from '../../entities/user'

type Props = {
  firebaseUser: firebase.User
  user: User
}

export const ChatPage = ({ firebaseUser }: Props) => {
  return (
    <Layout firebaseUser={firebaseUser}>
      <Typography>チャット</Typography>
    </Layout>
  )
}
