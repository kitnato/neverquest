import { useEffect, useRef, useState } from "react";
import { type SetterOrUpdater, useRecoilValue } from "recoil";
import { clearInterval, setInterval } from "worker-timers";

import { FRAMERATE } from "@neverquest/data/general";
import { hasFlatlined } from "@neverquest/state/character";

export function useTimerDelta({
  delta,
  factor = 1,
  onDelta,
  stop,
}: {
  delta: SetterOrUpdater<number>;
  factor?: number;
  onDelta?: () => void;
  stop: boolean;
}) {
  const hasFlatlinedValue = useRecoilValue(hasFlatlined);

  const interval = useRef(-1);
  const previousTime = useRef(0);

  const [hasTicked, setHasTicked] = useState(false);

  const terminate = () => {
    if (interval.current !== -1) {
      clearInterval(interval.current);

      interval.current = -1;
      previousTime.current = 0;
    }
  };

  useEffect(() => {
    if (hasTicked) {
      if (onDelta !== undefined) {
        onDelta();
      }

      setHasTicked(false);
    }
  }, [hasTicked, onDelta]);

  useEffect(() => {
    if (hasFlatlinedValue || stop) {
      terminate();
    } else if (interval.current === -1) {
      interval.current = setInterval(() => {
        const now = Date.now();

        delta((elapsed) => {
          const newDelta = elapsed - (now - (previousTime.current || now)) * factor;

          if (newDelta <= 0) {
            setHasTicked(true);

            return 0;
          }

          return newDelta;
        });

        previousTime.current = now;
      }, FRAMERATE);
    }

    return terminate;
  }, [delta, factor, hasFlatlinedValue, stop]);
}
