import { useRecoilCallback } from "recoil";

import { deltas } from "@neverquest/state/deltas";
import {
  stamina,
  staminaMaximumTotal,
  staminaRegenerationDuration,
} from "@neverquest/state/reserves";
import { staminaRegenerationRate } from "@neverquest/state/statistics";
import type { DeltaDisplay, DeltaReserve } from "@neverquest/types/ui";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useChangeStamina() {
  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      ({ delta, value }: DeltaReserve) => {
        const get = getSnapshotGetter(snapshot);

        const isPositive = value > 0;
        const staminaMaximumTotalValue = get(staminaMaximumTotal);

        let newStamina = get(stamina) + value;

        set(
          deltas("stamina"),
          delta === undefined || (Array.isArray(delta) && delta.length === 0)
            ? ({
                color: isPositive ? "text-success" : "text-danger",
                value: isPositive ? `+${value}` : value,
              } as DeltaDisplay)
            : delta
        );

        if (newStamina < 0) {
          newStamina = 0;
        }

        if (newStamina >= staminaMaximumTotalValue) {
          newStamina = staminaMaximumTotalValue;
          reset(staminaRegenerationDuration);
        }

        if (newStamina < staminaMaximumTotalValue && get(staminaRegenerationDuration) === 0) {
          set(staminaRegenerationDuration, get(staminaRegenerationRate));
        }

        set(stamina, newStamina);
      },
    []
  );
}
