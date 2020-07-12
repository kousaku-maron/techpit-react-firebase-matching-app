import { useState, useEffect } from 'react'
import firebase from '../../firebase'

export const useAuth = (): [firebase.User | null, boolean, firebase.auth.Error | null] => {
  const [value, setValue] = useState<firebase.User | null>(null)
  const [error, setError] = useState<firebase.auth.Error | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(
      (user: firebase.User | null) => {
        setValue(user)
        setLoading(false)
      },
      (error: firebase.auth.Error) => {
        setError(error)
        setLoading(false)
      }
    )
    return () => {
      unsubscribe()
    }
  }, [])

  return [value, loading, error]
}
