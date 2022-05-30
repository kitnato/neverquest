import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

import { stamina, staminaRegenerationRate } from "neverquest/state/attributes";
import {
  showArmor,
  showBlockChance,
  showShield,
  showStamina,
  showTotalAttackRateSummary,
  showTotalDamageSummary,
  showTotalProtection,
  showTrinket,
  showWeapon,
} from "neverquest/state/show";
import { Armor, Inventory, Shield, Trinket, Weapon } from "neverquest/types/core";
import { NO_ARMOR, NO_TRINKET, NO_SHIELD, NO_WEAPON } from "neverquest/utilities/constants";
import { isArmor, isShield, isTrinket, isWeapon } from "neverquest/utilities/type-guards";

// PRIMITIVES

export const armor = atom<Armor>((get) => {
  const currentInventory = get(inventory);
  const equippedArmorID = Object.getOwnPropertySymbols(currentInventory).filter((id) => {
    const { isEquipped, item } = currentInventory[id];

    return isEquipped && isArmor(item);
  })[0];

  if (equippedArmorID) {
    return currentInventory[equippedArmorID].item as Armor;
  }

  return NO_ARMOR;
});

export const shield = atom<Shield>((get) => {
  const currentInventory = get(inventory);
  const equippedShieldID = Object.getOwnPropertySymbols(currentInventory).filter((id) => {
    const { isEquipped, item } = currentInventory[id];

    return isEquipped && isShield(item);
  })[0];

  if (equippedShieldID) {
    return currentInventory[equippedShieldID].item as Shield;
  }

  return NO_SHIELD;
});

export const trinket = atom<Trinket>((get) => {
  const currentInventory = get(inventory);
  const equippedTrinketID = Object.getOwnPropertySymbols(currentInventory).filter((id) => {
    const { isEquipped, item } = currentInventory[id];

    return isEquipped && isTrinket(item);
  })[0];

  if (equippedTrinketID) {
    return currentInventory[equippedTrinketID].item as Trinket;
  }

  return NO_TRINKET;
});

export const weapon = atom<Weapon>((get) => {
  const currentInventory = get(inventory);
  const equippedWeaponID = Object.getOwnPropertySymbols(currentInventory).filter((id) => {
    const { isEquipped, item } = currentInventory[id];

    return isEquipped && isWeapon(item);
  })[0];

  if (equippedWeaponID) {
    return currentInventory[equippedWeaponID].item as Weapon;
  }

  return NO_WEAPON;
});

export const inventory = atomWithReset<Inventory>({});

export const inventorySize = atomWithReset(3);

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

// WRITERS

export const itemEquip = atom(null, (get, set, id: symbol) => {
  const { item } = get(inventory)[id];

  if (!item) {
    return;
  }

  if (isArmor(item)) {
    if (!get(showArmor)) {
      set(showArmor, true);
    }

    if (!get(showTotalProtection)) {
      set(showTotalProtection, true);
    }
  }

  if (isShield(item)) {
    if (!get(showShield)) {
      set(showShield, true);
    }

    if (!get(showBlockChance)) {
      set(showBlockChance, true);
    }
  }

  if (isTrinket(item)) {
    if (!get(showTrinket)) {
      set(showTrinket, true);
    }
  }

  if (isWeapon(item)) {
    if (!get(showStamina) && item.staminaCost > 0) {
      set(showStamina, true);

      if (!get(stamina).canAssign) {
        set(stamina, (current) => ({ ...current, canAssign: true }));
      }

      if (!get(staminaRegenerationRate).canAssign) {
        set(staminaRegenerationRate, (current) => ({
          ...current,
          canAssign: true,
        }));
      }
    }

    if (!get(showTotalAttackRateSummary)) {
      set(showTotalAttackRateSummary, true);
    }

    if (!get(showTotalDamageSummary)) {
      set(showTotalDamageSummary, true);
    }

    if (!get(showWeapon)) {
      set(showWeapon, true);
    }
  }

  set(inventory, (current) => ({
    ...current,
    [id]: { ...current[id], isEquipped: true },
  }));
});

export const itemUnequip = atom(null, (get, set, id: symbol) => {
  set(inventory, (current) => ({
    ...current,
    [id]: { ...current[id], isEquipped: false },
  }));
});
