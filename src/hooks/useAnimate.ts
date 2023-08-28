import { useEffect, useRef, useState } from "react";
import { type SetterOrUpdater, useRecoilValue } from "recoil";

import { isGameOver } from "@neverquest/state/character";

const FRAMERATE = 1000 / 60;

// TODO - restore back to using requestAnimationFrame and implement away time calculator.
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

  const interval = useRef<NodeJS.Timer>();
  const previousTime = useRef(0);

  const [hasTicked, setHasTicked] = useState(false);

  const clear = () => {
    clearInterval(interval.current);

    interval.current = undefined;
    previousTime.current = 0;
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
    } else if (interval.current === undefined) {
      interval.current = setInterval(() => {
        const now = Date.now();

        setHasTicked(false);

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
