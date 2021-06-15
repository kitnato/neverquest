import { atom } from "recoil";

export const name = atom({
  key: "name",
  default: "???",
});

// Total health.
export const endurance = atom({
  key: "endurance",
  default: {
    value: 5,
    increment: 1,
  },
});

// Health regeneration per second.
export const vitality = atom({
  key: "vitality",
  default: {
    value: 1,
    increment: 1,
  },
});

// Total energy.
export const wisdom = atom({
  key: "wisdom",
  default: {
    value: 1,
    increment: 1,
  },
});

// Energy regeneration per second.
export const intellect = atom({
  key: "intellect",
  default: {
    value: 1,
    increment: 1,
  },
});

// Damage with melee weapons.
export const strength = atom({
  key: "strength",
  default: {
    value: 1,
    increment: 1,
  },
});

// Dodge chance.
export const agility = atom({
  key: "agility",
  default: {
    value: 1,
    increment: 1,
  },
});

// Attack speed.
export const stamina = atom({
  key: "stamina",
  default: {
    value: 1,
    increment: 1,
  },
});

// Casting speed.
export const acumen = atom({
  key: "acumen",
  default: {
    value: 1,
    increment: 1,
  },
});

// Critical chance.
export const dexterity = atom({
  key: "dexterity",
  default: {
    value: 1,
    increment: 1,
  },
});

// Critical damage.
export const perception = atom({
  key: "perception",
  default: {
    value: 1,
    increment: 1,
  },
});

// Chance for better equipment. Chance for extra coins.
export const luck = atom({
  key: "luck",
  default: {
    value: 1,
    increment: 1,
  },
});

export const weapon = atom({
  key: "weapon",
  default: { name: "Fists", type: "light", damage: { min: 0, max: 1 } },
});

export const damageTaken = atom({
  key: "damageTaken",
  default: 0,
});
