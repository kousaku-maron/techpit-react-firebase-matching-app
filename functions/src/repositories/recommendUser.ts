import { firestore } from 'firebase-admin'

const usersRef = firestore().collection('users')

export const getRecommendUserRef = (uid: string, recommendUID: string) => {
  return usersRef.doc(uid).collection('recommendUsers').doc(recommendUID)
}

export const getRecommendUsersRef = (uid: string) => {
  return usersRef.doc(uid).collection('recommendUsers')
}
