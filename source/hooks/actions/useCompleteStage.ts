import { useRecoilCallback } from "recoil";

import { useGenerateMerchantOffer } from "@neverquest/hooks/actions/useGenerateMerchantOffer";
import { useSetMonologues } from "@neverquest/hooks/actions/useSetMonologues";
import { useToggleAttacking } from "@neverquest/hooks/actions/useToggleAttacking";
import { isAttacking } from "@neverquest/state/character";
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
  const toggleAttacking = useToggleAttacking();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const encounterValue = get(encounter);
        const isAttackingValue = get(isAttacking);

        if (isFinality(encounterValue)) {
          set(defeatedFinality, encounterValue);
        }

        if (get(isStageCompleted)) {
          generateMerchantOffer();
          setMonologues();
        }

        if (encounterValue === "res cogitans") {
          set(consciousness, "vigilans");

          if (isAttackingValue) {
            toggleAttacking();
          }
        }
      },
    [generateMerchantOffer, setMonologues, toggleAttacking],
  );
}
