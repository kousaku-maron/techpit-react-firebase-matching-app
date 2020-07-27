import { useState, useEffect, useCallback } from 'react'
import { User, buildUser } from '../../entities/user'
import { getUserRef } from '../../repositories/user'

export const useUser = (uid: string): [User | null, boolean, Error | null] => {
  const [value, setValue] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const targetRef = getUserRef(uid)
    const unsubscribe = targetRef.onSnapshot({
      next: (snapshot) => {
        if (snapshot.metadata.fromCache) return
        if (!snapshot.exists) {
          setLoading(false)
          return
        }
        const target = buildUser(snapshot.id, snapshot.data()!)
        setValue(target)
        setLoading(false)
      },
      error: (e) => {
        setError(e)
        setLoading(false)
      },
    })

    return () => {
      unsubscribe()
    }
  }, [uid])

  return [value, loading, error]
}

export const useThumbnailTools = (): [
  File | undefined,
  string | undefined,
  (file: File) => Promise<unknown>,
  (uri: string) => void
] => {
  const [thumbnailDataURL, setThumbnailDataURL] = useState<string | undefined>(undefined)
  const [thumbnailData, setThumbnailData] = useState<File | undefined>(undefined)

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

  return [thumbnailData, thumbnailDataURL, onChangeThumbnailData, onChangeThumbnailDataURL]
}
