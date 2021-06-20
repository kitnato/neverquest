import { atom } from "recoil";

export const name = atom({
  key: "name",
  default: "???",
});

export const health = atom({
  key: "health",
  default: {
    current: 8,
    max: 8,
    increment: 2,
  },
});

export const healthRegen = atom({
  key: "healthRegen",
  default: {
    rate: 5000,
    amount: 1,
    increment: 1,
  },
});

export const damage = atom({
  key: "damage",
  default: {
    current: 1,
    increment: 1,
  },
});

export const stamina = atom({
  key: "stamina",
  default: {
    current: 4,
    max: 4,
    increment: 1,
  },
});

export const staminaRegen = atom({
  key: "staminaRegen",
  default: {
    rate: 1500,
    amount: 1,
    increment: 1,
  },
});

// Percentage.
export const attackSpeedReduction = atom({
  key: "attackSpeedReduction",
  default: {
    current: 0,
    increment: 0.01,
  },
});

export const weapon = atom({
  key: "weapon",
  default: {
    name: "Fists",
    type: "light",
    speed: 1200,
    cost: 1,
    damage: { min: 0, max: 1 },
  },
});

export const damageDealt = atom({
  key: "damageDealt",
  default: null,
});

export const damageTaken = atom({
  key: "damageTaken",
  default: null,
});
