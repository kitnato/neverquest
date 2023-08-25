import { useEffect, useRef } from "react";
import { type SetterOrUpdater, useRecoilValue } from "recoil";

import { isGameOver } from "@neverquest/state/character";

const FRAMERATE = 1000 / 60;

export function useAnimate({ deltas, stop }: { deltas: SetterOrUpdater<number>[]; stop: boolean }) {
  const isGameOverValue = useRecoilValue(isGameOver);
  const interval = useRef<NodeJS.Timer>();
  const previousTime = useRef(0);

  useEffect(() => {
    if (isGameOverValue || stop) {
      clearInterval(interval.current);
      interval.current = undefined;
      previousTime.current = 0;
    } else if (interval.current === undefined) {
      interval.current = setInterval(() => {
        const now = Date.now();

        deltas.forEach((delta) =>
          delta((current) => {
            const newDelta = current - (now - (previousTime.current || now));

            if (newDelta < 0) {
              return 0;
            }

            return newDelta;
          }),
        );
        previousTime.current = now;
      }, FRAMERATE);
    }
  }, [deltas, isGameOverValue, stop]);
}
