import { atom, selector } from "recoil";
import { v4 as uuidv4 } from "uuid";

import { Armor, Inventory, Accessory, Shield, Weapon, EquipmentType } from "neverquest/env";
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

export const inventorySize = atom({
  key: "inventorySize",
  default: 3,
});

export const shield = atom<Shield>({
  key: "shield",
  default: NO_SHIELD,
});

export const storedInventory = atom<Inventory>({
  key: "storedInventory",
  default: {},
});

export const weapon = atom<Weapon>({
  key: "weapon",
  default: NO_WEAPON,
});

// SELECTORS

export const encumbrance = selector({
  key: "encumbrance",
  get: ({ get }) => {
    const equippedInventoryValue = get(equippedInventory);
    const storedInventoryValue = get(storedInventory);

    return (
      Object.values(equippedInventoryValue).reduce(
        (totalEncumbrance, { item: { encumbrance } }) => totalEncumbrance + encumbrance,
        0
      ) +
      Object.values(storedInventoryValue).reduce(
        (totalEncumbrance, { item: { encumbrance } }) => totalEncumbrance + encumbrance,
        0
      )
    );
  },
});

export const equippedInventory = selector<Inventory>({
  key: "equippedInventory",
  get: ({ get }) => {
    const armorValue = get(armor);
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

    return { ...equippedItems };
  },
});

export const isInventoryFull = selector({
  key: "isInventoryFull",
  get: ({ get }) => {
    const encumbranceValue = get(encumbrance);
    const inventorySizeValue = get(inventorySize);

    return encumbranceValue === inventorySizeValue;
  },
});
