import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { useRecoilValue, useResetRecoilState } from "recoil";

import { DEFAULT_DELTA_DISPLAY } from "@neverquest/data/general";
import { deltas } from "@neverquest/state/deltas";
import type { DeltaDisplay } from "@neverquest/types/ui";
import type { Delta } from "@neverquest/types/unions";
import { getAnimationClass } from "@neverquest/utilities/getters";

const ANIMATION_FLOATING_TEXT = getAnimationClass({
  name: "fadeOutUp",
  speed: "slower",
});

export function FloatingTextQueue({ delta }: { delta: Delta }) {
  const deltaState = deltas(delta);

  const deltaValue = useRecoilValue(deltaState);
  const resetDelta = useResetRecoilState(deltaState);

  const [floatingTextQueue, setFloatingTextQueue] = useState<
    {
      delta: DeltaDisplay;
      key: string;
    }[]
  >([]);

  const onAnimationEnd = (id: string) => () => {
    setFloatingTextQueue((current) => current.filter(({ key }) => key !== id));
    resetDelta();
  };

  useEffect(() => {
    if (
      (Array.isArray(deltaValue) && deltaValue.length === 0) ||
      deltaValue === DEFAULT_DELTA_DISPLAY
    ) {
      return;
    }

    setFloatingTextQueue((current) => [
      ...current,
      {
        delta: deltaValue,
        key: nanoid(),
      },
    ]);

    return resetDelta;
  }, [deltaValue, resetDelta, setFloatingTextQueue]);

  return (
    <div
      className="d-flex flex-nowrap position-relative"
      style={{ pointerEvents: "none", zIndex: 100 }}
    >
      {floatingTextQueue.map(({ delta, key }) => (
        <small className="position-absolute" key={key} style={{ bottom: -8, left: 4 }}>
          <strong
            style={{
              textShadow:
                "-1px 1px 0px #fff, 1px 1px 0px #fff, 1px -1px 0px #fff, -1px -1px 0px #fff",
            }}
          >
            {Array.isArray(delta) ? (
              <Stack className={ANIMATION_FLOATING_TEXT} onAnimationEnd={onAnimationEnd(key)}>
                {delta.map(({ color, value }) => (
                  <span className={color ?? undefined} key={value} style={{ whiteSpace: "nowrap" }}>
                    {value}
                  </span>
                ))}
              </Stack>
            ) : (
              <div
                className={`${ANIMATION_FLOATING_TEXT}${delta.color ? ` ${delta.color}` : ""}`}
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
