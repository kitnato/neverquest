import { useRecoilCallback } from "recoil";

import { AILMENT_PENALTY } from "@neverquest/data/statistics";
import { useAddDelta } from "@neverquest/hooks/actions/useAddDelta";
import { useChangeHealth } from "@neverquest/hooks/actions/useChangeHealth";
import { useChangeMonsterHealth } from "@neverquest/hooks/actions/useChangeMonsterHealth";
import { useChangeStamina } from "@neverquest/hooks/actions/useChangeStamina";
import { useInflictElementalAilment } from "@neverquest/hooks/actions/useInflictElementalAilment";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { useTrainMastery } from "@neverquest/hooks/actions/useTrainMastery";
import { staggerChance } from "@neverquest/state/ailments";
import {
  canAttackOrParry,
  canBlock,
  canDodge,
  isAttacking,
  recoveryDuration,
  statusElement,
} from "@neverquest/state/character";
import { armor, shield, weapon } from "@neverquest/state/gear";
import { isShowing } from "@neverquest/state/isShowing";
import { masteryStatistic } from "@neverquest/state/masteries";
import {
  blightChance,
  isMonsterAiling,
  monsterAilmentDuration,
  monsterAttackDuration,
  monsterAttackRate,
  monsterDamageAiling,
  monsterElement,
  poisonChance,
} from "@neverquest/state/monster";
import { blight, isPoisoned, poison, poisonDuration } from "@neverquest/state/reserves";
import {
  blockChance,
  deflectionChance,
  dodgeChance,
  parryAbsorption,
  parryChance,
  parryDamage,
  protection,
  recoveryRate,
  thorns,
} from "@neverquest/state/statistics";
import { isTraitAcquired } from "@neverquest/state/traits";
import type { DeltaDisplay } from "@neverquest/types/ui";
import { ELEMENTAL_TYPES } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";
import { animateElement } from "@neverquest/utilities/helpers";

