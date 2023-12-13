import { useRecoilCallback } from "recoil";

import { AILMENT_PENALTY, LOOTING_RATE } from "@neverquest/data/statistics";
import { useAddDelta } from "@neverquest/hooks/actions/useAddDelta";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { powerLevel } from "@neverquest/state/attributes";
import { attackDuration, lootingDuration } from "@neverquest/state/character";
import { encounter, hasDefeatedFinality, stage } from "@neverquest/state/encounter";
import { ownedItem } from "@neverquest/state/inventory";
import {
  isMonsterAiling,
  monsterAttackDuration,
  monsterHealth,
  monsterHealthMaximum,
} from "@neverquest/state/monster";
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
        damageType?: "bleeding" | "critical" | "execution" | "parry" | "thorns";
      }) => {
        const get = getSnapshotGetter(snapshot);

        const isPositive = value > 0;
        const totalValue =
          !isPositive && get(isMonsterAiling("staggered"))
            ? value * (1 + AILMENT_PENALTY.staggered)
            : value;
        const formattedValue = formatNumber({ value: totalValue });
        const monsterHealthValue = get(monsterHealth);
        const monsterHealthMaximumValue = get(monsterHealthMaximum);
        const newHealth = Math.min(monsterHealthValue + totalValue, monsterHealthMaximumValue);

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
          set(lootingDuration, get(ownedItem("ender hook")) === undefined ? LOOTING_RATE : 1);

          reset(attackDuration);
          reset(monsterAttackDuration);

          switch (get(encounter)) {
            case "boss": {
              progressQuest({ quest: "killingBoss" });
              break;
            }

            case "monster": {
              progressQuest({ quest: "killing" });
              break;
            }

            case "res cogitans": {
              set(hasDefeatedFinality, true);

              progressQuest({ quest: "killingResCogitans" });
              break;
            }

            case "res dominus": {
              set(hasDefeatedFinality, true);

              progressQuest({ quest: "killingResDominus" });
              break;
            }
          }

          switch (damageType) {
            case "bleeding": {
              progressQuest({ quest: "bleedingKill" });
              break;
            }

            case "critical": {
              progressQuest({ quest: "criticalKilling" });
              break;
            }

            case "execution": {
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
              if (
                monsterHealthValue === monsterHealthMaximumValue &&
                get(powerLevel) <= get(stage)
              ) {
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
