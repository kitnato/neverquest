import { useCallback, useEffect, useRef } from "react";

export default function useAnimation(callback, stop) {
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const animate = useCallback(
    (time) => {
      callback(time - (previousTimeRef.current || time));
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    },
    [callback]
  );

  useEffect(() => {
    if (stop) {
      previousTimeRef.current = null;
      cancelAnimationFrame(requestRef.current);
    } else {
      requestRef.current = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(requestRef.current);
  }, [stop, animate]);
}
