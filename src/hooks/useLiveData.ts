// AnalytiX Dashboard — Live Data WebSocket Hook
// Author: Shebin S Illikkal | Shebinsillikkal@gmail.com

import { useState, useEffect, useRef, useCallback } from 'react';

interface LiveDataOptions {
  url: string;
  reconnectDelay?: number;
  maxReconnects?: number;
}

interface LiveDataState<T> {
  data: T | null;
  connected: boolean;
  error: string | null;
  reconnectCount: number;
}

export function useLiveData<T>(options: LiveDataOptions): LiveDataState<T> {
  const { url, reconnectDelay = 3000, maxReconnects = 10 } = options;
  const [state, setState] = useState<LiveDataState<T>>({
    data: null, connected: false, error: null, reconnectCount: 0
  });
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout>();

  const connect = useCallback(() => {
    try {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        setState(s => ({ ...s, connected: true, error: null }));
        reconnectRef.current = 0;
      };

      ws.onmessage = (e) => {
        try {
          const parsed = JSON.parse(e.data) as T;
          setState(s => ({ ...s, data: parsed }));
        } catch {
          console.warn('Failed to parse WebSocket message');
        }
      };

      ws.onclose = () => {
        setState(s => ({ ...s, connected: false }));
        if (reconnectRef.current < maxReconnects) {
          reconnectRef.current++;
          timerRef.current = setTimeout(connect, reconnectDelay);
          setState(s => ({ ...s, reconnectCount: reconnectRef.current }));
        }
      };

      ws.onerror = () => {
        setState(s => ({ ...s, error: 'Connection error' }));
      };
    } catch (err) {
      setState(s => ({ ...s, error: String(err) }));
    }
  }, [url, reconnectDelay, maxReconnects]);

  useEffect(() => {
    connect();
    return () => {
      clearTimeout(timerRef.current);
      wsRef.current?.close();
    };
  }, [connect]);

  return state;
}
