import { firestore } from '../firebase'
import { getUserRef } from '../repositories/user'
import { getLikeUserRef } from '../repositories/likeUser'
import { getLikedUserRef } from '../repositories/likedUser'
import { getMatchUserRef } from '../repositories/matchUser'
import { CloneUser } from '../entities/cloneUser'

export const likeUserBatch = async (fromUID: string, toUID: string) => {
  return firestore.runTransaction(async (trx) => {
    const fromLikedUserRef = getLikedUserRef(fromUID, toUID)
    const snapshot = await trx.get(fromLikedUserRef)

    const fromLikeUserRef = getLikeUserRef(fromUID, toUID)
    const fromLikeUser: CloneUser = {
      ref: getUserRef(toUID),
    }

    trx.set(fromLikeUserRef, fromLikeUser)

    const toLikedUserRef = getLikedUserRef(toUID, fromUID)
    const toLikedUser: CloneUser = {
      ref: getUserRef(fromUID),
    }

    trx.set(toLikedUserRef, toLikedUser)

    if (snapshot.exists) {
      const fromMatchUserRef = getMatchUserRef(fromUID, toUID)
      const fromMatchUser: CloneUser = {
        ref: getUserRef(toUID),
      }

      trx.set(fromMatchUserRef, fromMatchUser)

      const toMatchUserRef = getMatchUserRef(toUID, fromUID)
      const toMatchUser: CloneUser = {
        ref: getUserRef(fromUID),
      }

      trx.set(toMatchUserRef, toMatchUser)

      // TODO: トークルーム作成処理をいれる。

      return { matching: true }
    }

    return { matching: false }
  })
}
