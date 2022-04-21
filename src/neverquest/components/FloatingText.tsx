import { useEffect, useState } from "react";
import { RecoilState, useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";

import { DeltaDisplay } from "neverquest/env";
import useAnimation from "neverquest/hooks/useAnimation";
import { DELTA_DEFAULT } from "neverquest/utilities/constants";

type FloatingTextStyle = {
  bottom: number;
  contents: JSX.Element;
  id: string;
  opacity: number;
  right: number;
} | null;

export default function FloatingText({ atom }: { atom: RecoilState<DeltaDisplay> }) {
  const [deltaValue, setDeltaValue] = useRecoilState(atom);
  const [deltaQueue, setDeltaQueue] = useState<FloatingTextStyle[]>([]);

  useEffect(() => {
    if (deltaValue === DELTA_DEFAULT) {
      return;
    }

    let contents = null;

    if (Array.isArray(deltaValue)) {
      contents = (
        <>
          {deltaValue.map(({ color, value }) => (
            <span className={color || ""} key={value}>
              {value}
            </span>
          ))}
        </>
      );
    } else {
      const { color, value } = deltaValue;

      contents = <span className={color || ""}>{value}</span>;
    }

    if (contents) {
      setDeltaQueue([
        {
          bottom: 5,
          contents,
          id: uuidv4(),
          opacity: 1,
          right: 5,
        },
        ...deltaQueue,
      ]);

      setDeltaValue(DELTA_DEFAULT);
    }
  }, [deltaValue]);

  useAnimation(() => {
    const newQueue = deltaQueue.map((currentDelta) => {
      if (currentDelta === null) {
        return null;
      }

      const newOpacity = currentDelta.opacity - 0.01;

      if (newOpacity <= 0) {
        return null;
      }

      return {
        ...currentDelta,
        bottom: currentDelta.bottom + 0.5,
        opacity: newOpacity,
        right: currentDelta.right - 0.25,
      };
    });

    setDeltaQueue(newQueue.filter((currentDelta) => currentDelta !== null));
  }, deltaQueue.length === 0);

  return (
    <div className="position-relative">
      {deltaQueue.map((delta) => {
        if (delta === null) {
          return;
        }

        const { id, contents, ...style } = delta;

        return (
          <small className="position-absolute" key={id} style={style}>
            <strong>{contents}</strong>
          </small>
        );
      })}
    </div>
  );
}
