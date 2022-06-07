import { atom } from "jotai";

import { isRecovering, statusElement } from "neverquest/state/character";
import { shield, weapon } from "neverquest/state/inventory";
import { deltaHealth, deltaHealthMonster } from "neverquest/state/deltas";
import {
  currentHealthMonster,
  isMonsterStaggered,
  monsterStatusElement,
  totalDamageMonster,
} from "neverquest/state/monster";
import { canAttack, canBlock, healthChange, staminaChange } from "neverquest/state/reserves";
import { showRecovery } from "neverquest/state/show";
import { totalBlockChance, totalDamage, totalProtection } from "neverquest/state/statistics";
import { AnimationSpeed, AnimationType, DeltaDisplay, FloatingTextType } from "neverquest/types/ui";
import { animateElement } from "neverquest/utilities/helpers";

// WRITERS

export const defense = atom(null, (get, set) => {
  animateElement({
    animation: AnimationType.HeadShake,
    element: get(statusElement),
    speed: AnimationSpeed.Fast,
  });

  if (get(canBlock) && Math.random() <= get(totalBlockChance)) {
    const { staminaCost } = get(shield);

    set(deltaHealth, {
      color: FloatingTextType.Neutral,
      value: "BLOCKED",
    });
    set(staminaChange, -staminaCost);
    set(isMonsterStaggered, true);
  } else {
    const totalProtectionValue = get(totalProtection);
    const healthDamage = (() => {
      const damage = totalProtectionValue - get(totalDamageMonster);

      return damage < 0 ? damage : 0;
    })();

    if (healthDamage < 0) {
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

      set(deltaHealth, deltaContents);
      set(healthChange, healthDamage);

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
      animation: AnimationType.HeadShake,
      element,
      speed: AnimationSpeed.Fast,
    });
  }
});
