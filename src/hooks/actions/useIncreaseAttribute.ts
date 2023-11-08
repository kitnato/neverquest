import { useRecoilCallback } from "recoil";

import { ATTRIBUTES } from "@neverquest/data/attributes";
import { QUEST_REQUIREMENTS } from "@neverquest/data/quests";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import {
  areAttributesAffordable,
  attributeRank,
  isAttributeAtMaximum,
  level,
} from "@neverquest/state/attributes";
import { isShowing } from "@neverquest/state/isShowing";
import { ATTRIBUTE_TYPES, type Attribute } from "@neverquest/types/unions";
import {
  getAttributePointCost,
  getComputedStatistic,
  getSnapshotGetter,
} from "@neverquest/utilities/getters";

export function useIncreaseAttribute() {
  const progressQuest = useProgressQuest();
  const transactEssence = useTransactEssence();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      (attribute: Attribute) => {
        const get = getSnapshotGetter(snapshot);

        if (!get(areAttributesAffordable) || get(isAttributeAtMaximum(attribute))) {
          return;
        }

        const { base, increment, maximum, shows } = ATTRIBUTES[attribute];
        const newRank = get(attributeRank(attribute)) + 1;

        if (shows !== undefined) {
          shows.forEach((current) => set(isShowing(current), true));
        }

        set(isShowing("statistics"), true);
        set(attributeRank(attribute), newRank);

        progressQuest({ quest: "powerLevel" });

        if (newRank === QUEST_REQUIREMENTS.powerLevelUltra) {
          progressQuest({ quest: "powerLevelUltra" });
        }

        transactEssence(-getAttributePointCost(get(level)));

        if (
          maximum !== undefined &&
          getComputedStatistic({ amount: newRank, base, increment }) >= maximum
        ) {
          progressQuest({ quest: "attributesMaximum" });
        }

        if (
          ATTRIBUTE_TYPES.filter((current) => current !== attribute).every(
            (current) => get(attributeRank(current)) > 0,
          )
        ) {
          progressQuest({ quest: "attributesAll" });
        }
      },
    [progressQuest, transactEssence],
  );
}
