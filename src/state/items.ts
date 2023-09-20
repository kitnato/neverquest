import { selector, selectorFamily } from "recoil";

import {
  ARMOR_NONE,
  GEMS_MAXIMUM,
  GEM_FITTING_COST,
  SHIELD_NONE,
  WEAPON_NONE,
} from "@neverquest/data/inventory";
import { withStateKey } from "@neverquest/state";
import { inventory } from "@neverquest/state/inventory";
import { scrap } from "@neverquest/state/resources";
import type { Armor, InventoryItem, Shield, Weapon } from "@neverquest/types";
import {
  isArmor,
  isConsumable,
  isShield,
  isTrinket,
  isWeapon,
} from "@neverquest/types/type-guards";
import type { Consumable, Gear, Trinket } from "@neverquest/types/unions";

// SELECTORS

export const armor = withStateKey("armor", (key) =>
  selector({
    get: ({ get }) => {
      const equippedArmor = get(inventory).find((item) => {
        if (isArmor(item)) {
          return item.isEquipped;
        }

        return;
      });

      if (equippedArmor === undefined) {
        return ARMOR_NONE;
      }

      return equippedArmor as Armor;
    },
    key,
  }),
);

export const canApplyGem = withStateKey("canApplyGem", (key) =>
  selectorFamily<boolean, Gear>({
    get:
      (parameter) =>
      ({ get }) => {
        const { length } =
          parameter === "armor"
            ? get(armor).gems
            : parameter === "shield"
            ? get(shield).gems
            : get(weapon).gems;

        return length < GEMS_MAXIMUM && (GEM_FITTING_COST[length] ?? Infinity) <= get(scrap);
      },
    key,
  }),
);

export const ownedItem = withStateKey("ownedItem", (key) =>
  selectorFamily<InventoryItem | null, Consumable | Trinket>({
    get:
      (parameter) =>
      ({ get }) =>
        get(inventory).find(
          (current) => (isConsumable(current) || isTrinket(current)) && current.type === parameter,
        ) ?? null,
    key,
  }),
);

export const shield = withStateKey("shield", (key) =>
  selector({
    get: ({ get }) => {
      const equippedShield = get(inventory).find((item) => {
        if (isShield(item)) {
          return item.isEquipped;
        }

        return;
      });

      if (equippedShield === undefined) {
        return SHIELD_NONE;
      }

      return equippedShield as Shield;
    },
    key,
  }),
);

export const weapon = withStateKey("weapon", (key) =>
  selector<Weapon | typeof WEAPON_NONE>({
    get: ({ get }) => {
      const equippedWeapon = get(inventory).find((item) => {
        if (isWeapon(item)) {
          return item.isEquipped;
        }

        return;
      });

      if (equippedWeapon === undefined) {
        return WEAPON_NONE;
      }

      return equippedWeapon as Weapon;
    },
    key,
  }),
);
