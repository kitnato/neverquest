import { useRecoilCallback } from "recoil";

import { BLEED } from "@neverquest/constants";
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
  bleedChance,
  criticalChance,
  criticalDamage,
  damageTotal,
  staggerDuration,
} from "@neverquest/state/statistics";
import { DeltaType, MasteryType, ShowingType, SkillType } from "@neverquest/types/enums";
import {
  AnimationSpeed,
  AnimationType,
  type DeltaDisplay,
  FloatingTextVariant,
} from "@neverquest/types/ui";
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

        const { abilityChance, artifactClass, staminaCost } = get(weapon);

        if (!get(isShowing(ShowingType.Statistics))) {
          set(isShowing(ShowingType.Statistics), true);
        }

        if (get(canAttackOrParry)) {
          const hasInflictedCritical =
            get(skills(SkillType.Criticals)) && Math.random() <= get(criticalChance);
          const hasInflictedBleed =
            get(monsterBleedingDuration) === 0 &&
            get(skills(SkillType.Bleed)) &&
            Math.random() <= get(bleedChance);
          const hasInflictedStagger =
            get(skills(SkillType.Stagger)) &&
            artifactClass === "blunt" &&
            Math.random() <= abilityChance;

          const baseDamage = -get(damageTotal);
          const totalDamage = hasInflictedCritical
            ? baseDamage + baseDamage * get(criticalDamage)
            : baseDamage;
          const monsterDeltas: DeltaDisplay = [
            {
              color: FloatingTextVariant.Negative,
              value: totalDamage,
            },
          ];

          if (staminaCost > 0) {
            changeStamina({ value: -staminaCost });
          }

          if (hasInflictedCritical) {
            monsterDeltas.push({
              color: FloatingTextVariant.Neutral,
              value: "CRITICAL",
            });
          }

          if (hasInflictedBleed) {
            set(monsterBleedingDuration, BLEED.duration);
            increaseMastery(MasteryType.BleedDamage);

            monsterDeltas.push({
              color: FloatingTextVariant.Neutral,
              value: "BLEED",
            });
          }

          if (hasInflictedStagger) {
            set(monsterStaggeredDuration, get(staggerDuration));
            increaseMastery(MasteryType.StaggerDuration);

            monsterDeltas.push({
              color: FloatingTextVariant.Neutral,
              value: "STAGGER",
            });
          }

          changeMonsterHealth({ delta: monsterDeltas, value: totalDamage });

          animateElement({
            element: get(monsterElement),
            speed: AnimationSpeed.Fast,
            type: AnimationType.HeadShake,
          });
        } else {
          set(deltas(DeltaType.Stamina), [
            {
              color: FloatingTextVariant.Neutral,
              value: "CANNOT ATTACK",
            },
            {
              color: FloatingTextVariant.Negative,
              value: ` (${staminaCost})`,
            },
          ]);
        }
      },
    [changeMonsterHealth, changeStamina, increaseMastery]
  );
}
