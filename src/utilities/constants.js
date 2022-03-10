export const NO_ARMOR = {
  name: "Skin",
  value: 0,
};

export const NO_JEWELRY = {
  name: "None",
};

export const NO_SHIELD = {
  armor: 0,
  block: 0,
  name: "None",
  stagger: 0,
};

export const NO_WEAPON = {
  cost: 1,
  damage: { min: 1, max: 2 },
  name: "Hands",
  rate: 3000,
  type: "light",
};

export const TRANSPARENT_PIXEL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

export const WEAPON_TYPE = {
  light: {
    damageModifier: 1.25,
    cost: 1,
    rateRange: { min: 2900, max: 3500 },
  },
  balanced: {
    damageModifier: 1.5,
    cost: 1,
    rateRange: { min: 3200, max: 4000 },
  },
  heavy: {
    damageModifier: 2,
    cost: 2,
    rateRange: { min: 3900, max: 5000 },
  },
  twoHanded: {
    damageModifier: 3,
    cost: 3,
    rateRange: { min: 4000, max: 6000 },
  },
};
