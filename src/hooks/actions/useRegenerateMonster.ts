import { useRecoilCallback } from "recoil";

import { deltas } from "@neverquest/state/deltas";
import {
  isMonsterDead,
  monsterHealthCurrent,
  monsterHealthMaximum,
} from "@neverquest/state/monster";
import { Delta } from "@neverquest/types/enums";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useRegenerateMonster() {
  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        if (get(isMonsterDead)) {
          return;
        }

        const monsterHealthMaximumValue = get(monsterHealthMaximum);
        const difference = monsterHealthMaximumValue - get(monsterHealthCurrent);

        if (difference > 0) {
          set(deltas(Delta.HealthMonster), {
            color: "text-success",
            value: `HEAL +${difference}`,
          });
        }

        reset(monsterHealthCurrent);
      },
    []
  );
}
