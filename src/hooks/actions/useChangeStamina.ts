import { useRecoilCallback } from "recoil";

import { deltas } from "@neverquest/state/deltas";
import {
  regenerationAmount,
  regenerationDuration,
  stamina,
  staminaMaximumTotal,
} from "@neverquest/state/reserves";
import type { DeltaDisplay, DeltaReserve } from "@neverquest/types/ui";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useChangeStamina() {
  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      (deltaReserve: DeltaReserve) => {
        const get = getSnapshotGetter(snapshot);

        const value = deltaReserve.isRegeneration
          ? get(regenerationAmount("stamina"))
          : deltaReserve.value;
        const isPositive = value > 0;
        const staminaMaximumTotalValue = get(staminaMaximumTotal);

        let newStamina = get(stamina) + value;

        set(
          deltas("stamina"),
          deltaReserve.isRegeneration === true ||
            deltaReserve.delta === undefined ||
            (Array.isArray(deltaReserve.delta) && deltaReserve.delta.length === 0)
            ? ({
                color: isPositive ? "text-success" : "text-danger",
                value: isPositive ? `+${value}` : value,
              } as DeltaDisplay)
            : deltaReserve.delta,
        );

        if (newStamina < 0) {
          newStamina = 0;
        }

        if (newStamina >= staminaMaximumTotalValue) {
          newStamina = staminaMaximumTotalValue;
          reset(regenerationDuration("stamina"));
        }

        set(stamina, newStamina);
      },
    [],
  );
}
