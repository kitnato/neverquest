import { atom } from "jotai";

import { isRecovering, statusElement } from "@neverquest/state/character";
import { shield, weapon } from "@neverquest/state/inventory";
import { deltaHealth, deltaHealthMonster, deltaStamina } from "@neverquest/state/deltas";
import {
  currentHealthMonster,
  isMonsterStaggered,
  monsterStatusElement,
  totalDamageMonster,
} from "@neverquest/state/monster";
import { canAttack, canBlock, healthChange, staminaChange } from "@neverquest/state/reserves";
import { showRecovery } from "@neverquest/state/show";
import { totalBlockChance, totalDamage, totalProtection } from "@neverquest/state/statistics";
import {
  AnimationSpeed,
  AnimationType,
  DeltaDisplay,
  FloatingTextType,
} from "@neverquest/types/ui";
import { animateElement } from "@neverquest/utilities/helpers";

// WRITERS

export const defense = atom(null, async (get, set) => {
  const totalProtectionValue = get(totalProtection);
  const healthDamage = (() => {
    const damage = totalProtectionValue - get(totalDamageMonster);

    return damage < 0 ? damage : 0;
  })();

  await animateElement({
    element: get(statusElement),
    speed: AnimationSpeed.Fast,
    type: AnimationType.HeadShake,
  });

  if (healthDamage === 0) {
    set(deltaHealth, {
      color: FloatingTextType.Neutral,
      value: "0",
    });
  } else {
    const canBlockValue = get(canBlock);
    const hasBlocked = Math.random() <= get(totalBlockChance);

    if (hasBlocked) {
      const { staminaCost } = get(shield);

      if (canBlockValue) {
        set(deltaHealth, {
          color: FloatingTextType.Neutral,
          value: "BLOCKED",
        });
        set(staminaChange, -staminaCost);
        set(isMonsterStaggered, true);
      } else {
        set(deltaStamina, [
          {
            color: FloatingTextType.Neutral,
            value: "CANNOT BLOCK",
          },
          {
            color: FloatingTextType.Negative,
            value: ` (${staminaCost})`,
          },
        ]);
      }
    } else {
      let deltaContents: DeltaDisplay = {
        color: FloatingTextType.Negative,
        value: `${healthDamage}`,
      };

      if (totalProtectionValue > 0) {
        deltaContents = [
          deltaContents,
          {
            color: FloatingTextType.Neutral,
            value: ` (${totalProtectionValue})`,
          },
        ];
      }

      set(healthChange, { delta: healthDamage, deltaContents });

      if (!get(showRecovery)) {
        set(showRecovery, true);
      }

      set(isRecovering, true);
    }
  }
});

export const offense = atom(null, async (get, set) => {
  const { staminaCost } = get(weapon);

  if (get(canAttack)) {
    const element = get(monsterStatusElement);
    const totalDamageValue = get(totalDamage);
    let monsterHealth = get(currentHealthMonster) - totalDamageValue;

    if (monsterHealth < 0) {
      monsterHealth = 0;
    }

    if (staminaCost > 0) {
      set(staminaChange, -staminaCost);
    }

    set(currentHealthMonster, monsterHealth);
    set(deltaHealthMonster, {
      color: FloatingTextType.Negative,
      value: `${-totalDamageValue}`,
    });

    await animateElement({
      element,
      speed: AnimationSpeed.Fast,
      type: AnimationType.HeadShake,
    });
  } else {
    set(deltaStamina, [
      {
        color: FloatingTextType.Neutral,
        value: "CANNOT ATTACK",
      },
      {
        color: FloatingTextType.Negative,
        value: ` (${staminaCost})`,
      },
    ]);
  }
});
