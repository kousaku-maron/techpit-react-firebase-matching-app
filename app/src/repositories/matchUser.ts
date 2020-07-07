import { firestore } from '../firebase'

const usersRef = firestore.collection('users')

export const getMatchUserRef = (uid: string, matchUID: string) => {
  return usersRef.doc(uid).collection('matchUsers').doc(matchUID)
}
