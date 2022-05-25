import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

import { Armor, Inventory, Accessory, Shield, Weapon } from "neverquest/types/core";
import { NO_ARMOR, NO_ACCESSORY, NO_SHIELD, NO_WEAPON } from "neverquest/utilities/constants";

// PRIMITIVES

export const accessory = atomWithReset<Accessory>(NO_ACCESSORY);

export const armor = atomWithReset<Armor>(NO_ARMOR);

export const inventory = atom<Inventory>({});

export const inventorySize = atom(3);

export const shield = atomWithReset<Shield>(NO_SHIELD);

export const weapon = atomWithReset<Weapon>(NO_WEAPON);

// READERS

export const encumbrance = atom((get) => {
  const inventoryValue = get(inventory);

  return Object.values(inventoryValue).reduce(
    (totalEncumbrance, { item: { weight } }) => totalEncumbrance + weight,
    0
  );
});

export const isInventoryFull = atom((get) => {
  const encumbranceValue = get(encumbrance);
  const inventorySizeValue = get(inventorySize);

  return encumbranceValue === inventorySizeValue;
});
