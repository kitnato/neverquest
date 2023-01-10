import { useRecoilCallback } from "recoil";

import { BLEED } from "@neverquest/constants";
import useChangeMonsterHealth from "@neverquest/hooks/actions/useChangeMonsterHealth";
import useChangeStamina from "@neverquest/hooks/actions/useChangeStamina";
import useIncreaseMastery from "@neverquest/hooks/actions/useIncreaseMastery";
import { WeaponClass } from "@neverquest/locra/types";
import { deltas } from "@neverquest/state/deltas";
import { weapon } from "@neverquest/state/inventory";
import {
  isMonsterStaggered,
  monsterBleedingDuration,
  monsterStatusElement,
} from "@neverquest/state/monster";
import { canAttackOrParry } from "@neverquest/state/reserves";
import { skills } from "@neverquest/state/skills";
import { bleedChance, criticalChance, criticalDamage, damage } from "@neverquest/state/statistics";
import { DeltaType, MasteryType, SkillType } from "@neverquest/types/enums";
import {
  AnimationSpeed,
  AnimationType,
  DeltaDisplay,
  FloatingTextVariant,
} from "@neverquest/types/ui";
import animateElement from "@neverquest/utilities/animateElement";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export default function () {
  const changeMonsterHealth = useChangeMonsterHealth();
  const changeStamina = useChangeStamina();
  const increaseMastery = useIncreaseMastery();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const { abilityChance, staminaCost, weaponClass } = get(weapon);

        if (get(canAttackOrParry)) {
          const hasInflictedCritical =
            get(skills(SkillType.Criticals)) && Math.random() <= get(criticalChance);
          const hasInflictedBleed =
            get(monsterBleedingDuration) === 0 &&
            get(skills(SkillType.Bleed)) &&
            Math.random() <= get(bleedChance);
          const hasInflictedStagger =
            get(skills(SkillType.Stagger)) &&
            weaponClass === WeaponClass.Blunt &&
            Math.random() <= abilityChance;

          const baseDamage = -get(damage);
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
            set(isMonsterStaggered, true);
            increaseMastery(MasteryType.StaggerDuration);

            monsterDeltas.push({
              color: FloatingTextVariant.Neutral,
              value: "STAGGER",
            });
          }

          changeMonsterHealth({ delta: monsterDeltas, value: totalDamage });

          animateElement({
            element: get(monsterStatusElement),
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
    []
  );
}
