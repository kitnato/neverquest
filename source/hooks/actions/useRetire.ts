import { useRecoilCallback } from "recoil";

import { LABEL_UNKNOWN, RETIREMENT_STAGE_MINIMUM } from "@neverquest/data/general";
import { useInitialize } from "@neverquest/hooks/actions/useInitialize";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { useResetAttributes } from "@neverquest/hooks/actions/useResetAttributes";
import { useResetWilderness } from "@neverquest/hooks/actions/useResetWilderness";
import {
  blacksmithInventory,
  fletcherInventory,
  merchantInventory,
  monologue,
} from "@neverquest/state/caravan";
import { attackDuration, name } from "@neverquest/state/character";
import {
  defeatedFinality,
  isStageStarted,
  location,
  progress,
  progressReduction,
  stage,
  stageMaximum,
} from "@neverquest/state/encounter";
import { armor, shield, weapon } from "@neverquest/state/gear";
import { inventory } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { masteryProgress, masteryRank } from "@neverquest/state/masteries";
import { questProgress } from "@neverquest/state/quests";
import { blight, poison } from "@neverquest/state/reserves";
import { essence } from "@neverquest/state/resources";
import { isSkillAcquired } from "@neverquest/state/skills";
import { isTraitAcquired, selectedTrait } from "@neverquest/state/traits";
import { isInheritableItem } from "@neverquest/types/type-guards";
import { CREW_TYPES, MASTERY_TYPES, SKILL_TYPES } from "@neverquest/types/unions";
import { getProgressReduction, getSnapshotGetter } from "@neverquest/utilities/getters";

export function useRetire() {
  const initialize = useInitialize();
  const progressQuest = useProgressQuest();
  const resetAttributes = useResetAttributes();
  const resetWilderness = useResetWilderness();

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

        reset(armor);
        reset(blight);
        reset(poison);
        reset(essence);
        reset(defeatedFinality);
        reset(isStageStarted);
        reset(progress);
        reset(location);
        reset(name);
        reset(shield);
        reset(stage);
        reset(weapon);
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

        for (const crew of CREW_TYPES) {
          reset(monologue(crew));
        }

        for (const mastery of MASTERY_TYPES) {
          reset(masteryProgress(mastery));
          reset(masteryRank(mastery));
        }

        for (const skill of SKILL_TYPES) {
          reset(isSkillAcquired(skill));
        }

        set(inventory, (currentInventory) =>
          currentInventory.filter((currentItem) => isInheritableItem(currentItem)),
        );

        if (get(name) !== LABEL_UNKNOWN) {
          progressQuest({ quest: "settingName" });
        }

        const defeatedFinalityValue = get(defeatedFinality);

        if (defeatedFinalityValue === "res cogitans") {
          progressQuest({ quest: "killingResCogitans" });
        }

        if (defeatedFinalityValue === "res dominus") {
          progressQuest({ quest: "killingResDominus" });
        }

        for (const { name } of get(inventory)) {
          if (name === "antique coin") {
            progressQuest({ quest: "acquiringAntiqueCoin" });
          }

          if (name === "familiar") {
            progressQuest({ quest: "acquiringFamiliar" });
          }
        }

        progressQuest({ quest: "retiring" });

        resetWilderness();
        initialize(true);
      },
    [initialize, progressQuest, resetAttributes, resetWilderness],
  );
}
