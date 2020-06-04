export type User = {
  name: string
  thumbnailURL: string | null
  gender: 'male' | 'female'
  introduction: string
}

export type CreateUser = Omit<User, 'thumbnailURL'> & { thumbnailData?: File }

export type UpdateUser = {
  name?: string
  thumbnailData?: File
  introduction?: string
}

export const buildUser = (data: firebase.firestore.DocumentData) => {
  const user: User = {
    name: data.user,
    thumbnailURL: data.thumbnailURL,
    gender: data.gender,
    introduction: data.introduction,
  }

  return user
}
