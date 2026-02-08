'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

type FetchFn<T> = () => Promise<T>

type UseRealtimeDataOptions<T> = {
  fetch: FetchFn<T>
  wsUrl: string
  shouldReload?: (msg: any) => boolean
}

export function useRealtimeData<T>({
  fetch,
  wsUrl,
  shouldReload
}: UseRealtimeDataOptions<T>) {

  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  /**
   * 1️⃣ Centralized reload logic
   */
  const reload = useCallback(async () => {
    try {
      setIsLoading(true)
      const result = await fetch()
      setData(result)
    } catch (err) {
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }, [fetch])

  /**
   * 2️⃣ Initial load
   */
  useEffect(() => {
    reload()
  }, [reload])

  /**
   * 3️⃣ WebSocket trigger
   */
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    const ws = new WebSocket(wsUrl)
    wsRef.current = ws

    ws.onmessage = (e) => {
      let msg
      try {
        msg = JSON.parse(e.data)
      } catch {
        return
      }

      const should =
        shouldReload?.(msg) ?? true

      if (should) {
        reload()
      }
    }

    return () => ws.close()
  }, [wsUrl, reload, shouldReload])

  return {
    data,
    isLoading,
    error,
    reload
  }
}
