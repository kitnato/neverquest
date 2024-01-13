import { useRecoilCallback } from "recoil";

import { useGenerateMerchantInventory } from "@neverquest/hooks/actions/useGenerateMerchantInventory";
import { useSetMonologues } from "@neverquest/hooks/actions/useSetMonologues";
import { useToggleAttacking } from "@neverquest/hooks/actions/useToggleAttacking";
import { isAttacking } from "@neverquest/state/character";
import {
  consciousness,
  defeatedFinality,
  encounter,
  isStageCompleted,
} from "@neverquest/state/encounter";
import { FINALITY_TYPES, type Finality } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useCompleteStage() {
  const generateMerchantInventory = useGenerateMerchantInventory();
  const setMonologues = useSetMonologues();
  const toggleAttacking = useToggleAttacking();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const encounterValue = get(encounter);
        const isAttackingValue = get(isAttacking);

        if (new Set<string>(FINALITY_TYPES).has(encounterValue)) {
          set(defeatedFinality, encounterValue as Finality);
        }

        if (get(isStageCompleted)) {
          generateMerchantInventory();
          setMonologues();
        }

        if (encounterValue === "res cogitans") {
          set(consciousness, "vigilans");

          if (isAttackingValue) {
            toggleAttacking();
          }
        }
      },
    [generateMerchantInventory, setMonologues, toggleAttacking],
  );
}
