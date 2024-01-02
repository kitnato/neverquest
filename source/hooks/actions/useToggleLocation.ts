import { useRecoilCallback } from "recoil";

import { useGenerateMerchantInventory } from "@neverquest/hooks/actions/useGenerateMerchantInventory";
import { useIncreaseStage } from "@neverquest/hooks/actions/useIncreaseStage";
import { useResetWilderness } from "@neverquest/hooks/actions/useResetWilderness";
import { useSetMonologues } from "@neverquest/hooks/actions/useSetMonologues";
import {
  consciousness,
  defeatedFinality,
  encounter,
  isStageCompleted,
  isStageStarted,
  location,
  stage,
  stageMaximum,
} from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import { FINALITY_TYPES, type Finality } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useToggleLocation() {
  const generateMerchantInventory = useGenerateMerchantInventory();
  const increaseStage = useIncreaseStage();
  const resetWilderness = useResetWilderness();
  const setMonologues = useSetMonologues();

  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const encounterValue = get(encounter);

        if (get(location) === "wilderness") {
          if (new Set<string>(FINALITY_TYPES).has(encounterValue)) {
            set(defeatedFinality, encounterValue as Finality);
          }

          if (encounterValue === "res cogitans") {
            set(consciousness, "vigilans");
          }

          reset(isStageStarted);

          set(isShowing("location"), true);
          set(location, "caravan");

          generateMerchantInventory();
          setMonologues();
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
