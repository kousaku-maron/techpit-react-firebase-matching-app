import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { shuffle } from 'lodash'
import { buildUser } from '../../entities/user'
import { CreateCloneUser } from '../../entities/cloneUser'
import { getUserRef, getUsersRef } from '../../repositories/user'
import { getRecommendUserRef } from '../../repositories/recommendUser'

const userPath = 'users/{uid}'

export const create = functions.firestore.document(userPath).onCreate(async (snapshot, _context) => {
  const db = firestore()
  const batch = db.batch()

  const user = buildUser(snapshot.id, snapshot.data())

  batch.set(snapshot.ref, { isPrepared: true }, { merge: true })

  const usersRef = getUsersRef()
  const usersSnapshot = await usersRef.get()

  if (usersSnapshot.empty) return

  const users = usersSnapshot.docs.map((doc) => buildUser(doc.id, doc.data()))

  const targetUsers = users.filter((_user) => _user.id !== user.id).filter((_user) => _user.gender !== user.gender)

  const recommendUsers = shuffle([...targetUsers]).slice(0, 10)

  if (recommendUsers.length === 0) {
    return { message: 'skip create recommend user.' }
  }

  const batchTask = recommendUsers.map(async (recommendUser) => {
    const recommendUserRef = getRecommendUserRef(user.id, recommendUser.id)
    const data: CreateCloneUser = {
      ref: getUserRef(recommendUser.id),
    }
    batch.set(recommendUserRef, data)
  })

  await Promise.all(batchTask)
  await batch.commit()

  return { message: 'create recommend user successfully.' }
})
