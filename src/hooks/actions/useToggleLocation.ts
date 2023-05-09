import { useRecoilCallback } from "recoil";

import { useGenerateMerchantInventory } from "@neverquest/hooks/actions/useGenerateMerchantInventory";
import { useIncreaseLevel } from "@neverquest/hooks/actions/useIncreaseLevel";
import { useResetWilderness } from "@neverquest/hooks/actions/useResetWilderness";
import { hasBoughtFromMerchant } from "@neverquest/state/caravan";
import {
  isLevelCompleted,
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
  const resetWilderness = useResetWilderness();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const isWildernessValue = get(isWilderness);

        if (isWildernessValue) {
          if (get(level) === get(maximumLevel)) {
            generateMerchantInventory();
          }

          set(mode, LocationType.Caravan);
        } else {
          if (get(isLevelCompleted) && get(level) === get(maximumLevel)) {
            increaseLevel();
          }

          resetWilderness();

          set(mode, LocationType.Wilderness);
          set(hasBoughtFromMerchant, false);
        }
      },
    [generateMerchantInventory, increaseLevel]
  );
}
