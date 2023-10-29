import { useRecoilCallback } from "recoil";

import { AILMENT_PENALTY } from "@neverquest/data/statistics";
import { useChangeHealth } from "@neverquest/hooks/actions/useChangeHealth";
import { useChangeMonsterHealth } from "@neverquest/hooks/actions/useChangeMonsterHealth";
import { useChangeStamina } from "@neverquest/hooks/actions/useChangeStamina";
import { useIncreaseMastery } from "@neverquest/hooks/actions/useIncreaseMastery";
import { useInflictElementalAilment } from "@neverquest/hooks/actions/useInflictElementalAilment";
import {
  canAttackOrParry,
  canBlock,
  canDodge,
  isAttacking,
  recoveryDuration,
  statusElement,
} from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import { armor, shield, weapon } from "@neverquest/state/gear";
import { isShowing } from "@neverquest/state/isShowing";
import { masteryStatistic } from "@neverquest/state/masteries";
import {
  blightChance,
  isMonsterAiling,
  monsterAilmentDuration,
  monsterAttackDuration,
  monsterAttackRate,
  monsterDamageTotal,
  monsterElement,
  poisonChance,
  poisonLength,
} from "@neverquest/state/monster";
import { blight, isPoisoned, poisonDuration } from "@neverquest/state/reserves";
import {
  blockChance,
  deflection,
  dodgeChance,
  parry,
  parryAbsorption,
  parryDamage,
  protection,
  recoveryRate,
  staggerChance,
  thorns,
} from "@neverquest/state/statistics";
import { isTraitAcquired } from "@neverquest/state/traits";
import type { DeltaDisplay } from "@neverquest/types/ui";
import { ELEMENTAL_TYPES } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";
import { animateElement } from "@neverquest/utilities/helpers";

