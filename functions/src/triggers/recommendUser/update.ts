import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { shuffle } from 'lodash'
import { buildUser } from '../../entities/user'
import { CreateCloneUser } from '../../entities/cloneUser'
import { getUserRef, getUsersRef } from '../../repositories/user'
import { getRecommendUserRef, getRecommendUsersRef } from '../../repositories/recommendUser'
import { getMatchUsers } from '../../repositories/matchUser'
import { getLikeUsers } from '../../repositories/likeUser'

const maximumBatchSize = 500

export const update = functions.pubsub
  .schedule('09 0 * * *') // MEMO: AM 9:00に関数が走る。
  .timeZone('Asia/Tokyo')
  .onRun(async (_context) => {
    const db = firestore()
    let batch = db.batch()
    let batchSize = 0

    const usersRef = getUsersRef()
    const usersSnapshot = await usersRef.get()

    if (usersSnapshot.empty) return

    const users = usersSnapshot.docs.map((doc) => buildUser(doc.id, doc.data()))

    // MEMO: recommendUsers削除処理
    const deleteTask = users.map(async (user) => {
      const deleteUsersRef = getRecommendUsersRef(user.id)
      const deleteUsersSnapshot = await deleteUsersRef.get()

      const batchTask = deleteUsersSnapshot.docs.map(async (doc) => {
        batch.delete(doc.ref)
        batchSize++

        if (batchSize === maximumBatchSize) {
          await batch.commit()
          batchSize = 0
          batch = db.batch()
        }
      })

      await Promise.all(batchTask)
    })

    await Promise.all(deleteTask)

    // MEMO: recommendUsers作成処理
    const createTask = users.map(async (user) => {
      const matchUsers = await getMatchUsers(user.id)
      const likeUsers = await getLikeUsers(user.id)
      const targetUsers = users
        .filter((_user) => _user.id !== user.id)
        .filter((_user) => _user.gender !== user.gender)
        .filter((_user) => !matchUsers.find((matchUser) => matchUser.id === _user.id))
        .filter((_user) => !likeUsers.find((likeUser) => likeUser.id === _user.id))

      const recommendUsers = shuffle([...targetUsers]).slice(0, 10)

      const batchTask = recommendUsers.map(async (recommendUser) => {
        const recommendUserRef = getRecommendUserRef(user.id, recommendUser.id)
        const data: CreateCloneUser = {
          ref: getUserRef(recommendUser.id),
        }
        batch.set(recommendUserRef, data)
        batchSize++

        if (batchSize === maximumBatchSize) {
          await batch.commit()
          batchSize = 0
          batch = db.batch()
        }
      })

      await Promise.all(batchTask)
    })

    await Promise.all(createTask)

    if (batchSize !== 0) {
      await batch.commit()
    }

    return { message: 'update recommend user successfully.' }
  })
