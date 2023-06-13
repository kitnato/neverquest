import { useRecoilCallback } from "recoil";

import { deltas } from "@neverquest/state/deltas";
import { isMonsterDead, monsterHealth, monsterHealthMaximum } from "@neverquest/state/monster";
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
        const difference = monsterHealthMaximumValue - get(monsterHealth);

        if (difference > 0) {
          set(deltas("monsterHealth"), {
            color: "text-success",
            value: `HEAL +${difference}`,
          });
        }

        reset(monsterHealth);
      },
    []
  );
}
