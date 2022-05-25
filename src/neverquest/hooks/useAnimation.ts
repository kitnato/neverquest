import { useCallback, useEffect, useRef } from "react";
import { useAtomValue } from "jotai";

import { gameOver } from "neverquest/state/global";

export default function useAnimation(callback: (time: number) => void, stop: boolean) {
  const gameOverValue = useAtomValue(gameOver);
  const frameRef = useRef(-1);
  const previousTimeRef = useRef(0);

  const animate = useCallback(
    (time: number) => {
      callback(time - (previousTimeRef.current || time));
      previousTimeRef.current = time;
      frameRef.current = requestAnimationFrame(animate);
    },
    [callback]
  );

  useEffect(() => {
    if (gameOverValue || stop) {
      cancelAnimationFrame(frameRef.current);
      previousTimeRef.current = 0;
    } else {
      frameRef.current = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(frameRef.current);
  }, [animate, gameOverValue, stop]);
}
