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
import type { Attribute } from "@neverquest/types/unions";
import { getAttributePointCost, getSnapshotGetter } from "@neverquest/utilities/getters";

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

        const { shows } = ATTRIBUTES[attribute];

        if (shows !== undefined) {
          shows.forEach((current) => set(isShowing(current), true));
        }

        set(isShowing("statistics"), true);
        set(attributeRank(attribute), (current) => current + 1);
        progressQuest({ quest: "powerLevel" });
        progressQuest({ quest: "powerLevelUltra" });

        transactEssence(-getAttributePointCost(get(level)));
      },
    [transactEssence],
  );
}
