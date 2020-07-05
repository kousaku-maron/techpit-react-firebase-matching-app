import { useState, useMemo, useEffect, useCallback } from 'react'
import { User } from '../../entities/user'
import { getUsersByGender, getUserRef } from '../../repositories/user'
import { createLikedUser, getLikedUserRef } from '../../repositories/likedUser'
import { createDislikedUser, getDislikedUserRef } from '../../repositories/dislikedUser'

export const useMatchingTools = (uid: string, user: User) => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const targetGender = useMemo(() => {
    if (user.gender === 'male') {
      return 'female'
    }

    return 'male'
  }, [user.gender])

  useEffect(() => {
    const task = async () => {
      setLoading(true)
      const newUsers = await getUsersByGender(targetGender)
      setUsers(newUsers)
      setLoading(false)
    }
    task()
  }, [targetGender])

  const onLikeUser = useCallback(
    async (user: User) => {
      setUsers((prev) => prev.filter((_user) => _user.id !== user.id))

      const targetUserRef = getUserRef(user.id)

      const likedUser = {
        ref: targetUserRef,
      }

      const likedUserRef = getLikedUserRef(uid, user.id)

      try {
        await createLikedUser(likedUserRef, likedUser)
      } catch (e) {
        console.warn(e)
        alert('ライクに失敗しました。')
      }
    },
    [uid]
  )

  const onDislikeUser = useCallback(
    async (user: User) => {
      setUsers((prev) => prev.filter((_user) => _user.id !== user.id))

      const targetUserRef = getUserRef(user.id)

      const dislikedUser = {
        ref: targetUserRef,
      }

      const dislikedUserRef = getDislikedUserRef(uid, user.id)

      try {
        await createDislikedUser(dislikedUserRef, dislikedUser)
      } catch (e) {
        console.warn(e)
        alert('ディスライクに失敗しました。')
      }
    },
    [uid]
  )

  return { users, loading, onLikeUser, onDislikeUser }
}
