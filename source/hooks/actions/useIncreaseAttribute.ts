import { useRecoilCallback } from "recoil";

import { ATTRIBUTES } from "@neverquest/data/attributes";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import {
  areAttributesAffordable,
  attributeRank,
  isAttributeAtMaximum,
  powerLevel,
} from "@neverquest/state/attributes";
import { isShowing } from "@neverquest/state/isShowing";
import { questProgress } from "@neverquest/state/quests";
import { ATTRIBUTE_TYPES, type Attribute } from "@neverquest/types/unions";
import { getAttributePointCost, getSnapshotGetter } from "@neverquest/utilities/getters";

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

        const { shows } = ATTRIBUTES[attribute];
        const newRank = get(attributeRank(attribute)) + 1;

        if (shows !== undefined) {
          for (const show of shows) {
            set(isShowing(show), true);
          }
        }

        set(attributeRank(attribute), newRank);

        transactEssence(-getAttributePointCost(get(powerLevel)));

        progressQuest({ quest: "powerLevel" });
        progressQuest({ quest: "powerLevelUltra" });

        if (
          ATTRIBUTE_TYPES.filter((attributeType) => attributeType !== attribute).every(
            (attributeType) => get(attributeRank(attributeType)) > 0,
          )
        ) {
          progressQuest({ quest: "attributesIncreasingAll" });
        }

        reset(questProgress("survivingNoAttributes"));
      },
    [progressQuest, transactEssence],
  );
}
