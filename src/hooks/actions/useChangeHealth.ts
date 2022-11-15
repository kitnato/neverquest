import { useRecoilCallback } from "recoil";

import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { currentHealth, maximumHealth } from "@neverquest/state/reserves";
import { isGameOver } from "@neverquest/state/settings";
import { DeltaType, ShowingType } from "@neverquest/types/enums";
import { DeltaReserve, FloatingText } from "@neverquest/types/ui";
import { getSnapshotGetter } from "@neverquest/utilities/helpers";

export default function () {
  return useRecoilCallback(({ set, snapshot }) => (change: DeltaReserve) => {
    const get = getSnapshotGetter(snapshot);

    const { delta, value } = change;
    const max = get(maximumHealth);
    const isPositive = value > 0;

    let newHealth = get(currentHealth) + value;

    set(
      deltas(DeltaType.Health),
      delta ?? {
        color: isPositive ? FloatingText.Positive : FloatingText.Negative,
        value: isPositive ? `+${value}` : value,
      }
    );

    if (newHealth <= 0) {
      newHealth = 0;
      set(isGameOver, true);
      set(isShowing(ShowingType.GameOver), true);
    }

    if (newHealth > max) {
      newHealth = max;
    }

    set(currentHealth, newHealth);
  });
}
