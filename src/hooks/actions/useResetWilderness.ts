import { useRecoilCallback } from "recoil";

import { useGenerateMonster } from "@neverquest/hooks/actions/useGenerateMonster";
import { isStageStarted, progress } from "@neverquest/state/encounter";
import { coinsLoot, essenceLoot, itemsLoot, scrapLoot } from "@neverquest/state/resources";

export function useResetWilderness() {
  const generateMonster = useGenerateMonster();

  return useRecoilCallback(
    ({ reset }) =>
      () => {
        reset(isStageStarted);
        reset(progress);

        reset(coinsLoot);
        reset(essenceLoot);
        reset(itemsLoot);
        reset(scrapLoot);

        generateMonster();
      },
    [generateMonster],
  );
}
