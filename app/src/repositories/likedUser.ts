import { firestore } from '../firebase'
import { CloneUser, buildCloneUser } from '../entities/cloneUser'

const usersRef = firestore.collection('users')

export const getLikedUserRef = (uid: string, likedUID: string) => {
  return usersRef.doc(uid).collection('likedUsers').doc(likedUID)
}

export const createLikedUser = async (ref: firebase.firestore.DocumentReference, user: CloneUser) => {
  await ref.set(user)
}

export const getLikedUsers = async (uid: string) => {
  const snapshot = await usersRef.doc(uid).collection('likedUsers').get()
  const users = snapshot.docs.map((doc) => buildCloneUser(doc.id, doc.data()))

  return users
}
