import { PrimitiveAtom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { nanoid } from "nanoid";

import useAnimation from "neverquest/hooks/useAnimation";
import { DeltaDisplay } from "neverquest/types/ui";
import { DELTA_DEFAULT } from "neverquest/utilities/constants";

type FloatingTextStyle = {
  bottom: number;
  contents: JSX.Element;
  hasGrown: boolean;
  id: symbol;
  key: string;
  opacity: number;
  right: number;
  scale: number;
  transform: string;
} | null;

export default function FloatingText({
  atom,
  exitToLeft = false,
}: {
  atom: PrimitiveAtom<DeltaDisplay>;
  exitToLeft?: boolean;
}) {
  const [deltaValue, setDeltaValue] = useAtom(atom);
  const [deltaQueue, setDeltaQueue] = useState<FloatingTextStyle[]>([]);

  useEffect(() => {
    if (deltaValue === DELTA_DEFAULT) {
      return;
    }

    let contents = null;

    if (Array.isArray(deltaValue)) {
      contents = (
        <Stack direction="horizontal" gap={1}>
          {deltaValue.map(({ color, value }) => (
            <span className={color || ""} key={value}>
              {value}
            </span>
          ))}
        </Stack>
      );
    } else {
      const { color, value } = deltaValue;

      contents = <span className={color || ""}>{value}</span>;
    }

    if (contents) {
      setDeltaQueue([
        {
          bottom: -8,
          contents,
          hasGrown: false,
          id: Symbol(),
          key: nanoid(),
          opacity: 1,
          right: -6,
          scale: 1,
          transform: "scale(0.9)",
        },
        ...deltaQueue,
      ]);

      setDeltaValue(DELTA_DEFAULT);
    }
  }, [deltaValue]);

  useAnimation(() => {
    const newQueue = deltaQueue.map((current) => {
      if (current === null) {
        return null;
      }

      const { bottom, hasGrown, opacity, right, scale } = current;
      let newBottom = bottom;
      let newHasGrown = hasGrown;
      let newOpacity = opacity;
      let newRight = right;
      let newScale = scale;

      // First swell, then shrink quickly while rising to a set height, finally fade away towards the right.
      if (!hasGrown && scale < 1.4) {
        newScale += 0.06;
      } else {
        newHasGrown = true;

        if (scale > 1) {
          newScale -= 0.03;
        }
      }

      if (bottom >= 10) {
        newOpacity -= 0.05;
        newRight += exitToLeft ? 1 : -1;

        if (newOpacity <= 0) {
          return null;
        }
      } else {
        newBottom += 0.5;
      }

      return {
        ...current,
        bottom: newBottom,
        hasGrown: newHasGrown,
        opacity: newOpacity,
        right: newRight,
        scale: newScale,
        transform: `scale(${scale})`,
      };
    });

    setDeltaQueue(newQueue.filter((current) => current !== null));
  }, deltaQueue.length === 0);

  return (
    <div className="position-relative">
      {deltaQueue.map((delta) => {
        if (delta === null) {
          return;
        }

        const { bottom, contents, key, opacity, right, transform } = delta;

        return (
          <small
            className="position-absolute"
            key={key}
            style={{ bottom, opacity, right, transform }}
          >
            <strong>{contents}</strong>
          </small>
        );
      })}
    </div>
  );
}
