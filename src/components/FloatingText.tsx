import { nanoid } from "nanoid";
import { ReactNode, useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { RecoilState, useRecoilValue, useResetRecoilState } from "recoil";

import { DEFAULT_DELTA_DISPLAY } from "@neverquest/constants";
import { AnimationSpeed, AnimationType, DeltaDisplay } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/getters";

type FloatingText = {
  contents: ReactNode;
  key: string;
};

export default function ({ atom }: { atom: RecoilState<DeltaDisplay> }) {
  const deltaValue = useRecoilValue(atom);
  const resetDeltaValue = useResetRecoilState(atom);

  const [textQueue, setTextQueue] = useState<FloatingText[]>([]);

  const animationClass = getAnimationClass({
    speed: AnimationSpeed.Slower,
    type: AnimationType.FadeOutUp,
  });

  useEffect(() => {
    if (deltaValue === DEFAULT_DELTA_DISPLAY) {
      return;
    }

    const key = nanoid();

    const onAnimationEnd = (id: string) => () =>
      setTextQueue((current) => current.filter(({ key }) => key !== id));

    if (Array.isArray(deltaValue)) {
      setTextQueue((current) => [
        ...current,
        {
          contents: (
            <Stack
              className={animationClass}
              direction="horizontal"
              gap={1}
              onAnimationEnd={onAnimationEnd(key)}
            >
              {deltaValue.map(({ color, value }) => (
                <span className={color || ""} key={value}>
                  {value}
                </span>
              ))}
            </Stack>
          ),
          key,
        },
      ]);
    } else {
      const { color, value } = deltaValue;

      setTextQueue((current) => [
        ...current,
        {
          contents: (
            <div
              className={`${animationClass}${color ? ` ${color}` : ""}`}
              onAnimationEnd={onAnimationEnd(key)}
            >
              {value}
            </div>
          ),
          key,
        },
      ]);
    }

    resetDeltaValue();
  }, [animationClass, deltaValue, resetDeltaValue]);

  return (
    <div className="position-relative">
      {textQueue.map((delta) => {
        const { contents, key } = delta;

        return (
          <small className="position-absolute" key={key} style={{ bottom: -6, left: -8 }}>
            <strong
              style={{
                textShadow:
                  "-1px 1px 1px #fff, 1px 1px 1px #fff, 1px -1px 1px #fff, -1px -1px 1px #fff",
              }}
            >
              {contents}
            </strong>
          </small>
        );
      })}
    </div>
  );
}
