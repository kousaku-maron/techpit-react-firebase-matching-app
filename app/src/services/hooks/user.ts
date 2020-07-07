import { useState, useEffect, useCallback } from 'react'
import { firestore } from '../../firebase'
import { User, buildUser } from '../../entities/user'

export const useUser = (uid: string) => {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = firestore
      .collection('users')
      .doc(uid)
      .onSnapshot(
        (snapshot) => {
          setLoading(false)

          if (!snapshot.exists) return
          const newUser = buildUser(snapshot.id, snapshot.data()!)
          setUser(newUser)
        },
        (error) => {
          setLoading(false)
          setError(error)
        }
      )

    return () => {
      unsubscribe()
    }
  }, [uid])

  return { user, error, loading }
}

type GenderItem = 'male' | 'female' | ''

export const useChangeProfileTools = () => {
  const [gender, setGender] = useState<GenderItem>('')
  const [name, setName] = useState<string>('')
  const [introduction, setIntroduction] = useState<string>('')
  const [thumbnailDataURL, setThumbnailDataURL] = useState<string | undefined>(undefined)
  const [thumbnailData, setThumbnailData] = useState<File | undefined>(undefined)

  const onChangeGender = useCallback((value: GenderItem) => {
    setGender(value)
  }, [])

  const onChangeName = useCallback((value: string) => {
    setName(value)
  }, [])

  const onChangeIntroduction = useCallback((value: string) => {
    setIntroduction(value)
  }, [])

  const onChangeThumbnailData = useCallback(async (file: File) => {
    setThumbnailData(file)

    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (!reader.result) {
          return reject()
        }

        const result = reader.result.toString()
        setThumbnailDataURL(result)
        resolve(result)
      }

      reader.onerror = () => reject()
      reader.onabort = () => reject()
      reader.readAsDataURL(file)
    })
  }, [])

  const onChangeThumbnailDataURL = useCallback((uri: string) => {
    setThumbnailDataURL(uri)
  }, [])

  return {
    onChangeGender,
    onChangeName,
    onChangeIntroduction,
    onChangeThumbnailData,
    onChangeThumbnailDataURL,
    gender,
    name,
    introduction,
    thumbnailDataURL,
    thumbnailData,
  }
}
