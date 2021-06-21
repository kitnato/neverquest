import { useCallback, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";

import { gameOver } from "state/atoms";

export default function useAnimation(callback, stop) {
  const requestRef = useRef();
  const previousTimeRef = useRef();
  const gameOverValue = useRecoilValue(gameOver);

  const animate = useCallback(
    (time) => {
      callback(time - (previousTimeRef.current || time));
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    },
    [callback]
  );

  useEffect(() => {
    if (gameOverValue || stop) {
      previousTimeRef.current = null;
      cancelAnimationFrame(requestRef.current);
    } else {
      requestRef.current = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(requestRef.current);
  }, [gameOverValue, stop, animate]);
}
