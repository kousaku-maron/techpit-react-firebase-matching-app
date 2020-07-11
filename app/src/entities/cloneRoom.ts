export type CloneRoom = {
  id: string
  ref: firebase.firestore.DocumentReference
}

export type CreateCloneRoom = Omit<CloneRoom, 'id'>

export const buildCloneRoom = (id: string, data: firebase.firestore.DocumentData) => {
  const room: CloneRoom = {
    id,
    ref: data.ref,
  }

  return room
}
