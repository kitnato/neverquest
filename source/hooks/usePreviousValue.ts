import { useEffect, useRef } from "react"

export function usePreviousValue(value: number) {
  const reference = useRef<number | undefined>()

  useEffect(() => {
    reference.current = value
  }, [value])

  return reference.current
}