export function useDefend() {
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

        set(isShowing("monsterOffense"), true);

        const { burden } = get(armor);
        const deltaHealth: DeltaDisplay[] = [];
        const deltaStamina: DeltaDisplay[] = [];
        const incursArmorBurden = !get(isTraitAcquired("stalwart")) && burden > 0;
        const statusElementValue = get(statusElement);

        let isNegated = false;

        if (statusElementValue !== null) {
          animateElement({
            animation: "headShake",
            element: statusElementValue,
            speed: "fast",
          });
        }

        // If stunned, check if hit connects at all.
        if (get(isMonsterAiling("stunned")) && Math.random() <= AILMENT_PENALTY.stunned) {
          addDelta({
            contents: {
              color: "text-muted",
              value: "MISS",
            },
            delta: "health",
          });

          isNegated = true;
        }

        // If attack is dodged, all damage is negated.
        if (Math.random() <= get(dodgeChance)) {
          if (get(canDodge)) {
            progressQuest({ quest: "dodging" });

            addDelta({
              contents: {
                color: "text-muted",
                value: "DODGED",
              },
              delta: "health",
            });

            if (incursArmorBurden) {
              changeStamina({ value: -burden });
            }

            isNegated = true;
          } else {
            deltaStamina.push(
              {
                color: "text-muted",
                value: "CANNOT DODGE",
              },
              {
                color: "text-danger",
                value: `(${burden})`,
              },
            );

            progressQuest({ quest: "exhausting" });
          }
        }

        if (!isNegated) {
          const hasParried = Math.random() <= get(parryChance);
          const hasBlocked = !hasParried && Math.random() <= get(blockChance);
          const thornsValue = get(thorns);
          const hasInflictedThorns = !hasBlocked && thornsValue > 0;

          const deflectionChanceValue = get(deflectionChance);
          const monsterDamageAilingValue = get(monsterDamageAiling);
          const protectionValue = get(protection);

          const deltaMonsterHealth: DeltaDisplay[] = [];
          const totalDamage = monsterDamageAilingValue - protectionValue;

          let healthDamage = totalDamage > 0 ? totalDamage : 0;
          let monsterHealthDamage = 0;

          // If parrying occurs, check & apply burden.
          if (hasParried) {
            if (get(canAttackOrParry)) {
              const parryReflected = Math.round(monsterDamageAilingValue * get(parryDamage));

              healthDamage += Math.round(healthDamage * get(parryAbsorption));
              monsterHealthDamage += parryReflected;

              progressQuest({ quest: "parrying" });

              deltaMonsterHealth.push(
                {
                  color: "text-muted",
                  value: "PARRY",
                },
                {
                  color: "text-danger",
                  value: `-${parryReflected}`,
                },
              );

              deltaHealth.push(
                {
                  color: "text-muted",
                  value: "PARRIED",
                },
                {
                  color: "text-danger",
                  value: -healthDamage,
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
                  value: `(${get(weapon).burden})`,
                },
              );

              progressQuest({ quest: "exhausting" });
            }
          }

          // If not parried and blocking occurs, check & apply burden.
          if (hasBlocked) {
            const { burden } = get(shield);

            if (get(canBlock)) {
              healthDamage = 0;

              progressQuest({ quest: "blocking" });

              deltaHealth.push({
                color: "text-muted",
                value: "BLOCKED",
              });

              changeStamina({ value: -burden });

              if (Math.random() <= get(staggerChance)) {
                set(monsterAilmentDuration("staggered"), get(masteryStatistic("stability")));

                progressQuest({ quest: "staggering" });

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
                  value: `(${burden})`,
                },
              );

              progressQuest({ quest: "exhausting" });
            }
          }

          // If neither dodged, parried nor blocked, show damage with protection and increase resilience.
          if (!hasBlocked && !hasParried) {
            deltaHealth.push({
              color: "text-danger",
              value: -healthDamage,
            });

            if (protectionValue > 0) {
              deltaHealth.push({
                color: "text-muted",
                // In the case of 0 health damage, show only inflicted.
                value: `(${Math.min(protectionValue, monsterDamageAilingValue)})`,
              });
            }

            if (incursArmorBurden) {
              changeStamina({ value: -burden });
            }
          }

          set(isShowing("recovery"), true);
          set(recoveryDuration, get(recoveryRate));

          // If already poisoned, check if blighting has occurred and if it's been deflected.
          if (get(isPoisoned) && Math.random() <= get(blightChance)) {
            if (Math.random() <= deflectionChanceValue) {
              progressQuest({ quest: "deflecting" });

              deltaStamina.push({
                color: "text-success",
                value: "DEFLECTED BLIGHT",
              });
            } else {
              progressQuest({ quest: "blighting" });

              set(blight, (currentBlight) => currentBlight + 1);

              deltaStamina.push({
                color: "text-muted",
                value: "BLIGHTED",
              });
            }
          }

          // If poisoning occurs, check if has been deflected, otherwise apply poison.
          if (Math.random() <= get(poisonChance)) {
            if (Math.random() <= deflectionChanceValue) {
              progressQuest({ quest: "deflecting" });

              deltaHealth.push({
                color: "text-success",
                value: "DEFLECTED POISON",
              });
            } else {
              progressQuest({ quest: "poisoning" });

              set(poison, get(poisonDuration));

              deltaHealth.push({
                color: "text-muted",
                value: "POISONED",
              });
            }
          }

          // Calculate & apply thorns damage.
          if (hasInflictedThorns) {
            progressQuest({ quest: "thorns" });

            monsterHealthDamage += thornsValue;

            deltaMonsterHealth.push(
              {
                color: "text-muted",
                value: "THORNS",
              },
              {
                color: "text-danger",
                value: -thornsValue,
              },
            );
          }

          // Take any damage and show any stamina costs.
          changeHealth({ delta: deltaHealth, value: -healthDamage });

          addDelta({
            contents: deltaStamina,
            delta: "stamina",
          });

          if (healthDamage > 0) {
            trainMastery("resilience");
          }

          trainMastery("stability");

          // Inflict any armor elemental effects.
          for (const elemental of ELEMENTAL_TYPES) {
            inflictElementalAilment({ elemental, slot: "armor" });
          }

          // Inflict any parry and/or thorns damage.
          if (monsterHealthDamage > 0) {
            changeMonsterHealth({
              damageType: hasInflictedThorns ? "thorns" : hasParried ? "parry" : undefined,
              delta: deltaMonsterHealth,
              value: -monsterHealthDamage,
            });

            const monsterElementValue = get(monsterElement);

            if (monsterElementValue !== null) {
              animateElement({
                animation: "headShake",
                element: monsterElementValue,
                speed: "fast",
              });
            }
          }
        }

        if (get(isAttacking) && get(monsterAttackDuration) === 0) {
          set(monsterAttackDuration, get(monsterAttackRate));
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
