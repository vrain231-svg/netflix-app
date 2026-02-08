import { useEffect, useRef, useState } from "react"

type Params<T> = {
  fetch: () => Promise<T>
  wsUrl: string
  shouldReload?: (msg: any) => boolean
}

export function useRealtimeData<T>({
  fetch,
  wsUrl,
  shouldReload
}: Params<T>) {
  const fetchRef = useRef(fetch)
  const wsRef = useRef<WebSocket | null>(null)
  const loadingRef = useRef(false)

  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // keep latest fetcher
  useEffect(() => {
    fetchRef.current = fetch
  }, [fetch])

  const load = async () => {
    if (loadingRef.current) return
    loadingRef.current = true
    setIsLoading(true)

    try {
      const result = await fetchRef.current()
      setData(result)
    } catch (e) {
      setError(e as Error)
    } finally {
      loadingRef.current = false
      setIsLoading(false)
    }
  }

  // initial load (ONCE)
  useEffect(() => {
    load()
  }, [])

  // websocket (ONCE)
  useEffect(() => {
    const ws = new WebSocket(wsUrl)
    wsRef.current = ws

    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data)
      if (!shouldReload || shouldReload(msg)) {
        load()
      }
    }

    return () => {
      ws.close()
    }
  }, [wsUrl])

  return { data, isLoading, error, reload: load }
}
