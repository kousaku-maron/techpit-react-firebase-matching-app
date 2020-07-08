import { firestore } from '../firebase'

const roomsRef = firestore.collection('rooms')

export const getRoomRef = (id?: string) => {
  return id ? roomsRef.doc(id) : roomsRef.doc()
}
