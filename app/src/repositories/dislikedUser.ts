import { firestore } from '../firebase'
import { CreateCloneUser, buildCloneUser } from '../entities/cloneUser'

const usersRef = firestore.collection('users')

export const getDislikedUserRef = (uid: string, dislikedUID: string) => {
  return usersRef.doc(uid).collection('dislikedUsers').doc(dislikedUID)
}

export const createDislikedUser = async (ref: firebase.firestore.DocumentReference, user: CreateCloneUser) => {
  await ref.set(user)
}

export const getDislikedUsers = async (uid: string) => {
  const snapshot = await usersRef.doc(uid).collection('dislikedUsers').get()
  const users = snapshot.docs.map((doc) => buildCloneUser(doc.id, doc.data()))

  return users
}
