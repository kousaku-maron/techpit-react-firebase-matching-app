import { firestore, storage } from '../firebase'
import { CreateUser, UpdateUser } from '../entities/user'

const usersRef = firestore.collection('users')
const thumbnailsRef = storage.ref('thumbnails')

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

export const createUser = async (id: string, user: CreateUser) => {
  try {
    const userRef = usersRef.doc(id)
    const thumbnailURL = user.thumbnailData ? (await putThumbnailData(id, user.thumbnailData)).thumbnailURL : null

    await userRef.set({
      name: user.name,
      thumbnailURL,
      gender: user.gender,
      introduction: user.introduction,
    })
  } catch (e) {
    console.warn(e)
  }
}

export const updateUser = async (id: string, user: UpdateUser) => {
  try {
    const userRef = usersRef.doc(id)
    const thumbnailURL = user.thumbnailData ? (await putThumbnailData(id, user.thumbnailData)).thumbnailURL : null

    await userRef.update({
      name: user.name,
      thumbnailURL,
      introduction: user.introduction,
    })
  } catch (e) {
    console.warn(e)
  }
}
