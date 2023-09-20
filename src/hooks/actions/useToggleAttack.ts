import { useRecoilCallback } from "recoil";

import { attackDuration, isAttacking } from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import { isStageCompleted, isStageStarted } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import {
  isMonsterDead,
  monsterAilmentDuration,
  monsterAttackDuration,
  monsterAttackRate,
  monsterBleedingDelta,
  monsterDistance,
  monsterHealth,
  monsterHealthMaximum,
} from "@neverquest/state/monster";
import { attackRateTotal } from "@neverquest/state/statistics";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useToggleAttack() {
  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const isAttackingValue = get(isAttacking);

        if (get(isStageCompleted) && !isAttackingValue) {
          return;
        }

        set(isAttacking, !isAttackingValue);
        set(isStageStarted, true);

        set(isShowing("attackRate"), true);
        set(isShowing("wildernessStatus"), true);

        if (isAttackingValue) {
          reset(attackDuration);
          reset(monsterAttackDuration);

          if (!get(isMonsterDead)) {
            reset(monsterAilmentDuration("bleeding"));
            reset(monsterBleedingDelta);
            reset(monsterDistance);

            const difference = get(monsterHealthMaximum) - get(monsterHealth);

            if (difference > 0) {
              set(deltas("monsterHealth"), [
                {
                  color: "text-muted",
                  value: "REGENERATE",
                },
                {
                  color: "text-success",
                  value: `+${difference}`,
                },
              ]);

              reset(monsterHealth);
            }
          }
        } else {
          set(attackDuration, get(attackRateTotal));
          set(monsterAttackDuration, get(monsterAttackRate));
        }
      },
    [],
  );
}
