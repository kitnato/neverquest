import { useRecoilCallback } from "recoil";

import { isGameOver } from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { health, healthMaximumTotal, healthRegenerationDuration } from "@neverquest/state/reserves";
import { healthRegenerationRate } from "@neverquest/state/statistics";
import type { DeltaDisplay, DeltaReserve } from "@neverquest/types/ui";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useChangeHealth() {
  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      ({ delta, value }: DeltaReserve) => {
        const get = getSnapshotGetter(snapshot);

        const healthMaximumTotalValue = get(healthMaximumTotal);
        const isPositive = value > 0;

        let newHealth = get(health) + value;

        set(
          deltas("health"),
          delta === undefined || (Array.isArray(delta) && delta.length === 0)
            ? ({
                color: isPositive ? "text-success" : "text-danger",
                value: isPositive ? `+${value}` : value,
              } as DeltaDisplay)
            : delta
        );

        if (newHealth <= 0) {
          newHealth = 0;

          set(isGameOver, true);
          set(isShowing("gameOver"), true);
        }

        if (newHealth >= healthMaximumTotalValue) {
          newHealth = healthMaximumTotalValue;
          reset(healthRegenerationDuration);
        }

        if (newHealth < healthMaximumTotalValue && get(healthRegenerationDuration) === 0) {
          set(healthRegenerationDuration, get(healthRegenerationRate));
        }

        set(health, newHealth);
      },
    []
  );
}
