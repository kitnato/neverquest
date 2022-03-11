import { atom } from "recoil";

export const attackRateBonus = atom({
  key: "attackRateBonus",
  default: {
    base: 0,
    canAssign: true,
    cost: 1,
    description: "Attack rate",
    increment: 0.02,
    name: "Speed",
    points: 0,
  },
});

export const criticalChance = atom({
  key: "criticalChance",
  default: {
    base: 0,
    canAssign: false,
    cost: 1,
    description: "Chance of landing a critical hit",
    increment: 0.01,
    name: "Dexterity",
    points: 0,
  },
});

export const criticalDamage = atom({
  key: "criticalDamage",
  default: {
    base: 1,
    canAssign: false,
    cost: 1,
    description: "Damage multiplier of a critical hit",
    increment: 0.1,
    name: "Perception",
    points: 0,
  },
});

export const damage = atom({
  key: "damage",
  default: {
    base: 0,
    canAssign: true,
    cost: 1,
    description: "Base attack damage",
    increment: 1,
    name: "Strength",
    points: 0,
  },
});

export const dodgeChance = atom({
  key: "dodgeChance",
  default: {
    base: 0,
    canAssign: true,
    cost: 1,
    description: "Chance to dodge an attack",
    increment: 0.01,
    name: "Agility",
    points: 0,
  },
});

export const health = atom({
  key: "health",
  default: {
    base: 10,
    canAssign: true,
    cost: 1,
    description: "Maximum total health",
    increment: 2,
    name: "Health",
    points: 0,
  },
});

export const healthRegenerationRate = atom({
  key: "healthRegenerationRate",
  default: {
    base: 9000,
    canAssign: true,
    cost: 1,
    description: "Health regeneration rate",
    increment: -50,
    name: "Vigor",
    points: 0,
  },
});

export const lootBonus = atom({
  key: "lootBonus",
  default: {
    base: 0,
    canAssign: false,
    cost: 1,
    description: "Amount of loot dropped by monsters",
    increment: 0.02,
    name: "Luck",
    points: 0,
  },
});

export const physicalResistance = atom({
  key: "physicalResistance",
  default: {
    base: 0,
    canAssign: false,
    cost: 1,
    description: "Damage taken without needing to recover",
    increment: 2,
    name: "Stoicism",
    points: 0,
  },
});

export const recoveryRate = atom({
  key: "recoveryRate",
  default: {
    base: 1500,
    canAssign: true,
    cost: 1,
    description: "Recovery rate",
    increment: -10,
    name: "Resilience",
    points: 0,
  },
});

export const stamina = atom({
  key: "stamina",
  default: {
    base: 4,
    canAssign: true,
    cost: 1,
    description: "Maximum total stamina",
    increment: 1,
    name: "Stamina",
    points: 0,
  },
});

export const staminaRegenerationRate = atom({
  key: "staminaRegenerationRate",
  default: {
    base: 3500,
    canAssign: true,
    cost: 1,
    description: "Stamina regeneration rate",
    increment: -50,
    name: "Endurance",
    points: 0,
  },
});
