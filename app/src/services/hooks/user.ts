import { useState, useEffect } from 'react'
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
          const newUser = buildUser(snapshot.data()!)
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
