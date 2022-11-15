import { useRecoilCallback } from "recoil";

import useGenerateMerchantInventory from "@neverquest/hooks/actions/useGenerateMerchantInventory";
import useIncreaseLevel from "@neverquest/hooks/actions/useIncreaseLevel";
import { isWilderness, mode } from "@neverquest/state/encounter";
import { LocationType } from "@neverquest/types/enums";
import { getSnapshotGetter } from "@neverquest/utilities/helpers";

export default function () {
  const generateMerchantInventory = useGenerateMerchantInventory();
  const increaseLevel = useIncreaseLevel();

  return useRecoilCallback(({ set, snapshot }) => () => {
    const get = getSnapshotGetter(snapshot);

    const isWildernessValue = get(isWilderness);

    if (isWildernessValue) {
      generateMerchantInventory();
      set(mode, LocationType.Caravan);
    } else {
      increaseLevel();
      set(mode, LocationType.Wilderness);
    }
  });
}
