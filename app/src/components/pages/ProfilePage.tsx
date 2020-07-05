import React from 'react'
import { Layout } from '../templates/Layout'
import { ProfileCard } from '../organisms/ProfileCard'

type Props = {
  firebaseUser: firebase.User | null
  loading: boolean
}

export const ProfilePage = ({ firebaseUser, loading }: Props) => {
  return (
    <Layout firebaseUser={firebaseUser} loading={loading}>
      {firebaseUser && <ProfileCard uid={firebaseUser.uid} />}
    </Layout>
  )
}
