import { useCallback, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";

import { isGameOver } from "@neverquest/state/settings";

export default function (callback: (time: number) => void, stop: boolean) {
  const isGameOverValue = useRecoilValue(isGameOver);
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
    if (isGameOverValue || stop) {
      cancelAnimationFrame(frameRef.current);
      previousTimeRef.current = 0;
    } else {
      frameRef.current = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(frameRef.current);
  }, [animate, isGameOverValue, stop]);
}
