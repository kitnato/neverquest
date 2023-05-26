import { useRecoilCallback } from "recoil";

import { BLEED } from "@neverquest/data/statistics";
import { useChangeMonsterHealth } from "@neverquest/hooks/actions/useChangeMonsterHealth";
import { useChangeStamina } from "@neverquest/hooks/actions/useChangeStamina";
import { useIncreaseMastery } from "@neverquest/hooks/actions/useIncreaseMastery";
import { deltas } from "@neverquest/state/deltas";
import { weapon } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import {
  monsterBleedingDuration,
  monsterElement,
  monsterStaggeredDuration,
} from "@neverquest/state/monster";
import { canAttackOrParry } from "@neverquest/state/reserves";
import { skills } from "@neverquest/state/skills";
import {
  bleed,
  criticalChance,
  criticalDamage,
  damageTotal,
  staggerDuration,
} from "@neverquest/state/statistics";
import { Delta, Mastery, Showing, Skill } from "@neverquest/types/enums";
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

        if (!get(isShowing(Showing.Statistics))) {
          set(isShowing(Showing.Statistics), true);
        }

        if (get(canAttackOrParry)) {
          const hasInflictedCritical =
            get(skills(Skill.Assassination)) && Math.random() <= get(criticalChance);
          const hasInflictedBleed =
            get(monsterBleedingDuration) === 0 &&
            get(skills(Skill.Anatomy)) &&
            Math.random() <= get(bleed);
          const hasInflictedStagger =
            get(skills(Skill.Traumatology)) &&
            gearClass === "blunt" &&
            Math.random() <= abilityChance;

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
            set(monsterBleedingDuration, BLEED.duration);
            increaseMastery(Mastery.Cruelty);

            monsterDeltas.push({
              color: "text-muted",
              value: "BLEED",
            });
          }

          if (hasInflictedStagger) {
            set(monsterStaggeredDuration, get(staggerDuration));
            increaseMastery(Mastery.Might);

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
          set(deltas(Delta.Stamina), [
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
