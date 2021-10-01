import { atom } from "recoil";

export const attackSpeedBonus = atom({
  key: "attackSpeedBonus",
  default: {
    current: 0,
    increment: 0.01,
    max: 0,
  },
});

export const criticalChance = atom({
  key: "criticalChance",
  default: {
    current: 0,
    increment: 0.01,
    max: 0,
  },
});

export const criticalDamage = atom({
  key: "criticalDamage",
  default: {
    current: 1,
    increment: 0.1,
    max: 0,
  },
});

export const damage = atom({
  key: "damage",
  default: {
    current: 1,
    increment: 1,
    max: 1,
  },
});

export const dodge = atom({
  key: "dodge",
  default: {
    current: 0,
    increment: 0.01,
    max: 0,
  },
});

export const health = atom({
  key: "health",
  default: {
    current: 8,
    increment: 2,
    max: 8,
  },
});

export const healthRegenAmount = atom({
  key: "healthRegenAmount",
  default: {
    current: 1,
    increment: 1,
    max: 1,
  },
});

export const healthRegenRate = atom({
  key: "healthRegenRate",
  default: {
    current: 8000,
    increment: -50,
    max: 8000,
  },
});

export const recoveryTime = atom({
  key: "recoveryTime",
  default: {
    current: 1000,
    increment: -10,
    max: 1000,
  },
});

export const stamina = atom({
  key: "stamina",
  default: {
    current: 5,
    increment: 1,
    max: 5,
  },
});

export const staminaRegenAmount = atom({
  key: "staminaRegenAmount",
  default: {
    current: 1,
    increment: 1,
    max: 1,
  },
});

export const staminaRegenRate = atom({
  key: "staminaRegenRate",
  default: {
    current: 3000,
    increment: -50,
    max: 3000,
  },
});