export function useDefend() {
  const changeHealth = useChangeHealth();
  const changeMonsterHealth = useChangeMonsterHealth();
  const changeStamina = useChangeStamina();
  const increaseMastery = useIncreaseMastery();
  const inflictElementalAilment = useInflictElementalAilment();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        set(isShowing("monsterOffense"), true);

        animateElement({
          element: get(statusElement),
          name: "headShake",
          speed: "fast",
        });

        // If stunned, check if hit connects and decrease its duration.
        if (get(isMonsterAiling("stunned"))) {
          set(monsterAilmentDuration("stunned"), (current) => current - 1);

          if (Math.random() <= AILMENT_PENALTY.stunned) {
            set(deltas("health"), {
              color: "text-muted",
              value: "MISS",
            });

            return;
          }
        }

        const deltaHealth: DeltaDisplay = [];

        // If attack is dodged, nothing else happens (all damage is negated).
        if (Math.random() < get(dodgeChance)) {
          const armorStaminaCost = get(armor).staminaCost;

          if (get(canDodge)) {
            set(deltas("health"), {
              color: "text-muted",
              value: "DODGED",
            });

            if (!get(isTraitAcquired("stalwart"))) {
              changeStamina({ value: -armorStaminaCost });
            }

            return;
          } else {
            deltaHealth.push({
              color: "text-muted",
              value: `CANNOT DODGE (${armorStaminaCost})`,
            });
          }
        }

        const hasBlocked = Math.random() < get(blockChance);
        const hasParried = Math.random() < get(parry);
        const monsterDamageTotalValue = get(monsterDamageTotal);
        const protectionValue = get(protection);

        const deltaMonsterHealth: DeltaDisplay = [];
        const deltaStamina: DeltaDisplay = [];
        const totalDamage = protectionValue - monsterDamageTotalValue;

        let healthDamage = totalDamage < 0 ? totalDamage : 0;
        let monsterHealthDamage = 0;

        // If parrying occurs, check & apply stamina cost.
        if (hasParried) {
          if (get(canAttackOrParry)) {
            set(isShowing("monsterAilments"), true);

            const parryReflected = -Math.round(monsterDamageTotalValue * get(parryDamage));

            healthDamage -= Math.round(healthDamage * get(parryAbsorption));
            monsterHealthDamage += parryReflected;

            deltaMonsterHealth.push(
              {
                color: "text-muted",
                value: "PARRY",
              },
              {
                color: "text-danger",
                value: `(${parryReflected})`,
              },
            );

            deltaHealth.push(
              {
                color: "text-muted",
                value: "PARRIED",
              },
              {
                color: "text-danger",
                value: `(${healthDamage})`,
              },
            );
          } else {
            deltaStamina.push(
              {
                color: "text-muted",
                value: "CANNOT PARRY",
              },
              {
                color: "text-danger",
                value: `(${get(weapon).staminaCost})`,
              },
            );
          }
        }

        // If not parried and blocking occurs, check & apply stamina cost.
        if (hasBlocked && !hasParried) {
          const shieldStaminaCost = get(shield).staminaCost;

          if (get(canBlock)) {
            healthDamage = 0;

            deltaHealth.push({
              color: "text-muted",
              value: "BLOCKED",
            });

            changeStamina({ value: -shieldStaminaCost });

            increaseMastery("stability");

            if (Math.random() < get(staggerChance)) {
              set(isShowing("monsterAilments"), true);
              set(monsterAilmentDuration("staggered"), get(masteryStatistic("stability")));

              changeMonsterHealth({
                delta: {
                  color: "text-muted",
                  value: "STAGGER",
                },
                value: 0,
              });
            }
          } else {
            deltaStamina.push(
              {
                color: "text-muted",
                value: "CANNOT BLOCK",
              },
              {
                color: "text-danger",
                value: `(${shieldStaminaCost})`,
              },
            );
          }
        }

        // If neither dodged, parried nor blocked, show damage with protection and increase resilience.
        if (!hasBlocked && !hasParried && protectionValue > 0) {
          deltaHealth.push(
            {
              color: "text-danger",
              value: healthDamage,
            },
            {
              color: "text-muted",
              // In the case of 0 health damage, show only inflicted.
              value: `(${Math.max(protectionValue, healthDamage)})`,
            },
          );

          increaseMastery("resilience");
        }

        set(isShowing("recovery"), true);
        set(recoveryDuration, get(recoveryRate));

        // If already poisoned, check if blighting has occurred and if it's been deflected.
        if (get(isPoisoned) && Math.random() < get(blightChance)) {
          if (Math.random() < get(deflection)) {
            deltaStamina.push({
              color: "text-success",
              value: "DEFLECTED BLIGHT",
            });
          } else {
            set(blight, (current) => current + 1);

            deltaStamina.push({
              color: "text-muted",
              value: "BLIGHTED",
            });
          }
        }

        // If poisoning occurs, check if has been deflected, otherwise apply poison.
        if (Math.random() < get(poisonChance)) {
          if (Math.random() < get(deflection)) {
            deltaHealth.push({
              color: "text-muted",
              value: "DEFLECTED POISON",
            });
          } else {
            set(poisonDuration, get(poisonLength));

            deltaHealth.push({
              color: "text-muted",
              value: "POISONED",
            });
          }
        }

        // Calculate & apply thorns damage.
        const thornsValue = get(thorns);

        if (thornsValue > 0) {
          monsterHealthDamage += thornsValue;

          deltaMonsterHealth.push(
            {
              color: "text-muted",
              value: "THORNS",
            },
            {
              color: "text-danger",
              value: `(-${thornsValue})`,
            },
          );
        }

        // Take any damage and show any stamina costs.
        changeHealth({ delta: deltaHealth, value: healthDamage });

        set(deltas("stamina"), (current) =>
          Array.isArray(current) ? [...current, ...deltaStamina] : [current, ...deltaStamina],
        );

        // Inflict any armor elemental effects.
        ELEMENTAL_TYPES.forEach((elemental) =>
          inflictElementalAilment({ elemental, slot: "armor" }),
        );

        // Inflict any parry and/or thorns damage.
        if (monsterHealthDamage > 0) {
          changeMonsterHealth({ delta: deltaMonsterHealth, value: -monsterHealthDamage });

          animateElement({
            element: get(monsterElement),
            name: "headShake",
            speed: "fast",
          });
        }

        if (get(isAttacking) && get(monsterAttackDuration) === 0) {
          set(monsterAttackDuration, get(monsterAttackRate));
        }
      },
    [changeHealth, changeMonsterHealth, changeStamina, increaseMastery],
  );
}
