'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

type FetchFn<T> = () => Promise<T>

type UseRealtimeDataOptions<T> = {
  fetch: FetchFn<T>
  wsUrl: string
  shouldReload?: (msg: any) => boolean
}

// hooks/use-real-time-ws.ts
export function useRealtimeData<T>(params: {
  fetch: () => Promise<T>
  wsUrl?: string
  shouldReload?: (msg: any) => boolean
}) {
  const { fetch, wsUrl, shouldReload } = params

  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const load = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const result = await fetch()
      setData(result)
    } catch (e) {
      setError(e as Error)
    } finally {
      setIsLoading(false)
    }
  }, [fetch])

  // initial fetch
  useEffect(() => {
    load()
  }, [load])

  // websocket
  useEffect(() => {
    if (!wsUrl) return

    const ws = new WebSocket(wsUrl)

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data)
      if (!shouldReload || shouldReload(msg)) {
        load()
      }
    }

    return () => ws.close()
  }, [wsUrl, shouldReload, load])

  return { data, isLoading, error, reload: load }
}
