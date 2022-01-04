import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import useAnimation from "hooks/useAnimation";

export default function FloatingText({ delta }) {
  const deltaValue = useRecoilValue(delta);
  const [deltaQueue, setDeltaQueue] = useState([]);

  useEffect(() => {
    if (deltaValue !== null) {
      setDeltaQueue((currentDeltaQueue) => [
        { bottom: 0, opacity: 1, value: deltaValue },
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
          bottom: currentDelta.bottom + 0.5,
          opacity: newOpacity,
          right: 0,
          fontWeight: "bold",
          value: currentDelta.value,
        };
      });

      return newQueue.filter((currentDelta) => currentDelta !== null);
    });
  }, deltaQueue.length === 0);

  return (
    <div className="position-relative">
      {deltaQueue.map(({ value, ...style }) => (
        <small
          className={`position-absolute ${
            value > 0 ? "text-success" : "text-danger"
          }`}
          key={style.opacity}
          style={style}
        >
          {value > 0 ? `+${value}` : value}
        </small>
      ))}
    </div>
  );
}
