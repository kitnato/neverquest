import { useRecoilCallback } from "recoil";

import { BLEED_DURATION } from "@neverquest/constants/attributes";
import useChangeStamina from "@neverquest/hooks/actions/useChangeStamina";
import useIncreaseMastery from "@neverquest/hooks/actions/useIncreaseMastery";
import { WeaponClass } from "@neverquest/locra/types";
import { deltas } from "@neverquest/state/deltas";
import { weapon } from "@neverquest/state/inventory";
import {
  currentHealthMonster,
  isMonsterStaggered,
  monsterBleedingDuration,
  monsterStatusElement,
} from "@neverquest/state/monster";
import { canAttackOrParry } from "@neverquest/state/reserves";
import { skills } from "@neverquest/state/skills";
import {
  totalBleedChance,
  totalCriticalChance,
  totalCriticalDamage,
  totalDamage,
} from "@neverquest/state/statistics";
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
            get(skills(SkillType.Criticals)) && Math.random() <= get(totalCriticalChance);
          const hasInflictedBleed =
            get(monsterBleedingDuration) === 0 &&
            get(skills(SkillType.Bleed)) &&
            Math.random() <= get(totalBleedChance);
          const hasInflictedStagger =
            get(skills(SkillType.Stagger)) &&
            weaponClass === WeaponClass.Blunt &&
            Math.random() <= abilityChance;

          const baseDamage = -get(totalDamage);
          const damage = hasInflictedCritical ? baseDamage * get(totalCriticalDamage) : baseDamage;
          const extra: DeltaDisplay = [];

          let monsterHealth = get(currentHealthMonster) + damage;

          if (monsterHealth < 0) {
            monsterHealth = 0;
          }

          if (staminaCost > 0) {
            changeStamina({ value: -staminaCost });
          }

          set(currentHealthMonster, monsterHealth);

          if (hasInflictedCritical) {
            extra.push({
              color: FloatingText.Neutral,
              value: "CRITICAL",
            });
          }

          if (hasInflictedBleed) {
            set(monsterBleedingDuration, BLEED_DURATION);
            extra.push({
              color: FloatingText.Neutral,
              value: "BLEED",
            });
            increaseMastery(MasteryType.BleedDamage);
          }

          if (hasInflictedStagger) {
            set(isMonsterStaggered, true);
            extra.push({
              color: FloatingText.Neutral,
              value: "STAGGER",
            });
            increaseMastery(MasteryType.StaggerDuration);
          }

          set(deltas(DeltaType.HealthMonster), [
            {
              color: FloatingText.Negative,
              value: damage,
            },
            ...extra,
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
