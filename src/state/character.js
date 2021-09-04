import { atom, selector } from "recoil";

import { armor, shield, weapon } from "state/equipment";
import { gameOver } from "state/global";
import { attackSpeedBonus, damage, health, stamina } from "state/stats";
import { getFromRange } from "utilities/helpers";

// ATOMS

export const characterLevel = atom({
  key: "characterLevel",
  default: 0,
});

export const damageDealt = atom({
  key: "damageDealt",
  default: 0,
});

export const damageTaken = atom({
  key: "damageTaken",
  default: 0,
});

export const experience = atom({
  key: "experience",
  default: 0,
});

export const isAttacking = atom({
  key: "isAttacking",
  default: false,
});

export const name = atom({
  key: "name",
  default: "???",
});

// SELECTORS

export const attack = selector({
  key: "attack",
  set: ({ get, set }) => {
    const staminaValue = get(stamina);
    const dphValue = get(damagePerHit);
    let newStamina = staminaValue.current - get(weapon).cost;

    if (newStamina >= 0) {
      set(damageDealt, getFromRange(dphValue));
    }

    if (newStamina < 0) {
      newStamina = 0;
      set(isAttacking, false);
    }

    if (newStamina > staminaValue.max) {
      newStamina = staminaValue.max;
    }

    set(stamina, { ...staminaValue, current: newStamina });
  },
});

export const attackSpeed = selector({
  key: "attackSpeed",
  get: ({ get }) => {
    const attackSpeedBonusValue = get(attackSpeedBonus);
    const weaponValue = get(weapon);

    return weaponValue.speed * (1 - attackSpeedBonusValue.current);
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

export const defend = selector({
  key: "defend",
  set: ({ get, set }, incomingDamage) => {
    const totalArmorValue = get(totalArmor);
    const healthValue = get(health);
    let newHealth = healthValue.current + totalArmorValue - incomingDamage;

    if (newHealth <= 0) {
      newHealth = 0;
      set(gameOver, true);
    }

    set(health, { ...healthValue, current: newHealth });
  },
});

export const totalArmor = selector({
  key: "totalArmor",
  get: ({ get }) => {
    const armorValue = get(armor);
    const shieldValue = get(shield);

    return armorValue.value + shieldValue.armor;
  },
});
