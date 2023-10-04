import { atom, atomFamily, selector, selectorFamily } from "recoil";

import {
  ARMOR_NONE,
  GEMS_MAXIMUM,
  GEM_FITTING_COST,
  INFUSABLES,
  SHIELD_NONE,
  WEAPON_NONE,
} from "@neverquest/data/inventory";
import { handleLocalStorage, withStateKey } from "@neverquest/state";
import { inventory } from "@neverquest/state/inventory";
import { essence } from "@neverquest/state/resources";
import type { AmmunitionPouchItem, Armor, InventoryItem, Shield, Weapon } from "@neverquest/types";
import {
  isArmor,
  isConsumable,
  isInfusable,
  isShield,
  isTrinket,
  isWeapon,
} from "@neverquest/types/type-guards";
import type { Consumable, Gear, Infusable, Trinket } from "@neverquest/types/unions";
import { INFUSION_DELTA, INFUSION_DURATION } from "@neverquest/utilities/constants";
import { getGrowthTriangular } from "@neverquest/utilities/getters";

// SELECTORS

export const ammunition = withStateKey("ammunition", (key) =>
  selector({
    get: ({ get }) => {
      const ownedAmmunitionPouch = get(ownedItem("ammunition pouch"));

      return ownedAmmunitionPouch === null
        ? 0
        : (ownedAmmunitionPouch as AmmunitionPouchItem).current;
    },
    key,
  }),
);

export const ammunitionMaximum = withStateKey("ammunitionMaximum", (key) =>
  selector({
    get: ({ get }) => {
      const ownedAmmunitionPouch = get(ownedItem("ammunition pouch"));

      return ownedAmmunitionPouch === null
        ? 0
        : (ownedAmmunitionPouch as AmmunitionPouchItem).maximum;
    },
    key,
  }),
);

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

        return length < GEMS_MAXIMUM && (GEM_FITTING_COST[length] ?? Infinity) <= get(essence);
      },
    key,
  }),
);

export const ownedItem = withStateKey("ownedItem", (key) =>
  selectorFamily<InventoryItem | null, Consumable | Infusable | Trinket>({
    get:
      (parameter) =>
      ({ get }) =>
        get(inventory).find(
          (current) =>
            (isConsumable(current) || isInfusable(current) || isTrinket(current)) &&
            current.name === parameter,
        ) ?? null,
    key,
  }),
);

export const infusionStep = withStateKey("infusionStep", (key) =>
  selectorFamily<number, Infusable>({
    get:
      (parameter) =>
      ({ get }) =>
        Math.min(
          get(essence),
          Math.ceil((get(infusionMaximum(parameter)) / INFUSION_DURATION) * INFUSION_DELTA),
        ),
    key,
  }),
);

export const infusionLevel = withStateKey("infusionLevel", (key) =>
  selectorFamily<number, Infusable>({
    get:
      (parameter) =>
      ({ get }) => {
        const infusable = get(ownedItem(parameter));

        if (infusable === null || !isInfusable(infusable)) {
          return 0;
        }

        return infusable.level;
      },
    key,
  }),
);

export const infusionMaximum = withStateKey("infusionMaximum", (key) =>
  selectorFamily<number, Infusable>({
    get:
      (parameter) =>
      ({ get }) => {
        const infusable = get(ownedItem(parameter));

        if (infusable === null || !isInfusable(infusable)) {
          return 0;
        }

        return getGrowthTriangular(infusable.level + INFUSABLES[parameter].item.growth);
      },
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

// ATOMS

export const infusionCurrent = withStateKey("infusionCurrent", (key) =>
  atomFamily<number, Infusable>({
    default: 0,
    key,
  }),
);

export const infusionDelta = withStateKey("infusionDelta", (key) =>
  atom({
    default: INFUSION_DELTA,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);
