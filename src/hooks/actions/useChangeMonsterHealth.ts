import { useRecoilCallback } from "recoil";

import { attackDuration, lootingDuration, lootingRate } from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import {
  monsterAttackDuration,
  monsterCurrentHealth,
  monsterMaximumHealth,
} from "@neverquest/state/monster";
import { DeltaType } from "@neverquest/types/enums";
import { type DeltaReserve, FloatingTextVariant } from "@neverquest/types/ui";
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
          deltas(DeltaType.HealthMonster),
          delta ?? {
            color: isPositive ? FloatingTextVariant.Positive : FloatingTextVariant.Negative,
            value: isPositive ? `+${value}` : value,
          }
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
