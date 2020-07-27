import { firestore } from 'firebase-admin'
import { buildCloneUser } from '../entities/cloneUser'

const usersRef = firestore().collection('users')

export const getMatchUserRef = (uid: string, matchUID: string) => {
  return usersRef.doc(uid).collection('matchUsers').doc(matchUID)
}

export const getMatchUsers = async (uid: string) => {
  const snapshot = await usersRef.doc(uid).collection('matchUsers').get()
  const users = snapshot.docs.map((doc) => buildCloneUser(doc.id, doc.data()))

  return users
}
