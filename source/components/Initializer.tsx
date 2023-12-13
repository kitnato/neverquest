import { type ReactNode, useEffect } from "react";

import { useInitialize } from "@neverquest/hooks/actions/useInitialize";
import { useCheatQuest } from "@neverquest/hooks/useCheatQuest";

export function Initializer({ children }: { children: ReactNode }) {
  const initialize = useInitialize();

  useCheatQuest();

  useEffect(initialize, [initialize]);

  return <>{children}</>;
}
