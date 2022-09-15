import { ReactNode, useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { initialization } from "@neverquest/state/transactions";

export default function ({ children }: { children: ReactNode }) {
  const initialize = useSetRecoilState(initialization);

  useEffect(() => {
    initialize(null);
  }, []);

  return <>{children}</>;
}
