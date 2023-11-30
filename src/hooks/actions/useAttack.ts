import { useRecoilCallback } from "recoil";

import { useAddDelta } from "@neverquest/hooks/actions/useAddDelta";
import { useChangeMonsterHealth } from "@neverquest/hooks/actions/useChangeMonsterHealth";
import { useChangeStamina } from "@neverquest/hooks/actions/useChangeStamina";
import { useIncreaseMastery } from "@neverquest/hooks/actions/useIncreaseMastery";
import { useInflictElementalAilment } from "@neverquest/hooks/actions/useInflictElementalAilment";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
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
  bleed,
  distance,
  monsterAilmentDuration,
  monsterElement,
  monsterHealth,
  monsterHealthMaximum,
} from "@neverquest/state/monster";
import {
  attackRate,
  bleedChance,
  criticalChance,
  criticalStrike,
  damage,
  executionThreshold,
  stunChance,
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
  const increaseMastery = useIncreaseMastery();
  const inflictElementalAilment = useInflictElementalAilment();
  const progressQuest = useProgressQuest();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const canAttackOrParryValue = get(canAttackOrParry);
        const monsterHealthValue = get(monsterHealth);
        const weaponValue = get(weapon);
        const { gearClass, staminaCost } = weaponValue;
        const isWeaponRanged = isRanged(weaponValue);
        // eslint-disable-next-line unicorn/consistent-destructuring
        const isWeaponTwoHanded = isMelee(weaponValue) && weaponValue.grip === "two-handed";
        const hasInflictedCritical =
          (isWeaponRanged && get(isTraitAcquired("sharpshooter")) && get(distance) > 0) ||
          Math.random() <= get(criticalChance);
        const inExecutionRange =
          isWeaponTwoHanded &&
          monsterHealthValue / get(monsterHealthMaximum) <= get(executionThreshold);

        set(isShowing("statistics"), true);

        if (get(isAttacking) && get(attackDuration) === 0) {
          set(attackDuration, get(attackRate));
        }

        if (canAttackOrParryValue && get(hasEnoughAmmunition)) {
          if (staminaCost > 0) {
            changeStamina({ value: -staminaCost });
          }

          animateElement({
            element: get(monsterElement),
            name: "headShake",
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

            increaseMastery("marksmanship");
          }

          if (gearClass === "blunt") {
            increaseMastery("might");
          }

          if (gearClass === "piercing") {
            increaseMastery("cruelty");
          }

          if (gearClass === "slashing") {
            increaseMastery("finesse");
          }

          if (isWeaponTwoHanded) {
            increaseMastery("butchery");
          }

          if (inExecutionRange || (hasInflictedCritical && get(isTraitAcquired("executioner")))) {
            changeMonsterHealth({
              damageType: "execute",
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

            return;
          }

          const monsterDeltas: DeltaDisplay[] = [];

          if (get(monsterAilmentDuration("bleeding")) === 0 && Math.random() <= get(bleedChance)) {
            set(isShowing("monsterAilments"), true);
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
            set(isShowing("monsterAilments"), true);
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

          changeMonsterHealth({
            damageType: hasInflictedCritical ? "critical" : undefined,
            delta: monsterDeltas,
            value: -Math.round(hasInflictedCritical ? get(criticalStrike) : get(damage)),
          });
        } else {
          addDelta({
            contents: [
              {
                color: "text-muted",
                value: "CANNOT ATTACK",
              },
              {
                color: "text-danger",
                value: `(${staminaCost})`,
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
      increaseMastery,
      inflictElementalAilment,
      progressQuest,
    ],
  );
}
