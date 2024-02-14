import { useEffect, useRef, useState } from "react";
import { type SetterOrUpdater, useRecoilValue } from "recoil";
import { clearInterval, setInterval } from "worker-timers";

import { FRAMERATE } from "@neverquest/data/general";
import { hasFlatlined } from "@neverquest/state/character";

export function useTimer({
  factor = 1,
  onElapsed,
  setTick,
  stop,
}: {
  factor?: number;
  onElapsed?: () => void;
  setTick: SetterOrUpdater<number>;
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
      if (onElapsed !== undefined) {
        onElapsed();
      }

      setHasTicked(false);
    }
  }, [hasTicked, onElapsed]);

  useEffect(() => {
    if (hasFlatlinedValue || stop) {
      terminate();
    } else if (interval.current === -1) {
      interval.current = setInterval(() => {
        const now = Date.now();

        setTick((elapsed) => {
          const newDelta = elapsed - (now - (previousTime.current || now)) * factor;

          if (newDelta <= 0) {
            // Cannot invoke setTick() here due to rules of hooks (state updates at top level only).
            setHasTicked(true);

            return 0;
          }

          return newDelta;
        });

        previousTime.current = now;
      }, FRAMERATE);
    }

    return terminate;
  }, [factor, hasFlatlinedValue, setTick, stop]);
}
