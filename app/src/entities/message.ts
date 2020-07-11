export type Message = {
  id: string
  text: string
  writerRef: firebase.firestore.DocumentReference
  createdAt: Date
}

export type CreateMessage = Omit<Message, 'id' | 'createdAt'>

export const buildMessage = (id: string, data: firebase.firestore.DocumentData) => {
  const message: Message = {
    id,
    text: data.text,
    writerRef: data.writerRef,
    createdAt: data.createdAt,
  }

  return message
}
