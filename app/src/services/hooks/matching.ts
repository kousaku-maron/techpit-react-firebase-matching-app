import { useState, useMemo, useEffect, useCallback } from 'react'
import { User } from '../../entities/user'
import { getUsersByGender } from '../../repositories/user'
import { getLikeUsers } from '../../repositories/likeUser'
import { getLikedUsers } from '../../repositories/likedUser'
import { getDislikeUsers } from '../../repositories/dislikeUser'
import { getMatchUsers } from '../../repositories/matchUser'
import { likeUserBatch } from '../../batches/likeUserBatch'
import { dislikeUserBatch } from '../../batches/dislikeUserBatch'

export const useMatchingTools = (user: User) => {
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
      const likeUsersTask = getLikeUsers(user.id)
      const dislikeUsersTask = getDislikeUsers(user.id)
      const matchUsersTask = getMatchUsers(user.id)

      const [users, likeUsers, dislikeUsers, matchUsers] = await Promise.all([
        usersTask,
        likeUsersTask,
        dislikeUsersTask,
        matchUsersTask,
      ])
      const swipedUIDs = [...likeUsers, ...dislikeUsers, ...matchUsers].map(({ ref }) => ref.id)
      const swipeableUsers = users.filter((user) => !swipedUIDs.find((_uid) => _uid === user.id))

      setUsers(swipeableUsers)
      setLoading(false)
    }
    task()
  }, [targetGender, user.id])

  const onLikeUser = useCallback(
    async (likeUser: User) => {
      setUsers((prev) => prev.filter((_user) => _user.id !== likeUser.id))

      try {
        const { matching } = await likeUserBatch(user, likeUser)
        if (matching) {
          alert('マッチングしました。')
        }
      } catch (e) {
        console.warn(e)
        alert('ライクに失敗しました。')
      }
    },
    [user]
  )

  const onDislikeUser = useCallback(
    async (dislikeUser: User) => {
      setUsers((prev) => prev.filter((_user) => _user.id !== dislikeUser.id))

      try {
        await dislikeUserBatch(user, dislikeUser)
      } catch (e) {
        console.warn(e)
        alert('ディスライクに失敗しました。')
      }
    },
    [user]
  )

  return { users, loading, onLikeUser, onDislikeUser }
}

export const useLikedUserMatchingTools = (user: User) => {
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
      const likedUsersTask = getLikedUsers(user.id)

      const [users, likedUsers] = await Promise.all([usersTask, likedUsersTask])
      const swipeableUIDs = likedUsers.map(({ ref }) => ref.id)
      const swipeableUsers = users.filter((user) => swipeableUIDs.find((_uid) => _uid === user.id))

      setUsers(swipeableUsers)
      setLoading(false)
    }
    task()
  }, [targetGender, user.id])

  const onLikeUser = useCallback(
    async (likeUser: User) => {
      setUsers((prev) => prev.filter((_user) => _user.id !== likeUser.id))

      try {
        const { matching } = await likeUserBatch(user, likeUser)
        if (matching) {
          alert('マッチングしました。')
        }
      } catch (e) {
        console.warn(e)
        alert('ライクに失敗しました。')
      }
    },
    [user]
  )

  const onDislikeUser = useCallback(
    async (dislikeUser: User) => {
      setUsers((prev) => prev.filter((_user) => _user.id !== dislikeUser.id))

      try {
        await dislikeUserBatch(user, dislikeUser)
      } catch (e) {
        console.warn(e)
        alert('ディスライクに失敗しました。')
      }
    },
    [user]
  )

  return { users, loading, onLikeUser, onDislikeUser }
}
