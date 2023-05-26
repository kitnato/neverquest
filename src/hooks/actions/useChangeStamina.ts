import { useRecoilCallback } from "recoil";

import { staminaRegenerationDuration } from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import { currentStamina, maximumStaminaTotal } from "@neverquest/state/reserves";
import { staminaRegenerationRate } from "@neverquest/state/statistics";
import { Delta } from "@neverquest/types/enums";
import type { DeltaReserve } from "@neverquest/types/ui";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useChangeStamina() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      ({ value }: DeltaReserve) => {
        const get = getSnapshotGetter(snapshot);

        const maximumStaminaTotalValue = get(maximumStaminaTotal);
        let newStamina = get(currentStamina) + value;

        set(deltas(Delta.Stamina), {
          color: value > 0 ? "text-success" : value < 0 ? "text-danger" : "text-muted",
          value: value > 0 ? `+${value}` : value,
        });

        if (newStamina < 0) {
          newStamina = 0;
        }

        if (newStamina > maximumStaminaTotalValue) {
          newStamina = maximumStaminaTotalValue;
        }

        if (newStamina < maximumStaminaTotalValue) {
          set(staminaRegenerationDuration, get(staminaRegenerationRate));
        }

        set(currentStamina, newStamina);
      },
    []
  );
}
