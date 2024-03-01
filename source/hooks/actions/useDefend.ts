import { useRecoilCallback } from "recoil";

import { TEARS_MAXIMUM } from "@neverquest/data/items";
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
import { ownedItem } from "@neverquest/state/inventory";
import { tears } from "@neverquest/state/items";
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
import { blight, isPoisoned, poisonDuration, poisonLength } from "@neverquest/state/reserves";
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
import { isShowing } from "@neverquest/state/ui";
import { isUnshielded } from "@neverquest/types/type-guards";
import type { DeltaDisplay } from "@neverquest/types/ui";
import { ELEMENTAL_TYPES } from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";
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

        const { burden: armorBurden } = get(armor);
        const deltaHealth: DeltaDisplay[] = [];
        const deltaStamina: DeltaDisplay[] = [];
        const incursArmorBurden = !get(isTraitAcquired("stalwart")) && armorBurden > 0;
        const ownedItemLacrimatory = get(ownedItem("lacrimatory"));
        const canGatherTears = ownedItemLacrimatory !== undefined && get(tears) < TEARS_MAXIMUM;
        const shieldValue = get(shield);
        const statusElementValue = get(statusElement);

        let hasStaggered = false;
        let isAvoided = false;

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

          isAvoided = true;
        }

        // If attack is dodged, all damage is avoided.
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
              changeStamina({ value: -armorBurden });
            }

            isAvoided = true;
          } else {
            deltaStamina.push(
              {
                color: "text-muted",
                value: "CANNOT DODGE",
              },
              {
                color: "text-danger",
                value: `(${armorBurden})`,
              },
            );

            progressQuest({ quest: "exhausting" });
          }
        }

        if (!isAvoided) {
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

          // If parrying occurs, check if possible (burden is not applied).
          if (hasParried) {
            if (get(canAttackOrParry)) {
              const reflectedDamage = Math.round(monsterDamageAilingValue * get(parryDamage));

              healthDamage -= Math.round(healthDamage * get(parryAbsorption));
              monsterHealthDamage += reflectedDamage;

              progressQuest({ quest: "parrying" });

              deltaMonsterHealth.push(
                {
                  color: "text-muted",
                  value: "PARRY",
                },
                {
                  color: "text-danger",
                  value: `-${formatNumber({ value: reflectedDamage })}`,
                },
              );

              deltaHealth.push(
                {
                  color: "text-muted",
                  value: "PARRIED",
                },
                {
                  color: "text-danger",
                  value: `-${formatNumber({ value: healthDamage })}`,
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
            const { burden: shieldBurden } = shieldValue;

            if (get(canBlock)) {
              healthDamage = 0;

              deltaHealth.push({
                color: "text-muted",
                value: "BLOCKED",
              });

              changeStamina({ value: -shieldBurden });
              progressQuest({ quest: "blocking" });

              if (Math.random() <= get(staggerChance)) {
                set(monsterAilmentDuration("staggered"), get(masteryStatistic("stability")));

                progressQuest({ quest: "staggering" });

                changeMonsterHealth({
                  contents: {
                    color: "text-muted",
                    value: "STAGGER",
                  },
                  value: 0,
                });

                hasStaggered = true;
              }
            } else {
              deltaStamina.push(
                {
                  color: "text-muted",
                  value: "CANNOT BLOCK",
                },
                {
                  color: "text-danger",
                  value: `(${shieldBurden})`,
                },
              );

              progressQuest({ quest: "exhausting" });
            }
          }

          // If neither dodged, parried nor blocked, show damage with protection and increase resilience.
          if (!hasBlocked && !hasParried) {
            deltaHealth.push({
              color: "text-danger",
              value: `-${formatNumber({ value: healthDamage })}`,
            });

            if (protectionValue > 0) {
              deltaHealth.push({
                color: "text-muted",
                // In the case of 0 health damage, show only inflicted damage.
                value: `(${formatNumber({
                  value: Math.min(protectionValue, monsterDamageAilingValue),
                })})`,
              });
            }

            if (incursArmorBurden) {
              changeStamina({ value: -armorBurden });
            }
          }

          // If already poisoned, check if blighting has occurred and if it's been deflected.
          if (get(isPoisoned) && Math.random() <= get(blightChance)) {
            if (Math.random() <= deflectionChanceValue) {
              progressQuest({ quest: "deflecting" });

              deltaStamina.push({
                color: "text-success",
                value: "DEFLECTED BLIGHT",
              });
            } else {
              if (canGatherTears) {
                set(tears, (currentTears) => currentTears + 1);
              }

              progressQuest({ quest: "blighting" });

              set(blight, (currentBlight) => currentBlight + 1);

              deltaStamina.push({
                color: "text-muted",
                value: "BLIGHTED",
              });
            }
          }

          // If poisoning occurs, check if has been deflected, otherwise apply poisonDuration.
          if (Math.random() <= get(poisonChance)) {
            if (Math.random() <= deflectionChanceValue) {
              progressQuest({ quest: "deflecting" });

              deltaHealth.push({
                color: "text-success",
                value: "DEFLECTED POISON",
              });
            } else {
              if (canGatherTears) {
                set(tears, (currentTears) => currentTears + 1);
              }

              progressQuest({ quest: "poisoning" });

              set(poisonDuration, get(poisonLength));

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
                value: `-${formatNumber({ value: thornsValue })}`,
              },
            );
          }

          if (!hasBlocked) {
            if (healthDamage > 0) {
              trainMastery("resilience");
            }

            if (!hasParried) {
              set(isShowing("recovery"), true);
              set(recoveryDuration, get(recoveryRate));
            }
          }

          if (!isUnshielded(shieldValue) && healthDamage > 0) {
            trainMastery("stability");
          }

          // Take any damage and show any stamina costs.
          changeHealth({ contents: deltaHealth, value: -healthDamage });

          addDelta({
            contents: deltaStamina,
            delta: "stamina",
          });

          // Inflict any armor elemental effects.
          for (const elemental of ELEMENTAL_TYPES) {
            inflictElementalAilment({ elemental, slot: "armor" });
          }

          // Inflict any parry and/or thorns damage.
          if (monsterHealthDamage > 0) {
            changeMonsterHealth({
              contents: deltaMonsterHealth,
              damageType: hasInflictedThorns ? "thorns" : hasParried ? "parry" : undefined,
              value: -monsterHealthDamage,
            });
          }

          if (hasStaggered || monsterHealthDamage > 0) {
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
