import { atom, selector, selectorFamily } from "recoil";

import { merchantItem } from "./caravan";
import {
  ARMOR_NONE,
  GEMS_MAXIMUM,
  GEM_FITTING_COST,
  MONKEY_PAW_GROWTH,
  SHIELD_NONE,
  WEAPON_NONE,
} from "@neverquest/data/inventory";
import { handleLocalStorage, withStateKey } from "@neverquest/state";
import { inventory } from "@neverquest/state/inventory";
import { essence } from "@neverquest/state/resources";
import type {
  Armor,
  InventoryItem,
  Shield,
  TrinketItemAmmunitionPouch,
  TrinketItemMonkeyPaw,
  Weapon,
} from "@neverquest/types";
import {
  isArmor,
  isConsumable,
  isShield,
  isTrinket,
  isWeapon,
} from "@neverquest/types/type-guards";
import type { Consumable, Gear, Trinket } from "@neverquest/types/unions";
import { INFUSION_DELTA, INFUSION_DURATION } from "@neverquest/utilities/constants";
import { getGrowthTriangular } from "@neverquest/utilities/getters";

// SELECTORS

export const ammunition = withStateKey("ammunition", (key) =>
  selector({
    get: ({ get }) => {
      const ownedAmmunitionPouch = get(ownedItem("ammunition pouch"));

      return ownedAmmunitionPouch === null
        ? 0
        : (ownedAmmunitionPouch as TrinketItemAmmunitionPouch).current;
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
        : (ownedAmmunitionPouch as TrinketItemAmmunitionPouch).maximum;
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

export const canAffordInfusion = withStateKey("canAffordInfusion", (key) =>
  selector({
    // TODO - make into selectorFamilies for new infusion trinkets.
    get: ({ get }) => get(essence) >= get(monkeyPawInfusionStep),
    key,
  }),
);

export const ownedItem = withStateKey("ownedItem", (key) =>
  selectorFamily<InventoryItem | null, Consumable | Trinket>({
    get:
      (parameter) =>
      ({ get }) =>
        get(inventory).find(
          (current) => (isConsumable(current) || isTrinket(current)) && current.name === parameter,
        ) ?? null,
    key,
  }),
);

export const monkeyPawInfusionStep = withStateKey("monkeyPawLevel", (key) =>
  selector({
    get: ({ get }) => Math.ceil((get(monkeyPawMaximum) / INFUSION_DURATION) * INFUSION_DELTA),
    key,
  }),
);

export const monkeyPawLevel = withStateKey("monkeyPawLevel", (key) =>
  selector({
    get: ({ get }) => {
      const monkeyPaw = get(merchantItem("monkey paw")) ?? get(ownedItem("monkey paw"));

      if (monkeyPaw === null) {
        return 0;
      }

      return (monkeyPaw as TrinketItemMonkeyPaw).level;
    },
    key,
  }),
);

export const monkeyPawMaximum = withStateKey("monkeyPawMaximum", (key) =>
  selector({
    get: ({ get }) => {
      const monkeyPaw = get(ownedItem("monkey paw"));

      if (monkeyPaw === null) {
        return 0;
      }

      return getGrowthTriangular((monkeyPaw as TrinketItemMonkeyPaw).level + MONKEY_PAW_GROWTH);
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

export const infusionDelta = withStateKey("infusionDelta", (key) =>
  atom({
    default: INFUSION_DELTA,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const monkeyPawInfusion = withStateKey("monkeyPawInfusion", (key) =>
  atom({
    default: 0,
    key,
  }),
);
