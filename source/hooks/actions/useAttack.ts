import { useRecoilCallback } from "recoil";

import { useAddDelta } from "@neverquest/hooks/actions/useAddDelta";
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
import { inventory, ownedItem } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { masteryStatistic } from "@neverquest/state/masteries";
import {
  distance,
  monsterAilmentDuration,
  monsterElement,
  monsterHealth,
  monsterHealthMaximum,
} from "@neverquest/state/monster";
import {
  attackRate,
  criticalChance,
  criticalStrike,
  damage,
  executionThreshold,
} from "@neverquest/state/statistics";
import { isTraitAcquired } from "@neverquest/state/traits";
import type { AmmunitionPouchItem } from "@neverquest/types";
import { isMelee, isRanged } from "@neverquest/types/type-guards";
import type { DeltaDisplay } from "@neverquest/types/ui";
import { ELEMENTAL_TYPES } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";
import { animateElement } from "@neverquest/utilities/helpers";

export function useAttack() {
  const addDelta = useAddDelta();
  const changeMonsterHealth = useChangeMonsterHealth();
  const changeStamina = useChangeStamina();
  const trainMastery = useTrainMastery();
  const inflictElementalAilment = useInflictElementalAilment();
  const progressQuest = useProgressQuest();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const monsterHealthValue = get(monsterHealth);
        const weaponValue = get(weapon);
        const isWeaponRanged = isRanged(weaponValue);
        const criticalChanceValue = get(criticalChance);
        const hasInflictedCritical =
          (criticalChanceValue > 0 &&
            isWeaponRanged &&
            get(isTraitAcquired("sharpshooter")) &&
            get(distance) > 0) ||
          Math.random() <= criticalChanceValue;

        set(isShowing("statistics"), true);

        if (get(isAttacking) && get(attackDuration) === 0) {
          set(attackDuration, get(attackRate));
        }

        if (get(canAttackOrParry) && get(hasEnoughAmmunition)) {
          if (weaponValue.staminaCost > 0) {
            changeStamina({ value: -weaponValue.staminaCost });
          }

          animateElement({
            animation: "headShake",
            element: get(monsterElement),
            speed: "fast",
          });

          if (isWeaponRanged) {
            const { ammunitionCost } = weaponValue;

            set(inventory, (currentInventory) =>
              currentInventory.map((currentItem) => {
                const ownedAmmunitionPouch = get(ownedItem("ammunition pouch"));

                return ownedAmmunitionPouch !== undefined &&
                  currentItem.ID === ownedAmmunitionPouch.ID
                  ? {
                      ...currentItem,
                      current: (currentItem as AmmunitionPouchItem).current - ammunitionCost,
                    }
                  : currentItem;
              }),
            );
          }

          if (
            (isMelee(weaponValue) &&
              weaponValue.grip === "two-handed" &&
              monsterHealthValue / get(monsterHealthMaximum) <= get(executionThreshold)) ||
            (hasInflictedCritical && get(isTraitAcquired("executioner")))
          ) {
            changeMonsterHealth({
              damageType: "execution",
              delta: [
                {
                  color: "text-muted",
                  value: "EXECUTE",
                },
                {
                  color: "text-danger",
                  value: `-${monsterHealthValue}`,
                },
              ],
              value: -monsterHealthValue,
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
                color: "text-muted",
                value: "BLEEDING",
              });
            }

            if (hasInflictedCritical) {
              progressQuest({ quest: "critical" });

              monsterDeltas.push({
                color: "text-muted",
                value: "CRITICAL",
              });
            }

            if (Math.random() <= get(stunChance)) {
              set(monsterAilmentDuration("stunned"), get(masteryStatistic("might")));

              progressQuest({ quest: "stunning" });

              monsterDeltas.push({
                color: "text-muted",
                value: "STUN",
              });
            }

            for (const elemental of ELEMENTAL_TYPES) {
              inflictElementalAilment({ elemental, slot: "weapon" });
            }

            const totalDamage = -Math.round(
              hasInflictedCritical ? get(criticalStrike) : get(damage),
            );

            changeMonsterHealth({
              damageType: hasInflictedCritical ? "critical" : undefined,
              delta: [
                ...monsterDeltas,
                {
                  color: "text-danger",
                  value: totalDamage,
                },
              ],
              value: totalDamage,
            });
          }

          trainMastery("butchery");
          trainMastery("cruelty");
          trainMastery("finesse");
          trainMastery("marksmanship");
          trainMastery("might");
        } else {
          addDelta({
            contents: [
              {
                color: "text-muted",
                value: "CANNOT ATTACK",
              },
              {
                color: "text-danger",
                value: `(${weaponValue.staminaCost})`,
              },
            ],
            delta: "stamina",
          });

          progressQuest({ quest: "exhausting" });
        }
      },
    [
      addDelta,
      changeMonsterHealth,
      changeStamina,
      trainMastery,
      inflictElementalAilment,
      progressQuest,
    ],
  );
}
