import { useRecoilCallback, useRecoilValue } from "recoil";

import useGenerateMerchantInventory from "@neverquest/hooks/actions/useGenerateMerchantInventory";
import useIncreaseLevel from "@neverquest/hooks/actions/useIncreaseLevel";
import {
  isLevelCompleted,
  isLevelStarted,
  isWilderness,
  level,
  maximumLevel,
  mode,
} from "@neverquest/state/encounter";
import { LocationType } from "@neverquest/types/enums";
import { getSnapshotGetter } from "@neverquest/utilities/helpers";

export default function () {
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);

  const generateMerchantInventory = useGenerateMerchantInventory();
  const increaseLevel = useIncreaseLevel();

  return useRecoilCallback(({ set, snapshot }) => () => {
    const get = getSnapshotGetter(snapshot);

    const isWildernessValue = get(isWilderness);

    if (isWildernessValue) {
      set(isLevelStarted, false);
      generateMerchantInventory();
      set(mode, LocationType.Caravan);
    } else {
      if (isLevelCompletedValue && get(level) === get(maximumLevel)) {
        increaseLevel();
      }

      set(mode, LocationType.Wilderness);
    }
  });
}
