import { useRecoilCallback } from "recoil";

import { useChangeHealth } from "@neverquest/hooks/actions/useChangeHealth";
import { healthCurrent, healthMaximum } from "@neverquest/state/reserves";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useHeal() {
  const changeHealth = useChangeHealth();

  return useRecoilCallback(
    ({ snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const healthDifference = get(healthMaximum) - get(healthCurrent);

        changeHealth({
          delta: {
            color: "text-success",
            value: `HEAL +${healthDifference}`,
          },
          value: healthDifference,
        });
      },
    [changeHealth]
  );
}
