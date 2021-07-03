import { atom } from "recoil";

// CHARACTER

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
    current: 1,
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
    rate: 1750,
    current: 1,
    increment: 1,
  },
});

export const dodge = atom({
  key: "dodge",
  default: {
    current: 0,
    increment: 0.01,
  },
});

export const attackSpeedReduction = atom({
  key: "attackSpeedReduction",
  default: {
    current: 0,
    // Percentage
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

export const armor = atom({
  key: "armor",
  default: {
    name: null,
    value: 0,
  },
});

export const shield = atom({
  key: "shield",
  default: {
    name: null,
    block: 0,
    armor: 0,
    stagger: 0,
  },
});

export const aether = atom({
  key: "aether",
  default: 0,
});

export const coins = atom({
  key: "coins",
  default: 0,
});

export const experience = atom({
  key: "experience",
  default: 0,
});

export const looted = atom({
  key: "looted",
  default: false,
});

export const scrap = atom({
  key: "scrap",
  default: 0,
});

// WORLD

export const activeMonster = atom({
  key: "activeMonster",
  default: null,
});

export const level = atom({
  key: "level",
  default: 1,
});

export const location = atom({
  key: "location",
  default: "???",
});

export const progress = atom({
  key: "progress",
  default: 0,
});

export const mode = atom({
  key: "mode",
  default: "wilderness",
});

export const gameOver = atom({
  key: "gameOver",
  default: false,
});

export const attacking = atom({
  key: "attacking",
  default: false,
});

export const damageDealt = atom({
  key: "damageDealt",
  default: null,
});

export const damageTaken = atom({
  key: "damageTaken",
  default: null,
});

// LOOT

export const aetherLoot = atom({
  key: "aetherLoot",
  default: null,
});

export const coinsLoot = atom({
  key: "coinsLoot",
  default: null,
});

export const scrapLoot = atom({
  key: "scrapLoot",
  default: null,
});
