import { firestore } from 'firebase-admin'

export type CloneUser = {
  id: string
  ref: firestore.DocumentReference
}

export type CreateCloneUser = Omit<CloneUser, 'id'>

export const buildCloneUser = (id: string, data: firestore.DocumentData) => {
  const user: CloneUser = {
    id,
    ref: data.ref,
  }

  return user
}
