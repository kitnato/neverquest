import { useRecoilCallback } from "recoil";

import { CORPSE_VALUE } from "@neverquest/data/encounter";
import { HEALTH_LOW_THRESHOLD } from "@neverquest/data/reserves";
import { useAddDelta } from "@neverquest/hooks/actions/useAddDelta";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { useToggleAttacking } from "@neverquest/hooks/actions/useToggleAttacking";
import { absorbedEssence } from "@neverquest/state/attributes";
import { isAttacking, recoveryDuration } from "@neverquest/state/character";
import { corpse, stage } from "@neverquest/state/encounter";
import { ownedItem } from "@neverquest/state/inventory";
import { isRelicEquipped } from "@neverquest/state/items";
import {
  health,
  healthMaximumPoisoned,
  isInvulnerable,
  regenerationAmount,
  regenerationDuration,
} from "@neverquest/state/reserves";
import { essence } from "@neverquest/state/resources";
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
        const isAttackingValue = get(isAttacking);

        const value = deltaReserve.isRegeneration
          ? get(regenerationAmount("health"))
          : deltaReserve.value;
        const formattedValue = formatNumber({ value });
        const isPositive = value > 0;

        let newHealth = get(health) + (get(isInvulnerable) ? (isPositive ? value : 0) : value);

        addDelta({
          contents:
            deltaReserve.isRegeneration === true ||
            deltaReserve.contents === undefined ||
            (Array.isArray(deltaReserve.contents) && deltaReserve.contents.length === 0)
              ? ({
                  color: isPositive ? "text-success" : value === 0 ? "text-muted" : "text-danger",
                  value: isPositive ? `+${formattedValue}` : formattedValue,
                } as DeltaDisplay)
              : deltaReserve.contents,
          delta: "health",
        });

        if (newHealth <= 0) {
          const ownedItemPhylactery = get(ownedItem("phylactery"));

          newHealth = 0;

          reset(recoveryDuration);
          reset(regenerationDuration("health"));

          progressQuest({ quest: "flatlining" });

          if (isAttackingValue) {
            toggleAttacking();
          }

          if (ownedItemPhylactery === undefined) {
            set(corpse, {
              essence: Math.round(get(essence) + get(absorbedEssence) * CORPSE_VALUE),
              stage: get(stage),
            });
          }
        }

        if (newHealth >= healthMaximumPoisonedValue) {
          newHealth = healthMaximumPoisonedValue;

          reset(regenerationDuration("health"));
        }

        if (
          !deltaReserve.isRegeneration &&
          newHealth > 0 &&
          newHealth <= healthMaximumPoisonedValue * HEALTH_LOW_THRESHOLD &&
          isAttackingValue &&
          get(isRelicEquipped("dream catcher"))
        ) {
          toggleAttacking();

          addDelta({
            contents: {
              color: "text-muted",
              value: "CAUGHT",
            },
            delta: "health",
          });
        }

        set(health, newHealth);
      },
    [addDelta, progressQuest, toggleAttacking],
  );
}
