import { useState, useEffect } from 'react'
import { getRoomRef } from '../../repositories/room'
import { buildRoom, Room } from '../../entities/room'

export const useRoom = (id: string) => {
  const [value, setValue] = useState<Room | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const targetRef = getRoomRef(id)
    targetRef.onSnapshot({
      next: (snapshot) => {
        if (!snapshot.exists) return
        const target = buildRoom(snapshot.id, snapshot.data()!)
        setValue(target)
        setLoading(false)
      },
      error: (e) => {
        setError(e)
        setLoading(false)
      },
    })
  }, [id])

  return { value, loading, error }
}
