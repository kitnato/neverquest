import { useRecoilCallback } from "recoil";

import { useGenerateMerchantInventory } from "@neverquest/hooks/actions/useGenerateMerchantInventory";
import { useIncreaseLevel } from "@neverquest/hooks/actions/useIncreaseLevel";
import { hasBoughtFromMerchant } from "@neverquest/state/caravan";
import {
  isLevelCompleted,
  isLevelStarted,
  isWilderness,
  level,
  maximumLevel,
  mode,
} from "@neverquest/state/encounter";
import { LocationType } from "@neverquest/types/enums";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useToggleLocation() {
  const generateMerchantInventory = useGenerateMerchantInventory();
  const increaseLevel = useIncreaseLevel();

  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const isWildernessValue = get(isWilderness);

        if (isWildernessValue) {
          generateMerchantInventory();

          reset(isLevelStarted);
          set(mode, LocationType.Caravan);
        } else {
          if (get(isLevelCompleted) && get(level) === get(maximumLevel)) {
            increaseLevel();
          }

          set(mode, LocationType.Wilderness);
          set(hasBoughtFromMerchant, false);
        }
      },
    [generateMerchantInventory, increaseLevel]
  );
}
