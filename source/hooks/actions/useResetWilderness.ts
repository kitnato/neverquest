import { useRecoilCallback } from "recoil";

import { useGenerateMonster } from "@neverquest/hooks/actions/useGenerateMonster";
import { isAttacking } from "@neverquest/state/character";
import { isStageStarted, progress } from "@neverquest/state/encounter";
import { isRelicEquipped } from "@neverquest/state/items";
import { questProgress } from "@neverquest/state/quests";
import { essenceLoot, itemsLoot } from "@neverquest/state/resources";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useResetWilderness() {
  const generateMonster = useGenerateMonster();

  return useRecoilCallback(
    ({ reset, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        if (!(get(isRelicEquipped("automincer")) && get(isAttacking))) {
          reset(isStageStarted);
        }

        reset(essenceLoot);
        reset(itemsLoot);
        reset(progress);
        reset(questProgress("killingStage"));

        generateMonster();
      },
    [generateMonster],
  );
}
