import { useEffect, useState } from "react";
import { RecoilValue, useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";

import useAnimation from "neverquest/hooks/useAnimation";

type FloatingTextStyle = {
  bottom: number;
  fontWeight: string;
  id: string;
  opacity: number;
  right: number;
  value: number;
} | null;

export default function FloatingText({ atom }: { atom: RecoilValue<number> }) {
  const deltaValue = useRecoilValue(atom);
  const [deltaQueue, setDeltaQueue] = useState<FloatingTextStyle[]>([]);

  useEffect(() => {
    if (deltaValue !== 0) {
      setDeltaQueue((currentDeltaQueue) => [
        {
          bottom: 0,
          fontWeight: "bold",
          id: uuidv4(),
          opacity: 1,
          right: 0,
          value: deltaValue,
        },
        ...currentDeltaQueue,
      ]);
    }
  }, [deltaValue]);

  useAnimation(() => {
    setDeltaQueue((currentDeltaQueue) => {
      const newQueue = currentDeltaQueue.map((currentDelta) => {
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

      return newQueue.filter((currentDelta) => currentDelta !== null);
    });
  }, deltaQueue.length === 0);

  return (
    <div className="position-relative">
      {deltaQueue.map((delta) => {
        if (delta === null) {
          return;
        }

        const { id, value, ...style } = delta;

        return (
          <small
            className={`position-absolute ${value > 0 ? "text-success" : "text-danger"}`}
            key={id}
            style={style}
          >
            {value > 0 ? `+${value}` : value}
          </small>
        );
      })}
    </div>
  );
}
