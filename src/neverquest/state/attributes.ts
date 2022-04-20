import { atom } from "recoil";

import { Attribute } from "neverquest/env";

export const attackRateBonus = atom<Attribute>({
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

export const criticalChance = atom<Attribute>({
  key: "criticalChance",
  default: {
    base: 0,
    canAssign: false,
    cost: 1,
    description: "Chance of landing a critical hit",
    increment: 0.02,
    name: "Dexterity",
    points: 0,
  },
});

export const criticalDamage = atom<Attribute>({
  key: "criticalDamage",
  default: {
    base: 1.5,
    canAssign: false,
    cost: 1,
    description: "Damage multiplier of a critical hit",
    increment: 0.1,
    name: "Perception",
    points: 0,
  },
});

export const damage = atom<Attribute>({
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

export const dodgeChance = atom<Attribute>({
  key: "dodgeChance",
  default: {
    base: 0,
    canAssign: false,
    cost: 1,
    description: "Chance to dodge an attack",
    increment: 0.02,
    name: "Agility",
    points: 0,
  },
});

export const health = atom<Attribute>({
  key: "health",
  default: {
    base: 8,
    canAssign: true,
    cost: 1,
    description: "Maximum total health",
    increment: 2,
    name: "Vitality",
    points: 0,
  },
});

export const healthRegenerationRate = atom<Attribute>({
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

export const lootBonus = atom<Attribute>({
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

export const physicalResistance = atom<Attribute>({
  key: "physicalResistance",
  default: {
    base: 0,
    canAssign: false,
    cost: 1,
    description: "Damage taken without needing to recover",
    increment: 2,
    name: "Tenacity",
    points: 0,
  },
});

export const recoveryRate = atom<Attribute>({
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

export const stamina = atom<Attribute>({
  key: "stamina",
  default: {
    base: 4,
    canAssign: false,
    cost: 1,
    description: "Maximum total stamina",
    increment: 1,
    name: "Endurance",
    points: 0,
  },
});

export const staminaRegenerationRate = atom<Attribute>({
  key: "staminaRegenerationRate",
  default: {
    base: 4000,
    canAssign: false,
    cost: 1,
    description: "Stamina regeneration rate",
    increment: -50,
    name: "Fortitude",
    points: 0,
  },
});
