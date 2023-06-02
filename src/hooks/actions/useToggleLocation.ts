import { useRecoilCallback } from "recoil";

import { useGenerateMerchantInventory } from "@neverquest/hooks/actions/useGenerateMerchantInventory";
import { useIncreaseStage } from "@neverquest/hooks/actions/useIncreaseStage";
import { useResetWilderness } from "@neverquest/hooks/actions/useResetWilderness";
import { hasBoughtFromMerchant } from "@neverquest/state/caravan";
import {
  isStageCompleted,
  isWilderness,
  mode,
  stage,
  stageMaximum,
} from "@neverquest/state/encounter";
import { Location } from "@neverquest/types/enums";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useToggleLocation() {
  const generateMerchantInventory = useGenerateMerchantInventory();
  const increaseStage = useIncreaseStage();
  const resetWilderness = useResetWilderness();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const isWildernessValue = get(isWilderness);

        if (isWildernessValue) {
          generateMerchantInventory();

          set(mode, Location.Caravan);
        } else {
          if (get(isStageCompleted) && get(stage) === get(stageMaximum)) {
            increaseStage();
          }

          resetWilderness();

          set(mode, Location.Wilderness);
          set(hasBoughtFromMerchant, false);
        }
      },
    [generateMerchantInventory, increaseStage]
  );
}
