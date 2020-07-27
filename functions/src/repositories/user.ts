import { firestore } from 'firebase-admin'

const usersRef = firestore().collection('users')

export const getUserRef = (uid: string) => {
  return usersRef.doc(uid)
}

export const getUsersRef = () => {
  return usersRef
}
