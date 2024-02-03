import { useRecoilCallback } from "recoil";

import { ATTRIBUTES } from "@neverquest/data/attributes";
import { ARMOR_NONE, SHIELD_NONE, WEAPON_NONE } from "@neverquest/data/gear";
import { RETIREMENT_STAGE } from "@neverquest/data/general";
import { SKILLS } from "@neverquest/data/skills";
import { useAcquireSkill } from "@neverquest/hooks/actions/useAcquireSkill";
import { useInitialize } from "@neverquest/hooks/actions/useInitialize";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { useResetAttributes } from "@neverquest/hooks/actions/useResetAttributes";
import { useResetCharacter } from "@neverquest/hooks/actions/useResetCharacter";
import { useResetWilderness } from "@neverquest/hooks/actions/useResetWilderness";
import {
  blacksmithInventory,
  expandedBuyback,
  fletcherInventory,
  merchantInventory,
  monologue,
} from "@neverquest/state/caravan";
import {
  corpse,
  hasDefeatedFinality,
  perkEffect,
  stage,
  stageMaximum,
} from "@neverquest/state/encounter";
import { armor, gems, shield, weapon } from "@neverquest/state/gear";
import { inventory } from "@neverquest/state/inventory";
import { expandedMasteries, masteryProgress, masteryRank } from "@neverquest/state/masteries";
import { questProgress } from "@neverquest/state/quests";
import { isSkillAcquired } from "@neverquest/state/skills";
import { isTraitAcquired, selectedTrait } from "@neverquest/state/traits";
import { isInheritableItem } from "@neverquest/types/type-guards";
import {
  ATTRIBUTE_TYPES,
  CREW_MEMBER_TYPES,
  MASTERY_TYPES,
  PERK_TYPES,
  SKILL_TYPES,
} from "@neverquest/types/unions";
import { getPerkEffect, getSnapshotGetter } from "@neverquest/utilities/getters";

export function useRetire() {
  const acquireSkill = useAcquireSkill();
  const initialize = useInitialize();
  const progressQuest = useProgressQuest();
  const resetAttributes = useResetAttributes();
  const resetCharacter = useResetCharacter();
  const resetWilderness = useResetWilderness();

  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        if (get(stageMaximum) < RETIREMENT_STAGE) {
          return;
        }

        const selectedTraitValue = get(selectedTrait);
        const stageValue = get(stage);

        if (selectedTraitValue !== undefined) {
          set(isTraitAcquired(selectedTraitValue), true);
          reset(selectedTrait);

          progressQuest({ quest: "traits" });
          progressQuest({ quest: "traitsAll" });
        }

        resetAttributes();
        resetCharacter();

        reset(armor);
        reset(blacksmithInventory);
        reset(corpse);
        reset(expandedBuyback);
        reset(expandedMasteries);
        reset(hasDefeatedFinality("res dominus"));
        reset(fletcherInventory);
        reset(gems(ARMOR_NONE.ID));
        reset(gems(SHIELD_NONE.ID));
        reset(gems(WEAPON_NONE.ID));
        reset(merchantInventory);
        reset(shield);
        reset(weapon);

        reset(questProgress("attributesIncreasing"));
        reset(questProgress("attributesUnlocking"));
        reset(questProgress("hiring"));
        reset(questProgress("hiringAll"));
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

        for (const attribute of ATTRIBUTE_TYPES) {
          if (ATTRIBUTES[attribute].requiredSkill === undefined) {
            progressQuest({ quest: "attributesUnlocking" });
          }
        }

        for (const crewMember of CREW_MEMBER_TYPES) {
          reset(monologue(crewMember));
        }

        for (const mastery of MASTERY_TYPES) {
          reset(masteryProgress(mastery));
          reset(masteryRank(mastery));
        }

        for (const perk of PERK_TYPES) {
          set(perkEffect(perk), getPerkEffect({ perk, stage: stageValue }));
        }

        for (const skill of SKILL_TYPES) {
          if (!SKILLS[skill].isInheritable) {
            reset(isSkillAcquired(skill));
          }
        }

        set(inventory, (currentInventory) =>
          currentInventory.filter((currentItem) => isInheritableItem(currentItem)),
        );

        if (get(isSkillAcquired("memetics"))) {
          progressQuest({ quest: "decipheringJournal" });
        }

        progressQuest({ quest: "retiring" });

        resetWilderness();
        initialize(true);
      },
    [acquireSkill, initialize, progressQuest, resetAttributes, resetCharacter, resetWilderness],
  );
}
