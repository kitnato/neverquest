import { selector } from "recoil";

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
      min: weaponValue.damage.minimum + damageValue.current,
      max: weaponValue.damage.maximum + damageValue.current,
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
    }

    if (newValue > healthValue.maximum) {
      newValue = healthValue.maximum;
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

    if (newValue > staminaValue.maximum) {
      newValue = staminaValue.maximum;
    }

    set(stamina, { ...staminaValue, current: newValue });
  },
});
