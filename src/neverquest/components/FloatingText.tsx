import { useEffect, useState } from "react";
import { RecoilState, useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";

import { DeltaDisplay, UIFloatingTextType } from "neverquest/env";
import useAnimation from "neverquest/hooks/useAnimation";
import { DELTA_DEFAULT } from "neverquest/utilities/constants";

type FloatingTextStyle = {
  bottom: number;
  color: UIFloatingTextType;
  id: string;
  opacity: number;
  right: number;
  value: string;
} | null;

export default function FloatingText({ atom }: { atom: RecoilState<DeltaDisplay> }) {
  const [{ color, value }, setDeltaValue] = useRecoilState(atom);
  const [deltaQueue, setDeltaQueue] = useState<FloatingTextStyle[]>([]);

  useEffect(() => {
    if (color !== null && value !== "") {
      setDeltaQueue([
        {
          bottom: 0,
          color,
          id: uuidv4(),
          opacity: 1,
          right: 0,
          value,
        },
        ...deltaQueue,
      ]);
    }

    return () => setDeltaQueue([]);
  }, [color, value]);

  useAnimation(() => {
    const newQueue = deltaQueue.map((currentDelta) => {
      if (currentDelta === null) {
        return null;
      }

      const newOpacity = currentDelta.opacity - 0.01;

      if (newOpacity <= 0) {
        setDeltaValue(DELTA_DEFAULT);
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

        const { id, value, ...style } = delta;

        return (
          <small className={`position-absolute ${color}`} key={id} style={style}>
            <strong>{value}</strong>
          </small>
        );
      })}
    </div>
  );
}
