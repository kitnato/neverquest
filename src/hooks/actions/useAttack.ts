import { useRecoilCallback } from "recoil";

import { BLEED } from "@neverquest/data/statistics";
import { useChangeMonsterHealth } from "@neverquest/hooks/actions/useChangeMonsterHealth";
import { useChangeStamina } from "@neverquest/hooks/actions/useChangeStamina";
import { useIncreaseMastery } from "@neverquest/hooks/actions/useIncreaseMastery";
import { canAttackOrParry } from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import { weapon } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { rawMasteryStatistic } from "@neverquest/state/masteries";
import {
  monsterBleedingDuration,
  monsterElement,
  monsterStaggerDuration,
} from "@neverquest/state/monster";
import { skills } from "@neverquest/state/skills";
import { bleed, criticalChance, criticalDamage, damageTotal } from "@neverquest/state/statistics";
import type { DeltaDisplay } from "@neverquest/types/ui";
import { animateElement } from "@neverquest/utilities/animateElement";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useAttack() {
  const changeMonsterHealth = useChangeMonsterHealth();
  const changeStamina = useChangeStamina();
  const increaseMastery = useIncreaseMastery();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const { abilityChance, gearClass, staminaCost } = get(weapon);

        set(isShowing("statistics"), true);

        if (get(canAttackOrParry)) {
          const hasInflictedCritical =
            get(skills("assassination")) && Math.random() <= get(criticalChance);
          const hasInflictedBleed =
            get(monsterBleedingDuration) === 0 &&
            get(skills("anatomy")) &&
            Math.random() <= get(bleed);
          const hasInflictedStagger =
            get(skills("traumatology")) && gearClass === "blunt" && Math.random() <= abilityChance;

          const baseDamage = -get(damageTotal);
          const totalDamage = hasInflictedCritical
            ? baseDamage + baseDamage * get(criticalDamage)
            : baseDamage;
          const monsterDeltas: DeltaDisplay = [
            {
              color: "text-danger",
              value: totalDamage,
            },
          ];

          if (staminaCost > 0) {
            changeStamina({ value: -staminaCost });
          }

          if (hasInflictedCritical) {
            monsterDeltas.push({
              color: "text-muted",
              value: "CRITICAL",
            });
          }

          if (hasInflictedBleed) {
            set(isShowing("monsterAilments"), true);
            set(monsterBleedingDuration, BLEED.duration);

            increaseMastery("cruelty");

            monsterDeltas.push({
              color: "text-muted",
              value: "BLEED",
            });
          }

          if (hasInflictedStagger) {
            set(isShowing("monsterAilments"), true);
            set(monsterStaggerDuration, get(rawMasteryStatistic("might")));

            increaseMastery("might");

            monsterDeltas.push({
              color: "text-muted",
              value: "STAGGER",
            });
          }

          changeMonsterHealth({ delta: monsterDeltas, value: totalDamage });

          animateElement({
            element: get(monsterElement),
            speed: "fast",
            type: "headShake",
          });
        } else {
          set(deltas("stamina"), [
            {
              color: "text-muted",
              value: "CANNOT ATTACK",
            },
            {
              color: "text-danger",
              value: ` (${staminaCost})`,
            },
          ]);
        }
      },
    [changeMonsterHealth, changeStamina, increaseMastery]
  );
}
