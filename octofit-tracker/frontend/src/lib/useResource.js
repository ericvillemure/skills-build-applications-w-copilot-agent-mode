import { useEffect, useState } from 'react'

export function useResource(load) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    load(controller.signal)
      .then((collection) => setItems(collection))
      .catch((requestError) => {
        if (!controller.signal.aborted) {
          setItems([])
          setError(requestError.message || 'Unable to load this resource.')
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [load])

  return { items, loading, error }
}