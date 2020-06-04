import firebase, { auth } from '../firebase'

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
