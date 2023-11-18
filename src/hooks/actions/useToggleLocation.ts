import { useRecoilCallback } from "recoil";

import { useGenerateMerchantInventory } from "@neverquest/hooks/actions/useGenerateMerchantInventory";
import { useIncreaseStage } from "@neverquest/hooks/actions/useIncreaseStage";
import { useResetWilderness } from "@neverquest/hooks/actions/useResetWilderness";
import {
  consciousness,
  encounter,
  isStageCompleted,
  isStageStarted,
  location,
  stage,
  stageMaximum,
} from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useToggleLocation() {
  const generateMerchantInventory = useGenerateMerchantInventory();
  const increaseStage = useIncreaseStage();
  const resetWilderness = useResetWilderness();

  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        if (get(location) === "wilderness") {
          if (get(encounter) === "res cogitans") {
            set(consciousness, "vigilans");
          }

          reset(isStageStarted);

          set(isShowing("location"), true);
          set(location, "caravan");

          generateMerchantInventory();
        } else {
          if (get(isStageCompleted) && get(stage) === get(stageMaximum)) {
            increaseStage();
          }

          resetWilderness();

          set(location, "wilderness");
        }
      },
    [generateMerchantInventory, increaseStage],
  );
}
