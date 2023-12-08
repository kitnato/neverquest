import { useRecoilCallback } from "recoil";

import { useAddDelta } from "@neverquest/hooks/actions/useAddDelta";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { useToggleAttacking } from "@neverquest/hooks/actions/useToggleAttacking";
import { isAttacking, isGameOver } from "@neverquest/state/character";
import { inventory, ownedItem } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import {
  health,
  healthMaximumPoisoned,
  isImmortal,
  regenerationAmount,
  regenerationDuration,
} from "@neverquest/state/reserves";
import type { DeltaDisplay, DeltaReserve } from "@neverquest/types/ui";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useChangeHealth() {
  const addDelta = useAddDelta();
  const progressQuest = useProgressQuest();
  const toggleAttacking = useToggleAttacking();

  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      (deltaReserve: DeltaReserve) => {
        const get = getSnapshotGetter(snapshot);

        const healthMaximumPoisonedValue = get(healthMaximumPoisoned);
        const value = deltaReserve.isRegeneration
          ? get(regenerationAmount("health"))
          : deltaReserve.value;

        const formattedValue = formatNumber({ value });
        const isPositive = value > 0;

        let newHealth = get(health) + value;

        addDelta({
          contents:
            deltaReserve.isRegeneration === true ||
            deltaReserve.delta === undefined ||
            (Array.isArray(deltaReserve.delta) && deltaReserve.delta.length === 0)
              ? ({
                  color: isPositive ? "text-success" : value === 0 ? "text-muted" : "text-danger",
                  value: isPositive ? `+${formattedValue}` : formattedValue,
                } as DeltaDisplay)
              : deltaReserve.delta,
          delta: "health",
        });

        if (newHealth <= 0) {
          const phylactery = get(ownedItem("phylactery"));

          if (phylactery === undefined) {
            newHealth = 0;

            set(isGameOver, true);
            set(isShowing("gameOver"), true);
          } else {
            newHealth = healthMaximumPoisonedValue;

            addDelta({
              contents: {
                color: "text-success",
                value: "RESURRECTED",
              },
              delta: "health",
            });

            if (get(isAttacking)) {
              toggleAttacking();
            }

            set(inventory, (currentInventory) =>
              currentInventory.filter(({ ID: itemID }) => itemID !== phylactery.ID),
            );

            progressQuest({ quest: "resurrecting" });
          }
        }

        if (newHealth >= healthMaximumPoisonedValue) {
          newHealth = healthMaximumPoisonedValue;
          reset(regenerationDuration("health"));
        }

        if (isPositive || !get(isImmortal)) {
          set(health, newHealth);
        }
      },
    [addDelta, progressQuest, toggleAttacking],
  );
}
