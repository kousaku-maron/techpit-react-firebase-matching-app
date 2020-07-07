import { firestore } from '../firebase'
import { CloneUser, buildCloneUser } from '../entities/cloneUser'

const usersRef = firestore.collection('users')

export const getLikeUserRef = (uid: string, likeUID: string) => {
  return usersRef.doc(uid).collection('likeUsers').doc(likeUID)
}

export const createLikeUser = async (ref: firebase.firestore.DocumentReference, user: CloneUser) => {
  await ref.set(user)
}

export const getLikeUsers = async (uid: string) => {
  const snapshot = await usersRef.doc(uid).collection('likeUsers').get()
  const users = snapshot.docs.map((doc) => buildCloneUser(doc.id, doc.data()))

  return users
}
