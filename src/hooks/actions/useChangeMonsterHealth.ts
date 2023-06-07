import { useRecoilCallback } from "recoil";

import { attackDuration, lootingDuration, lootingRate } from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import {
  monsterAttackDuration,
  monsterHealthCurrent,
  monsterHealthMaximum,
} from "@neverquest/state/monster";
import type { DeltaDisplay, DeltaReserve } from "@neverquest/types/ui";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useChangeMonsterHealth() {
  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      (change: DeltaReserve) => {
        const get = getSnapshotGetter(snapshot);

        const { delta, value } = change;
        const max = get(monsterHealthMaximum);
        const isPositive = value > 0;

        let newHealth = get(monsterHealthCurrent) + value;

        set(
          deltas("monsterHealth"),
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

        set(monsterHealthCurrent, newHealth);
      },
    []
  );
}
