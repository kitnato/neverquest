import { useCallback, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";

import { isFlatlined } from "@neverquest/state/character";

export function useAnimation({
  onFrame,
  stop,
}: {
  onFrame: (elapsed: number) => void;
  stop?: boolean;
}) {
  const isFlatlinedValue = useRecoilValue(isFlatlined);
  const frameReference = useRef(-1);
  const previousTimeReference = useRef(0);

  const animate = useCallback(
    (time: number) => {
      onFrame(time - (previousTimeReference.current || time));
      previousTimeReference.current = time;
      frameReference.current = requestAnimationFrame(animate);
    },
    [onFrame],
  );

  useEffect(() => {
    if (isFlatlinedValue || stop) {
      cancelAnimationFrame(frameReference.current);
      previousTimeReference.current = 0;
    } else {
      frameReference.current = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(frameReference.current);
    };
  }, [animate, isFlatlinedValue, stop]);
}
