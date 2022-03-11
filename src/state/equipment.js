import { atom, selector } from "recoil";

import {
  NO_ARMOR,
  NO_JEWELRY,
  NO_SHIELD,
  NO_WEAPON,
} from "utilities/constants";

// ATOMS

export const armor = atom({
  key: "armor",
  default: NO_ARMOR,
});

export const inventory = atom({
  key: "inventory",
  default: {
    contents: {},
    size: 3,
  },
});

export const jewelry = atom({
  key: "jewelry",
  default: NO_JEWELRY,
});

export const shield = atom({
  key: "shield",
  default: NO_SHIELD,
});

export const weapon = atom({
  key: "weapon",
  default: NO_WEAPON,
});

// SELECTORS

export const isThereInventory = selector({
  key: "isThereInventory",
  get: ({ get }) => {
    const armorValue = get(armor);
    const { contents } = get(inventory);
    const jewelryValue = get(jewelry);
    const shieldValue = get(shield);
    const weaponValue = get(weapon);

    return (
      contents.length > 0 ||
      armorValue.name !== NO_ARMOR.name ||
      jewelryValue.name !== NO_JEWELRY.name ||
      shieldValue.name !== NO_SHIELD.name ||
      weaponValue.name !== NO_WEAPON.name
    );
  },
});
