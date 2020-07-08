import { firestore } from '../firebase'

const usersRef = firestore.collection('users')

export const getEntryRoomRef = (uid: string, roomID: string) => {
  return usersRef.doc(uid).collection('entryRooms').doc(roomID)
}
