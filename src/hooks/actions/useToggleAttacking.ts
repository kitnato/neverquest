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
  monsterHealth,
  monsterHealthMaximum,
} from "@neverquest/state/monster";
import { attackRate } from "@neverquest/state/statistics";
import { isTraitAcquired } from "@neverquest/state/traits";
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

        set(isAttacking, (current) => !current);

        set(isShowing("attackRate"), true);
        set(isShowing("health"), true);
        set(isShowing("wildernessStatus"), true);

        if (isAttackingValue) {
          reset(attackDuration);
          reset(monsterAttackDuration);

          if (!get(isMonsterDead) && !get(isTraitAcquired("tormentor"))) {
            reset(monsterAilmentDuration("bleeding"));
            reset(bleedingDelta);
            reset(distance);

            const difference = get(monsterHealthMaximum) - get(monsterHealth);

            if (difference > 0) {
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
