export type User = {
  id: string
  name: string
  thumbnailURL: string | null
  gender: 'male' | 'female'
  introduction: string
}

export type CreateUser = Omit<User, 'id' | 'thumbnailURL'> & { thumbnailData?: File }

export type UpdateUser = {
  name?: string
  thumbnailData?: File
  introduction?: string
}

export const buildUser = (id: string, data: firebase.firestore.DocumentData) => {
  const user: User = {
    id,
    name: data.name,
    thumbnailURL: data.thumbnailURL,
    gender: data.gender,
    introduction: data.introduction,
  }

  return user
}
