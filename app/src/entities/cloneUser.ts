export type CloneUser = {
  id: string
  ref: firebase.firestore.DocumentReference
}

export type CreateCloneUser = Omit<CloneUser, 'id'>

export const buildCloneUser = (id: string, data: firebase.firestore.DocumentData) => {
  const user: CloneUser = {
    id,
    ref: data.ref,
  }

  return user
}
