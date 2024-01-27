import { useRecoilCallback } from "recoil";

import { useGenerateMonster } from "@neverquest/hooks/actions/useGenerateMonster";
import { isAttacking } from "@neverquest/state/character";
import { isStageStarted, progress } from "@neverquest/state/encounter";
import { isWeaving } from "@neverquest/state/items";
import { questProgress } from "@neverquest/state/quests";
import { essenceLoot, hasLooted, itemsLoot } from "@neverquest/state/resources";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useResetWilderness() {
  const generateMonster = useGenerateMonster();

  return useRecoilCallback(
    ({ reset, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        if (!(get(isWeaving) && get(isAttacking))) {
          reset(isStageStarted);
        }

        reset(essenceLoot);
        reset(hasLooted);
        reset(itemsLoot);
        reset(progress);
        reset(questProgress("killingStage"));

        generateMonster();
      },
    [generateMonster],
  );
}
