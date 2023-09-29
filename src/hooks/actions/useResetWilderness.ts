import { useRecoilCallback } from "recoil";

import { useGenerateMonster } from "@neverquest/hooks/actions/useGenerateMonster";
import { isStageStarted, progress } from "@neverquest/state/encounter";
import { essenceLoot, itemsLoot } from "@neverquest/state/resources";

export function useResetWilderness() {
  const generateMonster = useGenerateMonster();

  return useRecoilCallback(
    ({ reset }) =>
      () => {
        reset(isStageStarted);
        reset(progress);

        reset(essenceLoot);
        reset(itemsLoot);

        generateMonster();
      },
    [generateMonster],
  );
}
