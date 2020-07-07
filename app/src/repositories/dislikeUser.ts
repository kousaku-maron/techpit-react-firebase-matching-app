import { firestore } from '../firebase'
import { CloneUser, buildCloneUser } from '../entities/cloneUser'

const usersRef = firestore.collection('users')

export const getDislikeUserRef = (uid: string, dislikeUID: string) => {
  return usersRef.doc(uid).collection('dislikeUsers').doc(dislikeUID)
}

export const createDislikeUser = async (ref: firebase.firestore.DocumentReference, user: CloneUser) => {
  await ref.set(user)
}

export const getDislikeUsers = async (uid: string) => {
  const snapshot = await usersRef.doc(uid).collection('dislikeUsers').get()
  const users = snapshot.docs.map((doc) => buildCloneUser(doc.id, doc.data()))

  return users
}
