import { useEffect, useRef } from "react";

export default function usePreviousValue(value: number) {
  const ref = useRef<null | number>(null);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
