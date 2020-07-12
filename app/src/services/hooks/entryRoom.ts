import { useState, useEffect } from 'react'
import { getEntryRoomsRef } from '../../repositories/entryRoom'
import { buildCloneRoom, CloneRoom } from '../../entities/cloneRoom'

export const useEntryRooms = (uid: string): [CloneRoom[], boolean, Error | null] => {
  const [values, setValues] = useState<CloneRoom[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const targetsRef = getEntryRoomsRef(uid)
    const unsubscribe = targetsRef.onSnapshot({
      next: (snapshot) => {
        const targets = snapshot.docs.map((doc) => buildCloneRoom(doc.id, doc.data()))
        setValues(targets)
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
  }, [uid])

  return [values, loading, error]
}
