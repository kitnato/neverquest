import { selector } from "recoil";

import {
  baseDamage,
  attackSpeedReduction,
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
    const baseDamageValue = get(baseDamage);
    const weaponValue = get(weapon);

    return {
      min: weaponValue.damage.minimum + baseDamageValue.current,
      max: weaponValue.damage.maximum + baseDamageValue.current,
    };
  },
});
