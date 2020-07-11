import React from 'react'
import { Layout } from '../templates/Layout'
import { ProfileCard } from '../organisms/ProfileCard'
import { User } from '../../entities/user'

type Props = {
  firebaseUser: firebase.User
  user: User
}

export const ProfilePage = ({ firebaseUser }: Props) => {
  return (
    <Layout firebaseUser={firebaseUser}>
      <ProfileCard uid={firebaseUser.uid} />
    </Layout>
  )
}
