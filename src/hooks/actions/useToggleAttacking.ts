import { useRecoilCallback } from "recoil";

import { useChangeMonsterHealth } from "@neverquest/hooks/actions/useChangeMonsterHealth";
import { attackDuration, isAttacking } from "@neverquest/state/character";
import { isStageCompleted, isStageStarted } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import {
  bleedingDelta,
  distance,
  isMonsterDead,
  monsterAilmentDuration,
  monsterAttackDuration,
  monsterAttackRate,
} from "@neverquest/state/monster";
import { attackRate } from "@neverquest/state/statistics";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useToggleAttacking() {
  const changeMonsterHealth = useChangeMonsterHealth();

  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const isAttackingValue = get(isAttacking);

        if (get(isStageCompleted) && !isAttackingValue) {
          return;
        }

        set(isAttacking, (isAttackingCurrently) => !isAttackingCurrently);

        set(isShowing("attackRate"), true);
        set(isShowing("health"), true);
        set(isShowing("wildernessStatus"), true);

        if (isAttackingValue) {
          reset(attackDuration);
          reset(monsterAttackDuration);

          if (!get(isMonsterDead)) {
            reset(monsterAilmentDuration("bleeding"));
            reset(bleedingDelta);
            reset(distance);

            // Regeneration is triggered in MonsterHealth.
          }
        } else {
          set(isStageStarted, true);
          set(attackDuration, get(attackRate));
          set(monsterAttackDuration, get(monsterAttackRate));
        }
      },
    [changeMonsterHealth],
  );
}
