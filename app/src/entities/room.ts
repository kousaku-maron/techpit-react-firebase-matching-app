export type Room = {
  id: string
  name: string
}

export type CreateRoom = Omit<Room, 'id'>

export const buildRoom = (id: string, data: firebase.firestore.DocumentData) => {
  const room: Room = {
    id,
    name: data.name,
  }

  return room
}
