import { atom } from "recoil";

export const name = atom({
  key: "name",
  default: "???",
});

export const health = atom({
  key: "health",
  default: {
    current: 8,
    maximum: 8,
    increment: 2,
  },
});

export const healthRegen = atom({
  key: "healthRegen",
  default: {
    rate: 1000,
    amount: 1,
    increment: 0.5,
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
    current: 5,
    maximum: 5,
    increment: 1,
  },
});

export const staminaRegen = atom({
  key: "staminaRegen",
  default: {
    rate: 1000,
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
    speed: 1000,
    cost: 2,
    damage: { minimum: 0, maximum: 1 },
  },
});

export const damageTaken = atom({
  key: "damageTaken",
  default: 0,
});
