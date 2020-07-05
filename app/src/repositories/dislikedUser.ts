import { firestore } from '../firebase'
import { CloneUser } from '../entities/cloneUser'

const usersRef = firestore.collection('users')

export const getDislikedUserRef = (uid: string, dislikedUserUID: string) => {
  return usersRef.doc(uid).collection('dislikedUsers').doc(dislikedUserUID)
}

export const createDislikedUser = async (ref: firebase.firestore.DocumentReference, user: CloneUser) => {
  try {
    await ref.set(user)
  } catch (e) {
    console.warn(e)
  }
}
