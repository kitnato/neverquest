import { ReactNode, useEffect, useRef } from "react";

import useInitialize from "@neverquest/hooks/actions/useInitialize";

export default function ({ children }: { children: ReactNode }) {
  const initialize = useInitialize();

  // Guarantees that initialization only runs once in local dev StrictMode.
  const render = useRef(false);

  useEffect(() => {
    if (!render.current) {
      initialize();
      render.current = true;
    }
  }, [initialize]);

  return <>{children}</>;
}
