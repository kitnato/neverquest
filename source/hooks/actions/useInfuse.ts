import { useRecoilCallback } from "recoil";

import { LEVELLING_MAXIMUM } from "@neverquest/data/general";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import { ownedItem } from "@neverquest/state/inventory";
import { infusion, infusionLevel, infusionMaximum, infusionStep } from "@neverquest/state/items";
import type { Infusable } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useInfuse() {
  const progressQuest = useProgressQuest();
  const transactEssence = useTransactEssence();

  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      (infusable: Infusable) => {
        const get = getSnapshotGetter(snapshot);

        const ownedInfusable = get(ownedItem(infusable));

        if (ownedInfusable === undefined) {
          return;
        }

        if (get(infusionLevel(infusable)) >= LEVELLING_MAXIMUM) {
          return;
        }

        const infusionStepValue = get(infusionStep(infusable));

        if (infusionStepValue === 0) {
          return;
        }

        const infusionState = infusion(infusable);
        const infusionLevelState = infusionLevel(infusable);
        const infusionValue = get(infusionState);
        const newInfusion = infusionValue + infusionStepValue;

        if (newInfusion >= get(infusionMaximum(infusable))) {
          const newLevel = get(infusionLevelState) + 1;

          set(infusionLevelState, newLevel);

          progressQuest({ quest: "infusing" });

          if (newLevel >= LEVELLING_MAXIMUM) {
            progressQuest({ quest: "infusingMaximum" });
          }

          reset(infusionState);
        } else {
          set(infusionState, newInfusion);
        }

        transactEssence(-(newInfusion - infusionValue));
      },
    [progressQuest, transactEssence],
  );
}
