import { useRecoilCallback } from "recoil";

import { POISON } from "@neverquest/data/statistics";
import { useChangeHealth } from "@neverquest/hooks/actions/useChangeHealth";
import { useChangeMonsterHealth } from "@neverquest/hooks/actions/useChangeMonsterHealth";
import { useChangeStamina } from "@neverquest/hooks/actions/useChangeStamina";
import { useIncreaseMastery } from "@neverquest/hooks/actions/useIncreaseMastery";
import { poisonDuration, recoveryDuration, statusElement } from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import { armor, shield, weapon } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import {
  monsterDamage,
  monsterElement,
  monsterPoison,
  monsterStaggeredDuration,
} from "@neverquest/state/monster";
import { canAttackOrParry, canBlock, canDodge, staminaDebuff } from "@neverquest/state/reserves";
import { skills } from "@neverquest/state/skills";
import {
  block,
  deflection,
  dodgeTotal,
  parry,
  parryAbsorption,
  parryDamage,
  protection,
  recoveryRate,
  stability,
  staggerDuration,
  tenacity,
} from "@neverquest/state/statistics";
import { Delta, Mastery, Showing, Skill } from "@neverquest/types/enums";
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

        if (!get(isShowing(Showing.MonsterDamage))) {
          set(isShowing(Showing.MonsterDamage), true);
        }

        animateElement({
          element: get(statusElement),
          speed: "fast",
          type: "headShake",
        });

        const hasDodged = get(skills(Skill.Evasion)) && Math.random() <= get(dodgeTotal);

        // If attack is dodged, nothing else happens (all damage is negated).
        if (hasDodged) {
          if (get(canDodge)) {
            set(deltas(Delta.Health), {
              color: "text-muted",
              value: "DODGED",
            });

            return;
          } else {
            set(deltas(Delta.Health), {
              color: "text-muted",
              value: `CANNOT DODGE (${get(armor).staminaCost})`,
            });
          }
        }

        // If health damage (protection minus monster damage) is 0 or less, nothing else happens.
        const monsterDamageValue = get(monsterDamage);
        let healthDamage = (() => {
          const damage = get(protection) - monsterDamageValue;

          return damage < 0 ? damage : 0;
        })();

        if (healthDamage === 0) {
          set(deltas(Delta.Health), {
            color: "text-muted",
            value: healthDamage,
          });

          return;
        }

        let deltaHealth: DeltaDisplay = [];
        let deltaStamina: DeltaDisplay = [];

        const hasParried = get(skills(Skill.Escrime)) && Math.random() <= get(parry);

        // If parrying occurs, check & apply stamina cost.
        if (hasParried) {
          const { staminaCost } = get(weapon);

          if (get(canAttackOrParry)) {
            healthDamage = Math.floor(healthDamage * get(parryAbsorption));

            const parryReflected = -Math.floor(monsterDamageValue * get(parryDamage));

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
            increaseMastery(Mastery.Finesse);

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

            const hasStaggered =
              get(skills(Skill.Traumatology)) && Math.random() <= get(shield).stagger;
            const shieldsSkill = get(skills(Skill.Shieldcraft));
            const isFreeBlock = shieldsSkill && Math.random() <= get(stability);

            deltaHealth = [
              {
                color: "text-muted",
                value: "BLOCKED",
              },
            ];

            if (shieldsSkill) {
              increaseMastery(Mastery.Stability);
            }

            if (isFreeBlock) {
              deltaStamina.push({
                color: "text-muted",
                value: "STABILIZED",
              });
            } else {
              changeStamina({ value: -staminaCost });
            }

            // Blocking has occurred, check if monster is staggered.
            if (hasStaggered) {
              set(monsterStaggeredDuration, get(staggerDuration));
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

        // If neither parried nor blocked, show damage.
        if (!hasBlocked && !hasParried) {
          if (get(protection) > 0) {
            deltaHealth = [
              {
                color: "text-danger",
                value: healthDamage,
              },
              {
                color: "text-muted",
                value: ` (${get(protection)})`,
              },
            ];
          }
        }

        const armorsSkill = get(skills(Skill.Armorcraft));
        const hasSkippedRecovery = armorsSkill && Math.random() <= get(tenacity);

        // If Tenacity isn't available or hasn't been triggered, activate recovery.
        if (!hasSkippedRecovery) {
          if (!get(isShowing(Showing.Recovery))) {
            set(isShowing(Showing.Recovery), true);
          }

          set(recoveryDuration, get(recoveryRate));
        }

        // Increment Armorcraft mastery (if applicable).
        if (armorsSkill) {
          increaseMastery(Mastery.Tenacity);
        }

        const isPoisoned = Math.random() <= get(monsterPoison);

        // If poisoning occurs, check if it can and has been deflected, otherwise apply poison - if there is an active poisoning, increment blight instead.
        if (isPoisoned) {
          const hasDeflected = get(skills(Skill.Armorcraft)) && Math.random() <= get(deflection);

          if (hasDeflected) {
            deltaHealth.push({
              color: "text-success",
              value: "DEFLECTED POISON",
            });
          } else {
            if (get(poisonDuration) > 0) {
              set(staminaDebuff, (current) => current + 1);

              deltaStamina.push({
                color: "text-danger",
                value: "BLIGHTED",
              });
            } else {
              set(poisonDuration, POISON.duration);

              deltaHealth.push({
                color: "text-danger",
                value: "POISONED",
              });
            }
          }
        }

        // The attack went through, apply damage and any stamina costs.
        changeHealth({ delta: deltaHealth, value: healthDamage });

        if (deltaStamina.length > 0) {
          set(deltas(Delta.Stamina), deltaStamina);
        }
      },
    [changeHealth, changeMonsterHealth, changeStamina, increaseMastery]
  );
}
