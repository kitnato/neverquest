import { useRecoilCallback } from "recoil";

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
import { armor, shield, weapon } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { masteryStatistic } from "@neverquest/state/masteries";
import {
  monsterAilmentDuration,
  monsterAttackDuration,
  monsterAttackRate,
  monsterBlightChance,
  monsterDamage,
  monsterElement,
  monsterPoisonChance,
  monsterPoisonLength,
} from "@neverquest/state/monster";
import { blight, blightMagnitude, isPoisoned, poisonDuration } from "@neverquest/state/reserves";
import { skills } from "@neverquest/state/skills";
import {
  block,
  deflection,
  dodge,
  parryAbsorption,
  parryChance,
  parryDamage,
  protection,
  recoveryRate,
  thorns,
} from "@neverquest/state/statistics";
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
          speed: "fast",
          type: "headShake",
        });

        // If attack is dodged, nothing else happens (all damage is negated).
        if (get(skills("evasion")) && Math.random() <= get(dodge)) {
          if (get(canDodge)) {
            set(deltas("health"), {
              color: "text-muted",
              value: "DODGED",
            });

            return;
          } else {
            set(deltas("health"), {
              color: "text-muted",
              value: `CANNOT DODGE (${get(armor).staminaCost})`,
            });
          }
        }

        const protectionValue = get(protection);

        // If health damage (protection minus monster damage) is 0 or less, nothing else happens.
        const monsterDamageValue = get(monsterDamage);
        let healthDamage = (() => {
          const damage = protectionValue - monsterDamageValue;

          return damage < 0 ? damage : 0;
        })();
        let monsterHealthDamage = 0;

        const deltaHealth: DeltaDisplay = [];
        const deltaMonsterHealth: DeltaDisplay = [];
        const deltaStamina: DeltaDisplay = [];

        const hasParried = get(skills("escrime")) && Math.random() <= get(parryChance);

        // If parrying occurs, check & apply stamina cost.
        if (hasParried) {
          const { staminaCost } = get(weapon);

          if (get(canAttackOrParry)) {
            set(isShowing("monsterAilments"), true);

            const parryReflected = -Math.floor(monsterDamageValue * get(parryDamage));

            healthDamage += Math.floor(healthDamage * get(parryAbsorption));
            monsterHealthDamage += parryReflected;

            deltaMonsterHealth.push(
              {
                color: "text-muted",
                value: "PARRIED",
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

            changeStamina({ isRegeneration: false, value: -staminaCost });
            increaseMastery("finesse");
          } else {
            deltaStamina.push(
              {
                color: "text-muted",
                value: "CANNOT PARRY",
              },
              {
                color: "text-danger",
                value: `(${staminaCost})`,
              },
            );
          }
        }

        const hasBlocked = Math.random() <= get(block);

        // If not parried and blocking occurs, check & apply stamina cost.
        if (hasBlocked && !hasParried) {
          const { staminaCost } = get(shield);

          if (get(canBlock)) {
            healthDamage = 0;

            deltaHealth.push({
              color: "text-muted",
              value: "BLOCKED",
            });

            // If Shieldcraft skill is acquired, check if a free block occurs, otherwise spend stamina blocking.
            if (get(skills("shieldcraft")) && Math.random() <= get(masteryStatistic("stability"))) {
              deltaStamina.push({
                color: "text-muted",
                value: "STABILIZED",
              });
            } else {
              changeStamina({ isRegeneration: false, value: -staminaCost });
            }

            increaseMastery("stability");

            const hasStaggered =
              get(skills("traumatology")) && Math.random() <= get(shield).stagger;

            // If monster is staggered, also increase Might mastery.
            if (hasStaggered) {
              set(isShowing("monsterAilments"), true);
              set(monsterAilmentDuration("staggered"), get(masteryStatistic("might")));

              increaseMastery("might");

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
                value: `(${staminaCost})`,
              },
            );
          }
        }

        // If neither parried nor blocked, show damage with protection.
        if (!hasBlocked && !hasParried && protectionValue > 0) {
          deltaHealth.push(
            {
              color: "text-danger",
              value: healthDamage,
            },
            {
              color: "text-muted",
              value: `(${protectionValue})`,
            },
          );
        }

        const recoveryRateValue = get(recoveryRate);

        if (recoveryRateValue > 0) {
          set(isShowing("recovery"), true);
          set(recoveryDuration, recoveryRateValue);
        }

        increaseMastery("resilience");

        // If already poisoned, check if blighting has occurred and if it's been deflected.
        if (
          get(isPoisoned) &&
          Math.random() <= get(monsterBlightChance) &&
          get(blightMagnitude).percentage < 1
        ) {
          const hasDeflected = get(skills("armorcraft")) && Math.random() <= get(deflection);

          if (hasDeflected) {
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
        if (Math.random() <= get(monsterPoisonChance)) {
          const hasDeflected = get(skills("armorcraft")) && Math.random() <= get(deflection);

          if (hasDeflected) {
            deltaHealth.push({
              color: "text-muted",
              value: "DEFLECTED POISON",
            });
          } else {
            set(poisonDuration, get(monsterPoisonLength));

            deltaHealth.push({
              color: "text-muted",
              value: "POISONED",
            });
          }
        }

        // Inflict thorns, if present.
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
              value: `(${-thornsValue})`,
            },
          );
        }

        // Inflict any armor elemental effects.
        ELEMENTAL_TYPES.forEach((elemental) =>
          inflictElementalAilment({ elemental, slot: "armor" }),
        );

        // The attack went through, apply damage and any stamina costs.
        changeHealth({ delta: deltaHealth, isRegeneration: false, value: healthDamage });

        // Apply and show any parry and thorns damage.
        if (monsterHealthDamage > 0) {
          changeMonsterHealth({ delta: deltaMonsterHealth, value: -monsterHealthDamage });

          animateElement({
            element: get(monsterElement),
            speed: "fast",
            type: "headShake",
          });
        }

        if (deltaStamina.length > 0) {
          set(deltas("stamina"), deltaStamina);
        }

        if (get(isAttacking) && get(monsterAttackDuration) === 0) {
          set(monsterAttackDuration, get(monsterAttackRate));
        }
      },
    [changeHealth, changeMonsterHealth, changeStamina, increaseMastery],
  );
}
