import { atom } from "recoil";

// ATOMS

export const attackRateBonus = atom({
  key: "attackRateBonus",
  default: {
    base: 0,
    canAssign: true,
    description: "Rate of attack",
    increment: 0.01,
    name: "Speed",
    points: 0,
  },
});

export const criticalChance = atom({
  key: "criticalChance",
  default: {
    base: 0,
    canAssign: false,
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
    description: "Total damage of an attack",
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
    description: "Chance to dodge a monster's attack",
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
    description: "Maximum total health",
    increment: 2,
    name: "Health",
    points: 0,
  },
});

export const healthRegenAmount = atom({
  key: "healthRegenAmount",
  default: {
    base: 1,
    canAssign: false,
    costModifier: 1.5,
    description: "Health regeneration amount",
    increment: 1,
    name: "Vitality",
    points: 0,
  },
});

export const healthRegenRate = atom({
  key: "healthRegenRate",
  default: {
    base: 9000,
    canAssign: true,
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
    description:
      "Amount of damage per hit that can be taken needing to recover",
    increment: 2,
    name: "Stoicism",
    points: 0,
  },
});

export const recoveryRate = atom({
  key: "recoveryRate",
  default: {
    base: 1500,
    description: "Rate of recovery after being hit",
    increment: -10,
    name: "Resilience",
    points: 0,
    canAssign: true,
  },
});

export const stamina = atom({
  key: "stamina",
  default: {
    base: 4,
    canAssign: true,
    description: "Maximum total stamina",
    increment: 1,
    name: "Stamina",
    points: 0,
  },
});

export const staminaRegenAmount = atom({
  key: "staminaRegenAmount",
  default: {
    base: 1,
    canAssign: false,
    costModifier: 1.5,
    description: "Stamina regeneration amount",
    increment: 1,
    name: "Fortitude",
    points: 0,
  },
});

export const staminaRegenRate = atom({
  key: "staminaRegenRate",
  default: {
    base: 3500,
    canAssign: true,
    description: "Stamina regeneration rate",
    increment: -50,
    name: "Endurance",
    points: 0,
  },
});
