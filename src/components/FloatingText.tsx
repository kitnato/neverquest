import { nanoid } from "nanoid";
import { useEffect } from "react";
import { Stack } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

import { DEFAULT_DELTA_DISPLAY } from "@neverquest/constants";
import { deltas, floatingTextQueues } from "@neverquest/state/deltas";
import { DeltaType } from "@neverquest/types/enums";
import { AnimationSpeed, AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function FloatingText({ type }: { type: DeltaType }) {
  const delta = deltas(type);
  const deltaValue = useRecoilValue(delta);
  const resetDeltaValue = useResetRecoilState(delta);
  const [floatingTextQueue, setFloatingTextQueue] = useRecoilState(floatingTextQueues(type));

  const animationClass = getAnimationClass({
    speed: AnimationSpeed.Slower,
    type: AnimationType.FadeOutUp,
  });

  const onAnimationEnd = (id: string) => () =>
    setFloatingTextQueue((current) => current.filter(({ key }) => key !== id));

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
  }, [animationClass, deltaValue, resetDeltaValue, setFloatingTextQueue]);

  return (
    <div className="position-relative">
      {floatingTextQueue.map(({ delta, key }) => (
        <small className="position-absolute" key={key} style={{ bottom: -6, left: -8 }}>
          <strong
            style={{
              textShadow:
                "-1px 1px 1px #fff, 1px 1px 1px #fff, 1px -1px 1px #fff, -1px -1px 1px #fff",
            }}
          >
            {Array.isArray(delta) ? (
              <Stack
                className={animationClass}
                direction="horizontal"
                gap={1}
                onAnimationEnd={onAnimationEnd(key)}
              >
                {delta.map(({ color, value }) => (
                  <span className={color || ""} key={value}>
                    {value}
                  </span>
                ))}
              </Stack>
            ) : (
              <div
                className={`${animationClass}${delta.color ? ` ${delta.color}` : ""}`}
                onAnimationEnd={onAnimationEnd(key)}
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
