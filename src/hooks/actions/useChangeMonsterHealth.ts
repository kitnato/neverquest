import { useRecoilCallback } from "recoil";

import { attackDuration, lootingDuration, lootingRate } from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import {
  monsterAttackDuration,
  monsterCurrentHealth,
  monsterMaximumHealth,
} from "@neverquest/state/monster";
import { Delta } from "@neverquest/types/enums";
import type { DeltaDisplay, DeltaReserve } from "@neverquest/types/ui";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useChangeMonsterHealth() {
  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      (change: DeltaReserve) => {
        const get = getSnapshotGetter(snapshot);

        const { delta, value } = change;
        const max = get(monsterMaximumHealth);
        const isPositive = value > 0;

        let newHealth = get(monsterCurrentHealth) + value;

        set(
          deltas(Delta.HealthMonster),
          delta ??
            ({
              color: isPositive ? "text-success" : "text-danger",
              value: isPositive ? `+${value}` : value,
            } as DeltaDisplay)
        );

        if (newHealth <= 0) {
          newHealth = 0;

          set(lootingDuration, get(lootingRate));
          reset(attackDuration);
          reset(monsterAttackDuration);
        }

        if (newHealth > max) {
          newHealth = max;
        }

        set(monsterCurrentHealth, newHealth);
      },
    []
  );
}
