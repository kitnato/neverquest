import { useRecoilCallback } from "recoil";

import { RETIREMENT_MINIMUM } from "@neverquest/data/general";
import { ENCUMBRANCE, INHERITED_ITEMS, KNAPSACK_SIZE } from "@neverquest/data/inventory";
import { useInitialize } from "@neverquest/hooks/actions/useInitialize";
import { useResetAttributes } from "@neverquest/hooks/actions/useResetAttributes";
import {
  blacksmithInventory,
  fletcherInventory,
  merchantInventory,
} from "@neverquest/state/caravan";
import { attackDuration, name } from "@neverquest/state/character";
import {
  isStageStarted,
  location,
  progress,
  progressReduction,
  stage,
  stageMaximum,
} from "@neverquest/state/encounter";
import { encumbranceMaximum, hasKnapsack, inventory } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { infusionCurrent } from "@neverquest/state/items";
import { isMasteryUnlocked, masteryProgress, masteryRank } from "@neverquest/state/masteries";
import { essence } from "@neverquest/state/resources";
import { isSkillAcquired } from "@neverquest/state/skills";
import { isTraitAcquired, selectedTrait } from "@neverquest/state/traits";
import { isTrinket } from "@neverquest/types/type-guards";
import { INFUSABLE_TYPES, MASTERY_TYPES, SKILL_TYPES } from "@neverquest/types/unions";
import { getProgressReduction, getSnapshotGetter } from "@neverquest/utilities/getters";

// TODO
export function useRetire() {
  const initialize = useInitialize();
  const resetAttributes = useResetAttributes();

  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        if (get(stageMaximum) < RETIREMENT_MINIMUM) {
          return;
        }

        initialize(true);

        const selectedTraitValue = get(selectedTrait);

        if (selectedTraitValue !== null) {
          set(isTraitAcquired(selectedTraitValue), true);
          reset(selectedTrait);
        }

        set(isShowing("traits"), true);
        set(progressReduction, getProgressReduction(get(stage)));

        reset(essence);
        reset(isStageStarted);
        reset(progress);
        reset(location);
        reset(name);
        reset(stage);

        resetAttributes();

        reset(attackDuration);

        reset(blacksmithInventory);
        reset(fletcherInventory);
        reset(merchantInventory);

        MASTERY_TYPES.forEach((current) => {
          reset(isMasteryUnlocked(current));
          reset(masteryProgress(current));
          reset(masteryRank(current));
        });

        SKILL_TYPES.forEach((current) => reset(isSkillAcquired(current)));

        set(inventory, (currentInventory) =>
          currentInventory.filter(
            (currentItem) => isTrinket(currentItem) && INHERITED_ITEMS.includes(currentItem.name),
          ),
        );

        if (get(hasKnapsack)) {
          set(encumbranceMaximum, ENCUMBRANCE + KNAPSACK_SIZE);
        } else {
          reset(encumbranceMaximum);
        }

        INFUSABLE_TYPES.forEach((current) => reset(infusionCurrent(current)));
      },
    [initialize, resetAttributes],
  );
}
