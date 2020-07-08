import { firestore } from '../firebase'

const roomsRef = firestore.collection('rooms')

export const getParticipateUserRef = (roomID: string, uid: string) => {
  return roomsRef.doc(roomID).collection('participateUsers').doc(uid)
}
