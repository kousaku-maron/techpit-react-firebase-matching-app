import { firestore } from '../firebase'
import { User } from '../entities/user'
import { getRecommendUserRef } from '../repositories/recommendUser'

export const dislikeUserRequest = async (fromUser: User, toUser: User) => {
  const batch = firestore.batch()

  const fromUID = fromUser.id
  const toUID = toUser.id

  const fromRecommendUserRef = getRecommendUserRef(fromUID, toUID)
  batch.delete(fromRecommendUserRef)

  await batch.commit()
}
