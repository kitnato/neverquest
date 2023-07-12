import { nanoid } from "nanoid";
import { useEffect } from "react";
import { Stack } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

import { deltas, floatingTextQueues } from "@neverquest/state/deltas";
import type { Delta } from "@neverquest/types/unions";
import { DEFAULT_DELTA_DISPLAY } from "@neverquest/utilities/constants";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function FloatingText({ deltaType }: { deltaType: Delta }) {
  const delta = deltas(deltaType);
  const deltaValue = useRecoilValue(delta);
  const [floatingTextQueue, setFloatingTextQueue] = useRecoilState(floatingTextQueues(deltaType));
  const resetDeltaValue = useResetRecoilState(delta);
  const resetFloatingTextQueue = useResetRecoilState(floatingTextQueues(deltaType));

  const animationClass = getAnimationClass({
    speed: "slower",
    type: "fadeOutUp",
  });

  const handleAnimationEnd = (id: string) => () =>
    setFloatingTextQueue((current) => current.filter(({ key }) => key !== id));

  useEffect(() => {
    resetFloatingTextQueue();
  }, [resetFloatingTextQueue]);

  useEffect(() => {
    if (deltaValue === DEFAULT_DELTA_DISPLAY) {
      return;
    }

    setFloatingTextQueue((current) => [
      ...current,
      {
        delta: deltaValue,
        key: nanoid(),
      },
    ]);

    resetDeltaValue();
  }, [deltaValue, resetDeltaValue, setFloatingTextQueue]);

  return (
    <div className="d-flex flex-nowrap position-relative" style={{ zIndex: 100 }}>
      {floatingTextQueue.map(({ delta, key }) => (
        <small className="position-absolute" key={key} style={{ bottom: -8, left: 4 }}>
          <strong
            style={{
              textShadow:
                "-1px 1px 0px #fff, 1px 1px 0px #fff, 1px -1px 0px #fff, -1px -1px 0px #fff",
            }}
          >
            {Array.isArray(delta) ? (
              <Stack
                className={animationClass}
                direction="horizontal"
                gap={1}
                onAnimationEnd={handleAnimationEnd(key)}
              >
                {delta.map(({ color, value }) => (
                  <span className={color ?? undefined} key={value}>
                    {value}
                  </span>
                ))}
              </Stack>
            ) : (
              <div
                className={`${animationClass}${delta.color ? ` ${delta.color}` : ""}`}
                onAnimationEnd={handleAnimationEnd(key)}
              >
                {delta.value}
              </div>
            )}
          </strong>
        </small>
      ))}
    </div>
  );
}
