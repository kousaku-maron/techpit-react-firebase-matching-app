import firebase, { firestore, storage } from '../firebase'
import { CreateUser, UpdateUser, buildUser } from '../entities/user'

const usersRef = firestore.collection('users')
const thumbnailsRef = storage.ref('thumbnails')

export const getUserRef = (uid: string) => {
  return usersRef.doc(uid)
}

const putThumbnailData = async (uid: string, thumbnailData: File) => {
  const thumbnailRef = thumbnailsRef.child(`${uid}/thumbnail01.png`)
  const task = thumbnailRef.put(thumbnailData, { contentType: 'image/png' })

  return new Promise<{ thumbnailURL: string }>((resolve, reject) => {
    task
      .then((snapshop) => snapshop.ref.getDownloadURL())
      .then((url) => resolve({ thumbnailURL: url }))
      .catch((e) => reject(e))
  })
}

export const getUser = async (uid: string) => {
  const userRef = getUserRef(uid)
  const userSnapshot = await userRef.get()
  const user = buildUser(userSnapshot.id, userSnapshot.data()!)
  return user
}

export const createUser = async (ref: firebase.firestore.DocumentReference, user: CreateUser) => {
  const thumbnailURL = user.thumbnailData ? (await putThumbnailData(ref.id, user.thumbnailData)).thumbnailURL : null

  await ref.set({
    name: user.name,
    thumbnailURL,
    gender: user.gender,
    introduction: user.introduction,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    isPrepared: false,
  })
}

export const updateUser = async (ref: firebase.firestore.DocumentReference, user: UpdateUser) => {
  const thumbnailURL = user.thumbnailData ? (await putThumbnailData(ref.id, user.thumbnailData)).thumbnailURL : null

  await ref.update({
    name: user.name,
    thumbnailURL,
    introduction: user.introduction,
  })
}
