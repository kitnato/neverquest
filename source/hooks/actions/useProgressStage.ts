import { useRecoilCallback } from "recoil";

import { useCollectLoot } from "@neverquest/hooks/actions/useCollectLoot";
import { useCompleteStage } from "@neverquest/hooks/actions/useCompleteStage";
import { useIncreaseStage } from "@neverquest/hooks/actions/useIncreaseStage";
import { useResetWilderness } from "@neverquest/hooks/actions/useResetWilderness";
import { useToggleAttacking } from "@neverquest/hooks/actions/useToggleAttacking";
import { isAttacking } from "@neverquest/state/character";
import { encounter, isStageCompleted } from "@neverquest/state/encounter";
import { isWeaving } from "@neverquest/state/items";
import { isFinality } from "@neverquest/types/type-guards";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useProgressStage() {
  const collectLoot = useCollectLoot();
  const completeStage = useCompleteStage();
  const increaseStage = useIncreaseStage();
  const resetWilderness = useResetWilderness();
  const toggleAttacking = useToggleAttacking();

  return useRecoilCallback(
    ({ snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        if (get(isStageCompleted)) {
          if (get(isWeaving) && get(isAttacking) && !isFinality(get(encounter))) {
            const lootCollection = collectLoot();

            if (lootCollection === "success") {
              completeStage();
              increaseStage();
              resetWilderness();
            }
          } else if (get(isAttacking)) {
            toggleAttacking();
          }
        }
      },
    [collectLoot, completeStage, increaseStage, resetWilderness, toggleAttacking],
  );
}
