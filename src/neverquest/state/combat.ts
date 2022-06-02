import { atom } from "jotai";

import { isRecovering, lootingRate, statusElement } from "neverquest/state/character";
import { gameOver } from "neverquest/state/global";
import { shield, weapon } from "neverquest/state/inventory";
import { deltaHealth, deltaHealthMonster, deltaStamina } from "neverquest/state/deltas";
import {
  currentHealthMonster,
  isMonsterStaggered,
  monsterStatusElement,
  totalDamageMonster,
} from "neverquest/state/monster";
import { canAttack, canBlock, currentHealth, currentStamina } from "neverquest/state/reserves";
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
    set(currentStamina, (current) => current - staminaCost);
    set(deltaStamina, {
      color: FloatingTextType.Negative,
      value: `${-staminaCost}`,
    });
    set(isMonsterStaggered, true);
  } else {
    const totalProtectionValue = get(totalProtection);
    const healthDamage = (() => {
      const damage = totalProtectionValue - get(totalDamageMonster);

      return damage < 0 ? damage : 0;
    })();
    const currentHealthValue = get(currentHealth);
    let health = currentHealthValue + healthDamage;

    if (health <= 0) {
      health = 0;
    }

    if (health !== currentHealthValue) {
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
      set(currentHealth, health);

      if (health === 0) {
        set(gameOver, true);
      } else {
        if (!get(showRecovery)) {
          set(showRecovery, true);
        }

        set(isRecovering, true);
      }
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
      set(currentStamina, (current) => current - staminaCost);
      set(deltaStamina, {
        color: FloatingTextType.Negative,
        value: `${-staminaCost}`,
      });
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

    if (monsterHealth === 0) {
      animateElement({
        animation: AnimationType.BlurOut,
        element,
        speed: get(lootingRate) - 800,
      });
    }
  }
});
