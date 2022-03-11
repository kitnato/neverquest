import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";

import useAnimation from "hooks/useAnimation";

export default function FloatingText({ delta }) {
  const deltaValue = useRecoilValue(delta);
  const [deltaQueue, setDeltaQueue] = useState([]);

  useEffect(() => {
    if (deltaValue !== null) {
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
      {deltaQueue.map(({ id, value, ...style }) => (
        <small
          className={`position-absolute ${
            value > 0 ? "text-success" : "text-danger"
          }`}
          key={id}
          style={style}
        >
          {value > 0 ? `+${value}` : value}
        </small>
      ))}
    </div>
  );
}
