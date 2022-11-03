import { selector } from "recoil";

import { healthChange, staminaChange } from "./reserves";
import { BLEED_DURATION } from "@neverquest/constants/attributes";
import { isRecovering, statusElement } from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import { shield, weapon } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import {
  currentHealthMonster,
  isMonsterStaggered,
  monsterBleedingDuration,
  monsterStatusElement,
  totalDamageMonster,
} from "@neverquest/state/monster";
import { canAttack, canBlock } from "@neverquest/state/reserves";
import { skills } from "@neverquest/state/skills";
import {
  totalBleedChance,
  totalBlockChance,
  totalDamage,
  totalDodgeChance,
  totalParryChance,
  totalProtection,
} from "@neverquest/state/statistics";
import { DeltaType, ShowingType, SkillType } from "@neverquest/types/enums";
import { AnimationSpeed, AnimationType, DeltaDisplay, FloatingText } from "@neverquest/types/ui";
import { animateElement } from "@neverquest/utilities/helpers";

export const defense = selector({
  get: () => null,
  key: "defense",
  set: ({ get, set }) => {
    animateElement({
      element: get(statusElement),
      speed: AnimationSpeed.Fast,
      type: AnimationType.HeadShake,
    });

    const deltaHealth = deltas(DeltaType.Health);
    const hasDodged = get(skills(SkillType.Dodge)) && Math.random() <= get(totalDodgeChance);

    if (hasDodged) {
      set(deltaHealth, {
        color: FloatingText.Neutral,
        value: "DODGED",
      });

      return;
    }

    const totalProtectionValue = get(totalProtection);
    const monsterDamage = get(totalDamageMonster);
    const healthDamage = (() => {
      const damage = totalProtectionValue - monsterDamage;

      return damage < 0 ? damage : 0;
    })();

    if (healthDamage === 0) {
      set(deltaHealth, {
        color: FloatingText.Neutral,
        value: healthDamage,
      });

      return;
    }

    const hasBlocked = Math.random() <= get(totalBlockChance);

    if (hasBlocked) {
      const canBlockValue = get(canBlock);
      const { staminaCost } = get(shield);

      if (canBlockValue) {
        set(deltaHealth, {
          color: FloatingText.Neutral,
          value: "BLOCKED",
        });
        set(staminaChange, { value: -staminaCost });

        if (get(skills(SkillType.Stagger))) {
          set(isMonsterStaggered, true);
        }

        return;
      } else {
        set(deltas(DeltaType.Stamina), [
          {
            color: FloatingText.Neutral,
            value: "CANNOT BLOCK",
          },
          {
            color: FloatingText.Negative,
            value: ` (${staminaCost})`,
          },
        ]);
      }
    }

    const hasParried = get(skills(SkillType.Parry)) && Math.random() <= get(totalParryChance);

    if (!hasBlocked && hasParried) {
      const parryDamage = Math.floor(monsterDamage / 2);
      const monsterHealth = get(currentHealthMonster) - parryDamage;

      set(currentHealthMonster, monsterHealth);
      set(deltas(DeltaType.HealthMonster), [
        {
          color: FloatingText.Neutral,
          value: "PARRIED",
        },
        {
          color: FloatingText.Negative,
          value: ` (${parryDamage})`,
        },
      ]);

      animateElement({
        element: get(monsterStatusElement),
        speed: AnimationSpeed.Fast,
        type: AnimationType.HeadShake,
      });
    }

    let deltaHealthOverride: DeltaDisplay | undefined;

    if (totalProtectionValue > 0) {
      deltaHealthOverride = [
        {
          color: FloatingText.Negative,
          value: healthDamage,
        },
        {
          color: FloatingText.Neutral,
          value: ` (${totalProtectionValue})`,
        },
      ];
    }

    set(healthChange, { delta: deltaHealthOverride, value: healthDamage });

    if (!get(isShowing(ShowingType.Recovery))) {
      set(isShowing(ShowingType.Recovery), true);
    }

    set(isRecovering, true);
  },
});

export const offense = selector({
  get: () => null,
  key: "offense",
  set: ({ get, set }) => {
    const { staminaCost } = get(weapon);

    if (get(canAttack)) {
      const totalDamageValue = get(totalDamage);
      const hasInflictedBleed =
        get(monsterBleedingDuration) === 0 &&
        get(skills(SkillType.Bleed)) &&
        Math.random() <= get(totalBleedChance);

      let monsterHealth = get(currentHealthMonster) - totalDamageValue;

      if (monsterHealth < 0) {
        monsterHealth = 0;
      }

      if (staminaCost > 0) {
        set(staminaChange, { value: -staminaCost });
      }

      set(currentHealthMonster, monsterHealth);
      set(deltas(DeltaType.HealthMonster), {
        color: FloatingText.Negative,
        value: -totalDamageValue,
      });

      if (hasInflictedBleed) {
        set(monsterBleedingDuration, BLEED_DURATION);
      }

      animateElement({
        element: get(monsterStatusElement),
        speed: AnimationSpeed.Fast,
        type: AnimationType.HeadShake,
      });
    } else {
      set(deltas(DeltaType.Stamina), [
        {
          color: FloatingText.Neutral,
          value: "CANNOT ATTACK",
        },
        {
          color: FloatingText.Negative,
          value: ` (${staminaCost})`,
        },
      ]);
    }
  },
});
