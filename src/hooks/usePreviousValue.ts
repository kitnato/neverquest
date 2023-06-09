import { useEffect, useRef } from "react";

export function usePreviousValue(value: number) {
  const ref = useRef<number | null>(null);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
