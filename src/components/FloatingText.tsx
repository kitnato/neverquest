import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { RecoilState, useResetRecoilState, useRecoilValue } from "recoil";

import { DELTA_DEFAULT } from "@neverquest/constants";
import { getAnimationClass } from "@neverquest/utilities/helpers";
import { AnimationSpeed, AnimationType, DeltaDisplay } from "@neverquest/types/ui";

type FloatingText = {
  contents: JSX.Element;
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
    if (deltaValue === DELTA_DEFAULT) {
      return;
    }

    const key = nanoid();

    const onAnimationEnd = (id: string) => () => {
      setTextQueue((current) => current.filter(({ key }) => key !== id));
    };

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
  }, [deltaValue]);

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
