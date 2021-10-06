import { atom, selector } from "recoil";

import { weapon } from "state/equipment";
import { gameOver } from "state/global";
import { currentStamina, currentHealth, maxStamina } from "state/resources";
import { totalArmor, totalDamage, totalPhysicalResistance } from "state/stats";
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
  default: {
    spent: 0,
    total: 0,
  },
});

export const isAttacking = atom({
  key: "isAttacking",
  default: false,
});

export const isRecovering = atom({
  key: "isRecovering",
  default: false,
});

export const name = atom({
  key: "name",
  default: "???",
});

// SELECTORS

// Actions

export const attack = selector({
  key: "attack",
  set: ({ get, set }) => {
    const currentStaminaValue = get(currentStamina);
    const maxStaminaValue = get(maxStamina);
    const dphValue = get(totalDamage);
    let newStamina = currentStaminaValue - get(weapon).cost;

    if (newStamina >= 0) {
      set(damageDealt, getFromRange(dphValue));
    }

    if (newStamina < 0) {
      newStamina = 0;
      set(isAttacking, false);
    }

    if (newStamina > maxStaminaValue) {
      newStamina = maxStaminaValue;
    }

    set(currentStamina, newStamina);
  },
});

export const defend = selector({
  key: "defend",
  set: ({ get, set }, incomingDamage) => {
    const healthValue = get(currentHealth);
    const totalArmorValue = get(totalArmor);
    const totalPhysicalResistanceValue = get(totalPhysicalResistance);
    const healthDamage = Math.abs(totalArmorValue - incomingDamage);
    let newHealth = healthValue - healthDamage;

    if (newHealth <= 0) {
      newHealth = 0;
      set(gameOver, true);
    }

    if (healthDamage > totalPhysicalResistanceValue) {
      set(isRecovering, true);
    }

    set(currentHealth, newHealth);
  },
});

// QUERIES

export const attributesAvailable = selector({
  key: "attributesAvailable",
  get: ({ get }) => {
    const attributeCostValue = get(attributeCost);
    const characterLevelValue = get(characterLevel);
    const experienceValue = get(experience);
    let available = 0;
    let cumulativeCost = attributeCostValue;
    let potentialLevel = characterLevelValue + 1;

    while (cumulativeCost <= experienceValue.total - experienceValue.spent) {
      cumulativeCost += 1 + potentialLevel;
      available += 1;
      potentialLevel += 1;
    }

    return available;
  },
});

export const attributeCost = selector({
  key: "attributeCost",
  get: ({ get }) => {
    const characterLevelValue = get(characterLevel);

    return 1 + characterLevelValue;
  },
});
