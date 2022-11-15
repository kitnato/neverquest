import { ReactNode, useEffect } from "react";

import useInitialize from "@neverquest/hooks/actions/useInitialize";

export default function ({ children }: { children: ReactNode }) {
  const initialize = useInitialize();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return <>{children}</>;
}
