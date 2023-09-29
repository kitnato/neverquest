import { useRecoilCallback } from "recoil";

import { LOOTING_RATE } from "@neverquest/data/statistics";
import { useProgression } from "@neverquest/hooks/actions/useProgression";
import { attackDuration, lootingDuration } from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import { ownedItem } from "@neverquest/state/items";
import {
  monsterAttackDuration,
  monsterHealth,
  monsterHealthMaximum,
} from "@neverquest/state/monster";
import type { DeltaDisplay, DeltaReserveBase } from "@neverquest/types/ui";
import { formatValue } from "@neverquest/utilities/formatters";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useChangeMonsterHealth() {
  const progression = useProgression();

  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      (change: DeltaReserveBase) => {
        const get = getSnapshotGetter(snapshot);

        const { delta, value } = change;
        const formattedValue = formatValue({ value });
        const isPositive = value > 0;

        const newHealth = get(monsterHealth) + value;
        const max = get(monsterHealthMaximum);

        set(
          deltas("monsterHealth"),
          delta ??
            ({
              color: isPositive ? "text-success" : "text-danger",
              value: isPositive ? `+${formattedValue}` : formattedValue,
            } as DeltaDisplay),
        );

        if (newHealth <= 0) {
          set(monsterHealth, 0);

          if (get(ownedItem("monkey paw")) !== null) {
            progression();
          } else {
            set(lootingDuration, LOOTING_RATE);
          }

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
    [progression],
  );
}
