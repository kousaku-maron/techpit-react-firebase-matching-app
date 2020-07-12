import { useState, useEffect } from 'react'
import { getRoomRef } from '../../repositories/room'
import { buildRoom, Room } from '../../entities/room'

export const useRoom = (roomID: string): [Room | null, boolean, Error | null] => {
  const [value, setValue] = useState<Room | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const targetRef = getRoomRef(roomID)
    const unsubscribe = targetRef.onSnapshot({
      next: (snapshot) => {
        if (!snapshot.exists) {
          setLoading(false)
          return
        }
        const target = buildRoom(snapshot.id, snapshot.data()!)
        setValue(target)
        setLoading(false)
      },
      error: (e) => {
        setError(e)
        setLoading(false)
      },
    })

    return () => {
      unsubscribe()
    }
  }, [roomID])

  return [value, loading, error]
}
