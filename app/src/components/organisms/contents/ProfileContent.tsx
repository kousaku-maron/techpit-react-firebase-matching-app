import React from 'react'
import { ProfileCard } from '../ProfileCard'

type Props = {
  uid: string
}

export const ProfileContent = ({ uid }: Props) => {
  return <ProfileCard uid={uid} />
}
