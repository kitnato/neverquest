import { useRecoilCallback } from "recoil";

import { AILMENT_PENALTY } from "@neverquest/data/statistics";
import { useChangeMonsterHealth } from "@neverquest/hooks/actions/useChangeMonsterHealth";
import { useChangeStamina } from "@neverquest/hooks/actions/useChangeStamina";
import { useIncreaseMastery } from "@neverquest/hooks/actions/useIncreaseMastery";
import { useInflictElementalAilment } from "@neverquest/hooks/actions/useInflictElementalAilment";
import {
  attackDuration,
  canAttackOrParry,
  hasEnoughAmmunition,
  isAttacking,
} from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import { weapon } from "@neverquest/state/gear";
import { inventory } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { ownedItem } from "@neverquest/state/items";
import { masteryStatistic } from "@neverquest/state/masteries";
import {
  bleed,
  distance,
  isMonsterAiling,
  monsterAilmentDuration,
  monsterElement,
  monsterHealth,
  monsterHealthMaximum,
} from "@neverquest/state/monster";
import {
  attackRateTotal,
  bleedChance,
  criticalChance,
  criticalStrike,
  damageTotal,
  execution,
  stun,
} from "@neverquest/state/statistics";
import { isTraitAcquired } from "@neverquest/state/traits";
import type { AmmunitionPouchItem } from "@neverquest/types";
import { isMelee, isRanged } from "@neverquest/types/type-guards";
import type { DeltaDisplay } from "@neverquest/types/ui";
import { ELEMENTAL_TYPES } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";
import { animateElement } from "@neverquest/utilities/helpers";

export function useAttack() {
  const changeMonsterHealth = useChangeMonsterHealth();
  const changeStamina = useChangeStamina();
  const increaseMastery = useIncreaseMastery();
  const inflictElementalAilment = useInflictElementalAilment();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const canAttackOrParryValue = get(canAttackOrParry);
        const monsterHealthValue = get(monsterHealth);
        const weaponValue = get(weapon);
        const { gearClass, staminaCost } = weaponValue;
        const isWeaponRanged = isRanged(weaponValue);
        const isWeaponTwoHanded = isMelee(weaponValue) && weaponValue.grip === "two-handed";
        const hasInflictedCritical =
          (isWeaponRanged && get(isTraitAcquired("sharpshooter")) && get(distance) > 0) ||
          Math.random() < get(criticalChance);
        const inExecutionRange =
          isWeaponTwoHanded && monsterHealthValue / get(monsterHealthMaximum) <= get(execution);

        set(isShowing("statistics"), true);

        if (get(isAttacking) && get(attackDuration) === 0) {
          set(attackDuration, get(attackRateTotal));
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
            set(inventory, (currentInventory) =>
              currentInventory.map((currentItem) => {
                const ownedAmmunitionPouch = get(ownedItem("ammunition pouch"));

                return ownedAmmunitionPouch !== null && currentItem.id === ownedAmmunitionPouch.id
                  ? {
                      ...currentItem,
                      current:
                        (currentItem as AmmunitionPouchItem).current - weaponValue.ammunitionCost,
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

          const inflictedDamage = -Math.round(
            (hasInflictedCritical ? get(criticalStrike) : get(damageTotal)) *
              (get(isMonsterAiling("burning")) ? AILMENT_PENALTY.burning : 1),
          );
          const monsterDeltas: DeltaDisplay = [];

          if (get(monsterAilmentDuration("bleeding")) === 0 && Math.random() < get(bleedChance)) {
            set(isShowing("monsterAilments"), true);
            set(monsterAilmentDuration("bleeding"), get(bleed).duration);

            monsterDeltas.push({
              color: "text-muted",
              value: "BLEED",
            });
          }

          if (hasInflictedCritical) {
            monsterDeltas.push({
              color: "text-muted",
              value: "CRITICAL",
            });
          }

          if (Math.random() < get(stun)) {
            set(isShowing("monsterAilments"), true);
            set(monsterAilmentDuration("stunned"), get(masteryStatistic("might")));

            monsterDeltas.push({
              color: "text-muted",
              value: "STUN",
            });
          }

          ELEMENTAL_TYPES.forEach((elemental) =>
            inflictElementalAilment({ elemental, slot: "weapon" }),
          );

          changeMonsterHealth({
            delta: monsterDeltas,
            value: inflictedDamage,
          });
        } else {
          set(deltas("stamina"), [
            {
              color: "text-muted",
              value: "CANNOT ATTACK",
            },
          ]);
        }
      },
    [changeMonsterHealth, changeStamina, increaseMastery, inflictElementalAilment],
  );
}
