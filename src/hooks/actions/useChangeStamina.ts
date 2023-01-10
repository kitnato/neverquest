import { useRecoilCallback } from "recoil";

import { deltas } from "@neverquest/state/deltas";
import { currentStamina, maximumStamina } from "@neverquest/state/reserves";
import { DeltaType } from "@neverquest/types/enums";
import { DeltaReserve, FloatingTextVariant } from "@neverquest/types/ui";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export default function () {
  return useRecoilCallback(({ set, snapshot }) => ({ value }: DeltaReserve) => {
    const get = getSnapshotGetter(snapshot);

    const max = get(maximumStamina);
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

    if (newStamina > max) {
      newStamina = max;
    }

    set(currentStamina, newStamina);
  });
}
