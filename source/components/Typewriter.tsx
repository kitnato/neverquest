import { useCallback, useEffect, useRef, useState } from "react";

const CURSOR = "|";
const CURSOR_DELAY = 500;
const SEPARATOR = ".";
const TEXT_DELAY = 100;

export function Typewriter({ children, delay = TEXT_DELAY }: { children: string; delay?: number }) {
  const [cursor, setCursor] = useState(CURSOR);
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");

  const deltaCursorReference = useRef(0);
  const deltaDelayReference = useRef(0);
  const frameReference = useRef(-1);
  const timeReference = useRef(0);

  const animate = useCallback(
    (time: number) => {
      const delta = time - (timeReference.current || time);

      deltaCursorReference.current += delta;
      deltaDelayReference.current += delta;

      if (index === children.length && deltaCursorReference.current >= CURSOR_DELAY) {
        setCursor((currentCursor) => (currentCursor === CURSOR ? "" : CURSOR));
        deltaCursorReference.current = 0;
      }

      if (
        index < children.length &&
        deltaDelayReference.current >= (children[index - 1] === SEPARATOR ? delay * 3 : delay)
      ) {
        setText((currentText) => currentText + children[index]);
        setIndex((currentIndex) => currentIndex + 1);

        deltaDelayReference.current = 0;
      }

      frameReference.current = requestAnimationFrame(animate);
      timeReference.current = time;
    },
    [children, delay, index],
  );

  useEffect(() => {
    frameReference.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameReference.current);
    };
  }, [animate]);

  // TODO - check if conditional needed.
  return (
    <strong style={{ fontFamily: "monospace" }}>
      {text}
      {cursor === "" ? <>&nbsp;</> : cursor}
    </strong>
  );
}
