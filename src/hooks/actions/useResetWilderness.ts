import { useRecoilCallback } from "recoil";

import { useGenerateMonster } from "@neverquest/hooks/actions/useGenerateMonster";
import { isStageStarted, progress } from "@neverquest/state/encounter";

export function useResetWilderness() {
  const generateMonster = useGenerateMonster();

  return useRecoilCallback(
    ({ reset }) =>
      () => {
        reset(isStageStarted);
        reset(progress);
        generateMonster();
      },
    [generateMonster]
  );
}
