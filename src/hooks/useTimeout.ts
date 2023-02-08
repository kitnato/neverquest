import { useEffect, useRef } from "react";

// TODO - remove?
export function useTimeout(callback: () => void, delay: null | number) {
  const timeoutRef = useRef(-1);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();

    if (delay !== null) {
      timeoutRef.current = window.setTimeout(tick, delay);
    }

    return () => window.clearTimeout(timeoutRef.current);
  }, [delay]);

  return timeoutRef;
}
