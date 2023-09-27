import { useRecoilCallback } from "recoil";

import { isGameOver } from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import { inventory } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import {
  health,
  healthMaximumTotal,
  isImmortal,
  regenerationAmount,
  regenerationDuration,
} from "@neverquest/state/reserves";
import { isConsumable } from "@neverquest/types/type-guards";
import type { DeltaDisplay, DeltaReserve } from "@neverquest/types/ui";
import { formatValue } from "@neverquest/utilities/formatters";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useChangeHealth() {
  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      (deltaReserve: DeltaReserve) => {
        const get = getSnapshotGetter(snapshot);

        const healthMaximumTotalValue = get(healthMaximumTotal);
        const value = deltaReserve.isRegeneration
          ? get(regenerationAmount("health"))
          : deltaReserve.value;

        const formattedValue = formatValue({ value });
        const isPositive = value > 0;

        let newHealth = get(health) + value;

        set(
          deltas("health"),
          deltaReserve.isRegeneration === true ||
            deltaReserve.delta === undefined ||
            (Array.isArray(deltaReserve.delta) && deltaReserve.delta.length === 0)
            ? ({
                color: isPositive ? "text-success" : value === 0 ? "text-muted" : "text-danger",
                value: isPositive ? `+${formattedValue}` : formattedValue,
              } as DeltaDisplay)
            : deltaReserve.delta,
        );

        if (newHealth <= 0) {
          const phylactery = get(inventory).find(
            (item) => isConsumable(item) && item.type === "phylactery",
          );

          if (phylactery !== undefined) {
            newHealth = healthMaximumTotalValue;

            set(deltas("health"), {
              color: "text-success",
              value: "RESURRECTED",
            });

            set(inventory, (current) => current.filter((item) => item.id !== phylactery.id));
          } else {
            newHealth = 0;

            set(isGameOver, true);
            set(isShowing("gameOver"), true);
          }
        }

        if (newHealth >= healthMaximumTotalValue) {
          newHealth = healthMaximumTotalValue;
          reset(regenerationDuration("health"));
        }

        if (isPositive || !get(isImmortal)) {
          set(health, newHealth);
        }
      },
    [],
  );
}
