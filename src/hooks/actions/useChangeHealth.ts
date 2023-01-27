import { useRecoilCallback } from "recoil";

import { healthRegenerationDuration } from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { currentHealth, maximumHealth } from "@neverquest/state/reserves";
import { isGameOver } from "@neverquest/state/settings";
import { healthRegenerationRate } from "@neverquest/state/statistics";
import { DeltaType, ShowingType } from "@neverquest/types/enums";
import { DeltaReserve, FloatingTextVariant } from "@neverquest/types/ui";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useChangeHealth() {
  return useRecoilCallback(({ set, snapshot }) => (change: DeltaReserve) => {
    const get = getSnapshotGetter(snapshot);

    const { delta, value } = change;
    const maximumHealthValue = get(maximumHealth);
    const isPositive = value > 0;

    let newHealth = get(currentHealth) + value;

    set(
      deltas(DeltaType.Health),
      delta && Array.isArray(delta) && delta.length
        ? delta
        : {
            color: isPositive ? FloatingTextVariant.Positive : FloatingTextVariant.Negative,
            value: isPositive ? `+${value}` : value,
          }
    );

    if (newHealth <= 0) {
      newHealth = 0;

      set(isGameOver, true);
      set(isShowing(ShowingType.GameOver), true);
    }

    if (newHealth > maximumHealthValue) {
      newHealth = maximumHealthValue;
    }

    if (newHealth < maximumHealthValue) {
      set(healthRegenerationDuration, get(healthRegenerationRate));
    }

    set(currentHealth, newHealth);
  });
}
