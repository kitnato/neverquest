import { useRecoilCallback } from "recoil";

import { useCollectLoot } from "@neverquest/hooks/actions/useCollectLoot";
import { useCompleteStage } from "@neverquest/hooks/actions/useCompleteStage";
import { useIncreaseStage } from "@neverquest/hooks/actions/useIncreaseStage";
import { useResetWilderness } from "@neverquest/hooks/actions/useResetWilderness";
import { isAttacking } from "@neverquest/state/character";
import { canAutoProgress } from "@neverquest/state/items";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useAutoProgression() {
  const collectLoot = useCollectLoot();
  const completeStage = useCompleteStage();
  const increaseStage = useIncreaseStage();
  const resetWilderness = useResetWilderness();

  return useRecoilCallback(
    ({ snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        if (get(canAutoProgress) && get(isAttacking) && collectLoot() === "success") {
          completeStage();
          increaseStage();
          resetWilderness();
        }
      },
    [collectLoot, completeStage, increaseStage, resetWilderness],
  );
}
