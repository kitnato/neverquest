import { useRecoilCallback } from "recoil";

import { useCreateMonster } from "@neverquest/hooks/actions/useCreateMonster";
import { isLevelStarted, progress } from "@neverquest/state/encounter";

export function useResetWilderness() {
  const createMonster = useCreateMonster();

  return useRecoilCallback(
    ({ reset }) =>
      () => {
        reset(isLevelStarted);
        reset(progress);
        createMonster();
      },
    [createMonster]
  );
}
