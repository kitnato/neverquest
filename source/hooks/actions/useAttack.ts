import { useRecoilCallback } from "recoil";

import { useAddDelta } from "@neverquest/hooks/actions/useAddDelta";
import { useChangeHealth } from "@neverquest/hooks/actions/useChangeHealth";
import { useChangeMonsterHealth } from "@neverquest/hooks/actions/useChangeMonsterHealth";
import { useChangeStamina } from "@neverquest/hooks/actions/useChangeStamina";
import { useInflictElementalAilment } from "@neverquest/hooks/actions/useInflictElementalAilment";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { useTrainMastery } from "@neverquest/hooks/actions/useTrainMastery";
import { bleed, bleedChance, stunChance } from "@neverquest/state/ailments";
import {
  attackDuration,
  canAttackOrParry,
  hasEnoughAmmunition,
  isAttacking,
} from "@neverquest/state/character";
import { weapon } from "@neverquest/state/gear";
import { ammunition } from "@neverquest/state/items";
import { masteryStatistic } from "@neverquest/state/masteries";
import {
  distance,
  monsterAilmentDuration,
  monsterElement,
  monsterHealth,
  monsterHealthMaximum,
} from "@neverquest/state/monster";
import { isSkillAcquired } from "@neverquest/state/skills";
import {
  attackRate,
  criticalChance,
  criticalStrike,
  damage,
  executionThreshold,
  lifeLeech,
} from "@neverquest/state/statistics";
import { isTraitAcquired } from "@neverquest/state/traits";
import { isShowing } from "@neverquest/state/ui";
import { isMelee, isRanged } from "@neverquest/types/type-guards";
import type { DeltaDisplay } from "@neverquest/types/ui";
import { ELEMENTAL_TYPES } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";
import { animateElement } from "@neverquest/utilities/helpers";

export function useAttack() {
  const addDelta = useAddDelta();
  const changeHealth = useChangeHealth();
  const changeMonsterHealth = useChangeMonsterHealth();
  const changeStamina = useChangeStamina();
  const trainMastery = useTrainMastery();
  const inflictElementalAilment = useInflictElementalAilment();
  const progressQuest = useProgressQuest();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const canAttackOrParryValue = get(canAttackOrParry);
        const hasEnoughAmmunitionValue = get(hasEnoughAmmunition);
        const lifeLeechValue = get(lifeLeech);
        const monsterElementValue = get(monsterElement);
        const monsterHealthValue = get(monsterHealth);
        const weaponValue = get(weapon);
        const isWeaponRanged = isRanged(weaponValue);
        const hasInflictedCritical =
          (get(isSkillAcquired("assassination")) &&
            isWeaponRanged &&
            get(isTraitAcquired("sharpshooter")) &&
            get(distance) > 0) ||
          Math.random() <= get(criticalChance);

        let totalDamage = Math.round(hasInflictedCritical ? get(criticalStrike) : get(damage));

        set(isShowing("damage"), true);

        if (get(isAttacking) && get(attackDuration) === 0) {
          set(attackDuration, get(attackRate));
        }

        if (canAttackOrParryValue && hasEnoughAmmunitionValue) {
          if (weaponValue.burden > 0) {
            changeStamina({ value: -weaponValue.burden });
          }

          if (monsterElementValue !== null) {
            animateElement({
              animation: "headShake",
              element: monsterElementValue,
              speed: "fast",
            });
          }

          if (isWeaponRanged) {
            set(ammunition, (currentAmmunition) => currentAmmunition - weaponValue.ammunitionCost);
          }

          if (
            (isMelee(weaponValue) &&
              weaponValue.grip === "two-handed" &&
              monsterHealthValue / get(monsterHealthMaximum) <= get(executionThreshold)) ||
            (hasInflictedCritical && get(isTraitAcquired("executioner")))
          ) {
            totalDamage = monsterHealthValue;

            changeMonsterHealth({
              contents: [
                {
                  color: "text-secondary",
                  value: "EXECUTE",
                },
              ],
              damageType: "execution",
              value: -totalDamage,
            });
          } else {
            const monsterDeltas: DeltaDisplay[] = [];

            if (
              get(monsterAilmentDuration("bleeding")) === 0 &&
              Math.random() <= get(bleedChance)
            ) {
              set(monsterAilmentDuration("bleeding"), get(bleed).duration);

              progressQuest({ quest: "bleeding" });

              monsterDeltas.push({
                color: "text-secondary",
                value: "BLEEDING",
              });
            }

            if (hasInflictedCritical) {
              progressQuest({ quest: "critical" });

              monsterDeltas.push({
                color: "text-secondary",
                value: "CRITICAL",
              });
            }

            if (Math.random() <= get(stunChance)) {
              set(monsterAilmentDuration("stunned"), get(masteryStatistic("might")));

              progressQuest({ quest: "stunning" });

              monsterDeltas.push({
                color: "text-secondary",
                value: "STUN",
              });
            }

            for (const elemental of ELEMENTAL_TYPES) {
              inflictElementalAilment({ elemental, slot: "weapon" });
            }

            changeMonsterHealth({
              contents: monsterDeltas,
              damageType: hasInflictedCritical ? "critical" : undefined,
              value: -totalDamage,
            });
          }

          if (lifeLeechValue > 0) {
            changeHealth({
              contents: {
                color: "text-secondary",
                value: "LEECH",
              },
              value: lifeLeechValue,
            });
          }

          trainMastery("butchery");
          trainMastery("cruelty");
          trainMastery("finesse");
          trainMastery("marksmanship");
          trainMastery("might");
        } else {
          if (!canAttackOrParryValue) {
            addDelta({
              contents: [
                {
                  color: "text-secondary",
                  value: "CANNOT ATTACK",
                },
                {
                  color: "text-danger",
                  value: `(${weaponValue.burden})`,
                },
              ],
              delta: "stamina",
            });

            progressQuest({ quest: "exhausting" });
          }

          if (isWeaponRanged && !hasEnoughAmmunitionValue) {
            addDelta({
              contents: [
                {
                  color: "text-secondary",
                  value: "INSUFFICIENT AMMUNITION",
                },
                {
                  color: "text-danger",
                  value: `(${weaponValue.ammunitionCost})`,
                },
              ],
              delta: "ammunition",
            });
          }
        }
      },
    [
      addDelta,
      changeHealth,
      changeMonsterHealth,
      changeStamina,
      trainMastery,
      inflictElementalAilment,
      progressQuest,
    ],
  );
}
