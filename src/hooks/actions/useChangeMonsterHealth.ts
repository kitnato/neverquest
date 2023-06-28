import { useRecoilCallback } from "recoil";

import { useProgression } from "@neverquest/hooks/actions/useProgression";
import { attackDuration, lootingDuration, lootingRate } from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import { hasItem } from "@neverquest/state/inventory";
import {
  monsterAttackDuration,
  monsterHealth,
  monsterHealthMaximum,
} from "@neverquest/state/monster";
import type { DeltaDisplay, DeltaReserve } from "@neverquest/types/ui";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useChangeMonsterHealth() {
  const progression = useProgression();

  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      (change: DeltaReserve) => {
        const get = getSnapshotGetter(snapshot);

        const { delta, value } = change;
        const max = get(monsterHealthMaximum);
        const isPositive = value > 0;

        let newHealth = get(monsterHealth) + value;

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

          if (get(hasItem("monkey paw"))) {
            progression();
          } else {
            set(lootingDuration, get(lootingRate));
          }

          reset(attackDuration);
          reset(monsterAttackDuration);
        }

        if (newHealth > max) {
          newHealth = max;
        }

        set(monsterHealth, newHealth);
      },
    [progression]
  );
}
