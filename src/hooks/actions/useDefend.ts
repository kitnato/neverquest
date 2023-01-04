import { useRecoilCallback } from "recoil";

import useChangeHealth from "@neverquest/hooks/actions/useChangeHealth";
import useChangeStamina from "@neverquest/hooks/actions/useChangeStamina";
import useIncreaseMastery from "@neverquest/hooks/actions/useIncreaseMastery";
import { isRecovering, statusElement } from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import { shield, weapon } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import {
  currentHealthMonster,
  damageMonster,
  isMonsterStaggered,
  monsterStatusElement,
} from "@neverquest/state/monster";
import { canAttackOrParry, canBlock } from "@neverquest/state/reserves";
import { skills } from "@neverquest/state/skills";
import {
  blockChance,
  dodgeChance,
  freeBlockChance,
  parryAbsorption,
  parryChance,
  parryDamage,
  protection,
  skipRecoveryChance,
} from "@neverquest/state/statistics";
import { DeltaType, MasteryType, ShowingType, SkillType } from "@neverquest/types/enums";
import { AnimationSpeed, AnimationType, DeltaDisplay, FloatingText } from "@neverquest/types/ui";
import animateElement from "@neverquest/utilities/animateElement";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

/**
 * If dodged, no other actions taken (all damage negated)
 * If health damage (protection minus monster damage) is 0 or less, no other actions taken
 * If parrying occurs, check stamina cost, and continue
 * If not parried and blocking occurs, check stamina cost, and continue
 * If blocking occurs, check if monster is staggered
 * If not parried and not blocked, set recovery, and continue
 * Process health & stamina deltas
 */
export default function () {
  const changeHealth = useChangeHealth();
  const changeStamina = useChangeStamina();
  const increaseMastery = useIncreaseMastery();

  return useRecoilCallback(({ set, snapshot }) => () => {
    const get = getSnapshotGetter(snapshot);

    animateElement({
      element: get(statusElement),
      speed: AnimationSpeed.Fast,
      type: AnimationType.HeadShake,
    });

    const hasDodged = get(skills(SkillType.Dodge)) && Math.random() <= get(dodgeChance);

    if (hasDodged) {
      set(deltas(DeltaType.Health), {
        color: FloatingText.Neutral,
        value: "DODGED",
      });

      return;
    }

    const damageMonsterValue = get(damageMonster);
    let healthDamage = (() => {
      const damage = get(protection) - damageMonsterValue;

      return damage < 0 ? damage : 0;
    })();

    if (healthDamage === 0) {
      set(deltas(DeltaType.Health), {
        color: FloatingText.Neutral,
        value: healthDamage,
      });

      return;
    }

    let deltaHealth: DeltaDisplay | undefined;
    let deltaStamina: DeltaDisplay | undefined;

    const hasParried = get(skills(SkillType.Parry)) && Math.random() <= get(parryChance);

    if (hasParried) {
      const { staminaCost } = get(weapon);

      if (get(canAttackOrParry)) {
        healthDamage = Math.floor(healthDamage * get(parryAbsorption));
        const parryReflected = Math.floor(damageMonsterValue * get(parryDamage));

        set(currentHealthMonster, (current) => current - parryReflected);
        set(deltas(DeltaType.HealthMonster), [
          {
            color: FloatingText.Negative,
            value: "PARRIED",
          },
          {
            color: FloatingText.Negative,
            value: ` (${parryReflected})`,
          },
        ]);

        deltaHealth = [
          {
            color: FloatingText.Neutral,
            value: "PARRIED",
          },
          {
            color: FloatingText.Negative,
            value: ` (${healthDamage})`,
          },
        ];

        changeStamina({ value: -staminaCost });
        increaseMastery(MasteryType.ParryDamage);

        animateElement({
          element: get(monsterStatusElement),
          speed: AnimationSpeed.Fast,
          type: AnimationType.HeadShake,
        });
      } else {
        deltaStamina = [
          {
            color: FloatingText.Neutral,
            value: "CANNOT PARRY",
          },
          {
            color: FloatingText.Negative,
            value: ` (${staminaCost})`,
          },
        ];
      }
    }

    const hasBlocked = Math.random() <= get(blockChance);

    if (hasBlocked && !hasParried) {
      const { staminaCost } = get(shield);

      if (get(canBlock)) {
        healthDamage = 0;

        const hasStaggered =
          get(skills(SkillType.Stagger)) && Math.random() <= get(shield).staggerChance;
        const shieldsSkill = get(skills(SkillType.Shields));
        const isFreeBlock = shieldsSkill && Math.random() <= get(freeBlockChance);

        deltaHealth = {
          color: FloatingText.Neutral,
          value: "BLOCKED",
        };

        if (shieldsSkill) {
          increaseMastery(MasteryType.FreeBlockChance);
        }

        if (isFreeBlock) {
          deltaStamina = {
            color: FloatingText.Neutral,
            value: "OBSTINATE",
          };
        } else {
          changeStamina({ value: -staminaCost });
        }

        if (hasStaggered) {
          set(isMonsterStaggered, true);
        }
      } else {
        deltaStamina = [
          {
            color: FloatingText.Neutral,
            value: "CANNOT BLOCK",
          },
          {
            color: FloatingText.Negative,
            value: ` (${staminaCost})`,
          },
        ];
      }
    }

    if (!hasBlocked && !hasParried) {
      if (get(protection) > 0) {
        deltaHealth = [
          {
            color: FloatingText.Negative,
            value: healthDamage,
          },
          {
            color: FloatingText.Neutral,
            value: ` (${get(protection)})`,
          },
        ];
      }
    }

    const armorsSkill = get(skills(SkillType.Armors));
    const hasSkippedRecovery = armorsSkill && Math.random() <= get(skipRecoveryChance);

    if (armorsSkill) {
      increaseMastery(MasteryType.SkipRecoveryChance);
    }

    if (!hasSkippedRecovery) {
      if (!get(isShowing(ShowingType.Recovery))) {
        set(isShowing(ShowingType.Recovery), true);
      }

      set(isRecovering, true);
    }

    changeHealth({ delta: deltaHealth, value: healthDamage });

    if (deltaStamina) {
      set(deltas(DeltaType.Stamina), deltaStamina);
    }
  });
}
