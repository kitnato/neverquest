import { useRecoilCallback } from "recoil";

import { deltas } from "@neverquest/state/deltas";
import { monsterCurrentHealth, monsterMaximumHealth } from "@neverquest/state/monster";
import { DeltaType } from "@neverquest/types/enums";
import { DeltaReserve, FloatingTextVariant } from "@neverquest/types/ui";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export default function () {
  return useRecoilCallback(({ set, snapshot }) => (change: DeltaReserve) => {
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

    if (newHealth < 0) {
      newHealth = 0;
    }

    if (newHealth > max) {
      newHealth = max;
    }

    set(monsterCurrentHealth, newHealth);
  });
}
