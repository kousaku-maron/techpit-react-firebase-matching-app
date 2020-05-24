import { useEffect, useCallback } from 'react'
import firebase, { auth } from '../firebase'
import { useAuthDispatch } from '../store/hooks'

export const signIn = async (provider: firebase.auth.AuthProvider) => {
  try {
    const result = await auth.signInWithPopup(provider)
    if (!result.credential) {
      return { success: false, cancel: true }
    }

    return { success: true }
  } catch (e) {
    console.warn(e)
    return { success: false, error: e }
  }
}

export const signOut = async () => {
  try {
    await auth.signOut()
    return { success: true }
  } catch (e) {
    return { success: false, error: e }
  }
}

export const signInWithFacebook = async () => {
  const provider = new firebase.auth.FacebookAuthProvider()
  const result = signIn(provider)
  return result
}

export const signInWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  const result = await signIn(provider)
  return result
}

export const useAuthEffect = () => {
  const { setUID } = useAuthDispatch()

  const onSuccess = useCallback(
    (user: firebase.User | null) => {
      if (!user) {
        return setUID(null)
      }

      setUID(user.uid)
    },
    [setUID]
  )

  const onFailure = useCallback(
    (error: firebase.auth.Error) => {
      setUID(null)
      console.warn(error)
    },
    [setUID]
  )

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(onSuccess, onFailure)
    return () => {
      unsubscribe()
    }
  }, [onFailure, onSuccess])
}
