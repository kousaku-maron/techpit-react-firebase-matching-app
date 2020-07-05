export type CloneUser = {
  ref: firebase.firestore.DocumentReference
}

export const buildCloneUser = (id: string, data: firebase.firestore.DocumentData) => {
  const user: CloneUser = {
    ref: data.ref,
  }

  return user
}
