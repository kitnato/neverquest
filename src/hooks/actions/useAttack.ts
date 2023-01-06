import { useRecoilCallback } from "recoil";

import { BLEED } from "@neverquest/constants";
import useChangeStamina from "@neverquest/hooks/actions/useChangeStamina";
import useIncreaseMastery from "@neverquest/hooks/actions/useIncreaseMastery";
import { WeaponClass } from "@neverquest/locra/types";
import { deltas } from "@neverquest/state/deltas";
import { weapon } from "@neverquest/state/inventory";
import {
  isMonsterStaggered,
  monsterBleedingDuration,
  monsterCurrentHealth,
  monsterStatusElement,
} from "@neverquest/state/monster";
import { canAttackOrParry } from "@neverquest/state/reserves";
import { skills } from "@neverquest/state/skills";
import { bleedChance, criticalChance, criticalDamage, damage } from "@neverquest/state/statistics";
import { DeltaType, MasteryType, SkillType } from "@neverquest/types/enums";
import { AnimationSpeed, AnimationType, DeltaDisplay, FloatingText } from "@neverquest/types/ui";
import animateElement from "@neverquest/utilities/animateElement";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export default function () {
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
          const extraDeltas: DeltaDisplay = [];
          const totalDamage = hasInflictedCritical ? baseDamage * get(criticalDamage) : baseDamage;

          let monsterHealth = get(monsterCurrentHealth) + totalDamage;

          if (monsterHealth < 0) {
            monsterHealth = 0;
          }

          if (staminaCost > 0) {
            changeStamina({ value: -staminaCost });
          }

          set(monsterCurrentHealth, monsterHealth);

          if (hasInflictedCritical) {
            extraDeltas.push({
              color: FloatingText.Neutral,
              value: "CRITICAL",
            });
          }

          if (hasInflictedBleed) {
            set(monsterBleedingDuration, BLEED.duration);
            increaseMastery(MasteryType.BleedDamage);

            extraDeltas.push({
              color: FloatingText.Neutral,
              value: "BLEED",
            });
          }

          if (hasInflictedStagger) {
            set(isMonsterStaggered, true);
            increaseMastery(MasteryType.StaggerDuration);

            extraDeltas.push({
              color: FloatingText.Neutral,
              value: "STAGGER",
            });
          }

          set(deltas(DeltaType.HealthMonster), [
            {
              color: FloatingText.Negative,
              value: totalDamage,
            },
            ...extraDeltas,
          ]);

          animateElement({
            element: get(monsterStatusElement),
            speed: AnimationSpeed.Fast,
            type: AnimationType.HeadShake,
          });
        } else {
          set(deltas(DeltaType.Stamina), [
            {
              color: FloatingText.Neutral,
              value: "CANNOT ATTACK",
            },
            {
              color: FloatingText.Negative,
              value: ` (${staminaCost})`,
            },
          ]);
        }
      },
    []
  );
}
