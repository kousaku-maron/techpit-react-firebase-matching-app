import React from 'react'
import Layout from '../templates/Layout'
import ChatCard from '../organisms/ChatCard'
import { User } from '../../entities/user'

type Props = {
  firebaseUser: firebase.User
  user: User
}

const ChatPage = ({ firebaseUser }: Props) => {
  return (
    <Layout firebaseUser={firebaseUser}>
      <ChatCard uid={firebaseUser.uid} />
    </Layout>
  )
}

export default ChatPage
