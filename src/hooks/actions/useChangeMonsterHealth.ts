import { useRecoilCallback } from "recoil";

import { LOOTING_RATE } from "@neverquest/data/statistics";
import { useAddDelta } from "@neverquest/hooks/actions/useAddDelta";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { attackDuration, lootingDuration } from "@neverquest/state/character";
import { encounter } from "@neverquest/state/encounter";
import {
  monsterAttackDuration,
  monsterHealth,
  monsterHealthMaximum,
} from "@neverquest/state/monster";
import { isTraitAcquired } from "@neverquest/state/traits";
import type { DeltaDisplay, DeltaReserveBase } from "@neverquest/types/ui";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useChangeMonsterHealth() {
  const addDelta = useAddDelta();
  const progressQuest = useProgressQuest();

  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      ({
        damageType,
        delta,
        value,
      }: DeltaReserveBase & {
        damageType?: "bleed" | "critical" | "execute" | "parry" | "thorns";
      }) => {
        const get = getSnapshotGetter(snapshot);

        const formattedValue = formatNumber({ value });
        const isPositive = value > 0;
        const monsterHealthValue = get(monsterHealth);
        const monsterHealthMaximumValue = get(monsterHealthMaximum);
        const newHealth = Math.min(monsterHealthValue + value, monsterHealthMaximumValue);

        addDelta({
          contents:
            delta === undefined || (Array.isArray(delta) && delta.length === 0)
              ? ({
                  color: isPositive ? "text-success" : "text-danger",
                  value: isPositive ? `+${formattedValue}` : formattedValue,
                } as DeltaDisplay)
              : delta,
          delta: "monsterHealth",
        });

        if (newHealth <= 0) {
          set(monsterHealth, 0);
          set(lootingDuration, get(isTraitAcquired("ninja")) ? 1 : LOOTING_RATE);

          reset(attackDuration);
          reset(monsterAttackDuration);

          progressQuest({ quest: get(encounter) === "boss" ? "killingBoss" : "killing" });

          switch (damageType) {
            case "bleed": {
              progressQuest({ quest: "bleedingKill" });
              break;
            }

            case "critical": {
              progressQuest({ quest: "criticalKilling" });
              break;
            }

            case "execute": {
              progressQuest({ quest: "executing" });
              break;
            }

            case "parry": {
              progressQuest({ quest: "parryingKill" });
              break;
            }

            case "thorns": {
              progressQuest({ quest: "thornsKill" });
              break;
            }

            default: {
              if (monsterHealthValue === monsterHealthMaximumValue) {
                progressQuest({ quest: "killingOneStrike" });
              }
            }
          }
        } else {
          set(monsterHealth, newHealth);
        }
      },
    [addDelta, progressQuest],
  );
}
