import { firestore } from '../firebase'
import { getUserRef } from '../repositories/user'
import { User } from '../entities/user'
import { CreateCloneUser } from '../entities/cloneUser'
import { getDislikeUserRef } from '../repositories/dislikeUser'
import { getDislikedUserRef } from '../repositories/dislikedUser'

export const dislikeUserBatch = async (fromUser: User, toUser: User) => {
  const batch = firestore.batch()

  const fromUID = fromUser.id
  const toUID = toUser.id

  const fromDislikeUserRef = getDislikeUserRef(fromUID, toUID)
  const fromDislikeUser: CreateCloneUser = {
    ref: getUserRef(toUID),
  }

  batch.set(fromDislikeUserRef, fromDislikeUser)

  const toDislikedUserRef = getDislikedUserRef(toUID, fromUID)
  const toDislikedUser: CreateCloneUser = {
    ref: getUserRef(fromUID),
  }

  batch.set(toDislikedUserRef, toDislikedUser)

  await batch.commit()
}
