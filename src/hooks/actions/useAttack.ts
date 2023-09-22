import { useRecoilCallback } from "recoil";

import { BLEED, ELEMENTAL_AILMENT_PENALTY } from "@neverquest/data/statistics";
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
import { inventory } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { ownedItem, weapon } from "@neverquest/state/items";
import { masteryStatistic } from "@neverquest/state/masteries";
import {
  isMonsterAiling,
  monsterAilmentDuration,
  monsterElement,
  monsterHealth,
  monsterHealthMaximum,
} from "@neverquest/state/monster";
import { skills } from "@neverquest/state/skills";
import {
  attackRateTotal,
  bleed,
  criticalChance,
  criticalStrike,
  damageTotal,
  execution,
} from "@neverquest/state/statistics";
import type { TrinketItemAmmunitionPouch } from "@neverquest/types";
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
        const hasEnoughAmmunitionValue = get(hasEnoughAmmunition);
        const weaponValue = get(weapon);
        const { abilityChance, gearClass, staminaCost } = weaponValue;

        set(isShowing("statistics"), true);

        if (get(isAttacking) && get(attackDuration) === 0) {
          set(attackDuration, get(attackRateTotal));
        }

        if (canAttackOrParryValue && hasEnoughAmmunitionValue) {
          if (staminaCost > 0) {
            changeStamina({ isRegeneration: false, value: -staminaCost });
          }

          animateElement({
            element: get(monsterElement),
            speed: "fast",
            type: "headShake",
          });

          const isTwoHanded = isMelee(weaponValue) && weaponValue.grip === "two-handed";
          const monsterHealthValue = get(monsterHealth);
          const hasExecuted =
            get(skills("siegecraft")) &&
            isTwoHanded &&
            monsterHealthValue / get(monsterHealthMaximum) <= get(execution);

          if (isTwoHanded) {
            increaseMastery("butchery");
          }

          if (hasExecuted) {
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

          if (isRanged(weaponValue)) {
            set(inventory, (currentInventory) =>
              currentInventory.map((currentItem) => {
                const ownedAmmunitionPouch = get(ownedItem("ammunition pouch"));

                return ownedAmmunitionPouch !== null && currentItem.id === ownedAmmunitionPouch.id
                  ? {
                      ...currentItem,
                      current:
                        (currentItem as TrinketItemAmmunitionPouch).current -
                        weaponValue.ammunitionCost,
                    }
                  : currentItem;
              }),
            );
            increaseMastery("marksmanship");
          }

          const hasInflictedCritical =
            get(skills("assassination")) && Math.random() <= get(criticalChance);
          const hasInflictedBleed =
            get(monsterAilmentDuration("bleeding")) === 0 &&
            get(skills("anatomy")) &&
            Math.random() <= get(bleed);
          const hasInflictedStagger =
            get(skills("traumatology")) && gearClass === "blunt" && Math.random() <= abilityChance;

          const baseDamage = get(damageTotal);
          const totalDamage = -Math.round(
            (hasInflictedCritical ? get(criticalStrike) : baseDamage) *
              (get(isMonsterAiling("burning")) ? ELEMENTAL_AILMENT_PENALTY.burning : 1),
          );
          const monsterDeltas: DeltaDisplay = [
            {
              color: "text-danger",
              value: totalDamage,
            },
          ];

          if (hasInflictedCritical) {
            monsterDeltas.push({
              color: "text-muted",
              value: "CRITICAL",
            });
          }

          if (gearClass === "piercing") {
            increaseMastery("cruelty");
          }

          if (hasInflictedBleed) {
            set(isShowing("monsterAilments"), true);
            set(monsterAilmentDuration("bleeding"), BLEED.duration);

            monsterDeltas.push({
              color: "text-muted",
              value: "BLEED",
            });
          }

          if (gearClass === "blunt") {
            increaseMastery("might");
          }

          if (hasInflictedStagger) {
            set(isShowing("monsterAilments"), true);
            set(monsterAilmentDuration("staggered"), get(masteryStatistic("might")));

            monsterDeltas.push({
              color: "text-muted",
              value: "STAGGER",
            });
          }

          ELEMENTAL_TYPES.forEach((elemental) =>
            inflictElementalAilment({ elemental, slot: "weapon" }),
          );

          changeMonsterHealth({ delta: monsterDeltas, value: totalDamage });
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
