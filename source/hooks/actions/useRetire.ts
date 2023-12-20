import { useRecoilCallback } from "recoil";

import { LABEL_UNKNOWN, RETIREMENT_STAGE_MINIMUM } from "@neverquest/data/general";
import { useInitialize } from "@neverquest/hooks/actions/useInitialize";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
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
import { inventory } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { masteryProgress, masteryRank } from "@neverquest/state/masteries";
import { questProgress } from "@neverquest/state/quests";
import { essence } from "@neverquest/state/resources";
import { isSkillAcquired } from "@neverquest/state/skills";
import { isTraitAcquired, selectedTrait } from "@neverquest/state/traits";
import { isUsableItem } from "@neverquest/types/type-guards";
import { MASTERY_TYPES, SKILL_TYPES } from "@neverquest/types/unions";
import { getProgressReduction, getSnapshotGetter } from "@neverquest/utilities/getters";

export function useRetire() {
  const initialize = useInitialize();
  const progressQuest = useProgressQuest();
  const resetAttributes = useResetAttributes();

  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        if (get(stageMaximum) < RETIREMENT_STAGE_MINIMUM) {
          return;
        }

        const selectedTraitValue = get(selectedTrait);

        if (selectedTraitValue !== undefined) {
          set(isTraitAcquired(selectedTraitValue), true);
          reset(selectedTrait);

          if (selectedTraitValue === "inoculated") {
            set(isShowing("deflection"), true);
          }

          progressQuest({ quest: "traits" });
          progressQuest({ quest: "traitsAll" });
        }

        set(isShowing("traits"), true);
        set(progressReduction, getProgressReduction(get(stage)));

        reset(essence);
        reset(isStageStarted);
        reset(progress);
        reset(location);
        reset(name);
        reset(stage);
        reset(questProgress("attributesIncreasingAll"));
        reset(questProgress("attributesUnlockingAll"));
        reset(questProgress("hiringAll"));
        reset(questProgress("infusingMaximum"));
        reset(questProgress("masteriesAll"));
        reset(questProgress("masteriesRankMaximum"));
        reset(questProgress("powerLevel"));
        reset(questProgress("powerLevelUltra"));
        reset(questProgress("stages"));
        reset(questProgress("stagesEnd"));
        reset(questProgress("skillsCraft"));
        reset(questProgress("skillsAll"));
        reset(questProgress("survivingNoAttributes"));
        reset(questProgress("survivingNoGear"));

        resetAttributes();

        reset(attackDuration);

        reset(blacksmithInventory);
        reset(fletcherInventory);
        reset(merchantInventory);

        for (const mastery of MASTERY_TYPES) {
          reset(masteryProgress(mastery));
          reset(masteryRank(mastery));
        }

        for (const skill of SKILL_TYPES) {
          reset(isSkillAcquired(skill));
        }

        set(inventory, (currentInventory) =>
          currentInventory.filter((currentItem) => isUsableItem(currentItem)),
        );

        if (get(name) !== LABEL_UNKNOWN) {
          progressQuest({ quest: "settingName" });
        }

        progressQuest({ quest: "retiring" });

        initialize(true);
      },
    [progressQuest],
  );
}
