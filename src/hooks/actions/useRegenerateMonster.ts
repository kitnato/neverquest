import { useRecoilCallback } from "recoil";

import { deltas } from "@neverquest/state/deltas";
import { monsterCurrentHealth, monsterMaximumHealth } from "@neverquest/state/monster";
import { DeltaType } from "@neverquest/types/enums";
import { FloatingText } from "@neverquest/types/ui";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export default function () {
  return useRecoilCallback(({ set, snapshot }) => () => {
    const get = getSnapshotGetter(snapshot);

    const monsterMaximumHealthValue = get(monsterMaximumHealth);
    const difference = monsterMaximumHealthValue - get(monsterCurrentHealth);

    if (difference > 0) {
      set(deltas(DeltaType.HealthMonster), {
        color: FloatingText.Positive,
        value: `+${difference}`,
      });
    }

    set(monsterCurrentHealth, monsterMaximumHealthValue);
  });
}
