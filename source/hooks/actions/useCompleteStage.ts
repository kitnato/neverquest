import { useRecoilCallback } from "recoil";

import { useGenerateMerchantOffer } from "@neverquest/hooks/actions/useGenerateMerchantOffer";
import { useSetMonologues } from "@neverquest/hooks/actions/useSetMonologues";
import {
  consciousness,
  defeatedFinality,
  encounter,
  isStageCompleted,
} from "@neverquest/state/encounter";
import { isFinality } from "@neverquest/types/type-guards";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useCompleteStage() {
  const generateMerchantOffer = useGenerateMerchantOffer();
  const setMonologues = useSetMonologues();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        if (get(isStageCompleted)) {
          const encounterValue = get(encounter);

          if (isFinality(encounterValue)) {
            set(defeatedFinality, encounterValue);

            if (encounterValue === "res cogitans") {
              set(consciousness, "vigilans");
            }
          }

          generateMerchantOffer();
          setMonologues();
        }
      },
    [generateMerchantOffer, setMonologues],
  );
}
