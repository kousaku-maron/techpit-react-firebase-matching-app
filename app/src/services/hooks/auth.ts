import { useState, useEffect } from 'react'
import firebase from '../../firebase'

export const useAuth = () => {
  const [user, setUser] = useState<firebase.User | null>(null)
  const [error, setError] = useState<firebase.auth.Error | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(
      (user: firebase.User | null) => {
        setLoading(false)
        setUser(user)
      },
      (error: firebase.auth.Error) => {
        setLoading(false)
        setError(error)
      }
    )
    return () => {
      unsubscribe()
    }
  }, [])

  return { firebaseUser: user, error, loading }
}
