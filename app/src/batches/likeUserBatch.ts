import firebase, { firestore } from '../firebase'
import { User } from '../entities/user'
import { CreateCloneUser } from '../entities/cloneUser'
import { CreateRoom } from '../entities/room'
import { CreateCloneRoom } from '../entities/cloneRoom'
import { getUserRef } from '../repositories/user'
import { getLikeUserRef } from '../repositories/likeUser'
import { getLikedUserRef } from '../repositories/likedUser'
import { getMatchUserRef } from '../repositories/matchUser'
import { getRoomRef } from '../repositories/room'
import { getEntryRoomRef } from '../repositories/entryRoom'
import { getParticipateUserRef } from '../repositories/participateUser'

export const likeUserBatch = async (fromUser: User, toUser: User) => {
  return firestore.runTransaction(async (trx) => {
    const fromUID = fromUser.id
    const toUID = toUser.id

    const fromLikedUserRef = getLikedUserRef(fromUID, toUID)
    const snapshot = await trx.get(fromLikedUserRef)

    if (snapshot.exists) {
      // MEMO: LikeUser/LikedUser削除処理
      const toLikeUserRef = getLikeUserRef(toUID, fromUID)
      trx.delete(toLikeUserRef)

      const fromLikedUserRef = getLikedUserRef(fromUID, toUID)
      trx.delete(fromLikedUserRef)

      // MEMO: MatchUser作成処理
      const fromMatchUserRef = getMatchUserRef(fromUID, toUID)
      const fromMatchUser: CreateCloneUser = {
        ref: getUserRef(toUID),
      }

      trx.set(fromMatchUserRef, fromMatchUser)

      const toMatchUserRef = getMatchUserRef(toUID, fromUID)
      const toMatchUser: CreateCloneUser = {
        ref: getUserRef(fromUID),
      }

      trx.set(toMatchUserRef, toMatchUser)

      // MEMO: Room作成処理
      const roomRef = getRoomRef()
      const room: CreateRoom = {
        name: `${fromUser.name} x ${toUser.name}`,
      }
      trx.set(roomRef, { ...room, createdAt: firebase.firestore.FieldValue.serverTimestamp() })

      const fromEntryRoomRef = getEntryRoomRef(fromUID, roomRef.id)
      const toEntryRoomRef = getEntryRoomRef(toUID, roomRef.id)
      const entryRoom: CreateCloneRoom = {
        ref: roomRef,
      }
      trx.set(fromEntryRoomRef, entryRoom)
      trx.set(toEntryRoomRef, entryRoom)

      // MEMO: ParticipateUser作成処理
      const fromParticipateUserRef = getParticipateUserRef(roomRef.id, fromUID)
      const fromParticipateUser: CreateCloneUser = {
        ref: getUserRef(fromUID),
      }
      trx.set(fromParticipateUserRef, fromParticipateUser)

      const toParticipateUserRef = getParticipateUserRef(roomRef.id, toUID)
      const toParticipateUser: CreateCloneUser = {
        ref: getUserRef(toUID),
      }
      trx.set(toParticipateUserRef, toParticipateUser)

      return { matching: true }
    }

    const fromLikeUserRef = getLikeUserRef(fromUID, toUID)
    const fromLikeUser: CreateCloneUser = {
      ref: getUserRef(toUID),
    }

    trx.set(fromLikeUserRef, fromLikeUser)

    const toLikedUserRef = getLikedUserRef(toUID, fromUID)
    const toLikedUser: CreateCloneUser = {
      ref: getUserRef(fromUID),
    }

    trx.set(toLikedUserRef, toLikedUser)

    return { matching: false }
  })
}
