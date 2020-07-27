import * as admin from 'firebase-admin'
admin.initializeApp()

export { create as createRecommendUser } from './triggers/recommendUser/create'
export { update as updateRecommendUser } from './triggers/recommendUser/update'
