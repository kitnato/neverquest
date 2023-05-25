import { useRecoilCallback } from "recoil";

import { useGenerateMonster } from "@neverquest/hooks/actions/useGenerateMonster";
import { isLevelStarted, progress } from "@neverquest/state/encounter";

export function useResetWilderness() {
  const createMonster = useGenerateMonster();

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
