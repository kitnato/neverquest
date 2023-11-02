import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { useRecoilValue, useResetRecoilState } from "recoil";

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
    if ((Array.isArray(deltaValue) && deltaValue.length === 0) || deltaValue === null) {
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
    <div className="d-flex flex-nowrap floating-text pe-none position-relative">
      {floatingTextQueue.map(({ delta, key }) => (
        <small className="position-absolute top-50 start-100 translate-middle-y" key={key}>
          {Array.isArray(delta) ? (
            <Stack className={ANIMATION_FLOATING_TEXT} onAnimationEnd={onAnimationEnd(key)}>
              {delta.map(({ color, value }) => (
                <strong className={color} key={value}>
                  {value}
                </strong>
              ))}
            </Stack>
          ) : (
            <strong
              className={`d-block ${ANIMATION_FLOATING_TEXT} ${delta.color}`}
              onAnimationEnd={onAnimationEnd(key)}
            >
              {delta.value}
            </strong>
          )}
        </small>
      ))}
    </div>
  );
}
