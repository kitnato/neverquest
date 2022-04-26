import { useEffect, useRef } from "react";

export default function usePreviousValue(value: number) {
  const ref = useRef<number | null>(null);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
