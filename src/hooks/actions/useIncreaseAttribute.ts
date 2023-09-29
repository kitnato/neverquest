import { useRecoilCallback } from "recoil";

import { ATTRIBUTES } from "@neverquest/data/attributes";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import {
  areAttributesIncreasable,
  attributeCost,
  attributes,
  isAttributeAtMaximum,
} from "@neverquest/state/attributes";
import { isShowing } from "@neverquest/state/isShowing";
import type { Attribute } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useIncreaseAttribute() {
  const transactEssence = useTransactEssence();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      (attribute: Attribute) => {
        const get = getSnapshotGetter(snapshot);

        if (!get(areAttributesIncreasable) || get(isAttributeAtMaximum(attribute))) {
          return;
        }

        const { shows } = ATTRIBUTES[attribute];

        if (shows !== undefined) {
          set(isShowing(shows), true);
        }

        set(isShowing("statistics"), true);

        set(attributes(attribute), (current) => ({
          ...current,
          points: current.points + 1,
        }));

        transactEssence(-get(attributeCost));
      },
    [transactEssence],
  );
}
