import { useRecoilCallback } from "recoil";

import { staminaRegenerationDuration } from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import { currentStamina, maximumStaminaTotal } from "@neverquest/state/reserves";
import { staminaRegenerationRate } from "@neverquest/state/statistics";
import { DeltaType } from "@neverquest/types/enums";
import { DeltaReserve, FloatingTextVariant } from "@neverquest/types/ui";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useChangeStamina() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      ({ value }: DeltaReserve) => {
        const get = getSnapshotGetter(snapshot);

        const maximumStaminaTotalValue = get(maximumStaminaTotal);
        let newStamina = get(currentStamina) + value;

        set(deltas(DeltaType.Stamina), {
          color:
            value > 0
              ? FloatingTextVariant.Positive
              : value < 0
              ? FloatingTextVariant.Negative
              : FloatingTextVariant.Neutral,
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
