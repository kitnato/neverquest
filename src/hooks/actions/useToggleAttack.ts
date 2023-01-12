import { useRecoilCallback } from "recoil";

import useRegenerateMonster from "@neverquest/hooks/actions/useRegenerateMonster";
import { attackDuration, isAttacking } from "@neverquest/state/character";
import { isLevelStarted } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import { monsterAttackDuration, monsterAttackRate } from "@neverquest/state/monster";
import { attackRate } from "@neverquest/state/statistics";
import { ShowingType } from "@neverquest/types/enums";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export default function () {
  const regenerateMonster = useRegenerateMonster();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const isAttackingValue = get(isAttacking);

        if (isAttackingValue) {
          set(attackDuration, 0);
          set(monsterAttackDuration, 0);

          regenerateMonster();
        } else {
          if (!get(isLevelStarted)) {
            set(isLevelStarted, true);
          }

          set(attackDuration, get(attackRate));
          set(monsterAttackDuration, get(monsterAttackRate));
        }

        set(isAttacking, !isAttackingValue);

        const deltaShowWildernessStatus = isShowing(ShowingType.WildernessStatus);

        if (!get(deltaShowWildernessStatus)) {
          set(deltaShowWildernessStatus, true);
        }
      },
    [regenerateMonster]
  );
}
