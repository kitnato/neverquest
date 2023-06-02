import { useRecoilCallback } from "recoil";

import { useRegenerateMonster } from "@neverquest/hooks/actions/useRegenerateMonster";
import { attackDuration, isAttacking } from "@neverquest/state/character";
import { isStageStarted } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import { isMonsterDead, monsterAttackDuration, monsterAttackRate } from "@neverquest/state/monster";
import { attackRateTotal } from "@neverquest/state/statistics";
import { Showing } from "@neverquest/types/enums";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useToggleAttack() {
  const regenerateMonster = useRegenerateMonster();

  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const isAttackingValue = get(isAttacking);

        set(isAttacking, !isAttackingValue);
        set(isStageStarted, true);

        set(isShowing(Showing.AttackRate), true);
        set(isShowing(Showing.WildernessStatus), true);

        if (isAttackingValue) {
          reset(attackDuration);
          reset(monsterAttackDuration);

          if (!get(isMonsterDead)) {
            regenerateMonster();
          }
        } else {
          set(attackDuration, get(attackRateTotal));
          set(monsterAttackDuration, get(monsterAttackRate));
        }
      },
    [regenerateMonster]
  );
}
