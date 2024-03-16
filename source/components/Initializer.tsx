import { type ReactNode, useEffect } from "react"

import { useInitialize } from "@neverquest/hooks/actions/useInitialize"

export function Initializer({ children }: { children: ReactNode }) {
  const initialize = useInitialize()

  useEffect(initialize, [initialize])

  return <>{children}</>
}
