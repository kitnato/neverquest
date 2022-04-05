import { atom, selector } from "recoil";
import { v4 as uuidv4 } from "uuid";

import { Armor, Inventory, Accessory, Shield, Weapon, EquipmentType } from "neverquest/env.d";
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

export const fullInventory = selector({
  key: "fullInventory",
  get: ({ get }) => {
    const armorValue = get(armor);
    const { contents } = get(inventory);
    const accessoryValue = get(accessory);
    const shieldValue = get(shield);
    const weaponValue = get(weapon);

    const equippedItems: Inventory = {};

    if (weaponValue.name !== NO_WEAPON.name) {
      equippedItems[uuidv4()] = {
        isEquipped: true,
        item: weaponValue,
        type: EquipmentType.Weapon,
      };
    }

    if (armorValue.name !== NO_ARMOR.name) {
      equippedItems[uuidv4()] = {
        isEquipped: true,
        item: armorValue,
        type: EquipmentType.Armor,
      };
    }

    if (shieldValue.name !== NO_SHIELD.name) {
      equippedItems[uuidv4()] = {
        isEquipped: true,
        item: shieldValue,
        type: EquipmentType.Shield,
      };
    }

    if (accessoryValue.name !== NO_ACCESSORY.name) {
      equippedItems[uuidv4()] = {
        isEquipped: true,
        item: accessoryValue,
        type: EquipmentType.Accessory,
      };
    }

    return { ...equippedItems, ...contents };
  },
});
