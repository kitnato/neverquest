import { useRecoilCallback } from "recoil";

import { ATTRIBUTES } from "@neverquest/data/attributes";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import {
  areAttributesAffordable,
  attributeRank,
  isAttributeAtMaximum,
  level,
} from "@neverquest/state/attributes";
import { isShowing } from "@neverquest/state/isShowing";
import { questProgress } from "@neverquest/state/quests";
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
    ({ reset, set, snapshot }) =>
      (attribute: Attribute) => {
        const get = getSnapshotGetter(snapshot);

        if (!get(areAttributesAffordable) || get(isAttributeAtMaximum(attribute))) {
          return;
        }

        const { base, increment, maximum, shows } = ATTRIBUTES[attribute];
        const newRank = get(attributeRank(attribute)) + 1;

        if (shows !== undefined) {
          for (const current of shows) {
            set(isShowing(current), true);
          }
        }

        set(isShowing("statistics"), true);
        set(attributeRank(attribute), newRank);

        transactEssence(-getAttributePointCost(get(level)));

        progressQuest({ quest: "powerLevel" });
        progressQuest({ quest: "powerLevelUltra" });

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

        reset(questProgress("survivingNoAttributes"));
      },
    [progressQuest, transactEssence],
  );
}
