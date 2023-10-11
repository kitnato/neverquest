import { useRecoilCallback } from "recoil";

import { useChangeHealth } from "@neverquest/hooks/actions/useChangeHealth";
import { useChangeMonsterHealth } from "@neverquest/hooks/actions/useChangeMonsterHealth";
import { isAttacking } from "@neverquest/state/character";
import {
  isMonsterDead,
  monsterAilmentDuration,
  monsterBleedingDelta,
  monsterDistance,
  monsterHealth,
  monsterHealthMaximum,
} from "@neverquest/state/monster";
import { health, healthMaximum } from "@neverquest/state/reserves";
import { isTraitAcquired } from "@neverquest/state/traits";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useRegenerate() {
  const changeHealth = useChangeHealth();
  const changeMonsterHealth = useChangeMonsterHealth();

  return useRecoilCallback(
    ({ reset, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        if (!get(isAttacking)) {
          if (!get(isMonsterDead) && !get(isTraitAcquired("tormentor"))) {
            reset(monsterAilmentDuration("bleeding"));
            reset(monsterBleedingDelta);
            reset(monsterDistance);

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

          if (get(isTraitAcquired("field surgeon"))) {
            const difference = get(healthMaximum) - get(health);

            if (difference > 0) {
              changeHealth({
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
        }
      },
    [changeHealth, changeMonsterHealth],
  );
}
