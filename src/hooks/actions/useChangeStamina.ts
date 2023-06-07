import { useRecoilCallback } from "recoil";

import { staminaRegenerationDuration } from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import { staminaCurrent, staminaMaximumTotal } from "@neverquest/state/reserves";
import { staminaRegenerationRate } from "@neverquest/state/statistics";
import type { DeltaReserve } from "@neverquest/types/ui";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useChangeStamina() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      ({ value }: DeltaReserve) => {
        const get = getSnapshotGetter(snapshot);

        const staminaMaximumTotalValue = get(staminaMaximumTotal);
        let newStamina = get(staminaCurrent) + value;

        set(deltas("stamina"), {
          color: value > 0 ? "text-success" : value < 0 ? "text-danger" : "text-muted",
          value: value > 0 ? `+${value}` : value,
        });

        if (newStamina < 0) {
          newStamina = 0;
        }

        if (newStamina > staminaMaximumTotalValue) {
          newStamina = staminaMaximumTotalValue;
        }

        if (newStamina < staminaMaximumTotalValue) {
          set(staminaRegenerationDuration, get(staminaRegenerationRate));
        }

        set(staminaCurrent, newStamina);
      },
    []
  );
}
