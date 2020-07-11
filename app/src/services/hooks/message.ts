import { useState, useEffect, useCallback } from 'react'
import moment from 'moment'
import { getMessagesRef, createMessage, getMessageRef } from '../../repositories/message'
import { buildMessage, Message, CreateMessage } from '../../entities/message'
import { getUserRef } from '../../repositories/user'

export const useMessages = (roomID: string) => {
  const [values, setValues] = useState<Message[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const targetsRef = getMessagesRef(roomID).orderBy('createdAt', 'asc')
    targetsRef.onSnapshot({
      next: (snapshot) => {
        const targets = snapshot.docs.map((doc) => {
          if (doc.metadata.hasPendingWrites) {
            return buildMessage(doc.id, { ...doc.data(), createdAt: moment() })
          }
          return buildMessage(doc.id, doc.data())
        })
        setValues(targets)
        setLoading(false)
      },
      error: (e) => {
        setError(e)
        setLoading(false)
      },
    })
  }, [roomID])

  return { values, loading, error }
}

export const useSendMessage = (roomID: string, uid: string) => {
  const onSendMessage = useCallback(
    (text: string) => {
      const messageRef = getMessageRef(roomID)
      const writerRef = getUserRef(uid)
      const message: CreateMessage = {
        text,
        writerRef,
      }

      createMessage(messageRef, message)
    },
    [roomID, uid]
  )

  return { onSendMessage }
}
