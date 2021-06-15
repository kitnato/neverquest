import { selector } from "recoil";

import {
  damageTaken,
  endurance,
  strength,
  weapon,
} from "state/character/atoms";

export const maxHP = selector({
  key: "maxHP",
  get: ({ get }) => {
    const enduranceValue = get(endurance);

    return enduranceValue.value * 2;
  },
});

export const hitpoints = selector({
  key: "hitpoints",
  get: ({ get }) => {
    const maxHPValue = get(maxHP);
    const damageTakenValue = get(damageTaken);

    return maxHPValue - damageTakenValue;
  },
});

export const damagePerHit = selector({
  key: "damagePerHit",
  get: ({ get }) => {
    const strengthValue = get(strength);
    const weaponValue = get(weapon);

    return {
      min: weaponValue.damage.min + strengthValue.value,
      max: weaponValue.damage.max + strengthValue.value,
    };
  },
});
