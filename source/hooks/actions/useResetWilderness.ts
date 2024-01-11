import { useRecoilCallback } from "recoil";

import { isAttacking } from "@neverquest/state/character";
import { isStageStarted, progress } from "@neverquest/state/encounter";
import { canAutoProgress } from "@neverquest/state/items";
import { isMonsterNew } from "@neverquest/state/monster";
import { questProgress } from "@neverquest/state/quests";
import { essenceLoot, hasLooted, itemsLoot } from "@neverquest/state/resources";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useResetWilderness() {
  return useRecoilCallback(
    ({ reset, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        if (!(get(canAutoProgress) && get(isAttacking))) {
          reset(isStageStarted);
        }

        reset(essenceLoot);
        reset(hasLooted);
        reset(isMonsterNew);
        reset(itemsLoot);
        reset(progress);
        reset(questProgress("killingStage"));
      },
    [],
  );
}
