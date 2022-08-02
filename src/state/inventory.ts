import { atom, DefaultValue, selector } from "recoil";

import { attributes } from "@neverquest/state/attributes";
import { isShowing } from "@neverquest/state/isShowing";
import { Armor, Inventory, Shield, Trinket, Weapon } from "@neverquest/types";
import { NO_ARMOR, NO_TRINKET, NO_SHIELD, NO_WEAPON } from "@neverquest/utilities/constants-gear";
import { isArmor, isShield, isTrinket, isWeapon } from "@neverquest/utilities/type-guards";
import { AttributeType, ShowingType } from "@neverquest/types/enums";

export const encumbranceMaximum = atom({
  default: 3,
  key: "encumbranceMaximum",
});

export const inventory = atom<Inventory>({
  default: {},
  key: "inventory",
});

export const armor = selector({
  key: "armor",
  get: ({ get }) => {
    const currentInventory = get(inventory);
    const equippedArmorID = Object.getOwnPropertySymbols(currentInventory).filter((id) => {
      const { isEquipped, item } = currentInventory[id];

      return isEquipped && isArmor(item);
    })[0];

    if (equippedArmorID) {
      return currentInventory[equippedArmorID].item as Armor;
    }

    return NO_ARMOR;
  },
});

export const encumbrance = selector({
  key: "encumbrance",
  get: ({ get }) => {
    const inventoryValue = get(inventory);

    return Object.getOwnPropertySymbols(inventoryValue).reduce(
      (totalEncumbrance, id) => totalEncumbrance + inventoryValue[id].item.weight,
      0
    );
  },
});

export const isInventoryFull = selector({
  key: "isInventoryFull",
  get: ({ get }) => get(encumbrance) === get(encumbranceMaximum),
});

export const shield = selector({
  key: "shield",
  get: ({ get }) => {
    const currentInventory = get(inventory);
    const equippedShieldID = Object.getOwnPropertySymbols(currentInventory).filter((id) => {
      const { isEquipped, item } = currentInventory[id];

      return isEquipped && isShield(item);
    })[0];

    if (equippedShieldID) {
      return currentInventory[equippedShieldID].item as Shield;
    }

    return NO_SHIELD;
  },
});

export const trinket = selector({
  key: "trinket",
  get: ({ get }) => {
    const currentInventory = get(inventory);
    const equippedTrinketID = Object.getOwnPropertySymbols(currentInventory).filter((id) => {
      const { isEquipped, item } = currentInventory[id];

      return isEquipped && isTrinket(item);
    })[0];

    if (equippedTrinketID) {
      return currentInventory[equippedTrinketID].item as Trinket;
    }

    return NO_TRINKET;
  },
});

export const weapon = selector({
  key: "weapon",
  get: ({ get }) => {
    const currentInventory = get(inventory);
    const equippedWeaponID = Object.getOwnPropertySymbols(currentInventory).filter((id) => {
      const { isEquipped, item } = currentInventory[id];

      return isEquipped && isWeapon(item);
    })[0];

    if (equippedWeaponID) {
      return currentInventory[equippedWeaponID].item as Weapon;
    }

    return NO_WEAPON;
  },
});

// TODO: refactor as useRecoilTransaction(), as soon as it can handle selectors too.

export const itemEquip = selector({
  get: () => Symbol(),
  key: "itemEquip",
  set: ({ get, set }, id) => {
    if (id instanceof DefaultValue) {
      return;
    }

    const { item } = get(inventory)[id];

    if (!item) {
      return;
    }

    set(inventory, (current) => ({
      ...current,
      [id]: { ...current[id], isEquipped: true },
    }));

    if (isArmor(item)) {
      if (!get(isShowing(ShowingType.Armor))) {
        set(isShowing(ShowingType.Armor), true);
      }

      if (!get(isShowing(ShowingType.TotalProtection))) {
        set(isShowing(ShowingType.TotalProtection), true);
      }
    }

    if (isShield(item)) {
      if (!get(isShowing(ShowingType.Shield))) {
        set(isShowing(ShowingType.Shield), true);
      }

      if (!get(isShowing(ShowingType.BlockChance))) {
        set(isShowing(ShowingType.BlockChance), true);
      }
    }

    if (isTrinket(item)) {
      if (!get(isShowing(ShowingType.Trinket))) {
        set(isShowing(ShowingType.Trinket), true);
      }
    }

    if (isWeapon(item)) {
      if (!get(isShowing(ShowingType.Stamina)) && item.staminaCost > 0) {
        set(isShowing(ShowingType.Stamina), true);

        if (!get(attributes(AttributeType.Stamina)).canAssign) {
          set(attributes(AttributeType.Stamina), (current) => ({
            ...current,
            canAssign: true,
          }));
        }
      }

      if (!get(isShowing(ShowingType.TotalAttackRateSummary))) {
        set(isShowing(ShowingType.TotalAttackRateSummary), true);
      }

      if (!get(isShowing(ShowingType.TotalDamageSummary))) {
        set(isShowing(ShowingType.TotalDamageSummary), true);
      }

      if (!get(isShowing(ShowingType.Weapon))) {
        set(isShowing(ShowingType.Weapon), true);
      }
    }
  },
});

export const itemUnequip = selector({
  get: () => Symbol(),
  key: "itemUnequip",
  set: ({ set }, id) => {
    if (id instanceof DefaultValue) {
      return;
    }

    set(inventory, (current) => ({
      ...current,
      [id]: { ...current[id], isEquipped: false },
    }));
  },
});
