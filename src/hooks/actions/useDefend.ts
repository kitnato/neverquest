import { useRecoilCallback } from "recoil";

import { useChangeHealth } from "@neverquest/hooks/actions/useChangeHealth";
import { useChangeMonsterHealth } from "@neverquest/hooks/actions/useChangeMonsterHealth";
import { useChangeStamina } from "@neverquest/hooks/actions/useChangeStamina";
import { useIncreaseMastery } from "@neverquest/hooks/actions/useIncreaseMastery";
import {
  canAttackOrParry,
  canBlock,
  canDodge,
  recoveryDuration,
  statusElement,
} from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import { armor, shield, weapon } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { rawMasteryStatistic } from "@neverquest/state/masteries";
import {
  monsterBlightChance,
  monsterDamage,
  monsterElement,
  monsterPoisonChance,
  monsterPoisonDuration,
  monsterStaggerDuration,
} from "@neverquest/state/monster";
import { blight, isPoisoned, poisonDuration } from "@neverquest/state/reserves";
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
} from "@neverquest/state/statistics";
import type { DeltaDisplay } from "@neverquest/types/ui";
import { animateElement } from "@neverquest/utilities/animateElement";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useDefend() {
  const changeHealth = useChangeHealth();
  const changeMonsterHealth = useChangeMonsterHealth();
  const changeStamina = useChangeStamina();
  const increaseMastery = useIncreaseMastery();

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

        if (healthDamage === 0) {
          set(deltas("health"), {
            color: "text-muted",
            value: healthDamage,
          });

          return;
        }

        let deltaHealth: DeltaDisplay = [];
        let deltaStamina: DeltaDisplay = [];

        const hasParried = get(skills("escrime")) && Math.random() <= get(parryChance);

        // If parrying occurs, check & apply stamina cost.
        if (hasParried) {
          const { staminaCost } = get(weapon);

          if (get(canAttackOrParry)) {
            healthDamage = Math.floor(healthDamage * get(parryAbsorption));

            const parryReflected = -Math.floor(monsterDamageValue * get(parryDamage));

            set(isShowing("monsterAilments"), true);

            changeMonsterHealth({
              delta: [
                {
                  color: "text-muted",
                  value: "PARRIED",
                },
                {
                  color: "text-danger",
                  value: ` (${parryReflected})`,
                },
              ],
              value: parryReflected,
            });

            deltaHealth = [
              {
                color: "text-muted",
                value: "PARRIED",
              },
              {
                color: "text-danger",
                value: ` (${healthDamage})`,
              },
            ];

            changeStamina({ value: -staminaCost });
            increaseMastery("finesse");

            animateElement({
              element: get(monsterElement),
              speed: "fast",
              type: "headShake",
            });
          } else {
            deltaStamina = [
              {
                color: "text-muted",
                value: "CANNOT PARRY",
              },
              {
                color: "text-danger",
                value: ` (${staminaCost})`,
              },
            ];
          }
        }

        const hasBlocked = Math.random() <= get(block);

        // If not parried and blocking occurs, check & apply stamina cost.
        if (hasBlocked && !hasParried) {
          const { staminaCost } = get(shield);

          if (get(canBlock)) {
            healthDamage = 0;

            deltaHealth = [
              {
                color: "text-muted",
                value: "BLOCKED",
              },
            ];

            // If Shieldcraft skill is acquired, check if a free block occurs, otherwise spend stamina blocking.
            if (
              get(skills("shieldcraft")) &&
              Math.random() <= get(rawMasteryStatistic("stability"))
            ) {
              deltaStamina.push({
                color: "text-muted",
                value: "STABILIZED",
              });
            } else {
              changeStamina({ value: -staminaCost });
            }

            increaseMastery("stability");

            const hasStaggered =
              get(skills("traumatology")) && Math.random() <= get(shield).stagger;

            // If monster is staggered, also increase Might mastery.
            if (hasStaggered) {
              set(isShowing("monsterAilments"), true);
              set(monsterStaggerDuration, get(rawMasteryStatistic("might")));

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
            deltaStamina = [
              {
                color: "text-muted",
                value: "CANNOT BLOCK",
              },
              {
                color: "text-danger",
                value: ` (${staminaCost})`,
              },
            ];
          }
        }

        // If neither parried nor blocked, show damage with protection.
        if (!hasBlocked && !hasParried && protectionValue > 0) {
          deltaHealth = [
            {
              color: "text-danger",
              value: healthDamage,
            },
            {
              color: "text-muted",
              value: ` (${protectionValue})`,
            },
          ];
        }

        // If Resilience hasn't been triggered, activate recovery.
        if (
          !(get(skills("armorcraft")) && Math.random() <= get(rawMasteryStatistic("resilience")))
        ) {
          set(isShowing("recovery"), true);
          set(recoveryDuration, get(recoveryRate));
        }

        increaseMastery("resilience");

        // If already poisoned, check if blighting has occurred and if it's been deflected.
        if (get(isPoisoned) && Math.random() <= get(monsterBlightChance)) {
          const hasDeflected = get(skills("armorcraft")) && Math.random() <= get(deflection);

          if (hasDeflected) {
            deltaStamina.push({
              color: "text-success",
              value: "DEFLECTED BLIGHT",
            });
          } else {
            set(blight, (current) => current + 1);

            deltaStamina.push({
              color: "text-danger",
              value: "BLIGHTED",
            });
          }
        }

        // If poisoning occurs, check if has been deflected, otherwise apply poison.
        if (Math.random() <= get(monsterPoisonChance)) {
          const hasDeflected = get(skills("armorcraft")) && Math.random() <= get(deflection);

          if (hasDeflected) {
            deltaHealth.push({
              color: "text-success",
              value: "DEFLECTED POISON",
            });
          } else {
            set(poisonDuration, get(monsterPoisonDuration));

            deltaHealth.push({
              color: "text-danger",
              value: "POISONED",
            });
          }
        }

        // The attack went through, apply damage and any stamina costs.
        changeHealth({ delta: deltaHealth, value: healthDamage });

        if (deltaStamina.length > 0) {
          set(deltas("stamina"), deltaStamina);
        }
      },
    [changeHealth, changeMonsterHealth, changeStamina, increaseMastery]
  );
}
