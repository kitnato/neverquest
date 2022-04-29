import { atom, selector } from "recoil";

import { Armor, Inventory, Accessory, Shield, Weapon } from "neverquest/types/core";
import { NO_ARMOR, NO_ACCESSORY, NO_SHIELD, NO_WEAPON } from "neverquest/utilities/constants";

// ATOMS

export const accessory = atom<Accessory>({
  key: "accessory",
  default: NO_ACCESSORY,
});

export const armor = atom<Armor>({
  key: "armor",
  default: NO_ARMOR,
});

export const inventory = atom<Inventory>({
  key: "inventory",
  default: {},
});

export const inventorySize = atom({
  key: "inventorySize",
  default: 3,
});

export const shield = atom<Shield>({
  key: "shield",
  default: NO_SHIELD,
});

export const weapon = atom<Weapon>({
  key: "weapon",
  default: NO_WEAPON,
});

// SELECTORS

export const encumbrance = selector({
  key: "encumbrance",
  get: ({ get }) => {
    const inventoryValue = get(inventory);

    return Object.values(inventoryValue).reduce(
      (totalEncumbrance, { item: { weight } }) => totalEncumbrance + weight,
      0
    );
  },
});

// TODO - needed?
export const isInventoryFull = selector({
  key: "isInventoryFull",
  get: ({ get }) => {
    const encumbranceValue = get(encumbrance);
    const inventorySizeValue = get(inventorySize);

    return encumbranceValue === inventorySizeValue;
  },
});
