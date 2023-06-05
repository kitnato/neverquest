import { useRecoilCallback } from "recoil";

import { healthRegenerationDuration, isGameOver } from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { healthCurrent, healthMaximum } from "@neverquest/state/reserves";
import { healthRegenerationRate } from "@neverquest/state/statistics";
import { Delta, Showing } from "@neverquest/types/enums";
import type { DeltaDisplay, DeltaReserve } from "@neverquest/types/ui";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useChangeHealth() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      (change: DeltaReserve) => {
        const get = getSnapshotGetter(snapshot);

        const { delta, value } = change;
        const healthMaximumValue = get(healthMaximum);
        const isPositive = value > 0;

        let newHealth = get(healthCurrent) + value;

        set(
          deltas(Delta.Health),
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
          set(isShowing(Showing.GameOver), true);
        }

        if (newHealth > healthMaximumValue) {
          newHealth = healthMaximumValue;
        }

        if (newHealth < healthMaximumValue && get(healthRegenerationDuration) === 0) {
          set(healthRegenerationDuration, get(healthRegenerationRate));
        }

        set(healthCurrent, newHealth);
      },
    []
  );
}
