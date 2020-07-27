import { firestore } from 'firebase-admin'

export type User = {
  id: string
  name: string
  thumbnailURL: string | null
  gender: 'male' | 'female'
  introduction: string
  createdAt: Date
  isPrepared: boolean
}

export const buildUser = (id: string, data: firestore.DocumentData) => {
  const user: User = {
    id,
    name: data.name,
    thumbnailURL: data.thumbnailURL,
    gender: data.gender,
    introduction: data.introduction,
    createdAt: data.createdAt,
    isPrepared: data.isPrepared,
  }

  return user
}
