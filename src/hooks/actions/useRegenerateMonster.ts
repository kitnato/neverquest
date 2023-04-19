import { useRecoilCallback } from "recoil";

import { deltas } from "@neverquest/state/deltas";
import {
  isMonsterDead,
  monsterCurrentHealth,
  monsterMaximumHealth,
} from "@neverquest/state/monster";
import { DeltaType } from "@neverquest/types/enums";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useRegenerateMonster() {
  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        if (get(isMonsterDead)) {
          return;
        }

        const monsterMaximumHealthValue = get(monsterMaximumHealth);
        const difference = monsterMaximumHealthValue - get(monsterCurrentHealth);

        if (difference > 0) {
          set(deltas(DeltaType.HealthMonster), {
            color: "text-success",
            value: `HEAL +${difference}`,
          });
        }

        reset(monsterCurrentHealth);
      },
    []
  );
}
