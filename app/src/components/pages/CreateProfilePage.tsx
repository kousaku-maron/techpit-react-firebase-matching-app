import React from 'react'
import Layout from '../templates/Layout'
import CreateProfileCard from '../organisms/CreateProfileCard'

type Props = {
  firebaseUser: firebase.User
}

const CreateProfilePage = ({ firebaseUser }: Props) => {
  return (
    <Layout firebaseUser={firebaseUser}>
      <CreateProfileCard uid={firebaseUser.uid} />
    </Layout>
  )
}

export default CreateProfilePage
