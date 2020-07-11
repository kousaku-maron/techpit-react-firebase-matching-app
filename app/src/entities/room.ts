export type Room = {
  id: string
  name: string
  createdAt: Date
}

export type CreateRoom = Omit<Room, 'id' | 'createdAt'>

export const buildRoom = (id: string, data: firebase.firestore.DocumentData) => {
  const room: Room = {
    id,
    name: data.name,
    createdAt: data.createdAt,
  }

  return room
}
