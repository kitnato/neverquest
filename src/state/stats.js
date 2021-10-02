import { atom } from "recoil";

export const attackRateBonus = atom({
  key: "attackRateBonus",
  default: {
    base: 0,
    description: "Increases rate of attack.",
    increment: 0.01,
    name: "Speed",
    points: 0,
  },
});

export const criticalChance = atom({
  key: "criticalChance",
  default: {
    base: 0,
    description: "Chance of landing a critical hit.",
    increment: 0.01,
    name: "Dexterity",
    points: 0,
  },
});

export const criticalDamage = atom({
  key: "criticalDamage",
  default: {
    base: 1,
    description: "Damage multiplier of a critical hit.",
    increment: 0.1,
    name: "Perception",
    points: 0,
  },
});

export const damage = atom({
  key: "damage",
  default: {
    base: 0,
    description: "Increases total damage of an attack.",
    increment: 1,
    name: "Strength",
    points: 0,
  },
});

export const dodgeChance = atom({
  key: "dodgeChance",
  default: {
    base: 0,
    description: "Chance to dodge a monster's attack.",
    increment: 0.01,
    name: "Agility",
    points: 0,
  },
});

export const health = atom({
  key: "health",
  default: {
    base: 10,
    description: "Maximum total health.",
    increment: 2,
    name: "Endurance",
    points: 0,
  },
});

export const healthRegenAmount = atom({
  key: "healthRegenAmount",
  default: {
    base: 1,
    costModifier: 1.5,
    description: "Health regeneration amount per rate tick.",
    increment: 1,
    name: "Vitality",
    points: 0,
  },
});

export const healthRegenRate = atom({
  key: "healthRegenRate",
  default: {
    base: 9000,
    description: "Health regeneration rate.",
    increment: -50,
    name: "Vigor",
    points: 0,
  },
});

export const lootBonus = atom({
  key: "lootBonus",
  default: {
    base: 0,
    description: "Increases the amount of loot dropped by monsters.",
    increment: 0.02,
    name: "Luck",
    points: 0,
  },
});

export const recoveryRate = atom({
  key: "recoveryRate",
  default: {
    base: 1000,
    description: "Rate of recovery after being hit.",
    increment: -10,
    name: "Resilience",
    points: 0,
  },
});

export const stamina = atom({
  key: "stamina",
  default: {
    base: 5,
    description: "Maximum total stamina.",
    increment: 1,
    name: "Stamina",
    points: 0,
  },
});

export const staminaRegenAmount = atom({
  key: "staminaRegenAmount",
  default: {
    base: 1,
    costModifier: 1.5,
    description: "Stamina regeneration amount.",
    increment: 1,
    name: "Fortitude",
    points: 0,
  },
});

export const staminaRegenRate = atom({
  key: "staminaRegenRate",
  default: {
    base: 3500,
    description: "Stamina regeneration rate.",
    increment: -50,
    name: "Endurance",
    points: 0,
  },
});
