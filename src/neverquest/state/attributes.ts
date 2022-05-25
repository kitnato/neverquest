import { atom } from "jotai";

import { Attribute } from "neverquest/types/core";

export const attackRateBonus = atom<Attribute>({
  base: 0,
  canAssign: true,
  cost: 1,
  description: "Reduce attack rate",
  increment: 0.02,
  name: "Speed",
  points: 0,
});

export const criticalChance = atom<Attribute>({
  base: 0,
  canAssign: false,
  cost: 1,
  description: "Increase critical hit chance",
  increment: 0.02,
  name: "Dexterity",
  points: 0,
});

export const criticalDamage = atom<Attribute>({
  base: 1.5,
  canAssign: false,
  cost: 1,
  description: "Increase critical hit damage",
  increment: 0.1,
  name: "Perception",
  points: 0,
});

export const damage = atom<Attribute>({
  base: 0,
  canAssign: true,
  cost: 1,
  description: "Increase base attack damage",
  increment: 1,
  name: "Strength",
  points: 0,
});

export const dodgeChance = atom<Attribute>({
  base: 0,
  canAssign: false,
  cost: 1,
  description: "Increase chance to dodge an attack",
  increment: 0.02,
  name: "Agility",
  points: 0,
});

export const health = atom<Attribute>({
  base: 8,
  canAssign: true,
  cost: 1,
  description: "Increase maximum total health",
  increment: 2,
  name: "Vitality",
  points: 0,
});

export const healthRegenerationRate = atom<Attribute>({
  base: 9000,
  canAssign: true,
  cost: 1,
  description: "Increase health regeneration rate",
  increment: -50,
  name: "Vigor",
  points: 0,
});

export const lootBonus = atom<Attribute>({
  base: 0,
  canAssign: false,
  cost: 1,
  description: "Increase amount of loot dropped by monsters",
  increment: 0.02,
  name: "Luck",
  points: 0,
});

export const recoveryRate = atom<Attribute>({
  base: 1500,
  canAssign: true,
  cost: 1,
  description: "Reduce recovery rate",
  increment: -10,
  name: "Resilience",
  points: 0,
});

export const stamina = atom<Attribute>({
  base: 4,
  canAssign: false,
  cost: 1,
  description: "Increase maximum total stamina",
  increment: 1,
  name: "Endurance",
  points: 0,
});

export const staminaRegenerationRate = atom<Attribute>({
  base: 5000,
  canAssign: false,
  cost: 1,
  description: "Increase stamina regeneration rate",
  increment: -50,
  name: "Fortitude",
  points: 0,
});
