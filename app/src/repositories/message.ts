import firebase, { firestore } from '../firebase'
import { CreateMessage } from '../entities/message'

const roomsRef = firestore.collection('rooms')

export const getMessageRef = (roomID: string, messageID?: string) => {
  return messageID
    ? roomsRef.doc(roomID).collection('messages').doc(messageID)
    : roomsRef.doc(roomID).collection('messages').doc()
}

export const getMessagesRef = (roomID: string) => {
  return roomsRef.doc(roomID).collection('messages')
}

export const createMessage = async (ref: firebase.firestore.DocumentReference, message: CreateMessage) => {
  await ref.set({ ...message, createdAt: firebase.firestore.FieldValue.serverTimestamp() })
}
