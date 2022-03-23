import { atom, selector } from "recoil";

import { Armor, Inventory, Accessory, Shield, Weapon } from "neverquest/env.d";
import { NO_ARMOR, NO_ACCESSORY, NO_SHIELD, NO_WEAPON } from "neverquest/utilities/constants";

// ATOMS

export const armor = atom<Armor>({
  key: "armor",
  default: NO_ARMOR,
});

export const inventory = atom<{ contents: Inventory; size: number }>({
  key: "inventory",
  default: {
    contents: {},
    size: 3,
  },
});

export const accessory = atom<Accessory>({
  key: "accessory",
  default: NO_ACCESSORY,
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

export const isCarryingItems = selector({
  key: "isCarryingItems",
  get: ({ get }) => {
    const armorValue = get(armor);
    const { contents } = get(inventory);
    const accessoryValue = get(accessory);
    const shieldValue = get(shield);
    const weaponValue = get(weapon);

    return (
      Object.keys(contents).length > 0 ||
      armorValue.name !== NO_ARMOR.name ||
      accessoryValue.name !== NO_ACCESSORY.name ||
      shieldValue.name !== NO_SHIELD.name ||
      weaponValue.name !== NO_WEAPON.name
    );
  },
});
