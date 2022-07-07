import { PrimitiveAtom, useAtom } from "jotai";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";

import { AnimationSpeed, AnimationType, DeltaDisplay } from "neverquest/types/ui";
import { DELTA_DEFAULT } from "neverquest/utilities/constants";
import { getAnimationClass } from "neverquest/utilities/helpers";

type FloatingText = {
  contents: JSX.Element;
  key: string;
};

export default function FloatingText({ atom }: { atom: PrimitiveAtom<DeltaDisplay> }) {
  const [deltaValue, setDeltaValue] = useAtom(atom);

  const [textQueue, setTextQueue] = useState<FloatingText[]>([]);

  const animationClass = getAnimationClass({
    speed: AnimationSpeed.Slower,
    type: AnimationType.FadeOutUp,
  });

  useEffect(() => {
    if (deltaValue === DELTA_DEFAULT) {
      return;
    }

    const onAnimationEnd = () => {
      setTextQueue(textQueue.filter((current) => current.key !== key));
    };
    const key = nanoid();

    if (Array.isArray(deltaValue)) {
      setTextQueue((current) => [
        ...current,
        {
          contents: (
            <Stack
              className={animationClass}
              direction="horizontal"
              gap={1}
              onAnimationEnd={onAnimationEnd}
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
              onAnimationEnd={onAnimationEnd}
            >
              {value}
            </div>
          ),
          key,
        },
      ]);
    }

    setDeltaValue(DELTA_DEFAULT);
  }, [deltaValue]);

  return (
    <div className="position-relative">
      {textQueue.map((delta) => {
        const { contents, key } = delta;

        return (
          <small className="position-absolute" key={key} style={{ bottom: -6, right: -6 }}>
            <strong>{contents}</strong>
          </small>
        );
      })}
    </div>
  );
}
