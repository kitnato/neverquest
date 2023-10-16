import { useRecoilCallback } from "recoil";

import { LOOTING_RATE } from "@neverquest/data/statistics";
import { attackDuration, lootingDuration } from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import {
  monsterAttackDuration,
  monsterHealth,
  monsterHealthMaximum,
} from "@neverquest/state/monster";
import { isTraitAcquired } from "@neverquest/state/traits";
import type { DeltaDisplay, DeltaReserveBase } from "@neverquest/types/ui";
import { formatValue } from "@neverquest/utilities/formatters";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useChangeMonsterHealth() {
  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      ({ delta, value }: DeltaReserveBase) => {
        const get = getSnapshotGetter(snapshot);

        const formattedValue = formatValue({ value });
        const isPositive = value > 0;

        const newHealth = get(monsterHealth) + value;
        const max = get(monsterHealthMaximum);

        set(
          deltas("monsterHealth"),
          delta === undefined || (Array.isArray(delta) && delta.length === 0)
            ? ({
                color: isPositive ? "text-success" : "text-danger",
                value: isPositive ? `+${formattedValue}` : formattedValue,
              } as DeltaDisplay)
            : delta,
        );

        if (newHealth <= 0) {
          set(monsterHealth, 0);
          set(lootingDuration, get(isTraitAcquired("ninja")) ? 1 : LOOTING_RATE);

          reset(attackDuration);
          reset(monsterAttackDuration);

          return;
        }

        if (newHealth > max) {
          set(monsterHealth, max);

          return;
        }

        set(monsterHealth, newHealth);
      },
    [],
  );
}
