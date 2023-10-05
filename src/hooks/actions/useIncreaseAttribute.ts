import { useRecoilCallback } from "recoil";

import { ATTRIBUTES } from "@neverquest/data/attributes";
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
          set(isShowing(shows), true);
        }

        set(isShowing("statistics"), true);
        set(attributeRank(attribute), (current) => current + 1);

        transactEssence(-getAttributePointCost(get(level)));
      },
    [transactEssence],
  );
}
