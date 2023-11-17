import { useCallback, useEffect, useRef, useState } from "react";

export function Typewriter({ children, delay = 50 }: { children: string; delay?: number }) {
  const [delta, setDelta] = useState(0);
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");

  const frameReference = useRef(-1);
  const previousTimeReference = useRef(0);

  const animate = useCallback(
    (time: number) => {
      setDelta((current) => current + (time - (previousTimeReference.current || time)));

      if (delta >= delay) {
        setText((current) => current + children[index]);
        setIndex((current) => current + 1);
        setDelta(0);
      }

      previousTimeReference.current = time;
      frameReference.current = requestAnimationFrame(animate);
    },
    [delta, delay, children, index],
  );

  useEffect(() => {
    if (index === children.length) {
      cancelAnimationFrame(frameReference.current);
      previousTimeReference.current = 0;
    } else {
      frameReference.current = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(frameReference.current);
  }, [animate, children.length, index]);

  return <span>{text}</span>;
}
