import { useEffect, useRef, useState } from "react";
import { type SetterOrUpdater, useRecoilValue } from "recoil";
import { clearInterval, setInterval } from "worker-timers";

import { isGameOver } from "@neverquest/state/character";

const FRAMERATE = 1000 / 60;

export function useAnimate({
  delta,
  factor = 1,
  onDelta = () => {
    return;
  },
  stop,
  tmp,
}: {
  delta: SetterOrUpdater<number>;
  factor?: number;
  onDelta?: () => void;
  stop: boolean;
  tmp: string;
}) {
  const isGameOverValue = useRecoilValue(isGameOver);

  const interval = useRef(-1);
  const previousTime = useRef(0);

  const [hasTicked, setHasTicked] = useState(false);

  const clear = () => {
    if (interval.current !== -1) {
      clearInterval(interval.current);

      interval.current = -1;
      previousTime.current = 0;
    }
  };

  useEffect(() => {
    if (hasTicked) {
      onDelta();
      setHasTicked(false);
    }
  }, [hasTicked, onDelta, tmp]);

  useEffect(() => {
    if (isGameOverValue || stop) {
      clear();
    } else if (interval.current === -1) {
      interval.current = setInterval(() => {
        const now = Date.now();

        delta((current) => {
          const newDelta = current - (now - (previousTime.current || now)) * factor;

          if (newDelta <= 0) {
            setHasTicked(true);

            return 0;
          }

          return newDelta;
        });

        previousTime.current = now;
      }, FRAMERATE);
    }

    return clear;
  }, [delta, factor, isGameOverValue, stop, tmp]);
}
