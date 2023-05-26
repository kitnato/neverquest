import { useRecoilCallback } from "recoil";

import { healthRegenerationDuration, isGameOver } from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { currentHealth, maximumHealth } from "@neverquest/state/reserves";
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
        const maximumHealthValue = get(maximumHealth);
        const isPositive = value > 0;

        let newHealth = get(currentHealth) + value;

        set(
          deltas(Delta.Health),
          delta === undefined
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

        if (newHealth > maximumHealthValue) {
          newHealth = maximumHealthValue;
        }

        if (newHealth < maximumHealthValue && get(healthRegenerationDuration) === 0) {
          set(healthRegenerationDuration, get(healthRegenerationRate));
        }

        set(currentHealth, newHealth);
      },
    []
  );
}
