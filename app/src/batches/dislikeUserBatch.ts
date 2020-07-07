import { firestore } from '../firebase'
import { getUserRef } from '../repositories/user'
import { getDislikeUserRef } from '../repositories/dislikeUser'
import { getDislikedUserRef } from '../repositories/dislikedUser'
import { CloneUser } from '../entities/cloneUser'

export const dislikeUserBatch = async (fromUID: string, toUID: string) => {
  const batch = firestore.batch()

  const fromDislikeUserRef = getDislikeUserRef(fromUID, toUID)
  const fromDislikeUser: CloneUser = {
    ref: getUserRef(toUID),
  }

  batch.set(fromDislikeUserRef, fromDislikeUser)

  const toDislikedUserRef = getDislikedUserRef(toUID, fromUID)
  const toDislikedUser: CloneUser = {
    ref: getUserRef(fromUID),
  }

  batch.set(toDislikedUserRef, toDislikedUser)

  await batch.commit()
}
