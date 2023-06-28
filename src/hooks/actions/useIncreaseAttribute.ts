import { useRecoilCallback } from "recoil";

import { ATTRIBUTES } from "@neverquest/data/attributes";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
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
  const transactResources = useTransactResources();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      (type: Attribute) => {
        const get = getSnapshotGetter(snapshot);

        if (!get(areAttributesIncreasable) || get(isAttributeAtMaximum(type))) {
          return;
        }

        const { shows } = ATTRIBUTES[type];

        if (shows !== undefined) {
          set(isShowing(shows), true);
        }

        set(isShowing("statistics"), true);

        set(attributes(type), (current) => ({
          ...current,
          points: current.points + 1,
        }));

        transactResources({
          essenceDifference: -get(attributeCost),
        });
      },
    [transactResources]
  );
}
