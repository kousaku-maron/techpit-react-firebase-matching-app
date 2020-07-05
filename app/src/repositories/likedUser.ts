import { firestore } from '../firebase'
import { CloneUser } from '../entities/cloneUser'

const usersRef = firestore.collection('users')

export const getLikedUserRef = (uid: string, likedUserUID: string) => {
  return usersRef.doc(uid).collection('likedUsers').doc(likedUserUID)
}

export const createLikedUser = async (ref: firebase.firestore.DocumentReference, user: CloneUser) => {
  try {
    await ref.set(user)
  } catch (e) {
    console.warn(e)
  }
}
