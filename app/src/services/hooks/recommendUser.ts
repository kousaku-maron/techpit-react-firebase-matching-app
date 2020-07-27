import { useState, useEffect, useCallback } from 'react'
import { User } from '../../entities/user'
import { buildCloneUser, CloneUser } from '../../entities/cloneUser'
import { getUser } from '../../repositories/user'
import { getRecommendUsersRef, getRecommendUsers } from '../../repositories/recommendUser'
import { likeUserRequest } from '../likeUserRequest'
import { dislikeUserRequest } from '../dislikeUserRequest'

export const useRecommendUsers = (uid: string): [CloneUser[], boolean, Error | null] => {
  const [values, setValues] = useState<CloneUser[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const targetsRef = getRecommendUsersRef(uid)
    const unsubscribe = targetsRef.onSnapshot({
      next: (snapshot) => {
        const targets = snapshot.docs.map((doc) => {
          return buildCloneUser(doc.id, doc.data())
        })
        setValues(targets)
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

  return [values, loading, error]
}

export const useRecommendUserMatching = (
  user: User
): [
  User[],
  boolean,
  (
    likeUser: User
  ) => Promise<{
    matching: boolean
    error?: unknown
  }>,
  (
    dislikeUser: User
  ) => Promise<{
    error?: unknown
  }>
] => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const task = async () => {
      const recommendUsers = await getRecommendUsers(user.id)
      const usersTask = recommendUsers.map(async (recommendUser) => await getUser(recommendUser.id))
      const _users = await Promise.all(usersTask)
      setUsers(_users)
      setLoading(false)
    }
    task()
  }, [user.id])

  const onLikeUser = useCallback(
    async (likeUser: User) => {
      setUsers((prev) => prev.filter((_user) => _user.id !== likeUser.id))

      try {
        const { matching } = await likeUserRequest(user, likeUser)

        if (matching) {
          return { matching: true }
        } else {
          return { matching: false }
        }
      } catch (e) {
        console.warn(e)
        return { matching: false, error: e }
      }
    },
    [user]
  )

  const onDislikeUser = useCallback(
    async (dislikeUser: User) => {
      setUsers((prev) => prev.filter((_user) => _user.id !== dislikeUser.id))

      try {
        await dislikeUserRequest(user, dislikeUser)
        return {}
      } catch (e) {
        console.warn(e)
        return { error: e }
      }
    },
    [user]
  )

  return [users, loading, onLikeUser, onDislikeUser]
}
