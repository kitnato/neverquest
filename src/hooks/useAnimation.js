import { useCallback, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";

import { gameOver } from "state/global";

export default function useAnimation(callback, stop) {
  const gameOverValue = useRecoilValue(gameOver);
  const frameRef = useRef();
  const previousTimeRef = useRef();

  const animate = useCallback(
    (time) => {
      callback(time - (previousTimeRef.current || time));
      previousTimeRef.current = time;
      frameRef.current = requestAnimationFrame(animate);
    },
    [callback]
  );

  useEffect(() => {
    if (gameOverValue || stop) {
      cancelAnimationFrame(frameRef.current);
      previousTimeRef.current = null;
    } else {
      frameRef.current = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(frameRef.current);
  }, [animate, gameOverValue, stop]);
}
