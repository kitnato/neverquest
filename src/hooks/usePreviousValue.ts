import { useEffect, useRef } from "react";

export default function (value: number) {
  const ref = useRef<null | number>(null);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
