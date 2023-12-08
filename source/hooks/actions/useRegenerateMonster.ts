import { useRecoilCallback } from "recoil";

import { useChangeMonsterHealth } from "@neverquest/hooks/actions/useChangeMonsterHealth";
import { isMonsterAiling, monsterHealth, monsterHealthMaximum } from "@neverquest/state/monster";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useRegenerateMonster() {
  const changeMonsterHealth = useChangeMonsterHealth();

  return useRecoilCallback(
    ({ snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);
        const difference = get(monsterHealthMaximum) - get(monsterHealth);

        if (difference > 0 && !get(isMonsterAiling("burning"))) {
          changeMonsterHealth({
            delta: [
              {
                color: "text-muted",
                value: "REGENERATE",
              },
              {
                color: "text-success",
                value: `+${difference}`,
              },
            ],
            value: difference,
          });
        }
      },
    [changeMonsterHealth],
  );
}
