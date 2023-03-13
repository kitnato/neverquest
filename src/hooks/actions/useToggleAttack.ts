import { useRecoilCallback } from "recoil";

import { useRegenerateMonster } from "@neverquest/hooks/actions/useRegenerateMonster";
import { attackDuration, isAttacking } from "@neverquest/state/character";
import { isLevelStarted } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import { isMonsterDead, monsterAttackDuration, monsterAttackRate } from "@neverquest/state/monster";
import { attackRateTotal } from "@neverquest/state/statistics";
import { ShowingType } from "@neverquest/types/enums";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useToggleAttack() {
  const regenerateMonster = useRegenerateMonster();

  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const isShowingAttackRate = isShowing(ShowingType.AttackRate);
        const isShowingWildernessStatus = isShowing(ShowingType.WildernessStatus);
        const isAttackingValue = get(isAttacking);

        set(isAttacking, !isAttackingValue);

        if (!get(isLevelStarted)) {
          set(isLevelStarted, true);
        }

        if (!get(isShowingAttackRate)) {
          set(isShowingAttackRate, true);
        }

        if (!get(isShowingWildernessStatus)) {
          set(isShowingWildernessStatus, true);
        }

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
