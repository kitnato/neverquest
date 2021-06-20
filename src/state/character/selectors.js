import { selector } from "recoil";

import { gameOver } from "state/atoms";
import {
  attackSpeedReduction,
  damage,
  health,
  stamina,
  weapon,
} from "state/character/atoms";

export const attackSpeed = selector({
  key: "attackSpeed",
  get: ({ get }) => {
    const attackSpeedReductionValue = get(attackSpeedReduction);
    const weaponValue = get(weapon);

    return weaponValue.speed * (1 + attackSpeedReductionValue.current);
  },
});

export const damagePerHit = selector({
  key: "damagePerHit",
  get: ({ get }) => {
    const damageValue = get(damage);
    const weaponValue = get(weapon);

    return {
      min: weaponValue.damage.min + damageValue.current,
      max: weaponValue.damage.max + damageValue.current,
    };
  },
});

export const currentHealth = selector({
  key: "currentHealth",
  get: ({ get }) => get(health).current,
  set: ({ get, set }, change) => {
    const healthValue = get(health);
    let newValue = healthValue.current + change;

    if (newValue < 0) {
      newValue = 0;
      set(gameOver, true);
    }

    if (newValue > healthValue.max) {
      newValue = healthValue.max;
    }

    set(health, { ...healthValue, current: healthValue.current + change });
  },
});

export const currentStamina = selector({
  key: "currentStamina",
  get: ({ get }) => {
    const staminaValue = get(stamina);

    return {
      current: staminaValue.current,
      canAttack: staminaValue.current - get(weapon).cost >= 0,
    };
  },
  set: ({ get, set }, change) => {
    const staminaValue = get(stamina);
    let newValue = staminaValue.current + change;

    if (newValue < 0) {
      newValue = 0;
    }

    if (newValue > staminaValue.max) {
      newValue = staminaValue.max;
    }

    set(stamina, { ...staminaValue, current: newValue });
  },
});
