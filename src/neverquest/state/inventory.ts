import { atom } from "jotai";
import { atomWithReset, RESET } from "jotai/utils";

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
import { InventoryProps } from "neverquest/types/props";
import { NO_ARMOR, NO_TRINKET, NO_SHIELD, NO_WEAPON } from "neverquest/utilities/constants";
import { isArmor, isShield, isTrinket, isWeapon } from "neverquest/utilities/type-guards";

// PRIMITIVES

export const armor = atomWithReset<Armor>(NO_ARMOR);

export const inventory = atomWithReset<Inventory>({});

export const inventorySize = atomWithReset(3);

export const shield = atomWithReset<Shield>(NO_SHIELD);

export const trinket = atomWithReset<Trinket>(NO_TRINKET);

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

// WRITERS

export const itemEquip = atom(null, (get, set, { id, item }: InventoryProps) => {
  if (isArmor(item)) {
    set(armor, item);

    if (!get(showArmor)) {
      set(showArmor, true);
    }

    if (!get(showTotalProtection)) {
      set(showTotalProtection, true);
    }
  }

  if (isShield(item)) {
    set(shield, item);

    if (!get(showShield)) {
      set(showShield, true);
    }

    if (!get(showBlockChance)) {
      set(showBlockChance, true);
    }
  }

  if (isTrinket(item)) {
    set(trinket, item);

    if (!get(showTrinket)) {
      set(showTrinket, true);
    }
  }

  if (isWeapon(item)) {
    set(weapon, item);

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

export const itemUnequip = atom(null, (get, set, { id, item }: InventoryProps) => {
  if (isArmor(item)) {
    set(armor, RESET);
  }

  if (isShield(item)) {
    set(shield, RESET);
  }

  if (isTrinket(item)) {
    set(trinket, RESET);
  }

  if (isWeapon(item)) {
    set(weapon, RESET);
  }

  set(inventory, (current) => ({
    ...current,
    [id]: { ...current[id], isEquipped: false },
  }));
});
