export const INVENTORY_EQUIPPED = "equipped";
export const INVENTORY_REJECTED = "rejected";
export const INVENTORY_STORED = "stored";

export const ITEM_TYPE_ARMOR = "armor";
export const ITEM_TYPE_JEWELRY = "jewelry";
export const ITEM_TYPE_SHIELD = "shield";
export const ITEM_TYPE_WEAPON = "weapon";

export const TRANSPARENT_PIXEL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

export const WEAPON_TYPE_BALANCED = "balanced";
export const WEAPON_TYPE_HEAVY = "heavy";
export const WEAPON_TYPE_LIGHT = "light";
export const WEAPON_TYPE_TWO_HANDED = "twoHanded";

export const NO_ARMOR = {
  name: "Skin",
  value: 0,
};
export const NO_JEWELRY = {
  name: "None",
};
export const NO_SHIELD = {
  block: 0,
  name: "None",
  stagger: 0,
  value: 0,
};
export const NO_WEAPON = {
  damage: { minimum: 1, maximum: 2 },
  name: "Hands",
  rate: 3000,
  staminaCost: 1,
  type: WEAPON_TYPE_LIGHT,
};

export const MODE_CARAVAN = "caravan";
export const MODE_WILDERNESS = "wilderness";

export const WEAPON_SPECIFICATIONS = {
  [WEAPON_TYPE_LIGHT]: {
    damageModifier: 1.25,
    rateRange: { minimum: 2900, maximum: 3500 },
    staminaCost: 1,
    type: "Light",
  },
  [WEAPON_TYPE_BALANCED]: {
    damageModifier: 2,
    rateRange: { minimum: 3200, maximum: 4000 },
    staminaCost: 2,
    type: "Balanced",
  },
  [WEAPON_TYPE_HEAVY]: {
    damageModifier: 3,
    rateRange: { minimum: 3900, maximum: 5000 },
    staminaCost: 3,
    type: "Heavy",
  },
  [WEAPON_TYPE_TWO_HANDED]: {
    damageModifier: 4,
    rateRange: { minimum: 4000, maximum: 6000 },
    staminaCost: 4,
    type: "Two-handed",
  },
};
