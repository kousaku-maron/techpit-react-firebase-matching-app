import { useState, useMemo, useEffect, useCallback } from 'react'
import { User } from '../../entities/user'
import { getUsersByGender } from '../../repositories/user'
import { getLikeUsers } from '../../repositories/likeUser'
import { getDislikeUsers } from '../../repositories/dislikeUser'
import { likeUserBatch } from '../../batches/likeUserBatch'
import { dislikeUserBatch } from '../../batches/dislikeUserBatch'

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
      const usersTask = getUsersByGender(targetGender)
      const likeUsersTask = getLikeUsers(uid)
      const dislikeUsersTask = getDislikeUsers(uid)

      const [users, likedUsers, dislikedUsers] = await Promise.all([usersTask, likeUsersTask, dislikeUsersTask])
      const swipedUIDs = [...likedUsers, ...dislikedUsers].map(({ ref }) => ref.id)
      const swipeableUsers = users.filter((user) => !swipedUIDs.find((_uid) => _uid === user.id))

      setUsers(swipeableUsers)
      setLoading(false)
    }
    task()
  }, [targetGender, uid])

  const onLikeUser = useCallback(
    async (user: User) => {
      setUsers((prev) => prev.filter((_user) => _user.id !== user.id))

      try {
        const { matching } = await likeUserBatch(uid, user.id)
        if (matching) {
          alert('マッチングしました。')
        }
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

      try {
        await dislikeUserBatch(uid, user.id)
      } catch (e) {
        console.warn(e)
        alert('ディスライクに失敗しました。')
      }
    },
    [uid]
  )

  return { users, loading, onLikeUser, onDislikeUser }
}
