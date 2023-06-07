import { useRecoilCallback } from "recoil";

import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { attributeCost, attributes, level } from "@neverquest/state/attributes";
import type { Attribute } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useIncreaseAttribute() {
  const transactResources = useTransactResources();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      (type: Attribute) => {
        const get = getSnapshotGetter(snapshot);

        const attributeCostValue = get(attributeCost);

        set(attributes(type), (current) => ({
          ...current,
          points: current.points + 1,
        }));

        transactResources({
          essenceDifference: -attributeCostValue,
        });

        set(level, (current) => current + 1);
      },
    [transactResources]
  );
}
