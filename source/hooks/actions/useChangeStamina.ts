import { useRecoilCallback } from "recoil";

import { useAddDelta } from "@neverquest/hooks/actions/useAddDelta";
import {
  regenerationAmount,
  regenerationDuration,
  stamina,
  staminaMaximumBlighted,
} from "@neverquest/state/reserves";
import type { DeltaDisplay, DeltaReserve } from "@neverquest/types/ui";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useChangeStamina() {
  const addDelta = useAddDelta();

  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      (deltaReserve: DeltaReserve) => {
        const get = getSnapshotGetter(snapshot);

        const value = deltaReserve.isRegeneration
          ? get(regenerationAmount("stamina"))
          : deltaReserve.value;
        const formattedValue = formatNumber({ value });
        const isPositive = value > 0;
        const newStamina = get(stamina) + value;
        const staminaMaximumBlightedValue = get(staminaMaximumBlighted);

        addDelta({
          contents:
            deltaReserve.isRegeneration === true ||
            deltaReserve.delta === undefined ||
            (Array.isArray(deltaReserve.delta) && deltaReserve.delta.length === 0)
              ? ({
                  color: isPositive ? "text-success" : "text-danger",
                  value: isPositive ? `+${formattedValue}` : formattedValue,
                } as DeltaDisplay)
              : deltaReserve.delta,
          delta: "stamina",
        });

        if (newStamina <= 0) {
          set(stamina, 0);
        }

        if (newStamina >= staminaMaximumBlightedValue) {
          set(stamina, staminaMaximumBlightedValue);
          reset(regenerationDuration("stamina"));
        }

        set(stamina, newStamina);
      },
    [addDelta],
  );
}
