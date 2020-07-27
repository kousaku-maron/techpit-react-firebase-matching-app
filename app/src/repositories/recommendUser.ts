import { firestore } from '../firebase'
import { buildCloneUser } from '../entities/cloneUser'

const usersRef = firestore.collection('users')

export const getRecommendUserRef = (uid: string, recommendUID: string) => {
  return usersRef.doc(uid).collection('recommendUsers').doc(recommendUID)
}

export const getRecommendUsersRef = (uid: string) => {
  return usersRef.doc(uid).collection('recommendUsers')
}

export const getRecommendUsers = async (uid: string) => {
  const snapshot = await usersRef.doc(uid).collection('recommendUsers').get()
  const users = snapshot.docs.map((doc) => buildCloneUser(doc.id, doc.data()))

  return users
}
